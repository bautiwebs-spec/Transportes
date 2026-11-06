import type { ReactNode } from 'react'
import { Container, Eyebrow } from '../ui/Layout'
import { Reveal } from '../ui/Reveal'

/** Encabezado de páginas internas. Fondo gris azulado suave, nunca oscuro. */
export function PageHero({
  eyebrow,
  title,
  lead,
  aside,
  className = '',
}: {
  eyebrow: ReactNode
  title: ReactNode
  lead?: ReactNode
  aside?: ReactNode
  className?: string
}) {
  return (
    <section className={`relative overflow-hidden bg-mist pt-[calc(76px+3.5rem)] pb-16 sm:pb-20 lg:pt-[calc(88px+5rem)] lg:pb-24 ${className}`}>
      <Container className="relative">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="t-display mt-6 text-balance text-graphite">{title}</h1>
            {lead ? <p className="t-lead mt-7 max-w-2xl text-pretty text-ink-soft">{lead}</p> : null}
          </Reveal>
          {aside ? (
            <Reveal delay={120} className="lg:col-span-5">
              {aside}
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
