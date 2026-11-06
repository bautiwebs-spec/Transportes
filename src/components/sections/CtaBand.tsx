import type { ReactNode } from 'react'
import { contact } from '../../data/company'
import { Button, WhatsAppButton } from '../ui/Button'
import { Label, wrap } from '../ui/Label'
import { Reveal } from '../motion/Reveal'

/**
 * Cierre comercial: un único bloque grafito por página, sobrio.
 * WhatsApp es la acción principal; teléfono u "otros canales" como secundaria.
 */
export function CtaBand({
  title,
  text,
  message,
  label = 'Contacto',
  secondary = 'phone',
}: {
  title: ReactNode
  text: ReactNode
  message: string
  label?: string
  secondary?: 'phone' | 'contact'
}) {
  return (
    <section className="bg-graphite text-white">
      <div className={`${wrap} py-20 sm:py-24 lg:py-28`}>
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Label light>{label}</Label>
            <h2 className="t-h2 mt-5 text-balance">{title}</h2>
            <p className="t-lead mt-5 max-w-xl text-pretty text-white/70">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <WhatsAppButton message={message} size="lg" />
            {secondary === 'phone' ? (
              <Button href={`tel:${contact.phoneTel}`} variant="outline-light" size="lg" icon="phone">
                {contact.phoneDisplay}
              </Button>
            ) : (
              <Button to="/contacto" variant="outline-light" size="lg" arrow>
                Otros canales
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
