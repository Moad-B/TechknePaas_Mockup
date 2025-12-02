import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import AppLayout from '@/layouts/app-layout'
import { Head, router } from '@inertiajs/react'
import { Boxes, MoreHorizontal, Plus } from 'lucide-react'
import { useState } from 'react'
import Pagination from '@/components/pagination'
import ProductForm from './partials/product-form'

// Le fil d'ariane pour savoir ou on est
const breadcrumbs = [
    { title: 'Administration', href: '/admin' },
    { title: 'Catalogue Services', href: '/admin/products' },
]

export default function ProductsAdminIndex({ products }) {

    // Les etats pour ouvrir/fermer les fenetres (modales)
    const [createOpen, setCreateOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    // La ligne qu'on a selectionnée (pour modifier ou supprimer)
    const [selected, setSelected] = useState(null)

    // Mes données qui viennent de Laravel
    const mesDonnees = products.data

    // Fonction pour supprimer quand on est sûr
    const confirmDelete = () => {
        if (!selected || !selected.id) return

        // Je demande a Laravel de supprimer
        router.delete(`/admin/products/${selected.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                // Je ferme la fenetre
                setDeleteOpen(false)
            },
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Catalogue (Admin)" />

            <div className="flex flex-col gap-4 p-4">

                {/* En-tête de la page */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Catalogue des Services</h1>
                    <Button onClick={() => { setSelected(null); setCreateOpen(true) }}>
                        <Plus className="mr-2 h-4 w-4" /> Ajouter un Service
                    </Button>
                </div>

                {/* Le tableau des services */}
                <div className="overflow-x-auto rounded-lg border shadow-sm shadow-black/5 dark:shadow-white/5">
                    <table className="min-w-full divide-y text-sm">
                        <thead className="bg-muted/40">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">Service</th>
                            <th className="px-4 py-3 text-left font-medium">Description</th>
                            <th className="px-4 py-3 text-left font-medium">Tarif (HT)</th>
                            <th className="px-4 py-3 text-left font-medium">tarif jour ou délais de livraison</th>
                            <th className="px-4 py-3 text-right font-medium">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y">
                        {mesDonnees.map((p) => (
                            <tr key={p.id} className="transition-colors hover:bg-muted/30">

                                {/* Nom du service */}
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <Boxes className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">{p.name}</span>
                                    </div>
                                </td>

                                {/* Description (coupee si trop longue) */}
                                <td className="px-4 py-2 text-muted-foreground max-w-[200px] truncate">
                                    {p.description || '-'}
                                </td>

                                {/* Prix */}
                                <td className="px-4 py-2 font-medium">
                                    {Number(p.price).toFixed(2)} €
                                </td>

                                {/* Logique TJM vs Forfait (basée sur la quantité/durée) */}
                                <td className="px-4 py-2">
                                    {p.quantity === 1 ? (
                                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium ring-1 ring-inset ring-blue-700/10">
                                            TJM / Jour
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-medium ring-1 ring-inset ring-purple-700/10">
                                            Forfait ({p.quantity} jours)
                                        </span>
                                    )}
                                </td>

                                {/* Boutons d'action */}
                                <td className="px-4 py-2 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => { setSelected(p); setEditOpen(true) }}>
                                                Modifier
                                            </DropdownMenuItem>
                                            <DropdownMenuItem variant="destructive" onClick={() => { setSelected(p); setDeleteOpen(true) }}>
                                                Supprimer
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* La pagination */}
                <Pagination meta={products.meta} baseUrl="/admin/products" />
            </div>

            {/* --- LES MODALES (Popups) --- */}

            {/* Créer */}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nouveau Service</DialogTitle>
                        <DialogDescription>Ajouter une prestation au catalogue.</DialogDescription>
                    </DialogHeader>
                    <ProductForm onSuccess={() => setCreateOpen(false)} />
                </DialogContent>
            </Dialog>

            {/* Modifier */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Modifier le Service</DialogTitle>
                        <DialogDescription>Changer le tarif, le nom ou la description.</DialogDescription>
                    </DialogHeader>
                    <ProductForm product={selected} onSuccess={() => setEditOpen(false)} />
                </DialogContent>
            </Dialog>

            {/* Supprimer */}
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Supprimer ce service ?</DialogTitle>
                        <DialogDescription>Attention, c'est définitif.</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setDeleteOpen(false)}>Annuler</Button>
                        <Button variant="destructive" onClick={confirmDelete}>Confirmer</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    )
}
