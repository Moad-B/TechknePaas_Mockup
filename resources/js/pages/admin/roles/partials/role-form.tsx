import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export interface PermissionDto {
    id: number;
    name: string;
}

export interface RoleDto {
    id: number;
    name: string;
    permission_ids?: number[];
    users_count?: number;
}

interface RoleFormProps {
    role?: RoleDto | null;
    permissions: PermissionDto[];
    className?: string;
    onSuccess?: () => void;
}

export default function RoleForm({ role, permissions, className, onSuccess }: RoleFormProps) {
    const isEdit = Boolean(role?.id);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: role?.name ?? '',
        permission_ids: (role?.permission_ids ?? []) as number[],
    });

    useEffect(() => {
        // Recalibrage safe des données quand on change de rôle
        setData((prev) => ({
            ...prev,
            name: role?.name ?? '',
            permission_ids: Array.isArray(role?.permission_ids) ? role!.permission_ids! : [],
        }));
        clearErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role?.id]);

    function togglePermission(id: number, checked: boolean | 'indeterminate') {
        setData((prev) => {
            const current = Array.isArray(prev.permission_ids) ? prev.permission_ids : [];
            const set = new Set<number>(current);
            if (checked) {
                set.add(id);
            } else {
                set.delete(id);
            }
            return { ...prev, permission_ids: Array.from(set) };
        });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        clearErrors();

        if (isEdit && role) {
            put(`/admin/roles/${role.id}`, {
                onSuccess: () => onSuccess?.(),
            });
            return;
        }

        post('/admin/roles', {
            onSuccess: () => {
                reset('name');
                setData((prev) => ({ ...prev, permission_ids: [] }));
                onSuccess?.();
            },
        });
    }

    const permissionIds = Array.isArray(data.permission_ids) ? data.permission_ids : [];

    return (
        <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
            {/* Champ Nom */}
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Nom du rôle</label>
                <Input
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            {/* Permissions */}
            <div className="space-y-2">
                <div className="text-sm font-medium">Permissions</div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {permissions.map((perm) => {
                        const checked = permissionIds.includes(perm.id);
                        return (
                            <label key={perm.id} className="flex items-center gap-2 rounded-md border p-2">
                                <Checkbox
                                    checked={checked}
                                    onCheckedChange={(c) => togglePermission(perm.id, Boolean(c))}
                                />
                                <span className="text-sm">{perm.name}</span>
                            </label>
                        );
                    })}
                </div>
                {errors.permission_ids && (
                    <p className="text-sm text-destructive">{errors.permission_ids as unknown as string}</p>
                )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
                <Button type="submit" disabled={processing}>
                    {processing ? (isEdit ? 'Enregistrement...' : 'Création...') : isEdit ? 'Enregistrer' : 'Créer'}
                </Button>
            </div>
        </form>
    );
}
