import flota from '../assets/img/flota-el-talar.webp'
import { company, contact, whatsappMessages } from '../data/company'
import { fleetDetails, services } from '../data/services'
import { usePageMeta } from '../hooks/usePageMeta'
import { Container, Eyebrow, Section, SectionHeading } from '../components/ui/Layout'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { PendingNote } from '../components/ui/Pending'
import { PhotoPlaceholder } from '../components/ui/Photo'
import { WhatsAppButton } from '../components/ui/Button'
import { PageHero } from '../components/sections/PageHero'
import { CtaBand } from '../components/sections/CtaBand'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

/** Visual de cada servicio. Cambiar acá cuando lleguen fotos nuevas de la flota. */
function ServiceVisual({ id }: { id: string }): ReactNode {
  switch (id) {
    case 'cargas-generales':
      return <PhotoPlaceholder label="Camión en operación de carga" className="aspect-[4/3] w-full" />
    case 'flota-propia':
      return (
        <div className="overflow-hidden rounded-2xl bg-fog">
          <img
            src={flota}
            alt="Camiones de la flota propia de Transportes RE"
            width={1080}
            height={355}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover object-[30%_55%]"
          />
        </div>
      )
    case 'cobertura':
      return (
        <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl bg-mist">
          {/* Composición abstracta (no es un mapa): base El Talar y alcance BA / AMBA */}
          <svg aria-hidden viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
            {[44, 88, 132, 176].map((r, i) => (
              <circle
                key={r}
                cx="200"
                cy="150"
                r={r}
                fill="none"
                stroke="var(--color-re)"
                strokeOpacity={0.5 - i * 0.1}
                strokeDasharray={i === 3 ? '3 6' : undefined}
              />
            ))}
            <circle cx="200" cy="150" r="7" fill="var(--color-re)" />
            <circle cx="200" cy="150" r="16" fill="var(--color-re)" fillOpacity=".15" />
          </svg>
          <div className="relative mt-24 rounded-xl bg-white/90 px-4 py-2.5 text-center shadow-sm backdrop-blur">
            <p className="text-xs tracking-[0.14em] text-ink-mute uppercase">Base</p>
            <p className="font-display font-bold text-graphite">El Talar</p>
          </div>
          <p className="absolute top-5 left-5 font-display text-sm font-bold tracking-[0.12em] text-re-700 uppercase">
            Buenos Aires · AMBA
          </p>
        </div>
      )
    case 'atencion':
      return (
        <div className="flex aspect-[4/3] w-full flex-col justify-between rounded-2xl bg-graphite p-8 text-white sm:p-10">
          <Icon name="people" size={32} className="text-re" />
          <div>
            <p className="font-display text-[1.6rem] leading-tight font-bold tracking-[-0.02em] text-balance sm:text-3xl">
              “Hablás directamente con la empresa.”
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm text-white/70">
              <Icon name="clock" size={16} /> {contact.hours}
            </p>
          </div>
        </div>
      )
    default:
      return null
  }
}

export function Servicios() {
  usePageMeta(
    'Servicios',
    'Transporte de cargas generales con flota propia en Buenos Aires y AMBA. Atención personalizada y directa. Transportes RE S.R.L., desde 1960.',
  )

  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Transporte de cargas generales, con flota propia."
        lead={`Trabajamos en ${company.area} desde El Talar, con camiones propios y el trato directo de una empresa familiar.`}
        aside={
          <ul className="space-y-3 lg:pb-2">
            {services.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group flex items-center justify-between gap-4 border-b border-fog py-3 text-graphite transition-colors hover:text-re-700"
                >
                  <span className="flex items-center gap-3 font-medium">
                    <Icon name={s.icon} size={20} className="text-re" />
                    {s.title}
                  </span>
                  <Icon name="arrowRight" size={16} className="rotate-90 text-ink-mute transition-transform group-hover:translate-y-0.5" />
                </a>
              </li>
            ))}
          </ul>
        }
      />

      {/* ───────────── DETALLE DE SERVICIOS ───────────── */}
      <section className="bg-white py-8 sm:py-12 lg:py-16" aria-label="Detalle de servicios">
        <Container>
          {services.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className="grid scroll-mt-28 items-center gap-10 border-b border-line py-14 last:border-b-0 sm:py-16 lg:grid-cols-12 lg:gap-16 lg:py-20"
            >
              <Reveal className={`lg:col-span-6 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <ServiceVisual id={s.id} />
              </Reveal>
              <Reveal delay={100} className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
                <div className="flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-mist text-re">
                    <Icon name={s.icon} size={24} />
                  </span>
                  <span className="font-display text-sm font-bold text-ink-mute">0{i + 1}</span>
                </div>
                <h2 className="t-h2 mt-7 text-balance text-graphite">{s.title}</h2>
                <p className="t-lead mt-5 text-pretty text-ink-soft">{s.description}</p>
              </Reveal>
            </article>
          ))}
        </Container>
      </section>

      {/* ───────────── CTA INTERMEDIO ───────────── */}
      <CtaBand
        title="¿Necesitás mover una carga?"
        text="Contanos el tipo de carga, origen, destino y fecha estimada. Te respondemos por WhatsApp."
        message={whatsappMessages.quote}
        tone="blue"
        background="white"
      />

      {/* ───────────── FLOTA: estructura preparada ───────────── */}
      <Section tone="smoke" labelledBy="flota">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                id="flota"
                eyebrow="Nuestra flota"
                title="Camiones propios, en operación activa."
                lead="Contamos con flota propia de distintos modelos. Próximamente vas a encontrar acá el detalle de los tipos de vehículos con los que trabajamos."
              />
              <div className="mt-8">
                <WhatsAppButton message={whatsappMessages.services} variant="secondary">
                  Consultar disponibilidad
                </WhatsAppButton>
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              {fleetDetails.length > 0 ? (
                <ul className="grid gap-5 sm:grid-cols-2">
                  {fleetDetails.map((f) => (
                    <li key={f.title} className="rounded-2xl border border-line bg-white p-6">
                      {f.image ? <img src={f.image} alt={f.title} loading="lazy" className="mb-5 rounded-xl" /> : null}
                      <h3 className="t-h3 text-graphite">{f.title}</h3>
                      <p className="mt-2 text-ink-soft">{f.detail}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <Reveal className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <PhotoPlaceholder label="Tipo de carrocería 1" className="aspect-[4/3]" />
                    <PhotoPlaceholder label="Tipo de carrocería 2" className="aspect-[4/3]" />
                  </div>
                  <PendingNote>
                    Confirmar con la empresa: cantidad de camiones, tipos de carrocería (caja, playo, etc.) y
                    características que quieran destacar. La estructura está lista en <code>src/data/services.ts</code>{' '}
                    (<code>fleetDetails</code>).
                  </PendingNote>
                </Reveal>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Etiqueta de cierre */}
      <section className="bg-smoke pb-20 lg:pb-28">
        <Container>
          <Reveal className="flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <Eyebrow>¿Tenés más preguntas?</Eyebrow>
            <Link to="/preguntas-frecuentes" className="group inline-flex items-center gap-2 font-semibold text-re-700">
              Ver preguntas frecuentes
              <Icon name="arrowRight" size={17} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
