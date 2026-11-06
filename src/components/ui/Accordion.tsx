import { useId, useState } from 'react'
import { Icon } from './Icon'

export type AccordionItem = { q: string; a: string }

/** Acordeón accesible (botones con aria-expanded / aria-controls) con apertura fluida. */
export function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  const uid = useId()

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `${uid}-b${i}`
        const panelId = `${uid}-p${i}`
        return (
          <div key={item.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
              >
                <span
                  className={`font-display text-[1.075rem] font-bold tracking-[-0.015em] transition-colors duration-300 sm:text-xl ${
                    isOpen ? 'text-re-700' : 'text-graphite group-hover:text-re-700'
                  }`}
                >
                  {item.q}
                </span>
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ease-out-soft ${
                    isOpen
                      ? 'rotate-45 border-re-600 bg-re-600 text-white'
                      : 'border-graphite/15 text-graphite group-hover:border-re/50'
                  }`}
                >
                  <Icon name="plus" size={18} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out-soft ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
              {...(!isOpen ? ({ inert: '' } as Record<string, string>) : {})}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-7 pr-14 text-[1.02rem] leading-relaxed text-ink-soft">{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
