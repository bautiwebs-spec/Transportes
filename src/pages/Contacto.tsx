import type { CSSProperties } from 'react'
import { contact, fullAddress, whatsappMessages } from '../data/company'
import { usePageMeta } from '../hooks/usePageMeta'
import { whatsappUrl } from '../lib/whatsapp'
import { SHOW_PENDING_NOTES } from '../config'
import { Icon, type IconName } from '../components/ui/Icon'
import { Label } from '../components/ui/Label'
import { PendingBadge } from '../components/ui/Pending'
import { ArrowSwap, TextLink } from '../components/ui/Button'
import { Reveal, RevealLines } from '../components/motion/Reveal'
import { ContactForm } from '../components/forms/ContactForm'

const wrap = 'mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10'

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
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-mist text-re transition-colors duration-500 group-hover/btn:bg-re-600 group-hover/btn:text-white group-focus-visible/btn:bg-re-600 group-focus-visible/btn:text-white">
        <Icon name={icon} size={19} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2 text-sm text-ink-mute">
          {label}
          {badge ? <PendingBadge>{badge}</PendingBadge> : null}
        </span>
        <span className="mt-0.5 block font-semibold break-words text-graphite">{value}</span>
      </span>
      {href ? (
        <span className="text-graphite">
          <ArrowSwap name={external ? 'arrowUpRight' : 'arrowRight'} />
        </span>
      ) : null}
    </>
  )
  const cls = 'group/btn flex items-center gap-4 border-b border-graphite/12 py-5 transition-[padding] duration-500 ease-out-soft'
  return href ? (
    <a href={href} className={`${cls} hover:pl-2 focus-visible:pl-2`} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
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
  const line = (i: number) => ({ '--i': i }) as CSSProperties

  return (
    <>
      {/* Hero: el número de WhatsApp es la acción principal, en tipografía grande */}
      <section className="relative overflow-hidden bg-mist pt-[120px] pb-16 lg:pt-[170px] lg:pb-24">
        <div className={wrap}>
          <div className="enter-fade" style={line(-8)}>
            <Label>Contacto</Label>
          </div>
          <h1 className="t-mega mt-8 text-graphite">
            <span className="enter-line block overflow-hidden pb-[0.1em]" style={line(0)}>
              <span>
                Hablemos<span className="t-accent text-re">.</span>
              </span>
            </span>
          </h1>
          <div className="enter-fade mt-10 grid gap-8 border-t border-fog pt-10 lg:grid-cols-12 lg:items-end" style={line(1)}>
            <p className="t-lead max-w-md text-pretty text-ink-soft lg:col-span-5">
              Para presupuestos y solicitudes de transporte, WhatsApp es la forma más rápida. Para consultas generales,
              también podés usar el formulario o el correo.
            </p>
            <a
              href={whatsappUrl(whatsappMessages.quote)}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn lg:col-span-7 lg:justify-self-end"
            >
              <span className="t-label flex items-center gap-2 text-re-700">
                <Icon name="whatsapp" size={16} /> Escribinos por WhatsApp
              </span>
              <span className="mt-2 flex items-center gap-4 whitespace-nowrap font-display text-[clamp(1.9rem,0.9rem+4vw,4.4rem)] leading-none font-extrabold tracking-[-0.045em] text-graphite [font-stretch:112%]">
                <span className="link-u transition-colors duration-500 group-hover/btn:text-re-700">{contact.phoneDisplay}</span>
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-re-600 text-white transition-colors duration-500 group-hover/btn:bg-graphite sm:size-16">
                  <ArrowSwap size={24} name="arrowUpRight" />
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Canales + formulario */}
      <section aria-label="Canales y formulario" className="bg-smoke py-20 sm:py-28 lg:py-32">
        <div className={`${wrap} grid gap-14 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="t-h3 text-graphite">Canales de contacto</h2>
              <div className="mt-6 border-t border-graphite/12">
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
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="rounded-[1.75rem] border border-line bg-white p-6 shadow-[0_40px_80px_-60px_rgb(37_45_58/0.5)] sm:p-10">
              <Label>Formulario de consulta</Label>
              <h2 className="t-h2 mt-5 text-graphite">
                Dejanos tu <span className="t-accent text-re">mensaje.</span>
              </h2>
              <p className="mt-3 mb-9 text-ink-soft">Para consultas generales. Te respondemos por correo.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ubicación */}
      <section aria-labelledby="ubicacion" className="bg-white py-20 sm:py-28 lg:py-32">
        <div className={`${wrap} grid items-stretch gap-10 lg:grid-cols-12`}>
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <Label>Ubicación</Label>
              <RevealLines id="ubicacion" className="t-display mt-6 text-graphite" lines={['El Talar,', <span className="t-accent text-re">Buenos Aires.</span>]} />
              <Reveal delay={100}>
                <address className="mt-8 text-lg leading-relaxed text-ink-soft not-italic">
                  {contact.address.street}
                  <br />
                  {contact.address.between}
                  <br />
                  {contact.address.town}, {contact.address.province}
                </address>
              </Reveal>
            </div>
            <Reveal variant="fade" delay={200} className="mt-8">
              <TextLink href={contact.mapsUrl} external className="text-re-700">
                Abrir en Google Maps
              </TextLink>
            </Reveal>
          </div>

          {/* Espacio para el mapa (integración pendiente) */}
          <Reveal variant="mask" className="lg:col-span-7">
            <div
              role="img"
              aria-label={`Espacio reservado para el mapa de ubicación: ${fullAddress}`}
              className="placeholder-hatch relative flex h-full min-h-[340px] items-center justify-center overflow-hidden rounded-[1.75rem] border border-fog lg:min-h-[440px]"
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
      </section>
    </>
  )
}
