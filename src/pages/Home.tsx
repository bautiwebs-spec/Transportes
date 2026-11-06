import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import flota from '../assets/img/flota-el-talar.webp'
import archivo1 from '../assets/img/archivo-camion-1.webp'
import { company, whatsappMessages } from '../data/company'
import { services } from '../data/services'
import { usePageMeta } from '../hooks/usePageMeta'
import { Button, TextLink, WhatsAppButton } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { Label, wrap } from '../components/ui/Label'
import { Reveal } from '../components/motion/Reveal'
import { CtaBand } from '../components/sections/CtaBand'

const i = (n: number) => ({ '--i': n }) as CSSProperties

/* 1 · Hero: una sola composición. Título y acciones sobre la fotografía panorámica de la flota. */
function Hero() {
  return (
    <section className="bg-white">
      <div className={`${wrap} pt-14 pb-12 sm:pt-20 lg:pt-24 lg:pb-14`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="enter-text t-label flex items-center gap-3 text-ink-mute" style={i(0)}>
              <span aria-hidden className="h-px w-6 bg-re" />
              Transporte de cargas generales · Desde {company.foundedYear}
            </p>
            <h1
              className="enter-text mt-6 font-display text-[clamp(2.6rem,1.3rem+4.4vw,5.1rem)] leading-[1.02] font-[620] tracking-[-0.035em] text-balance text-graphite"
              style={i(1)}
            >
              El compromiso nos mueve desde 1960.
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <p className="enter-text t-lead text-pretty text-ink-soft" style={i(2)}>
              Transporte de cargas generales en Buenos Aires y AMBA. Tres generaciones construyendo confianza.
            </p>
            <div className="enter-text mt-7 flex flex-col gap-3 sm:flex-row" style={i(3)}>
              <WhatsAppButton message={whatsappMessages.quote} size="lg">
                Pedir presupuesto
              </WhatsAppButton>
              <Button to="/servicios" variant="secondary" size="lg">
                Servicios
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Fotografía protagonista, de borde a borde en escritorio */}
      <figure className="enter-photo relative mx-auto max-w-[1440px] overflow-hidden bg-fog sm:mx-5 sm:rounded-2xl lg:mx-auto lg:rounded-none 2xl:rounded-2xl">
        <img
          src={flota}
          alt="Flota de camiones de Transportes RE en la base de El Talar, Buenos Aires"
          width={1080}
          height={355}
          fetchPriority="high"
          className="aspect-[4/3] w-full object-cover object-[62%_60%] sm:aspect-[16/7] lg:aspect-[1080/355]"
        />
        <figcaption className="absolute bottom-4 left-4 rounded-md bg-white/90 px-3 py-1.5 text-xs font-medium text-graphite sm:bottom-6 sm:left-6 lg:left-10">
          Flota propia · El Talar, Buenos Aires
        </figcaption>
      </figure>
    </section>
  )
}

/* 2 · La empresa en una frase + tres datos */
function Intro() {
  const facts = [
    { k: String(company.foundedYear), v: 'Año de fundación' },
    { k: 'Flota propia', v: 'Camiones de distintos modelos' },
    { k: 'Buenos Aires y AMBA', v: 'Zona de operación' },
  ]
  return (
    <section aria-labelledby="empresa" className="bg-white py-24 sm:py-28 lg:py-36">
      <div className={`${wrap} grid gap-10 lg:grid-cols-12`}>
        <div className="lg:col-span-3">
          <Label>La empresa</Label>
        </div>
        <Reveal className="lg:col-span-9">
          <h2 id="empresa" className="font-display text-[clamp(1.6rem,1.2rem+1.5vw,2.4rem)] leading-[1.25] font-medium tracking-[-0.02em] text-pretty text-graphite">
            Transportamos cargas generales en Buenos Aires y AMBA con camiones propios y la atención directa de la
            propia empresa.
          </h2>
          <dl className="mt-14 grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.v}>
                <dt className="sr-only">{f.v}</dt>
                <dd>
                  <span className="block font-display text-[1.6rem] font-semibold tracking-[-0.02em] text-graphite">{f.k}</span>
                  <span className="mt-1 block text-sm text-ink-mute">{f.v}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

/* 3 · Servicios: cuatro ejes, lectura rápida */
function Services() {
  return (
    <section aria-labelledby="servicios-titulo" className="bg-smoke py-24 sm:py-28 lg:py-32">
      <div className={wrap}>
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Label>Servicios</Label>
            <h2 id="servicios-titulo" className="t-h2 mt-5 text-graphite">
              Qué hacemos
            </h2>
          </div>
          <TextLink to="/servicios" className="text-graphite">
            Ver servicios
          </TextLink>
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:mt-14">
          {services.map((s) => (
            <li key={s.id} className="bg-white">
              <Link to={`/servicios#${s.id}`} className="group flex h-full gap-5 p-7 sm:p-9">
                <Icon name={s.icon} size={24} className="mt-0.5 shrink-0 text-re" />
                <div>
                  <h3 className="t-h3 text-graphite transition-colors duration-200 group-hover:text-re-700">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{s.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* 4 · Historia resumida, con acceso a la página completa */
function HistorySummary() {
  return (
    <section aria-labelledby="historia-home" className="bg-white py-24 sm:py-28 lg:py-36">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
        <figure className="lg:col-span-6">
          <img
            src={archivo1}
            alt="Uno de los primeros camiones de la familia Re, fotografía de archivo"
            width={466}
            height={232}
            loading="lazy"
            className="archive-photo aspect-[2/1] w-full rounded-2xl object-cover"
          />
          <figcaption className="mt-3 text-sm text-ink-mute">Uno de los primeros camiones de la familia. Archivo.</figcaption>
        </figure>
        <Reveal className="lg:col-span-5 lg:col-start-8">
          <Label>Nuestra historia</Label>
          <h2 id="historia-home" className="t-h2 mt-5 text-balance text-graphite">
            Empezó con un solo camión.
          </h2>
          <p className="t-lead mt-5 text-pretty text-ink-soft">
            {company.founder} fundó la empresa en El Talar en {company.foundedYear}. Hoy la continúa la tercera
            generación de la familia.
          </p>
          <div className="mt-8">
            <TextLink to="/historia" className="text-re-700">
              Conocer nuestra historia
            </TextLink>
          </div>
        </Reveal>
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
      <Intro />
      <Services />
      <HistorySummary />
      <CtaBand
        title="¿Necesitás trasladar una carga?"
        text="Escribinos por WhatsApp con el tipo de carga, el origen, el destino y la fecha estimada. Te respondemos de manera directa."
        message={whatsappMessages.quote}
        label="Presupuestos"
      />
    </>
  )
}
