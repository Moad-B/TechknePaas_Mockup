// resources/js/pages/admin/users/partials/user-form.tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useForm } from '@inertiajs/react'
import { useMemo } from 'react'
import { ChevronDown } from 'lucide-react'

export interface UserDto {
    id: number
    name: string
    email: string
    roles?: { id: number; name: string }[]
}

export default function UserForm({
                                     user,
                                     rolesAvailable = [],
                                     onSuccess,
                                 }: {
    user?: UserDto
    rolesAvailable?: { id: number; name: string }[]
    onSuccess?: () => void
}) {
    const isEdit = Boolean(user?.id)
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '', // vide = pas de changement côté backend
        role_ids: (user?.roles ?? []).map(r => r.id) as number[],
    })

    const selectedRoles = useMemo(() => {
      const ids = Array.isArray(data.role_ids) ? data.role_ids : []
      const map = new Map(rolesAvailable.map(r => [r.id, r.name]))
      return ids.map(id => ({ id, name: map.get(id) ?? String(id) }))
    }, [data.role_ids, rolesAvailable])

    function toggleRole(id: number, checked: boolean | 'indeterminate') {
      setData(prev => {
        const current: number[] = Array.isArray(prev.role_ids) ? [...prev.role_ids] : []
        const has = current.includes(id)
        if (checked && !has) {
          current.push(id)
        }
        if (!checked && has) {
          return { ...prev, role_ids: current.filter(x => x !== id) }
        }
        return { ...prev, role_ids: current }
      })
    }

    function submit(e: React.FormEvent) {
        e.preventDefault()
        clearErrors()

        if (isEdit && user) {
            put(`/admin/users/${user.id}`, { onSuccess })
            return
        }

        post(`/admin/users`, {
            onSuccess: () => {
                reset('name', 'email', 'password')
                onSuccess?.()
            },
        })
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Nom</label>
                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Mot de passe {isEdit && <span className="text-muted-foreground">(laisser vide pour ne pas changer)</span>}</label>
                <Input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>

            {/* Roles selector */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Rôles</label>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button type="button" variant="outline" className="flex items-center gap-2">
                            {selectedRoles.length === 0 && <span className="text-muted-foreground">Aucun rôle</span>}
                            {selectedRoles.length > 0 && (
                              <div className="flex flex-wrap items-center gap-1">
                                {selectedRoles.slice(0, 2).map(r => (
                                  <Badge key={r.id} variant="secondary">{r.name}</Badge>
                                ))}
                                {selectedRoles.length > 2 && (
                                  <Badge variant="outline">+{selectedRoles.length - 2}</Badge>
                                )}
                              </div>
                            )}
                            <ChevronDown className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuLabel>Sélectionner des rôles</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {rolesAvailable.map(role => {
                          const checked = Array.isArray(data.role_ids) && data.role_ids.includes(role.id)
                          return (
                            <DropdownMenuCheckboxItem
                              key={role.id}
                              checked={checked}
                              onCheckedChange={(c) => toggleRole(role.id, Boolean(c))}
                            >
                              {role.name}
                            </DropdownMenuCheckboxItem>
                          )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
                {errors.role_ids && <p className="text-sm text-destructive">{String(errors.role_ids)}</p>}
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>{isEdit ? 'Enregistrer' : 'Créer'}</Button>
            </div>
        </form>
    )
}
