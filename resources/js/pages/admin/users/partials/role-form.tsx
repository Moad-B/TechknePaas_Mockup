import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from '@inertiajs/react'

export interface UserDto {
    id: number
    name: string
    email: string
}

export default function UserForm({
                                     user,
                                     onSuccess,
                                 }: {
    user?: UserDto
    onSuccess?: () => void
}) {
    const isEdit = Boolean(user?.id)
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '', // vide = pas de changement côté backend
    })

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
            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>{isEdit ? 'Enregistrer' : 'Créer'}</Button>
            </div>
        </form>
    )
}
