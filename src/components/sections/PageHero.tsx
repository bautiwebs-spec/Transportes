import type { ReactNode } from 'react'
import { Label } from '../ui/Label'

/**
 * Encabezado de páginas internas: título grande revelado por líneas en la entrada
 * (misma secuencia CSS que el hero del Inicio) y una columna lateral opcional.
 */
export function PageHero({
  label,
  lines,
  lead,
  aside,
  children,
}: {
  label: string
  lines: ReactNode[]
  lead?: ReactNode
  aside?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-mist pt-[120px] pb-16 sm:pb-20 lg:pt-[170px] lg:pb-24">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="enter-fade" style={{ '--i': -8 } as React.CSSProperties}>
          <Label>{label}</Label>
        </div>
        <div className="mt-8 grid items-end gap-10 lg:grid-cols-12">
          <h1 className="t-display text-graphite lg:col-span-8">
            {lines.map((l, i) => (
              <span key={i} className="enter-line block overflow-hidden pb-[0.08em]" style={{ '--i': i } as React.CSSProperties}>
                <span>{l}</span>
              </span>
            ))}
          </h1>
          {aside ? (
            <div className="enter-fade lg:col-span-4" style={{ '--i': 1 } as React.CSSProperties}>
              {aside}
            </div>
          ) : null}
        </div>
        {lead ? (
          <p className="enter-fade t-lead mt-10 max-w-2xl text-pretty text-ink-soft" style={{ '--i': 0 } as React.CSSProperties}>
            {lead}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  )
}
