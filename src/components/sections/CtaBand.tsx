import type { ReactNode } from 'react'
import { contact } from '../../data/company'
import { Container } from '../ui/Layout'
import { Button, WhatsAppButton } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { AxleMark } from '../ui/AxleMark'
import { Reveal } from '../ui/Reveal'

/**
 * Llamado a la acción comercial. WhatsApp es el canal principal.
 * tone="blue": panel azul institucional (uso puntual). tone="graphite": bloque grafito.
 */
export function CtaBand({
  title,
  text,
  message,
  tone = 'blue',
  background = 'white',
  secondary = 'phone',
}: {
  title: ReactNode
  text: ReactNode
  message: string
  tone?: 'blue' | 'graphite'
  background?: 'white' | 'smoke' | 'mist'
  secondary?: 'phone' | 'contact' | 'none'
}) {
  const bg = { white: 'bg-white', smoke: 'bg-smoke', mist: 'bg-mist' }[background]
  const panel = tone === 'blue' ? 'bg-re-600' : 'bg-graphite'
  return (
    <section className={`${bg} py-16 sm:py-20 lg:py-24`}>
      <Container>
        <Reveal>
          <div className={`relative isolate overflow-hidden rounded-[1.75rem] ${panel} px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-16 lg:py-20`}>
            {/* detalle gráfico: ejes del logo, escalados y muy sutiles */}
            <svg
              aria-hidden
              viewBox="0 0 340 80"
              className="pointer-events-none absolute -right-10 -bottom-10 -z-10 hidden w-[480px] max-w-[90%] text-white/[0.07] sm:block"
              fill="currentColor"
            >
              <circle cx="40" cy="40" r="32" />
              <circle cx="140" cy="40" r="32" />
              <circle cx="210" cy="40" r="32" />
              <circle cx="280" cy="40" r="32" />
            </svg>
            <div className="grid items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <AxleMark className={tone === 'blue' ? 'text-white/80' : 'text-re'} />
                <h2 className="t-h2 mt-6 text-balance text-white">{title}</h2>
                <p className="t-lead mt-5 max-w-xl text-pretty text-white/80">{text}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
                <WhatsAppButton message={message} size="lg" variant="light" className="text-re-700!" />
                {secondary === 'phone' ? (
                  <Button href={`tel:${contact.phoneTel}`} variant="outline-light" size="lg" icon="phone">
                    {contact.phoneDisplay}
                  </Button>
                ) : null}
                {secondary === 'contact' ? (
                  <Button to="/contacto" variant="outline-light" size="lg" iconRight="arrowRight">
                    Otros canales
                  </Button>
                ) : null}
              </div>
            </div>
            <p className="mt-10 flex items-center gap-2 border-t border-white/15 pt-6 text-sm text-white/70">
              <Icon name="clock" size={16} /> Atención {contact.hours.toLowerCase()}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
