import { contact, whatsappMessages } from '../data/company'
import { faqs } from '../data/faqs'
import { usePageMeta } from '../hooks/usePageMeta'
import { whatsappUrl } from '../lib/whatsapp'
import { Accordion } from '../components/ui/Accordion'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/motion/Reveal'
import { PageHero } from '../components/sections/PageHero'
import { CtaBand } from '../components/sections/CtaBand'

const wrap = 'mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10'

export function PreguntasFrecuentes() {
  usePageMeta(
    'Preguntas frecuentes',
    'Respuestas sobre Transportes RE S.R.L.: tipo de cargas, zonas de trabajo, flota propia, presupuestos y canales de contacto.',
  )

  return (
    <>
      <PageHero
        label="Preguntas frecuentes"
        lines={['Respuestas claras,', <>antes de <span className="t-accent text-re">tu consulta.</span></>]}
        lead="Reunimos las preguntas más habituales sobre nuestro trabajo. Si no encontrás lo que buscás, escribinos."
      />

      <section aria-label="Preguntas y respuestas" className="bg-smoke py-16 sm:py-24 lg:py-28">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p aria-hidden className="numeral-outline text-[clamp(6rem,12vw,11rem)] text-re">
                  {String(faqs.length).padStart(2, '0')}
                </p>
                <p className="t-label mt-4 text-ink-soft">preguntas frecuentes</p>
              </Reveal>
              <Reveal delay={100} className="mt-10 rounded-2xl bg-graphite p-7 text-white sm:p-8">
                <p className="font-display text-xl font-bold tracking-[-0.015em] [font-stretch:104%]">¿Preferís consultarnos directamente?</p>
                <p className="mt-3 leading-relaxed text-white/65">WhatsApp es el canal más rápido para presupuestos y solicitudes de transporte.</p>
                <ul className="mt-6 space-y-3 text-[0.95rem]">
                  <li>
                    <a href={whatsappUrl(whatsappMessages.faq)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold text-white">
                      <Icon name="whatsapp" size={18} className="text-re" /> <span className="link-u">{contact.phoneDisplay}</span>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all text-white/85">
                      <Icon name="mail" size={18} className="shrink-0 text-re" /> <span className="link-u">{contact.email}</span>
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-white/65">
                    <Icon name="clock" size={18} className="text-re" /> {contact.hoursShort}
                  </li>
                </ul>
              </Reveal>
            </div>
          </aside>
          <Reveal delay={80} className="lg:col-span-8">
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        tone="light"
        label="¿Te quedó alguna duda?"
        lines={['Escribinos', <>y lo <span className="t-accent text-re">conversamos.</span></>]}
        text="Si tu pregunta no está acá, escribinos por WhatsApp y te respondemos de manera directa."
        message={whatsappMessages.faq}
        secondary="contact"
      />
    </>
  )
}
