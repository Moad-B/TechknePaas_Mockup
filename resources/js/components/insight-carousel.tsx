import { ArrowRight } from 'lucide-react'
import * as React from 'react'

type InsightItem = {
  id: string
  icon: React.ReactNode
  title: string
  actionLabel?: string
  onAction?: () => void
}

export default function InsightCarousel({ items }: { items: InsightItem[] }) {
  const ref = React.useRef<HTMLDivElement>(null)

  function scrollBy(delta: number): void {
    if (!ref.current) {
      return
    }
    ref.current.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          aria-label="Précédent"
          className="hidden shrink-0 rounded-lg border bg-card px-2 py-2 text-sm text-muted-foreground hover:bg-accent/50 md:block"
          onClick={() => scrollBy(-320)}
        >
          ‹
        </button>

        <div
          ref={ref}
          className="scrollbar-none -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1"
          role="region"
          aria-roledescription="carousel"
          aria-label="Insights"
        >
          {items.map((it) => (
            <article
              key={it.id}
              className="snap-start"
              aria-roledescription="slide"
            >
              <div className="group flex w-[300px] items-center justify-between gap-3 rounded-xl border bg-card p-3 shadow-sm transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg border bg-background/60 text-foreground">
                    {it.icon}
                  </div>
                  <div className="text-sm font-medium">{it.title}</div>
                </div>
                <button
                  type="button"
                  onClick={it.onAction}
                  className="flex items-center gap-1 rounded-md border border-transparent px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-border hover:bg-accent hover:text-foreground"
                >
                  {it.actionLabel ?? 'Analyser'}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          aria-label="Suivant"
          className="hidden shrink-0 rounded-lg border bg-card px-2 py-2 text-sm text-muted-foreground hover:bg-accent/50 md:block"
          onClick={() => scrollBy(320)}
        >
          ›
        </button>
      </div>
    </div>
  )
}
