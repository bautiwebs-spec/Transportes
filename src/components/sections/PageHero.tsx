import type { CSSProperties, ReactNode } from 'react'
import { Label, wrap } from '../ui/Label'

/** Encabezado de páginas internas: título claro, bajada breve, entrada sutil. */
export function PageHero({ label, title, lead, aside }: { label: string; title: ReactNode; lead?: ReactNode; aside?: ReactNode }) {
  const i = (n: number) => ({ '--i': n }) as CSSProperties
  return (
    <section className="border-b border-line bg-smoke">
      <div className={`${wrap} pt-16 pb-14 sm:pt-20 lg:pt-24 lg:pb-20`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="enter-text" style={i(0)}>
              <Label>{label}</Label>
            </div>
            <h1 className="enter-text t-display mt-6 text-balance text-graphite" style={i(1)}>
              {title}
            </h1>
            {lead ? (
              <p className="enter-text t-lead mt-6 max-w-2xl text-pretty text-ink-soft" style={i(2)}>
                {lead}
              </p>
            ) : null}
          </div>
          {aside ? (
            <div className="enter-text lg:col-span-4" style={i(3)}>
              {aside}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
