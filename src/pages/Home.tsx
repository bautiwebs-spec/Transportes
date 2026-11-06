import { useRef, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import flota from '../assets/img/flota-el-talar.webp'
import archivo1 from '../assets/img/archivo-camion-1.webp'
import { company, contact, whatsappMessages } from '../data/company'
import { services } from '../data/services'
import { usePageMeta } from '../hooks/usePageMeta'
import { useMotionOK } from '../hooks/useMedia'
import { Button, TextLink, WhatsAppButton, ArrowSwap } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { Label } from '../components/ui/Label'
import { AxleMark } from '../components/ui/AxleMark'
import { Reveal, RevealLines } from '../components/motion/Reveal'
import { Parallax, ScrollHighlight, ScrollMarquee } from '../components/motion/Scroll'
import { WheelBadge } from '../components/motion/WheelBadge'
import { ExpandSection } from '../components/motion/ExpandSection'

const wrap = 'mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10'

/* ───────────────────────── HERO ───────────────────────── */
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const ok = useMotionOK()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const line = (i: number) => ({ '--i': i }) as CSSProperties

  return (
    <section ref={ref} className="relative overflow-hidden bg-mist pt-[96px] pb-16 lg:pt-[120px] lg:pb-24">
      <div className={wrap}>
        <div className="enter-fade flex items-center justify-between gap-4 border-b border-fog pb-5" style={line(-8)}>
          <p className="t-label flex items-center gap-3 text-ink-soft">
            <AxleMark className="text-re" />
            Cargas generales · El Talar, Buenos Aires
          </p>
          <p className="t-label hidden text-ink-mute sm:block">Est. {company.foundedYear}</p>
        </div>

        <div className="relative mt-8 lg:mt-12">
          {/* Título: se revela por líneas en la entrada y sube más rápido que la foto al hacer scroll */}
          <motion.h1 style={ok ? { y: titleY } : undefined} className="t-mega relative z-10 text-graphite">
            <span className="enter-line block overflow-hidden pb-[0.06em]" style={line(0)}>
              <span>El compromiso</span>
            </span>
            <span className="enter-line block overflow-hidden pb-[0.06em] lg:pl-[4%]" style={line(1)}>
              <span>nos mueve</span>
            </span>
            <span className="enter-line block overflow-hidden pb-[0.1em]" style={line(2)}>
              <span>
                desde <span className="t-accent text-re">1960.</span>
              </span>
            </span>
          </motion.h1>

          {/* Fotografía: entra con máscara + zoom; luego parallax interno */}
          <div className="relative mt-10 lg:absolute lg:top-[calc(clamp(3rem,1.2rem+7.4vw,8.4rem)*0.98)] lg:right-[calc(max(2.5rem,(100vw_-_1320px)/2_+_2.5rem)*-1)] lg:mt-0 lg:w-[44%]">
            <figure className="enter-mask relative overflow-hidden rounded-[1.75rem] bg-fog lg:rounded-r-none">
              <motion.img
                src={flota}
                alt="Flota de camiones de Transportes RE en la base de El Talar"
                width={1080}
                height={355}
                fetchPriority="high"
                style={ok ? { y: imgY, scale: 1.12 } : undefined}
                className="aspect-[4/3] w-full object-cover object-[64%_60%] lg:aspect-auto lg:h-[min(52vh,500px)] lg:min-h-[380px]"
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-graphite backdrop-blur sm:bottom-5 sm:left-5 lg:right-14 lg:left-auto">
                Flota propia · El Talar
              </figcaption>
            </figure>
            <WheelBadge
              text="Transportes RE · desde 1960 · "
              className="enter-fade absolute -top-14 right-6 hidden sm:block lg:top-auto lg:right-auto lg:-bottom-14 lg:-left-14"
            />
          </div>
        </div>

        {/* Subtítulo y acciones */}
        <div className="relative z-10 mt-10 max-w-xl lg:mt-14 lg:max-w-[44%]">
          <p className="enter-fade t-lead text-pretty text-ink-soft" style={line(0)}>
            Transporte de cargas generales en Buenos Aires y AMBA.{' '}
            <span className="text-graphite">Tres generaciones construyendo confianza.</span>
          </p>
          <div className="enter-fade mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={line(2)}>
            <WhatsAppButton message={whatsappMessages.quote} size="lg">
              Pedir presupuesto
            </WhatsAppButton>
            <Button to="/servicios" variant="secondary" size="lg" arrow>
              Ver servicios
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── MARQUESINA (la mueve el scroll) ───────────────────────── */
function Marquee() {
  const sep = <AxleMark className="mx-6 w-12 text-re sm:mx-10 sm:w-16" />
  const big =
    'font-display text-[clamp(3rem,8vw,7.5rem)] leading-[1.05] font-extrabold tracking-[-0.045em] [font-stretch:115%]'
  return (
    <section aria-label="Cargas generales, Buenos Aires y AMBA, flota propia, desde 1960" className="overflow-hidden border-y border-line bg-smoke py-8 sm:py-12">
      <ScrollMarquee
        items={[
          <span className={`${big} text-graphite`}>Cargas generales</span>,
          sep,
          <span className={`${big} t-accent !font-normal text-re`}>Buenos Aires</span>,
          sep,
          <span className={`${big} numeral-outline text-graphite`}>AMBA</span>,
          sep,
          <span className={`${big} text-graphite`}>Flota propia</span>,
          sep,
          <span className={`${big} t-accent !font-normal text-re`}>desde 1960</span>,
          sep,
        ]}
      />
    </section>
  )
}

/* ───────────────────────── MANIFIESTO (se lee con el scroll) ───────────────────────── */
function Manifesto() {
  return (
    <section aria-labelledby="quienes-somos" className="bg-smoke py-24 sm:py-32 lg:py-40">
      <div className={`${wrap} grid gap-10 lg:grid-cols-12`}>
        <div className="lg:col-span-3">
          <div className="lg:sticky lg:top-32">
            <Label index="01">Quiénes somos</Label>
            <h2 id="quienes-somos" className="sr-only">
              Quiénes somos
            </h2>
          </div>
        </div>
        <div className="lg:col-span-9">
          <ScrollHighlight
            className="font-display text-[clamp(1.75rem,1.1rem+2.6vw,3.6rem)] leading-[1.12] font-semibold tracking-[-0.03em] text-graphite [font-stretch:106%]"
            text={`Somos una empresa de familia. Empezamos en ${company.foundedYear} con un solo camión en El Talar y hoy, en nuestra tercera generación, seguimos trabajando con flota propia en Buenos Aires y AMBA.`}
          />
          <Reveal className="mt-14 grid gap-8 border-t border-line pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="max-w-md leading-relaxed text-ink-soft">
              Nos apoyamos en los mismos pilares desde el primer día: la honestidad y el sentido de responsabilidad.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-graphite" aria-label="Nuestros valores">
              {company.values.map((v) => (
                <li key={v} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-re" aria-hidden />
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── SERVICIOS (lista editorial) ───────────────────────── */
function ServicesList() {
  return (
    <section aria-labelledby="servicios-titulo" className="bg-white py-24 sm:py-32">
      <div className={wrap}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Label index="02">Servicios</Label>
            <RevealLines
              id="servicios-titulo"
              className="t-display mt-6 text-graphite"
              lines={['Lo que hacemos,', <>hecho con <span className="t-accent text-re">oficio.</span></>]}
            />
          </div>
          <Reveal variant="fade" className="shrink-0">
            <TextLink to="/servicios" className="text-graphite">
              Ver todos los servicios
            </TextLink>
          </Reveal>
        </div>

        <ol className="mt-16 border-t border-graphite/15 lg:mt-20">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 70} className="border-b border-graphite/15">
              <Link
                to={`/servicios#${s.id}`}
                className="group relative isolate grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 py-7 sm:gap-x-8 sm:py-9 lg:grid-cols-[5rem_1.1fr_1fr_auto] lg:py-10"
              >
                {/* relleno grafito que entra desde la izquierda al interactuar */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 -right-3 -left-3 -z-10 origin-left scale-x-0 rounded-2xl bg-graphite transition-transform duration-700 ease-out-soft group-hover:scale-x-100 group-focus-visible:scale-x-100 sm:-right-6 sm:-left-6"
                />
                <span className="self-start pt-2 font-display text-sm font-bold text-ink-mute transition-colors duration-500 group-hover:text-re group-focus-visible:text-re lg:self-center lg:pt-0">
                  0{i + 1}
                </span>
                <h3 className="font-display text-[clamp(1.6rem,1.1rem+2vw,2.9rem)] leading-[1.02] font-bold tracking-[-0.035em] text-graphite transition-[color,transform] duration-500 ease-out-soft [font-stretch:108%] group-hover:translate-x-2 group-hover:text-white group-focus-visible:translate-x-2 group-focus-visible:text-white">
                  {s.title}
                </h3>
                <p className="col-start-2 max-w-md text-[0.98rem] leading-relaxed text-ink-soft transition-colors duration-500 group-hover:text-white/70 group-focus-visible:text-white/70 lg:col-start-3 lg:row-start-1">
                  {s.summary}
                </p>
                <span className="group/btn col-start-3 row-span-2 row-start-1 flex size-11 items-center justify-center rounded-full border border-graphite/20 text-graphite transition-colors duration-500 group-hover:border-re group-hover:bg-re group-hover:text-white group-focus-visible:bg-re group-focus-visible:text-white sm:size-12 lg:col-start-4 lg:row-span-1">
                  <ArrowSwap size={18} />
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>

        {/* CTA después de Servicios */}
        <Reveal className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-2xl font-bold tracking-[-0.025em] text-graphite [font-stretch:106%] sm:text-3xl">
            ¿Tenés una carga <span className="t-accent font-normal text-re">para trasladar?</span>
          </p>
          <WhatsAppButton message={whatsappMessages.quote} size="lg" className="shrink-0">
            Consultar ahora
          </WhatsAppButton>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────── HISTORIA + DIFERENCIALES (bloque de contraste) ───────────────────────── */
function HistoryTeaser() {
  return (
    <ExpandSection labelledBy="historia-home" className="overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className={`${wrap} relative`}>
        <Parallax amount={90} className="pointer-events-none absolute -top-6 right-5 left-5 select-none sm:-top-12">
          <p aria-hidden className="numeral-outline text-right text-[clamp(7rem,28vw,24rem)] text-white/[0.13]">
            1960
          </p>
        </Parallax>

        <div className="relative grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Label index="03" light>
              Nuestra historia
            </Label>
            <RevealLines
              id="historia-home"
              className="t-display mt-6 text-white"
              lines={['Todo empezó', <>con <span className="t-accent text-re">un solo</span> camión.</>]}
            />
            <Reveal delay={150}>
              <p className="t-lead mt-8 max-w-lg text-pretty text-white/70">
                En {company.foundedYear}, {company.founder} puso en marcha la empresa en El Talar. Más de seis décadas
                después, la empresa sigue en manos de la familia, ya en su tercera generación.
              </p>
              <div className="mt-10">
                <Button to="/historia" variant="outline-light" size="lg" arrow>
                  Recorrer nuestra historia
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal variant="mask">
              <figure className="group overflow-hidden rounded-2xl bg-graphite-700">
                <img
                  src={archivo1}
                  alt="Uno de los primeros camiones de la familia Re, fotografía de archivo"
                  width={466}
                  height={232}
                  loading="lazy"
                  className="archive-photo aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.04]"
                />
              </figure>
              <p className="mt-4 flex items-center justify-between gap-4 text-sm text-white/55">
                <span>Uno de los primeros camiones de la familia</span>
                <span className="t-label text-white/40">Archivo</span>
              </p>
            </Reveal>
          </div>
        </div>

        {/* Diferenciales: tres afirmaciones grandes que entran desde lados alternados */}
        <ul className="relative mt-28 border-t border-white/12 lg:mt-36" aria-label="Por qué elegirnos">
          {[
            { k: 'Desde 1960.', d: 'Más de sesenta años de trabajo en el transporte de cargas, desde El Talar.' },
            { k: 'Flota propia.', d: 'Trabajamos con nuestros propios camiones, de distintos modelos, en operación activa.' },
            { k: 'Trato directo.', d: 'Una empresa familiar: cada consulta la responde la propia empresa.' },
          ].map((x, i) => (
            <Reveal
              as="li"
              key={x.k}
              variant={i % 2 ? 'right' : 'left'}
              className="grid gap-3 border-b border-white/12 py-8 sm:py-10 lg:grid-cols-12 lg:items-baseline"
            >
              <span className="t-label text-re lg:col-span-1">0{i + 1}</span>
              <p className="font-display text-[clamp(2.4rem,1.4rem+4vw,5.2rem)] leading-none font-extrabold tracking-[-0.045em] text-white [font-stretch:115%] lg:col-span-7">
                {x.k}
              </p>
              <p className="max-w-sm leading-relaxed text-white/60 lg:col-span-4">{x.d}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </ExpandSection>
  )
}

/* ───────────────────────── CTA FINAL ───────────────────────── */
function FinalCta() {
  return (
    <section aria-labelledby="cta-final" className="bg-smoke py-24 sm:py-32 lg:py-40">
      <div className={wrap}>
        <Label index="04">Hablemos</Label>
        <RevealLines
          id="cta-final"
          className="t-mega mt-8 text-graphite"
          lines={['¿Qué necesitás', <><span className="t-accent text-re">trasladar</span>?</>]}
        />
        <Reveal delay={150} className="mt-12 grid gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:items-center">
          <p className="t-lead max-w-xl text-pretty text-ink-soft lg:col-span-6">
            Escribinos por WhatsApp con el tipo de carga, origen, destino y fecha estimada. Te respondemos de manera
            directa.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
            <WhatsAppButton message={whatsappMessages.quote} size="lg" />
            <Button href={`tel:${contact.phoneTel}`} variant="secondary" size="lg" icon="phone">
              {contact.phoneDisplay}
            </Button>
          </div>
        </Reveal>
        <p className="mt-8 flex items-center gap-2 text-sm text-ink-mute">
          <Icon name="clock" size={16} /> Atención {contact.hours.toLowerCase()}
        </p>
      </div>
    </section>
  )
}

export function Home() {
  usePageMeta(
    null,
    'Transportes RE S.R.L.: transporte de cargas generales en Buenos Aires y AMBA. Empresa familiar con flota propia, desde 1960 en El Talar.',
  )
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <ServicesList />
      <HistoryTeaser />
      <FinalCta />
    </>
  )
}
