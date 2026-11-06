import type { ReactNode } from 'react'
import { contact } from '../../data/company'
import { Button, WhatsAppButton } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Label } from '../ui/Label'
import { Reveal, RevealLines } from '../motion/Reveal'
import { ExpandSection } from '../motion/ExpandSection'

/**
 * Cierre comercial de página. WhatsApp siempre es la acción principal.
 * tone="light": composición tipográfica sobre fondo claro.
 * tone="blue": bloque azul institucional que se expande con el scroll (uso puntual).
 */
export function CtaBand({
  lines,
  text,
  message,
  tone = 'light',
  secondary = 'phone',
  label = 'Hablemos',
}: {
  lines: ReactNode[]
  text: ReactNode
  message: string
  tone?: 'light' | 'blue'
  secondary?: 'phone' | 'contact' | 'none'
  label?: string
}) {
  const light = tone === 'light'
  const content = (
    <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10">
      <Label light={!light}>{label}</Label>
      <RevealLines className={`t-display mt-8 ${light ? 'text-graphite' : 'text-white'}`} lines={lines} />
      <Reveal
        delay={150}
        className={`mt-12 grid gap-10 border-t pt-10 lg:grid-cols-12 lg:items-center ${light ? 'border-line' : 'border-white/20'}`}
      >
        <p className={`t-lead max-w-xl text-pretty lg:col-span-6 ${light ? 'text-ink-soft' : 'text-white/80'}`}>{text}</p>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
          <WhatsAppButton message={message} size="lg" variant={light ? 'primary' : 'light'} />
          {secondary === 'phone' ? (
            <Button href={`tel:${contact.phoneTel}`} variant={light ? 'secondary' : 'outline-light'} size="lg" icon="phone">
              {contact.phoneDisplay}
            </Button>
          ) : null}
          {secondary === 'contact' ? (
            <Button to="/contacto" variant={light ? 'secondary' : 'outline-light'} size="lg" arrow>
              Otros canales
            </Button>
          ) : null}
        </div>
      </Reveal>
      <p className={`mt-8 flex items-center gap-2 text-sm ${light ? 'text-ink-mute' : 'text-white/65'}`}>
        <Icon name="clock" size={16} /> Atención {contact.hours.toLowerCase()}
      </p>
    </div>
  )
  return light ? (
    <section className="bg-smoke py-24 sm:py-32 lg:py-40">{content}</section>
  ) : (
    <ExpandSection tone="blue" className="py-24 sm:py-32 lg:py-36">
      {content}
    </ExpandSection>
  )
}
