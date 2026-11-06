import { contact, whatsappMessages } from '../data/company'
import { faqs } from '../data/faqs'
import { usePageMeta } from '../hooks/usePageMeta'
import { Accordion } from '../components/ui/Accordion'
import { Icon } from '../components/ui/Icon'
import { Label, wrap } from '../components/ui/Label'
import { Button, WhatsAppButton } from '../components/ui/Button'
import { PageHero } from '../components/sections/PageHero'

export function PreguntasFrecuentes() {
  usePageMeta(
    'Preguntas frecuentes',
    'Respuestas sobre Transportes RE S.R.L.: tipo de cargas, zonas de trabajo, flota propia, presupuestos y canales de contacto.',
  )

  return (
    <>
      <PageHero
        label="Preguntas frecuentes"
        title="Preguntas frecuentes"
        lead="Las consultas más habituales sobre nuestro trabajo. Si no encontrás lo que buscás, escribinos."
      />

      <section aria-label="Preguntas y respuestas" className="bg-white py-20 sm:py-24 lg:py-28">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-8 lg:order-2">
            <Accordion items={faqs} />
          </div>
          <aside className="lg:col-span-4 lg:order-1">
            <div className="rounded-2xl bg-mist p-7 lg:sticky lg:top-28">
              <Label>Consultas</Label>
              <p className="mt-4 font-display text-xl font-semibold tracking-[-0.01em] text-graphite">¿No encontrás tu respuesta?</p>
              <p className="mt-3 leading-relaxed text-ink-soft">Escribinos por WhatsApp y te respondemos de manera directa.</p>
              <WhatsAppButton message={whatsappMessages.faq} className="mt-6 w-full" />
              <ul className="mt-6 space-y-2.5 border-t border-fog pt-6 text-sm text-ink-soft">
                <li className="flex items-center gap-2.5">
                  <Icon name="phone" size={16} className="text-re" /> {contact.phoneDisplay}
                </li>
                <li className="flex items-center gap-2.5 break-all">
                  <Icon name="mail" size={16} className="shrink-0 text-re" /> {contact.email}
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon name="clock" size={16} className="text-re" /> {contact.hoursShort}
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Cierre breve */}
      <section className="border-t border-line bg-smoke">
        <div className={`${wrap} flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between`}>
          <p className="font-display text-[1.4rem] font-semibold tracking-[-0.015em] text-graphite">¿Te quedó alguna duda?</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton message={whatsappMessages.faq} />
            <Button to="/contacto" variant="secondary" arrow>
              Otros canales
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
