import { useEffect, useRef, useState, type CSSProperties } from 'react'
import flota from '../assets/img/flota-el-talar.webp'
import archivo1 from '../assets/img/archivo-camion-1.webp'
import archivo2 from '../assets/img/archivo-camion-2.webp'
import { company, whatsappMessages } from '../data/company'
import { milestones, valuesDetail } from '../data/history'
import { usePageMeta } from '../hooks/usePageMeta'
import { SHOW_PENDING_NOTES } from '../config'
import { Label, wrap } from '../components/ui/Label'
import { PendingBadge } from '../components/ui/Pending'
import { Reveal } from '../components/motion/Reveal'
import { CtaBand } from '../components/sections/CtaBand'

const i = (n: number) => ({ '--i': n }) as CSSProperties

/* 1 · Encabezado: 1960 como ancla visual */
function Intro() {
  return (
    <section className="border-b border-line bg-smoke">
      <div className={`${wrap} grid gap-12 pt-16 pb-14 sm:pt-20 lg:grid-cols-12 lg:items-end lg:pt-24 lg:pb-20`}>
        <div className="lg:col-span-7">
          <div className="enter-text" style={i(0)}>
            <Label>Nuestra historia</Label>
          </div>
          <h1 className="enter-text t-display mt-6 text-balance text-graphite" style={i(1)}>
            Una historia de familia.
          </h1>
          <p className="enter-text t-lead mt-6 max-w-xl text-pretty text-ink-soft" style={i(2)}>
            {company.founder} fundó la empresa en El Talar con un solo camión. Hoy la continúa la tercera generación
            de la familia.
          </p>
        </div>
        <div className="enter-text lg:col-span-4 lg:col-start-9 lg:text-right" style={i(3)}>
          <p aria-hidden className="t-numeral text-[clamp(5.5rem,4rem+7vw,10.5rem)] text-graphite">
            1960
          </p>
          <p className="mt-4 text-sm text-ink-mute">Fundación · El Talar, Buenos Aires</p>
        </div>
      </div>
    </section>
  )
}

/* 2 · Los orígenes: texto institucional y fotografías de archivo */
function Origins() {
  return (
    <section aria-labelledby="origenes" className="bg-white py-24 sm:py-28 lg:py-32">
      <div className={`${wrap} grid gap-14 lg:grid-cols-12 lg:gap-16`}>
        <Reveal className="lg:col-span-5">
          <Label>Los orígenes</Label>
          <h2 id="origenes" className="t-h2 mt-5 text-graphite">
            En palabras de la empresa
          </h2>
          <blockquote className="mt-8 border-l-2 border-re pl-6">
            <p className="text-[1.08rem] leading-[1.75] text-pretty text-ink-soft">
              {company.officialHistory.replace('TRANSPORTES RE S.R.L. es', 'Transportes RE S.R.L. es')}
            </p>
          </blockquote>
          <dl className="mt-10 border-t border-line pt-6">
            <dt className="t-label text-ink-mute">Primera dirección</dt>
            <dd className="mt-2 font-display text-lg font-semibold text-graphite">
              {company.founder} · {company.origin.label}
            </dd>
          </dl>
        </Reveal>

        <div className="grid content-start gap-6 lg:col-span-7">
          <figure>
            <img
              src={archivo1}
              alt="Uno de los primeros camiones de la familia Re, con caja de madera. Fotografía de archivo"
              width={466}
              height={232}
              loading="lazy"
              className="archive-photo aspect-[2/1] w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-3 text-sm text-ink-mute">Uno de los primeros camiones de la familia.</figcaption>
          </figure>
          <figure className="sm:w-2/3">
            <img
              src={archivo2}
              alt="Camión con acoplado de los primeros años, fotografía de archivo"
              width={323}
              height={234}
              loading="lazy"
              className="archive-photo aspect-[4/3] w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-3 text-sm text-ink-mute">Los primeros años. Archivo familiar.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

/* 3 · Ayer y hoy: dos fotografías, una frase */
function ThenNow() {
  return (
    <section aria-labelledby="ayer-hoy" className="bg-mist py-24 sm:py-28 lg:py-32">
      <div className={wrap}>
        <Reveal className="max-w-2xl">
          <Label>Ayer y hoy</Label>
          <h2 id="ayer-hoy" className="t-h2 mt-5 text-graphite">
            De un camión a una flota propia.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { src: archivo1, w: 466, h: 232, alt: 'Primer camión de la familia Re', year: '1960', cap: 'Un solo camión, en El Talar.', archive: true, pos: 'object-[45%_50%]' },
            { src: flota, w: 1080, h: 355, alt: 'Flota actual de Transportes RE', year: 'Hoy', cap: 'Flota propia de distintos modelos, en operación activa.', archive: false, pos: 'object-[62%_55%]' },
          ].map((x) => (
            <figure key={x.year}>
              <img
                src={x.src}
                alt={x.alt}
                width={x.w}
                height={x.h}
                loading="lazy"
                className={`aspect-[3/2] w-full rounded-2xl object-cover ${x.pos} ${x.archive ? 'archive-photo' : ''}`}
              />
              <figcaption className="mt-4 flex items-baseline gap-4">
                <span className="t-numeral text-[2rem] text-graphite">{x.year}</span>
                <span className="text-ink-soft">{x.cap}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 4 · Línea de tiempo: único recurso especial — la línea se dibuja una vez al llegar */
function Timeline() {
  const ref = useRef<HTMLOListElement>(null)
  const [drawn, setDrawn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return setDrawn(true)
    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && (setDrawn(true), io.disconnect()), {
      rootMargin: '0px 0px -20% 0px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const visible = milestones.filter((m) => !m.pending || SHOW_PENDING_NOTES)

  return (
    <section aria-labelledby="linea-tiempo" className="bg-white py-24 sm:py-28 lg:py-32">
      <div className={`${wrap} grid gap-14 lg:grid-cols-12`}>
        <Reveal className="lg:col-span-4">
          <Label>Línea de tiempo</Label>
          <h2 id="linea-tiempo" className="t-h2 mt-5 text-graphite">
            Hitos de nuestra historia
          </h2>
          <p className="mt-5 max-w-xs leading-relaxed text-ink-soft">Solo incluimos fechas confirmadas por la familia.</p>
        </Reveal>
        <ol ref={ref} className="relative lg:col-span-7 lg:col-start-6">
          <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line" />
          <span aria-hidden data-in={drawn} className="draw-y absolute top-2 bottom-2 left-[7px] w-px bg-re" />
          {visible.map((m) => (
            <li key={m.title} className="relative pb-14 pl-12 last:pb-0">
              <span
                aria-hidden
                className={`absolute top-2 left-0 size-[15px] rounded-full border-2 ${
                  m.pending ? 'border-dashed border-re/50 bg-white' : 'border-white bg-re ring-1 ring-re'
                }`}
              />
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <p className={`t-numeral text-[clamp(2.2rem,1.8rem+1.6vw,3.2rem)] ${m.pending ? 'text-ink-mute/50' : 'text-graphite'}`}>
                  {m.year}
                </p>
                {m.pending ? <PendingBadge>A confirmar</PendingBadge> : null}
              </div>
              <h3 className={`t-h3 mt-3 ${m.pending ? 'text-ink-mute' : 'text-graphite'}`}>{m.title}</h3>
              <p className={`mt-2 max-w-lg leading-relaxed ${m.pending ? 'text-ink-mute' : 'text-ink-soft'}`}>{m.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* 5 · Valores */
function Values() {
  return (
    <section aria-labelledby="valores" className="bg-smoke py-24 sm:py-28 lg:py-32">
      <div className={wrap}>
        <Reveal className="max-w-2xl">
          <Label>Valores</Label>
          <h2 id="valores" className="t-h2 mt-5 text-graphite">
            Los pilares de siempre
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {valuesDetail.map((v) => (
            <li key={v.title} className="border-t border-graphite/20 pt-6">
              <h3 className="t-h3 text-graphite">{v.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{v.text}</p>
            </li>
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
      <Origins />
      <ThenNow />
      <Timeline />
      <Values />
      <CtaBand
        title="La misma familia, el mismo compromiso."
        text="Si necesitás transportar cargas generales en Buenos Aires o AMBA, escribinos y lo conversamos."
        message={whatsappMessages.general}
      />
    </>
  )
}
