import { useRef, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { company, whatsappMessages } from '../data/company'
import { fleetDetails, services } from '../data/services'
import { usePageMeta } from '../hooks/usePageMeta'
import { useFinePointer, useMotionOK } from '../hooks/useMedia'
import { whatsappUrl } from '../lib/whatsapp'
import { Icon } from '../components/ui/Icon'
import { Label } from '../components/ui/Label'
import { PendingNote } from '../components/ui/Pending'
import { PhotoPlaceholder } from '../components/ui/Photo'
import { TextLink, WhatsAppButton } from '../components/ui/Button'
import { Reveal, RevealLines } from '../components/motion/Reveal'
import { PageHero } from '../components/sections/PageHero'
import { CtaBand } from '../components/sections/CtaBand'
import { ServiceVisual } from '../components/sections/ServiceVisual'

const wrap = 'mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10'

/**
 * Lista editorial de servicios.
 * Con mouse: al pasar sobre un servicio, una vista previa lo acompaña siguiendo el cursor.
 * En pantallas táctiles: la imagen se muestra dentro de cada servicio, sin depender del hover.
 */
function ServiceIndex() {
  const fine = useFinePointer()
  const ok = useMotionOK()
  const [active, setActive] = useState<string | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 180, damping: 24, mass: 0.5 })
  const y = useSpring(my, { stiffness: 180, damping: 24, mass: 0.5 })
  const listRef = useRef<HTMLOListElement>(null)

  const onMove = (e: MouseEvent) => {
    const r = listRef.current?.getBoundingClientRect()
    if (!r) return
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }
  const preview = fine && ok

  return (
    <section aria-label="Detalle de servicios" className="bg-white py-20 sm:py-28 lg:py-32">
      <div className={wrap}>
        <ol ref={listRef} onMouseMove={preview ? onMove : undefined} onMouseLeave={() => setActive(null)} className="relative border-t border-graphite/15">
          {services.map((s, i) => (
            <li key={s.id} id={s.id} className="scroll-mt-28 border-b border-graphite/15">
              <Reveal>
                <article
                  onMouseEnter={() => setActive(s.id)}
                  className="group grid gap-6 py-12 sm:py-14 lg:grid-cols-12 lg:gap-10 lg:py-16"
                >
                  <span className="font-display text-sm font-bold text-ink-mute transition-colors duration-500 group-hover:text-re lg:col-span-1 lg:pt-4">
                    0{i + 1}
                  </span>
                  <h2 className="font-display text-[clamp(2.3rem,1.3rem+3.8vw,5.2rem)] leading-[0.95] font-extrabold tracking-[-0.045em] text-graphite transition-[color,transform] duration-700 ease-out-soft [font-stretch:112%] group-hover:translate-x-3 group-hover:text-re-700 lg:col-span-6">
                    {s.title}
                  </h2>
                  <div className="lg:col-span-5 lg:pt-4">
                    <p className="t-lead text-pretty text-ink-soft">{s.description}</p>
                    <TextLink
                      href={whatsappUrl(`Hola, Transportes RE. Quisiera consultar por: ${s.title}.`)}
                      external
                      className="mt-6 text-re-700"
                    >
                      Consultar por este servicio
                    </TextLink>
                  </div>
                  {/* imagen visible siempre en pantallas táctiles / sin hover */}
                  {!preview ? <ServiceVisual id={s.id} className="aspect-[16/10] w-full lg:col-span-11 lg:col-start-2" /> : null}
                </article>
              </Reveal>
            </li>
          ))}

          {preview ? (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 z-20 hidden h-[260px] w-[360px] lg:block"
              style={{ x, y, translateX: '-50%', translateY: '-50%' }}
            >
              <AnimatePresence mode="popLayout">
                {active ? (
                  <motion.div
                    key={active}
                    className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_30px_60px_-25px_rgb(37_45_58/0.5)]"
                    initial={{ opacity: 0, scale: 0.85, clipPath: 'inset(50% 0% 50% 0% round 16px)' }}
                    animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 16px)' }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ServiceVisual id={active} className="h-full w-full" />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          ) : null}
        </ol>
      </div>
    </section>
  )
}

/* Cobertura: los anillos se dibujan con el scroll alrededor de la base en El Talar */
function Coverage() {
  const ref = useRef<HTMLDivElement>(null)
  const ok = useMotionOK()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'center 0.45'] })
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <section aria-labelledby="cobertura-t" className="overflow-hidden bg-mist py-24 sm:py-32 lg:py-40">
      <div className={`${wrap} grid items-center gap-14 lg:grid-cols-12`}>
        <div className="lg:col-span-6">
          <Label>Zona de operación</Label>
          <RevealLines
            id="cobertura-t"
            className="t-mega mt-6 text-graphite"
            lines={['Buenos Aires', <span className="t-accent text-re">y AMBA.</span>]}
          />
          <Reveal delay={150}>
            <p className="t-lead mt-8 max-w-md text-ink-soft">
              Operamos en {company.area}. Nuestra base está en El Talar, donde empezó la historia en {company.foundedYear}.
            </p>
          </Reveal>
        </div>
        <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[520px] lg:col-span-6" aria-hidden>
          <svg viewBox="0 0 400 400" className="h-full w-full">
            {[60, 110, 160, 196].map((r, i) => (
              <motion.circle
                key={r}
                cx="200"
                cy="200"
                r={r}
                fill="none"
                stroke="var(--color-re)"
                strokeWidth={i === 0 ? 1.5 : 1}
                strokeOpacity={0.75 - i * 0.15}
                strokeDasharray={i === 3 ? '3 7' : undefined}
                style={ok && i !== 3 ? { pathLength: draw, rotate: -90 } : undefined}
              />
            ))}
            <circle cx="200" cy="200" r="22" fill="var(--color-re)" fillOpacity=".14" />
            <circle cx="200" cy="200" r="8" fill="var(--color-re)" />
          </svg>
          <div className="absolute top-1/2 left-1/2 mt-12 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-sm font-bold text-graphite shadow-sm">
            El Talar
          </div>
        </div>
      </div>
    </section>
  )
}

function Fleet() {
  return (
    <section aria-labelledby="flota" className="bg-smoke py-24 sm:py-32">
      <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <Label>Nuestra flota</Label>
          <RevealLines id="flota" className="t-h2 mt-6 text-graphite" lines={['Camiones propios,', 'en operación activa.']} />
          <Reveal delay={120}>
            <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
              Contamos con flota propia de distintos modelos. Próximamente vas a encontrar acá el detalle de los tipos de
              vehículos con los que trabajamos.
            </p>
            <div className="mt-8">
              <WhatsAppButton message={whatsappMessages.services} variant="secondary">
                Consultar disponibilidad
              </WhatsAppButton>
            </div>
          </Reveal>
        </div>
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
                Confirmar con la empresa: cantidad de camiones, tipos de carrocería (caja, playo, etc.) y características
                que quieran destacar. La estructura está lista en <code>src/data/services.ts</code> (<code>fleetDetails</code>).
              </PendingNote>
            </Reveal>
          )}
        </div>
      </div>
      <div className={`${wrap} mt-20`}>
        <Reveal variant="fade" className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-label text-ink-soft">¿Tenés más preguntas?</p>
          <TextLink to="/preguntas-frecuentes" className="text-re-700">
            Ver preguntas frecuentes
          </TextLink>
        </Reveal>
      </div>
    </section>
  )
}

export function Servicios() {
  usePageMeta(
    'Servicios',
    'Transporte de cargas generales con flota propia en Buenos Aires y AMBA. Atención personalizada y directa. Transportes RE S.R.L., desde 1960.',
  )
  return (
    <>
      <PageHero
        label="Servicios"
        lines={['Cargas generales,', <>con <span className="t-accent text-re">flota propia.</span></>]}
        lead={`Trabajamos en ${company.area} desde El Talar, con camiones propios y el trato directo de una empresa familiar.`}
        aside={
          <ol className="border-t border-fog">
            {services.map((s, i) => (
              <li key={s.id} className="border-b border-fog">
                <a href={`#${s.id}`} className="group flex items-center justify-between gap-4 py-3.5 text-graphite">
                  <span className="flex items-center gap-4 text-[0.95rem] font-medium">
                    <span className="text-xs font-bold text-ink-mute">0{i + 1}</span>
                    <span className="link-u">{s.title}</span>
                  </span>
                  <Icon name="arrowRight" size={16} className="rotate-90 text-re transition-transform duration-500 group-hover:translate-y-1" />
                </a>
              </li>
            ))}
          </ol>
        }
      />
      <ServiceIndex />
      {/* CTA después de Servicios */}
      <CtaBand
        tone="blue"
        label="Presupuestos"
        lines={['¿Necesitás', <>mover <span className="t-accent">una carga?</span></>]}
        text="Contanos el tipo de carga, origen, destino y fecha estimada. Te respondemos por WhatsApp."
        message={whatsappMessages.quote}
      />
      <Coverage />
      <Fleet />
    </>
  )
}
