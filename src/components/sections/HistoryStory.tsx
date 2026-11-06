import { useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import flota from '../../assets/img/flota-el-talar.webp'
import archivo1 from '../../assets/img/archivo-camion-1.webp'
import archivo2 from '../../assets/img/archivo-camion-2.webp'
import { company } from '../../data/company'
import { useDesktop, useMotionOK } from '../../hooks/useMedia'
import { Reveal } from '../motion/Reveal'

type Step = {
  key: string
  kicker: string
  title: ReactNode
  text: string
  dark: boolean
  visual: ReactNode
}

const ease = [0.22, 1, 0.36, 1] as const

function Photo({ src, alt, w, h, archive, className = '' }: { src: string; alt: string; w: number; h: number; archive?: boolean; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      width={w}
      height={h}
      loading="lazy"
      className={`h-full w-full object-cover ${archive ? 'archive-photo' : ''} ${className}`}
    />
  )
}

/* Solo hechos confirmados: 1960, fundador, El Talar, un solo camión, pilares, flota propia, tercera generación. */
const steps: Step[] = [
  {
    key: '1960',
    kicker: 'El comienzo',
    title: <>1960</>,
    text: `${company.founder} funda la empresa en El Talar, provincia de Buenos Aires.`,
    dark: true,
    visual: (
      <div className="flex h-full w-full flex-col justify-between rounded-[1.75rem] border border-white/12 p-8 lg:p-12">
        <p className="t-label text-white/45">Primera dirección</p>
        <div>
          <p className="font-display text-[clamp(2rem,3.6vw,3.6rem)] leading-[0.95] font-extrabold tracking-[-0.04em] text-white uppercase [font-stretch:112%]">
            {company.founder}
          </p>
          <p className="mt-4 font-display text-xl font-semibold tracking-[0.06em] text-re uppercase">{company.origin.label}</p>
        </div>
        <p className="numeral-outline text-right text-[clamp(5rem,11vw,10rem)] text-white/20">1960</p>
      </div>
    ),
  },
  {
    key: 'camion',
    kicker: 'Un solo camión',
    title: <>Con <span className="t-accent text-re">un solo</span> camión.</>,
    text: 'Así empezó todo: un camión, en El Talar, y el trabajo de toda una familia.',
    dark: true,
    visual: (
      <figure className="h-full w-full overflow-hidden rounded-[1.75rem] bg-graphite-700">
        <Photo src={archivo1} alt="Uno de los primeros camiones de la familia Re" w={466} h={232} archive />
      </figure>
    ),
  },
  {
    key: 'familia',
    kicker: 'Una empresa de familia',
    title: <>Dos <span className="t-accent text-re">pilares.</span></>,
    text: 'Desde sus comienzos, la empresa se apoyó en la honestidad y el sentido de responsabilidad.',
    dark: true,
    visual: (
      <figure className="h-full w-full overflow-hidden rounded-[1.75rem] bg-graphite-700">
        <Photo src={archivo2} alt="Camión con acoplado de los primeros años, fotografía de archivo" w={323} h={234} archive className="object-[50%_35%]" />
      </figure>
    ),
  },
  {
    key: 'ayer-hoy',
    kicker: 'Ayer y hoy',
    title: <>De un camión a <span className="t-accent text-re">una flota.</span></>,
    text: 'De aquel primer camión a una flota propia, de distintos modelos, en operación activa.',
    dark: false,
    visual: (
      <div className="grid h-full w-full grid-cols-2 gap-3 lg:gap-4">
        <figure className="relative overflow-hidden rounded-[1.75rem] bg-graphite">
          <Photo src={archivo1} alt="Primer camión de la familia" w={466} h={232} archive className="object-[40%_50%]" />
          <figcaption className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-graphite">1960</figcaption>
        </figure>
        <figure className="relative overflow-hidden rounded-[1.75rem] bg-fog">
          <Photo src={flota} alt="Flota actual de Transportes RE" w={1080} h={355} className="object-[72%_50%]" />
          <figcaption className="absolute bottom-4 left-4 rounded-full bg-re-600 px-3 py-1 text-xs font-bold text-white">Hoy</figcaption>
        </figure>
      </div>
    ),
  },
  {
    key: 'hoy',
    kicker: 'Hoy',
    title: <>Tercera <span className="t-accent text-re">generación.</span></>,
    text: 'La empresa sigue en manos de la familia, en su tercera generación, con flota propia en Buenos Aires y AMBA.',
    dark: false,
    visual: (
      <figure className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-fog">
        <Photo src={flota} alt="Flota de camiones de Transportes RE en El Talar" w={1080} h={355} className="object-[55%_55%]" />
        <figcaption className="absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-2xl bg-white/90 px-5 py-4 backdrop-blur">
          <span className="font-display text-2xl font-extrabold tracking-[-0.03em] text-graphite">3ª</span>
          <span className="text-sm font-semibold text-graphite">generación · El Talar</span>
        </figcaption>
      </figure>
    ),
  },
]

/**
 * Recorrido narrativo de la historia.
 * Escritorio: sección sticky controlada por el scroll (5 momentos). El fondo pasa de grafito
 * (archivo, pasado) a gris azulado (presente): el recorrido termina conectando ambos.
 * Mobile o movimiento reducido: los mismos momentos, apilados, con revelados simples.
 */
export function HistoryStory() {
  const desktop = useDesktop()
  const ok = useMotionOK()
  return desktop && ok ? <Sticky /> : <Stacked />
}

function Sticky() {
  const ref = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const n = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length * 0.999)))
    setI((prev) => (prev === n ? prev : n))
  })
  const step = steps[i]
  const dark = step.dark

  return (
    <section ref={ref} aria-labelledby="recorrido" style={{ height: `${steps.length * 90 + 10}vh` }} className="relative">
      <h2 id="recorrido" className="sr-only">
        Nuestra historia, de 1960 a hoy
      </h2>
      {/* Texto completo para lectores de pantalla */}
      <ol className="sr-only">
        {steps.map((s) => (
          <li key={s.key}>
            {s.kicker}: {s.text}
          </li>
        ))}
      </ol>

      <div
        aria-hidden
        className={`sticky top-0 flex h-screen items-center overflow-hidden transition-colors duration-[900ms] ease-out-soft ${
          dark ? 'bg-graphite text-white' : 'bg-mist text-graphite'
        }`}
      >
        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-12 items-center gap-10 px-10 pt-16">
          {/* Columna de texto */}
          <div className="col-span-5">
            <div className="flex items-center gap-4">
              <ol className="flex items-center gap-1.5">
                {steps.map((s, k) => (
                  <li
                    key={s.key}
                    className={`h-2 rounded-full transition-all duration-700 ease-out-soft ${
                      k === i ? 'w-8 bg-re' : k < i ? 'w-2 bg-re/60' : dark ? 'w-2 bg-white/20' : 'w-2 bg-graphite/20'
                    }`}
                  />
                ))}
              </ol>
              <span className={`t-label ${dark ? 'text-white/50' : 'text-ink-mute'}`}>
                0{i + 1} / 0{steps.length}
              </span>
            </div>

            <div className="relative mt-10 min-h-[22rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={step.key} className="absolute inset-0">
                  <div className="overflow-hidden">
                    <motion.p
                      className="t-label text-re"
                      initial={{ y: '110%' }}
                      animate={{ y: 0, transition: { duration: 0.6, ease } }}
                      exit={{ y: '-110%', transition: { duration: 0.25 } }}
                    >
                      {step.kicker}
                    </motion.p>
                  </div>
                  <div className="mt-5 overflow-hidden pb-[0.08em]">
                    <motion.p
                      className={step.key === '1960' ? 'font-display text-[clamp(6rem,11vw,10rem)] leading-[0.85] font-extrabold tracking-[-0.06em] [font-stretch:118%]' : 't-display'}
                      initial={{ y: '105%' }}
                      animate={{ y: 0, transition: { duration: 0.8, ease, delay: 0.05 } }}
                      exit={{ y: '-105%', transition: { duration: 0.3, ease: 'easeIn' } }}
                    >
                      {step.title}
                    </motion.p>
                  </div>
                  <motion.p
                    className={`t-lead mt-8 max-w-md ${dark ? 'text-white/70' : 'text-ink-soft'}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: 0.2 } }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  >
                    {step.text}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Escenario visual: cada momento entra con una máscara desde abajo */}
          <div className="relative col-span-7 h-[min(64vh,600px)]">
            {steps.map((s, k) => (
              <motion.div
                key={s.key}
                className="absolute inset-0"
                initial={false}
                animate={{
                  clipPath: k <= i ? 'inset(0% 0% 0% 0% round 28px)' : 'inset(100% 0% 0% 0% round 28px)',
                  scale: k === i ? 1 : k < i ? 0.94 : 1,
                  opacity: k < i - 1 ? 0 : 1,
                }}
                transition={{ duration: 1, ease }}
                style={{ zIndex: k }}
              >
                {s.visual}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Stacked() {
  return (
    <section aria-labelledby="recorrido-m">
      <h2 id="recorrido-m" className="sr-only">
        Nuestra historia, de 1960 a hoy
      </h2>
      {steps.map((s, k) => (
        <div key={s.key} className={s.dark ? 'bg-graphite text-white' : 'bg-mist text-graphite'}>
          <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 sm:py-20">
            <Reveal>
              <p className="t-label flex items-center gap-3 text-re">
                <span className={s.dark ? 'text-white/40' : 'text-ink-mute'}>0{k + 1}</span>
                {s.kicker}
              </p>
              <p
                className={`mt-5 ${
                  s.key === '1960'
                    ? 'font-display text-[clamp(5rem,26vw,9rem)] leading-[0.85] font-extrabold tracking-[-0.06em] [font-stretch:118%]'
                    : 't-display'
                }`}
              >
                {s.title}
              </p>
              <p className={`t-lead mt-6 max-w-md ${s.dark ? 'text-white/70' : 'text-ink-soft'}`}>{s.text}</p>
            </Reveal>
            <Reveal variant="mask" className="mt-10 aspect-[4/3]">
              {s.visual}
            </Reveal>
          </div>
        </div>
      ))}
    </section>
  )
}
