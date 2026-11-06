import { contact, whatsappMessages } from '../data/company'
import { faqs } from '../data/faqs'
import { usePageMeta } from '../hooks/usePageMeta'
import { whatsappUrl } from '../lib/whatsapp'
import { Container, Section } from '../components/ui/Layout'
import { Accordion } from '../components/ui/Accordion'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { PageHero } from '../components/sections/PageHero'
import { CtaBand } from '../components/sections/CtaBand'

export function PreguntasFrecuentes() {
  usePageMeta(
    'Preguntas frecuentes',
    'Respuestas sobre Transportes RE S.R.L.: tipo de cargas, zonas de trabajo, flota propia, presupuestos y canales de contacto.',
  )

  return (
    <>
      <PageHero
        eyebrow="Preguntas frecuentes"
        title="Respuestas claras, antes de tu consulta."
        lead="Reunimos las preguntas más habituales sobre nuestro trabajo. Si no encontrás lo que buscás, escribinos."
      />

      <Section tone="white" className="pt-14! sm:pt-16! lg:pt-20!">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-4">
              <Reveal className="lg:sticky lg:top-28">
                <div className="rounded-2xl bg-mist p-7 sm:p-8">
                  <p className="font-display text-xl font-bold tracking-[-0.015em] text-graphite">¿Preferís consultarnos directamente?</p>
                  <p className="mt-3 leading-relaxed text-ink-soft">
                    WhatsApp es el canal más rápido para presupuestos y solicitudes de transporte.
                  </p>
                  <ul className="mt-6 space-y-3 text-[0.95rem]">
                    <li>
                      <a
                        href={whatsappUrl(whatsappMessages.faq)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 font-semibold text-re-700 hover:text-re"
                      >
                        <Icon name="whatsapp" size={18} /> {contact.phoneDisplay}
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all text-graphite hover:text-re-700">
                        <Icon name="mail" size={18} className="shrink-0 text-re" /> {contact.email}
                      </a>
                    </li>
                    <li className="flex items-center gap-3 text-ink-soft">
                      <Icon name="clock" size={18} className="text-re" /> {contact.hoursShort}
                    </li>
                  </ul>
                </div>
              </Reveal>
            </aside>
            <Reveal delay={80} className="lg:col-span-8">
              <Accordion items={faqs} />
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="¿Te quedó alguna duda?"
        text="Escribinos por WhatsApp y te respondemos de manera directa."
        message={whatsappMessages.faq}
        tone="blue"
        background="white"
        secondary="contact"
      />
    </>
  )
}
