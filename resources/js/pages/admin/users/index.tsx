// resources/js/pages/admin/users/index.tsx
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, router } from '@inertiajs/react'
import { Info, MoreHorizontal, Plus, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import Pagination, { type PaginatorMeta } from '@/components/pagination'
import UserForm, { type UserDto } from './partials/user-form'

interface IndexProps {
    users: { data: UserDto[]; meta: PaginatorMeta }
    rolesAvailable: { id: number; name: string }[]
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Administration', href: '/admin' },
    { title: 'Users', href: '/admin/users' },
]

export default function UsersIndex({ users, rolesAvailable = [] }: IndexProps) {
    const [createOpen, setCreateOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [selected, setSelected] = useState<UserDto | null>(null)

    const sortedUsers = useMemo(() => {
        return [...(users?.data ?? [])].sort((a, b) => a.name.localeCompare(b.name))
    }, [users])

    const openCreate = () => {
        setSelected(null)
        setCreateOpen(true)
    }

    const openEdit = (u: UserDto) => {
        setSelected(u)
        setEditOpen(true)
    }

    const openDelete = (u: UserDto) => {
        setSelected(u)
        setDeleteOpen(true)
    }

    const confirmDelete = () => {
        if (!selected?.id) return
        router.delete(`/admin/users/${selected.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeleteOpen(false),
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des Users" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Users</h1>
                    <Button onClick={openCreate}>
                        <Plus className="mr-2 h-4 w-4" /> Créer un User
                    </Button>
                </div>

                <div className="overflow-x-auto rounded-lg border shadow-sm shadow-black/5 dark:shadow-white/5">
                    <table className="min-w-full divide-y text-sm">
                        <thead className="bg-muted/40">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">Nom</th>
                            <th className="px-4 py-3 text-left font-medium">Email</th>
                            <th className="px-4 py-3 text-left font-medium">Rôle(s)</th>
                            <th className="px-4 py-3 text-right font-medium">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y">
                        {sortedUsers.map((u) => (
                            <tr key={u.id} className="transition-colors hover:bg-muted/30">
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <UserRound className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">{u.name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-muted-foreground">{u.email}</td>
                                <td className="px-4 py-2">
                                    {(() => {
                                      const roles = u.roles ?? []
                                      if (roles.length === 0) {
                                        return <span className="text-muted-foreground text-xs">Aucun</span>
                                      }
                                      if (roles.length === 1) {
                                        return <Badge variant="secondary">{roles[0].name}</Badge>
                                      }
                                      const extra = roles.length - 1
                                      return (
                                        <div className="flex items-center gap-2">
                                          <Badge variant="secondary">{roles[0].name}</Badge>
                                          <Badge variant="outline">+{extra}</Badge>
                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <span className="inline-flex items-center justify-center rounded-full border p-1 text-xs text-muted-foreground">
                                                  <Info className="h-3.5 w-3.5" />
                                                </span>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <div className="flex max-w-xs flex-col gap-1">
                                                  {roles.map(r => (
                                                    <span key={r.id} className="text-xs">{r.name}</span>
                                                  ))}
                                                </div>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        </div>
                                      )
                                    })()}
                                </td>
                                <td className="px-4 py-2 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => openEdit(u)}>Modifier</DropdownMenuItem>
                                            <DropdownMenuItem variant="destructive" onClick={() => openDelete(u)}>
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

                <Pagination meta={users.meta} baseUrl="/admin/users" />
            </div>

            {/* Create */}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Créer un User</DialogTitle>
                        <DialogDescription>Renseigne les informations de l’utilisateur.</DialogDescription>
                    </DialogHeader>
                    <UserForm rolesAvailable={rolesAvailable} onSuccess={() => setCreateOpen(false)} />
                </DialogContent>
            </Dialog>

            {/* Edit */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Modifier</DialogTitle>
                        <DialogDescription>Met à jour les informations de l’utilisateur.</DialogDescription>
                    </DialogHeader>
                    <UserForm user={selected ?? undefined} rolesAvailable={rolesAvailable} onSuccess={() => setEditOpen(false)} />
                </DialogContent>
            </Dialog>

            {/* Delete */}
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Supprimer le User</DialogTitle>
                        <DialogDescription>Action irréversible.</DialogDescription>
                    </DialogHeader>
                    <p>
                        Supprimer l’utilisateur{selected ? ` « ${selected.name} »` : ''} ? Cette action est irréversible.
                    </p>
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setDeleteOpen(false)}>
                            Annuler
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Supprimer
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    )
}
