import { contact, fullAddress, whatsappMessages } from '../data/company'
import { usePageMeta } from '../hooks/usePageMeta'
import { SHOW_PENDING_NOTES } from '../config'
import { Icon, type IconName } from '../components/ui/Icon'
import { Label, wrap } from '../components/ui/Label'
import { PendingBadge } from '../components/ui/Pending'
import { TextLink, WhatsAppButton } from '../components/ui/Button'
import { PageHero } from '../components/sections/PageHero'
import { ContactForm } from '../components/forms/ContactForm'

function Channel({ icon, label, value, href, badge }: { icon: IconName; label: string; value: string; href?: string; badge?: string }) {
  const body = (
    <>
      <Icon name={icon} size={20} className="mt-0.5 shrink-0 text-re" />
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-2 text-sm text-ink-mute">
          {label}
          {badge ? <PendingBadge>{badge}</PendingBadge> : null}
        </span>
        <span className="mt-1 block font-medium break-words text-graphite">
          {href ? <span className="link-u">{value}</span> : value}
        </span>
      </span>
    </>
  )
  return href ? (
    <a href={href} className="flex gap-4 py-5">
      {body}
    </a>
  ) : (
    <div className="flex gap-4 py-5">{body}</div>
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
        label="Contacto"
        title="Hablemos."
        lead="Para presupuestos y solicitudes de transporte, WhatsApp es la forma más rápida. También podés llamarnos o escribirnos por correo."
      />

      {/* Canales: WhatsApp primero */}
      <section aria-label="Canales de contacto" className="bg-white py-20 sm:py-24">
        <div className={`${wrap} grid gap-10 lg:grid-cols-12 lg:gap-14`}>
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-graphite p-8 text-white sm:p-10">
              <p className="t-label flex items-center gap-2 text-white/60">
                <Icon name="whatsapp" size={15} className="text-re" /> Canal principal
              </p>
              <h2 className="t-h2 mt-5">Presupuestos por WhatsApp</h2>
              <p className="mt-4 max-w-md leading-relaxed text-white/70">
                Contanos el tipo de carga, el origen, el destino y la fecha estimada. Te responde la propia empresa.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <WhatsAppButton message={whatsappMessages.quote} size="lg">
                  Escribir por WhatsApp
                </WhatsAppButton>
                <span className="font-display text-xl font-semibold tracking-[-0.01em] text-white/90">{contact.phoneDisplay}</span>
              </div>
            </div>

            <div className="mt-6 grid divide-y divide-line border-y border-line sm:grid-cols-2 sm:divide-y-0">
              <div className="divide-y divide-line sm:pr-6">
                <Channel icon="phone" label="Teléfono" value={contact.phoneDisplay} href={`tel:${contact.phoneTel}`} />
                <Channel
                  icon="mail"
                  label="Correo electrónico"
                  value={contact.email}
                  href={`mailto:${contact.email}`}
                  badge={contact.emailIsProvisional ? 'Provisorio' : undefined}
                />
              </div>
              <div className="divide-y divide-line sm:border-l sm:border-line sm:pl-6">
                <Channel icon="clock" label="Horario de atención" value={contact.hours} />
                {contact.instagram ? (
                  <Channel icon="instagram" label="Instagram" value={`@${contact.instagram.user}`} href={contact.instagram.url} />
                ) : SHOW_PENDING_NOTES ? (
                  <Channel icon="instagram" label="Instagram" value="Usuario a confirmar" badge="Pendiente" />
                ) : null}
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div className="lg:col-span-5">
            <Label>Ubicación</Label>
            <address className="mt-5 text-lg leading-relaxed text-graphite not-italic">
              {contact.address.street}, {contact.address.between}
              <br />
              {contact.address.town}, {contact.address.province}
            </address>
            <TextLink href={contact.mapsUrl} external className="mt-4 text-re-700">
              Abrir en Google Maps
            </TextLink>
            <div
              role="img"
              aria-label={`Espacio reservado para el mapa de ubicación: ${fullAddress}`}
              className="placeholder-hatch mt-8 flex aspect-[4/3] items-center justify-center rounded-2xl border border-line"
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="flex size-11 items-center justify-center rounded-full bg-white text-re shadow-sm">
                  <Icon name="pin" size={20} />
                </span>
                {SHOW_PENDING_NOTES ? <PendingBadge>Mapa interactivo pendiente</PendingBadge> : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario: complementario */}
      <section aria-labelledby="formulario" className="border-t border-line bg-smoke py-20 sm:py-24">
        <div className={`${wrap} grid gap-10 lg:grid-cols-12 lg:gap-14`}>
          <div className="lg:col-span-4">
            <Label>Consultas generales</Label>
            <h2 id="formulario" className="t-h2 mt-5 text-graphite">
              ¿Preferís dejarnos un mensaje?
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">Para consultas que no son presupuestos. Te respondemos por correo.</p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-9 lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
