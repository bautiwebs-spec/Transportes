import flota from '../assets/img/flota-el-talar.webp'
import { company, contact, whatsappMessages } from '../data/company'
import { fleetDetails, services } from '../data/services'
import { usePageMeta } from '../hooks/usePageMeta'
import { whatsappUrl } from '../lib/whatsapp'
import { Label, wrap } from '../components/ui/Label'
import { PendingNote } from '../components/ui/Pending'
import { PhotoPlaceholder } from '../components/ui/Photo'
import { TextLink, WhatsAppButton } from '../components/ui/Button'
import { Reveal } from '../components/motion/Reveal'
import { PageHero } from '../components/sections/PageHero'

/* Capacidades: fotografía real de la flota + los cuatro ejes del servicio */
function Capabilities() {
  return (
    <section aria-labelledby="capacidades" className="bg-white py-24 sm:py-28 lg:py-32">
      <div className={`${wrap} grid gap-14 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <Reveal>
            <Label>Capacidades</Label>
            <h2 id="capacidades" className="t-h2 mt-5 text-graphite">
              Qué ofrecemos
            </h2>
          </Reveal>
          <figure className="mt-10">
            <img
              src={flota}
              alt="Camiones de la flota propia de Transportes RE"
              width={1080}
              height={355}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl object-cover object-[30%_55%]"
            />
            <figcaption className="mt-3 text-sm text-ink-mute">Parte de nuestra flota, en la base de El Talar.</figcaption>
          </figure>
        </div>
        <ol className="lg:col-span-7">
          {services.map((s, n) => (
            <li key={s.id} id={s.id} className="scroll-mt-28 border-t border-line py-9 first:border-t-0 first:pt-0 lg:first:pt-2">
              <div className="flex gap-6">
                <span className="t-label w-6 shrink-0 pt-1.5 text-ink-mute">0{n + 1}</span>
                <div>
                  <h3 className="t-h3 text-graphite">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{s.description}</p>
                  <TextLink
                    href={whatsappUrl(`Hola, Transportes RE. Quisiera consultar por: ${s.title}.`)}
                    external
                    className="mt-4 text-sm text-re-700"
                  >
                    Consultar
                  </TextLink>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* Datos operativos: la información práctica en un solo lugar */
function Operations() {
  const rows = [
    ['Tipo de carga', 'Cargas generales'],
    ['Zona de operación', company.area],
    ['Base', `${contact.address.street}, ${contact.address.town}, ${contact.address.province}`],
    ['Flota', 'Propia, de distintos modelos, en operación activa'],
    ['Atención', contact.hours],
    ['Canal de presupuestos', `WhatsApp ${contact.phoneDisplay}`],
  ]
  return (
    <section aria-labelledby="datos" className="bg-smoke py-24 sm:py-28 lg:py-32">
      <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
        <Reveal className="lg:col-span-4">
          <Label>Datos operativos</Label>
          <h2 id="datos" className="t-h2 mt-5 text-graphite">
            Cómo trabajamos
          </h2>
        </Reveal>
        <dl className="grid border-t border-line sm:grid-cols-2 lg:col-span-8">
          {rows.map(([k, v]) => (
            <div key={k} className="border-b border-line py-6 sm:pr-8">
              <dt className="text-sm text-ink-mute">{k}</dt>
              <dd className="mt-1.5 font-medium text-graphite">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* Flota: estructura lista para cuando la empresa confirme tipos y cantidades */
function Fleet() {
  return (
    <section aria-labelledby="flota" className="bg-white py-24 sm:py-28 lg:py-32">
      <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
        <Reveal className="lg:col-span-4">
          <Label>Flota</Label>
          <h2 id="flota" className="t-h2 mt-5 text-graphite">
            Tipos de vehículos
          </h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Próximamente vas a encontrar acá el detalle de los vehículos con los que trabajamos.
          </p>
        </Reveal>
        <div className="lg:col-span-8">
          {fleetDetails.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2">
              {fleetDetails.map((f) => (
                <li key={f.title} className="rounded-2xl border border-line p-6">
                  {f.image ? <img src={f.image} alt={f.title} loading="lazy" className="mb-5 rounded-xl" /> : null}
                  <h3 className="t-h3 text-graphite">{f.title}</h3>
                  <p className="mt-2 text-ink-soft">{f.detail}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <PhotoPlaceholder label="Tipo de carrocería 1" className="aspect-[4/3]" />
                <PhotoPlaceholder label="Tipo de carrocería 2" className="aspect-[4/3]" />
              </div>
              <PendingNote>
                Confirmar con la empresa: cantidad de camiones, tipos de carrocería (caja, playo, etc.) y características
                que quieran destacar. La estructura está lista en <code>src/data/services.ts</code> (<code>fleetDetails</code>).
              </PendingNote>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* Cierre: cómo pedir un presupuesto (CTA principal de la página) */
function HowToQuote() {
  const steps = [
    { t: 'Escribinos por WhatsApp', d: `Al ${contact.phoneDisplay}, ${contact.hours.toLowerCase()}.` },
    { t: 'Contanos qué necesitás', d: 'Tipo de carga, origen, destino y fecha estimada.' },
    { t: 'Te respondemos', d: 'La propia empresa te contesta de manera directa.' },
  ]
  return (
    <section aria-labelledby="presupuesto" className="bg-graphite text-white">
      <div className={`${wrap} py-24 sm:py-28`}>
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Label light>Presupuestos</Label>
            <h2 id="presupuesto" className="t-h2 mt-5">
              Cómo pedir un presupuesto
            </h2>
          </div>
          <WhatsAppButton message={whatsappMessages.quote} size="lg" className="self-start lg:self-auto">
            Pedir presupuesto
          </WhatsAppButton>
        </Reveal>
        <ol className="mt-14 grid gap-10 border-t border-white/15 pt-10 md:grid-cols-3">
          {steps.map((s, n) => (
            <li key={s.t}>
              <span className="t-numeral text-[2rem] text-re">0{n + 1}</span>
              <h3 className="t-h3 mt-4">{s.t}</h3>
              <p className="mt-2 leading-relaxed text-white/65">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-14 border-t border-white/15 pt-8 text-sm text-white/60">
          ¿Tenés otras dudas?{' '}
          <TextLink to="/preguntas-frecuentes" className="text-white">
            Ver preguntas frecuentes
          </TextLink>
        </p>
      </div>
    </section>
  )
}

export function Servicios() {
  usePageMeta(
    'Servicios',
    'Transporte de cargas generales con flota propia en Buenos Aires y AMBA. Atención directa de la empresa. Transportes RE S.R.L., desde 1960.',
  )
  return (
    <>
      <PageHero
        label="Servicios"
        title="Transporte de cargas generales con flota propia."
        lead={`Operamos en ${company.area} desde nuestra base en El Talar.`}
      />
      <Capabilities />
      <Operations />
      <Fleet />
      <HowToQuote />
    </>
  )
}
