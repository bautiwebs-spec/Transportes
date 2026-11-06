import { useId, useState } from 'react'

export type AccordionItem = { q: string; a: string }

/**
 * Acordeón accesible (botón con aria-expanded/aria-controls, navegable con teclado).
 * Apertura fluida por grid-rows; el indicador pasa de + a − y la fila abierta se destaca.
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
            className={`relative border-b border-graphite/15 transition-colors duration-500 ${isOpen ? 'bg-white' : ''}`}
          >
            <span
              aria-hidden
              className={`absolute top-0 left-0 h-full w-[3px] origin-top bg-re transition-transform duration-700 ease-out-soft ${isOpen ? 'scale-y-100' : 'scale-y-0'}`}
            />
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center gap-5 px-4 py-6 text-left sm:gap-8 sm:px-6 sm:py-8"
              >
                <span className={`w-7 shrink-0 font-display text-sm font-bold transition-colors duration-500 ${isOpen ? 'text-re' : 'text-ink-mute'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`flex-1 font-display text-[1.15rem] leading-snug font-bold tracking-[-0.02em] [font-stretch:104%] transition-[color,transform] duration-500 ease-out-soft sm:text-[1.45rem] ${
                    isOpen ? 'text-graphite' : 'text-graphite group-hover:translate-x-1.5 group-hover:text-re-700'
                  }`}
                >
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={`relative flex size-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                    isOpen ? 'border-re-600 bg-re-600 text-white' : 'border-graphite/20 text-graphite group-hover:border-graphite'
                  }`}
                >
                  <span className="absolute h-[2px] w-4 rounded bg-current" />
                  <span
                    className={`absolute h-4 w-[2px] rounded bg-current transition-transform duration-500 ease-out-soft ${isOpen ? 'scale-y-0 rotate-90' : ''}`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-[grid-template-rows,opacity] duration-600 ease-out-soft ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
              {...(!isOpen ? ({ inert: '' } as Record<string, string>) : {})}
            >
              <div className="overflow-hidden">
                <p
                  className={`max-w-2xl pr-6 pb-8 pl-16 text-[1.05rem] leading-relaxed text-ink-soft transition-transform duration-700 ease-out-soft sm:pl-[5.5rem] ${
                    isOpen ? 'translate-y-0' : '-translate-y-2'
                  }`}
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
