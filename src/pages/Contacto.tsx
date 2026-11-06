import { contact, fullAddress, whatsappMessages } from '../data/company'
import { usePageMeta } from '../hooks/usePageMeta'
import { whatsappUrl } from '../lib/whatsapp'
import { Container, Eyebrow, Section } from '../components/ui/Layout'
import { Icon, type IconName } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { PendingBadge } from '../components/ui/Pending'
import { WhatsAppButton } from '../components/ui/Button'
import { PageHero } from '../components/sections/PageHero'
import { ContactForm } from '../components/forms/ContactForm'
import { SHOW_PENDING_NOTES } from '../config'

function Channel({
  icon,
  label,
  value,
  href,
  external,
  badge,
}: {
  icon: IconName
  label: string
  value: string
  href?: string
  external?: boolean
  badge?: string
}) {
  const inner = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-mist text-re transition-colors duration-300 group-hover:bg-re-600 group-hover:text-white">
        <Icon name={icon} size={20} />
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-2 text-sm text-ink-mute">
          {label}
          {badge ? <PendingBadge>{badge}</PendingBadge> : null}
        </span>
        <span className="mt-0.5 block font-semibold break-words text-graphite">{value}</span>
      </span>
    </>
  )
  const cls = 'group flex items-start gap-4 py-5'
  return href ? (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  )
}

export function Contacto() {
  usePageMeta(
    'Contacto',
    'Contactá a Transportes RE S.R.L. por WhatsApp o teléfono al 011 2155-3296. Paraguay 1330, El Talar, Buenos Aires. Lunes a viernes de 9 a 18 h.',
  )

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Hablemos."
        lead="Para presupuestos y solicitudes de transporte, escribinos por WhatsApp: es la forma más rápida. Para consultas generales, también podés usar el formulario o el correo."
      />

      <Section tone="smoke" className="pt-14! sm:pt-16! lg:pt-20!">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* ── Canales ── */}
            <div className="space-y-6 lg:col-span-5">
              <Reveal>
                <div className="relative overflow-hidden rounded-2xl bg-graphite p-7 text-white sm:p-9">
                  <p className="t-eyebrow text-re">Canal principal</p>
                  <p className="mt-4 font-display text-2xl font-bold tracking-[-0.02em] sm:text-[1.75rem]">
                    Presupuestos por WhatsApp
                  </p>
                  <p className="mt-3 leading-relaxed text-white/70">
                    Contanos tipo de carga, origen, destino y fecha estimada.
                  </p>
                  <WhatsAppButton message={whatsappMessages.quote} size="lg" className="mt-7 w-full sm:w-auto">
                    Escribir al {contact.phoneDisplay}
                  </WhatsAppButton>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="rounded-2xl border border-line bg-white px-6 sm:px-7">
                  <div className="divide-y divide-line">
                    <Channel icon="whatsapp" label="WhatsApp" value={contact.phoneDisplay} href={whatsappUrl(whatsappMessages.general)} external />
                    <Channel icon="phone" label="Teléfono" value={contact.phoneDisplay} href={`tel:${contact.phoneTel}`} />
                    <Channel
                      icon="mail"
                      label="Correo electrónico"
                      value={contact.email}
                      href={`mailto:${contact.email}`}
                      badge={contact.emailIsProvisional ? 'Provisorio' : undefined}
                    />
                    {contact.instagram ? (
                      <Channel icon="instagram" label="Instagram" value={`@${contact.instagram.user}`} href={contact.instagram.url} external />
                    ) : SHOW_PENDING_NOTES ? (
                      <Channel icon="instagram" label="Instagram" value="Usuario a confirmar" badge="Pendiente" />
                    ) : null}
                    <Channel icon="clock" label="Horario de atención" value={contact.hours} />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── Formulario ── */}
            <Reveal delay={120} className="lg:col-span-7">
              <div className="rounded-[1.5rem] border border-line bg-white p-6 shadow-[0_30px_60px_-45px_rgb(37_45_58/0.4)] sm:p-10">
                <Eyebrow>Formulario de consulta</Eyebrow>
                <h2 className="t-h3 mt-4 text-graphite sm:text-2xl">Dejanos tu mensaje</h2>
                <p className="mt-2 mb-8 text-ink-soft">Para consultas generales. Te respondemos por correo.</p>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Ubicación ── */}
      <Section tone="white" labelledBy="ubicacion" className="py-16! sm:py-20! lg:py-24!">
        <Container>
          <div className="grid items-stretch gap-8 lg:grid-cols-12">
            <Reveal className="flex flex-col justify-between lg:col-span-4">
              <div>
                <Eyebrow>Ubicación</Eyebrow>
                <h2 id="ubicacion" className="t-h2 mt-5 text-graphite">
                  El Talar, Buenos Aires.
                </h2>
                <address className="mt-6 text-lg leading-relaxed not-italic text-ink-soft">
                  {contact.address.street}
                  <br />
                  {contact.address.between}
                  <br />
                  {contact.address.town}, {contact.address.province}
                </address>
              </div>
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 font-semibold text-re-700"
              >
                Abrir en Google Maps
                <Icon name="arrowUpRight" size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>

            {/* Espacio para el mapa (integración pendiente) */}
            <Reveal delay={100} className="lg:col-span-8">
              <div
                role="img"
                aria-label={`Espacio reservado para el mapa de ubicación: ${fullAddress}`}
                className="placeholder-hatch relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-fog lg:h-full lg:min-h-[400px]"
              >
                <svg aria-hidden className="absolute inset-0 h-full w-full text-fog" preserveAspectRatio="none" viewBox="0 0 800 400">
                  <path d="M0 260 C 200 230, 300 300, 520 240 S 760 180, 800 200" stroke="currentColor" strokeWidth="14" fill="none" />
                  <path d="M380 0 L 420 400" stroke="currentColor" strokeWidth="10" fill="none" />
                  <path d="M0 120 L 800 150" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
                <div className="relative flex flex-col items-center gap-3 rounded-2xl bg-white/95 px-7 py-6 text-center shadow-[0_20px_40px_-24px_rgb(37_45_58/0.5)]">
                  <span className="flex size-12 items-center justify-center rounded-full bg-re-600 text-white">
                    <Icon name="pin" size={22} />
                  </span>
                  <p className="font-display font-bold text-graphite">
                    {contact.address.street} · {contact.address.town}
                  </p>
                  {SHOW_PENDING_NOTES ? <PendingBadge>Mapa interactivo pendiente</PendingBadge> : null}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
