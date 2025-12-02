import { router } from '@inertiajs/react'
import { cn } from '@/lib/utils'

export interface PaginatorMeta {
    current_page: number
    last_page: number
    per_page: number
    total: number
}

export default function Pagination({
                                       meta,
                                       baseUrl,
                                       className,
                                   }: {
    meta: PaginatorMeta
    baseUrl: string // e.g. '/admin/users'
    className?: string
}) {
    if (!meta || meta.last_page <= 1) {
        return null
    }

    const { current_page, last_page } = meta
    const go = (page: number) => {
        router.get(`${baseUrl}?page=${page}`, {}, { preserveScroll: true, preserveState: true })
    }

    // Pages à afficher (simple: 1..last_page). Pour large last_page, on peut tronquer.
    const pages = Array.from({ length: last_page }, (_, i) => i + 1)

    return (
        <div className={cn(
            'mt-4 flex items-center justify-center gap-2 animate-in fade-in-0 duration-200',
            className,
        )}>
            {/* Flèche gauche */}
            <button
                type="button"
                onClick={() => go(Math.max(1, current_page - 1))}
                className="rounded-md border px-3 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
                aria-label="Page précédente"
                disabled={current_page === 1}
            >
                « {Math.max(1, current_page - 1)}
            </button>

            {/* Pages */}
            {pages.map((p) => (
                <button
                    key={p}
                    type="button"
                    onClick={() => go(p)}
                    className={cn(
                        'rounded-md border px-3 py-1 text-sm transition-colors',
                        p === current_page
                            ? 'bg-primary text-primary-foreground shadow'
                            : 'hover:bg-accent hover:text-accent-foreground',
                    )}
                    aria-current={p === current_page ? 'page' : undefined}
                >
                    {p}
                </button>
            ))}

            {/* Flèche droite */}
            <button
                type="button"
                onClick={() => go(Math.min(last_page, current_page + 1))}
                className="rounded-md border px-3 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
                aria-label="Page suivante"
                disabled={current_page === last_page}
            >
                {Math.min(last_page, current_page + 1)} »
            </button>
        </div>
    )
}
