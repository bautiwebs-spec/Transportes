import { useId, useState } from 'react'

export type AccordionItem = { q: string; a: string }

/**
 * Acordeón accesible (botón con aria-expanded/aria-controls, navegable con teclado).
 * Apertura suave por grid-rows; el indicador pasa de + a −.
 */
export function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  const uid = useId()

  return (
    <div className="border-t border-graphite/15">
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `${uid}-b${i}`
        const panelId = `${uid}-p${i}`
        return (
          <div
            key={item.q}
            className={`relative border-b border-graphite/15 transition-colors duration-300 ${isOpen ? 'bg-smoke' : ''}`}
          >
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center gap-6 px-4 py-6 text-left sm:px-6"
              >
                <span
                  className={`flex-1 font-display text-[1.08rem] leading-snug font-semibold tracking-[-0.01em] transition-colors duration-300 sm:text-[1.2rem] ${
                    isOpen ? 'text-graphite' : 'text-graphite group-hover:text-re-700'
                  }`}
                >
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={`relative flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                    isOpen ? 'border-graphite text-graphite' : 'border-graphite/20 text-graphite group-hover:border-graphite/60'
                  }`}
                >
                  <span className="absolute h-[2px] w-4 rounded bg-current" />
                  <span
                    className={`absolute h-4 w-[2px] rounded bg-current transition-transform duration-300 ${isOpen ? 'scale-y-0' : ''}`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out-soft ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
              {...(!isOpen ? ({ inert: '' } as Record<string, string>) : {})}
            >
              <div className="overflow-hidden">
                <p
                  className="max-w-2xl px-4 pb-7 text-[1.02rem] leading-relaxed text-ink-soft sm:px-6"
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
