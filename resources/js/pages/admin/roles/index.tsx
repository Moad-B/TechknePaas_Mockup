import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge' // Pour faire joli sur les permissions
import AppLayout from '@/layouts/app-layout'
import { Head, useForm, router } from '@inertiajs/react'
import { Shield, Plus, Trash2, Pencil } from 'lucide-react'
import { useState } from 'react'

// formulaire de création/edition de role mis directement dans la page (mode bourrin)
function RoleForm({ role, permissionsDisponibles, onSuccess }) {
    const estEnEdition = role && role.id

    // je prepare les données du formulaire
    const { data, setData, post, put, reset } = useForm({
        name: role?.name || '',
        // je recupere les ID des permissions existantes si on modifie
        permission_ids: role?.permissions ? role.permissions.map(p => p.id) : []
    })

    // fonction pour cocher/decocher une permission
    const togglePermission = (id) => {
        if (data.permission_ids.includes(id)) {
            // si c'est deja la, je l'enleve
            setData('permission_ids', data.permission_ids.filter(i => i !== id))
        } else {
            // sinon je l'ajoute
            setData('permission_ids', [...data.permission_ids, id])
        }
    }

    const submit = (e) => {
        e.preventDefault()
        if (estEnEdition) {
            put(`/admin/roles/${role.id}`, { onSuccess })
        } else {
            post('/admin/roles', { onSuccess: () => { reset(); onSuccess() } })
        }
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <label className="text-sm font-medium">Nom du Rôle</label>
                <Input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Ex: Manager" />
            </div>

            <div>
                <label className="text-sm font-medium mb-2 block">Permissions associées</label>
                <div className="grid grid-cols-2 gap-2 border p-4 rounded-md h-60 overflow-y-auto">
                    {permissionsDisponibles.map(p => (
                        <label key={p.id} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.permission_ids.includes(p.id)}
                                onChange={() => togglePermission(p.id)}
                                className="rounded border-gray-300"
                            />
                            <span className="text-sm">{p.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <Button type="submit">{estEnEdition ? 'Mettre à jour' : 'Créer le rôle'}</Button>
            </div>
        </form>
    )
}

export default function RolesIndex({ roles, permissions }) {
    const [isOpen, setIsOpen] = useState(false)
    const [roleSelectionne, setRoleSelectionne] = useState(null)

    const ouvrirModal = (role = null) => {
        setRoleSelectionne(role)
        setIsOpen(true)
    }

    const supprimerRole = (id) => {
        if(confirm('Vraiment supprimer ce rôle ?')) {
            router.delete(`/admin/roles/${id}`)
        }
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'RBAC', href: '/admin/roles' }]}>
            <Head title="Gestion des Rôles" />

            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Shield className="h-6 w-6" /> Gestion des Rôles & Permissions
                    </h1>
                    <Button onClick={() => ouvrirModal()}>
                        <Plus className="mr-2 h-4 w-4" /> Nouveau Rôle
                    </Button>
                </div>

                <div className="grid gap-4">
                    {roles.map(role => (
                        <div key={role.id} className="border rounded-lg p-4 bg-card text-card-foreground shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        {role.name}
                                        <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                            {role.users_count} utilisateurs
                                        </span>
                                    </h3>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => ouvrirModal(role)}>
                                        <Pencil className="h-3 w-3" />
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => supprimerRole(role.id)}>
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>

                            {/* C'EST ICI QUE J'AFFICHE LES PERMISSIONS */}
                            <div className="flex flex-wrap gap-1">
                                {role.permissions && role.permissions.length > 0 ? (
                                    role.permissions.map(p => (
                                        <Badge key={p.id} variant="secondary" className="font-normal text-xs">
                                            {p.name}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-sm text-muted-foreground italic">Aucune permission spéciale</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modale Unique pour Créer / Editer */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{roleSelectionne ? 'Modifier le Rôle' : 'Nouveau Rôle'}</DialogTitle>
                    </DialogHeader>
                    <RoleForm
                        role={roleSelectionne}
                        permissionsDisponibles={permissions}
                        onSuccess={() => setIsOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </AppLayout>
    )
}
