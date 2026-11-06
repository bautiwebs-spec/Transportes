import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { company, whatsappMessages } from '../data/company'
import { generations, milestones, valuesDetail } from '../data/history'
import { usePageMeta } from '../hooks/usePageMeta'
import { useMotionOK } from '../hooks/useMedia'
import { SHOW_PENDING_NOTES } from '../config'
import { Label } from '../components/ui/Label'
import { PendingBadge } from '../components/ui/Pending'
import { Reveal, RevealLines } from '../components/motion/Reveal'
import { CtaBand } from '../components/sections/CtaBand'
import { HistoryStory } from '../components/sections/HistoryStory'

const wrap = 'mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10'

/* Intro: el año 1960 ocupa todo el ancho y se separa con el scroll */
function Intro() {
  const ref = useRef<HTMLElement>(null)
  const ok = useMotionOK()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const line = (i: number) => ({ '--i': i }) as React.CSSProperties

  return (
    <section ref={ref} className="relative overflow-hidden bg-mist pt-[120px] lg:pt-[170px]">
      <div className={wrap}>
        <div className="enter-fade" style={line(-8)}>
          <Label>Nuestra historia</Label>
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <h1 className="t-display text-graphite lg:col-span-7">
            <span className="enter-line block overflow-hidden pb-[0.08em]" style={line(0)}>
              <span>Una historia</span>
            </span>
            <span className="enter-line block overflow-hidden pb-[0.08em]" style={line(1)}>
              <span>
                <span className="t-accent text-re">en movimiento.</span>
              </span>
            </span>
          </h1>
          <p className="enter-fade t-lead text-pretty text-ink-soft lg:col-span-4 lg:col-start-9" style={line(1)}>
            {company.founder} fundó la empresa en El Talar en {company.foundedYear}. Tres generaciones después,
            seguimos trabajando con los mismos valores.
          </p>
        </div>
      </div>

      <div aria-hidden className="enter-fade relative mt-14 flex justify-center select-none lg:mt-10" style={line(3)}>
        <motion.span
          style={ok ? { x: x1 } : undefined}
          className="font-display text-[clamp(7rem,33vw,30rem)] leading-[0.78] font-extrabold tracking-[-0.07em] text-graphite [font-stretch:120%]"
        >
          19
        </motion.span>
        <motion.span style={ok ? { x: x2 } : undefined} className="numeral-outline text-[clamp(7rem,33vw,30rem)] text-re [font-stretch:120%]">
          60
        </motion.span>
      </div>
    </section>
  )
}

function OfficialText() {
  return (
    <section aria-labelledby="origen" className="bg-smoke py-24 sm:py-32 lg:py-40">
      <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
        <div className="lg:col-span-3">
          <Label>En palabras de la empresa</Label>
          <h2 id="origen" className="sr-only">
            Nuestros orígenes
          </h2>
        </div>
        <Reveal as="blockquote" className="lg:col-span-9">
          <span aria-hidden className="t-accent block text-[6rem] leading-[0.5] text-re">
            “
          </span>
          <p className="mt-4 font-display text-[clamp(1.5rem,1.05rem+1.8vw,2.6rem)] leading-[1.22] font-medium tracking-[-0.025em] text-pretty text-graphite [font-stretch:104%]">
            {company.officialHistory.replace('TRANSPORTES RE S.R.L. es', 'Transportes RE S.R.L. es')}
          </p>
          <footer className="mt-10 flex items-center gap-4 text-sm text-ink-soft">
            <span className="h-px w-12 bg-re" aria-hidden />
            Texto institucional de {company.name}
          </footer>
        </Reveal>
      </div>
    </section>
  )
}

/* Tres generaciones: una línea que se dibuja con el scroll une los tres numerales */
function Generations() {
  const ref = useRef<HTMLDivElement>(null)
  const ok = useMotionOK()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'center 0.5'] })
  return (
    <section aria-labelledby="generaciones" className="bg-white py-24 sm:py-32 lg:py-40">
      <div className={wrap}>
        <Label>Empresa familiar</Label>
        <RevealLines
          id="generaciones"
          className="t-display mt-6 text-graphite"
          lines={['Tres', <span className="t-accent text-re">generaciones.</span>]}
        />
        <div ref={ref} className="relative mt-16 lg:mt-24">
          <motion.span
            aria-hidden
            style={ok ? { scaleX: scrollYProgress } : undefined}
            className="absolute top-[clamp(2.4rem,5vw,4.5rem)] right-0 left-0 hidden h-px origin-left bg-re sm:block"
          />
          <ol className="grid gap-12 sm:grid-cols-3 sm:gap-8">
            {generations.map((g, i) => (
              <Reveal as="li" key={g.n} delay={i * 140} className="relative">
                <span className="relative inline-block bg-white pr-4 font-display text-[clamp(4.5rem,10vw,9rem)] leading-none font-extrabold tracking-[-0.06em] text-graphite [font-stretch:115%]">
                  {g.n}
                </span>
                <h3 className="t-h3 mt-6 text-graphite">{g.title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-ink-soft">{g.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* Línea de tiempo: solo hitos confirmados; la línea se completa al recorrerla */
function Timeline() {
  const ref = useRef<HTMLOListElement>(null)
  const ok = useMotionOK()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })
  const visible = milestones.filter((m) => !m.pending || SHOW_PENDING_NOTES)
  return (
    <section aria-labelledby="linea-tiempo" className="bg-mist py-24 sm:py-32 lg:py-40">
      <div className={`${wrap} grid gap-14 lg:grid-cols-12`}>
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Label>Línea de tiempo</Label>
            <RevealLines id="linea-tiempo" className="t-h2 mt-6 text-graphite" lines={['Hitos de', 'nuestra historia.']} />
            <p className="mt-6 max-w-xs leading-relaxed text-ink-soft">Solo incluimos fechas confirmadas por la familia.</p>
          </div>
        </div>
        <ol ref={ref} className="relative lg:col-span-7 lg:col-start-6">
          <span aria-hidden className="absolute top-3 bottom-3 left-[9px] w-px bg-fog" />
          <motion.span
            aria-hidden
            style={ok ? { scaleY: scrollYProgress } : undefined}
            className="absolute top-3 bottom-3 left-[9px] w-px origin-top bg-re"
          />
          {visible.map((m, i) => (
            <Reveal as="li" key={m.title} delay={i * 90} className="relative pb-16 pl-14 last:pb-0">
              <span
                aria-hidden
                className={`absolute top-3 left-0 size-[19px] rounded-full border-[3px] ${
                  m.pending ? 'border-dashed border-re/50 bg-mist' : 'border-mist bg-re ring-1 ring-re'
                }`}
              />
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <p
                  className={`font-display text-[clamp(3rem,6vw,5rem)] leading-none font-extrabold tracking-[-0.05em] [font-stretch:112%] ${
                    m.pending ? 'text-ink-mute/50' : 'text-graphite'
                  }`}
                >
                  {m.year}
                </p>
                {m.pending ? <PendingBadge>A confirmar</PendingBadge> : null}
              </div>
              <h3 className={`t-h3 mt-4 ${m.pending ? 'text-ink-mute' : 'text-graphite'}`}>{m.title}</h3>
              <p className={`mt-2 max-w-lg leading-relaxed ${m.pending ? 'text-ink-mute' : 'text-ink-soft'}`}>{m.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Values() {
  return (
    <section aria-labelledby="valores" className="bg-white py-24 sm:py-32 lg:py-40">
      <div className={wrap}>
        <Label>Nuestros valores</Label>
        <RevealLines
          id="valores"
          className="t-display mt-6 text-graphite"
          lines={['Los pilares', <>de <span className="t-accent text-re">siempre.</span></>]}
        />
        <ul className="mt-16 border-t border-graphite/15 lg:mt-20">
          {valuesDetail.map((v, i) => (
            <Reveal
              as="li"
              key={v.title}
              variant={i % 2 ? 'right' : 'left'}
              className="group grid gap-3 border-b border-graphite/15 py-8 sm:grid-cols-12 sm:items-baseline sm:py-10"
            >
              <span className="t-label text-ink-mute sm:col-span-1">0{i + 1}</span>
              <h3 className="font-display text-[clamp(2.2rem,1.4rem+3.4vw,4.6rem)] leading-none font-extrabold tracking-[-0.045em] text-graphite transition-[color,transform] duration-500 ease-out-soft [font-stretch:114%] group-hover:translate-x-3 group-hover:text-re sm:col-span-7">
                {v.title}
              </h3>
              <p className="max-w-sm leading-relaxed text-ink-soft sm:col-span-4">{v.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Historia() {
  usePageMeta(
    'Nuestra historia',
    'La historia de Transportes RE S.R.L.: fundada en 1960 por Juan Bautista Re en El Talar con un solo camión. Hoy, una empresa familiar en su tercera generación.',
  )
  return (
    <>
      <Intro />
      <HistoryStory />
      <OfficialText />
      <Generations />
      <Timeline />
      <Values />
      <CtaBand
        tone="blue"
        lines={['La misma familia,', <>el mismo <span className="t-accent">compromiso.</span></>]}
        text="Si necesitás transportar cargas generales en Buenos Aires o AMBA, escribinos y lo conversamos."
        message={whatsappMessages.general}
      />
    </>
  )
}
