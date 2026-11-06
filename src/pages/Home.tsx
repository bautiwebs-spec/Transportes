import flota from '../assets/img/flota-el-talar.webp'
import archivo1 from '../assets/img/archivo-camion-1.webp'
import { company, whatsappMessages } from '../data/company'
import { services } from '../data/services'
import { usePageMeta } from '../hooks/usePageMeta'
import { Container, Eyebrow, Section, SectionHeading } from '../components/ui/Layout'
import { Button, WhatsAppButton } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { CtaBand } from '../components/sections/CtaBand'

const facts = [
  { k: '+60 años', v: 'De trayectoria' },
  { k: '3ª', v: 'Generación familiar' },
  { k: 'Propia', v: 'Flota de camiones' },
  { k: 'AMBA', v: 'Y Buenos Aires' },
]

export function Home() {
  usePageMeta(
    null,
    'Transportes RE S.R.L.: transporte de cargas generales en Buenos Aires y AMBA. Empresa familiar con flota propia, desde 1960 en El Talar.',
  )

  return (
    <>
      {/* ───────────── HERO (split) ───────────── */}
      <section className="relative overflow-hidden bg-mist pt-[76px] lg:pt-[88px]">
        <Container>
          <div className="grid items-center gap-12 pt-10 pb-14 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:pt-16 lg:pb-24 xl:gap-14">
            <div className="lg:col-span-6 xl:col-span-6">
              <Reveal>
                <Eyebrow>Transporte de cargas generales · El Talar</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="t-display mt-7 text-balance text-graphite">
                  El compromiso nos mueve desde <span className="text-re">1960.</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="t-lead mt-7 max-w-xl text-pretty text-ink-soft">
                  Transporte de cargas generales en Buenos Aires y AMBA. Tres generaciones construyendo confianza.
                </p>
              </Reveal>
              <Reveal delay={240} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppButton message={whatsappMessages.quote} size="lg">
                  Pedir presupuesto por WhatsApp
                </WhatsAppButton>
                <Button to="/servicios" variant="secondary" size="lg" iconRight="arrowRight">
                  Ver servicios
                </Button>
              </Reveal>
            </div>

            <Reveal delay={120} className="relative lg:col-span-6 lg:-mr-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]">
              <figure className="relative">
                <div className="overflow-hidden rounded-[1.5rem] bg-fog lg:rounded-r-none">
                  <img
                    src={flota}
                    alt="Flota de camiones de Transportes RE estacionada en la base de El Talar"
                    width={1080}
                    height={355}
                    fetchPriority="high"
                    className="aspect-[16/10] w-full object-cover object-[62%_55%] sm:aspect-[16/9] lg:aspect-auto lg:h-[min(560px,62vh)] lg:min-h-[440px]"
                  />
                </div>
                {/* sello de trayectoria */}
                <figcaption className="absolute -bottom-6 left-5 flex items-center gap-4 rounded-2xl bg-white py-3.5 pr-6 pl-4 shadow-[0_18px_40px_-20px_rgb(37_45_58/0.45)] sm:left-8 lg:-left-8">
                  <span className="font-display text-[2rem] leading-none font-extrabold tracking-[-0.04em] text-re">
                    1960
                  </span>
                  <span className="h-8 w-px bg-line" aria-hidden />
                  <span className="text-[0.8rem] leading-snug text-ink-soft">
                    Nuestra flota
                    <br />
                    <strong className="font-semibold text-graphite">El Talar, Buenos Aires</strong>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>

        {/* Datos clave */}
        <div className="border-t border-fog bg-mist">
          <Container>
            <dl className="grid grid-cols-2 lg:grid-cols-4">
              {facts.map((f, i) => (
                <div
                  key={f.v}
                  className={`py-7 sm:py-8 ${i % 2 === 1 ? 'border-l border-fog pl-6 sm:pl-8' : ''} ${
                    i > 1 ? 'border-t border-fog lg:border-t-0' : ''
                  } ${i === 2 ? 'lg:border-l lg:pl-8' : ''}`}
                >
                  <dt className="sr-only">{f.v}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-extrabold tracking-[-0.03em] text-graphite sm:text-[1.75rem]">
                      {f.k}
                    </span>
                    <span className="mt-1 block text-sm text-ink-soft">{f.v}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </section>

      {/* ───────────── PRESENTACIÓN ───────────── */}
      <Section tone="white" labelledBy="quienes-somos">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <Eyebrow>Quiénes somos</Eyebrow>
              <h2 id="quienes-somos" className="t-h2 mt-5 text-balance text-graphite">
                Una empresa de familia, con más de seis décadas en la ruta.
              </h2>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
              <p className="t-lead text-pretty text-graphite">
                {company.name} nació en {company.foundedYear} en El Talar, cuando {company.founder} comenzó a
                trabajar con un solo camión.
              </p>
              <p className="mt-6 text-[1.05rem] leading-relaxed text-pretty text-ink-soft">
                Hoy, en su tercera generación, la empresa continúa en manos de la familia, con flota propia y
                trabajando en Buenos Aires y AMBA. Seguimos apoyados en los mismos pilares de siempre: la honestidad
                y el sentido de responsabilidad.
              </p>
              <ul className="mt-10 flex flex-wrap gap-2.5" aria-label="Nuestros valores">
                {company.values.map((v) => (
                  <li
                    key={v}
                    className="rounded-full border border-line bg-smoke px-4 py-2 text-sm font-medium text-graphite"
                  >
                    {v}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ───────────── SERVICIOS ───────────── */}
      <Section tone="smoke" labelledBy="servicios-titulo" className="pb-16! sm:pb-20! lg:pb-24!">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading
                id="servicios-titulo"
                eyebrow="Servicios"
                title="Lo que hacemos, hecho con oficio."
                lead="Transporte de cargas generales con flota propia, en Buenos Aires y AMBA, y con atención directa de la empresa."
              />
            </Reveal>
            <Reveal delay={100} className="shrink-0">
              <Button to="/servicios" variant="secondary" iconRight="arrowRight">
                Ver todos los servicios
              </Button>
            </Reveal>
          </div>

          <ul className="mt-14 grid border-t border-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal
                as="li"
                key={s.id}
                delay={i * 70}
                className={`group relative border-b border-line py-9 sm:px-7 lg:border-b-0 lg:py-10 ${
                  i % 2 === 1 ? 'sm:border-l' : ''
                } ${i > 0 ? 'lg:border-l' : ''} ${i === 0 ? 'sm:pl-0' : ''} ${i === 2 ? 'sm:pl-0 lg:pl-7' : ''}`}
              >
                <span className="absolute top-0 left-0 h-0.5 w-0 bg-re transition-[width] duration-500 ease-out-soft group-hover:w-full" aria-hidden />
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-white text-re shadow-[0_1px_0_var(--color-line)] transition-colors duration-300 group-hover:bg-re-600 group-hover:text-white">
                    <Icon name={s.icon} size={24} />
                  </span>
                  <span className="font-display text-sm font-bold text-ink-mute">0{i + 1}</span>
                </div>
                <h3 className="t-h3 mt-7 text-graphite">{s.title}</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">{s.summary}</p>
              </Reveal>
            ))}
          </ul>

          {/* CTA después de servicios */}
          <Reveal className="mt-12 flex flex-col gap-5 rounded-2xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="font-display text-lg font-bold text-graphite sm:text-xl">¿Tenés una carga para trasladar?</p>
              <p className="mt-1 text-ink-soft">Contanos qué necesitás y te respondemos por WhatsApp.</p>
            </div>
            <WhatsAppButton message={whatsappMessages.quote} className="shrink-0">
              Consultar ahora
            </WhatsAppButton>
          </Reveal>
        </Container>
      </Section>

      {/* ───────────── DIFERENCIALES (bloque grafito) ───────────── */}
      <Section tone="graphite" labelledBy="diferenciales">
        <Container>
          <Reveal>
            <SectionHeading
              light
              id="diferenciales"
              eyebrow="Por qué elegirnos"
              title="Trayectoria, camiones propios y trato de familia."
            />
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-3 lg:mt-20">
            {[
              {
                k: 'Desde 1960',
                t: 'Trayectoria',
                d: 'Más de sesenta años de trabajo en el transporte de cargas, desde El Talar.',
              },
              {
                k: 'Flota propia',
                t: 'Respaldo',
                d: 'Trabajamos con nuestros propios camiones, de distintos modelos, en operación activa.',
              },
              {
                k: 'Trato directo',
                t: 'Cercanía',
                d: 'Una empresa familiar: cada consulta la responde la propia empresa, sin intermediarios.',
              },
            ].map((d, i) => (
              <Reveal key={d.k} delay={i * 90} className="bg-graphite p-8 sm:p-10 lg:p-12">
                <p className="t-eyebrow text-re">{`0${i + 1} — ${d.t}`}</p>
                <p className="mt-8 font-display text-[2rem] leading-none font-extrabold tracking-[-0.035em] text-white sm:text-[2.4rem]">
                  {d.k}
                </p>
                <p className="mt-5 max-w-sm leading-relaxed text-white/70">{d.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ───────────── NUESTRA HISTORIA ───────────── */}
      <Section tone="mist" labelledBy="historia-home" className="overflow-hidden">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
            <Reveal className="relative lg:col-span-6">
              <span
                aria-hidden
                className="numeral-outline pointer-events-none absolute -top-14 -left-2 text-[7.5rem] opacity-60 select-none sm:-top-20 sm:text-[11rem]"
              >
                1960
              </span>
              <figure className="relative ml-auto w-[92%] rotate-0 bg-white p-3 shadow-[0_30px_60px_-30px_rgb(37_45_58/0.45)] sm:p-4">
                <img
                  src={archivo1}
                  alt="Uno de los primeros camiones de la familia Re, fotografía de archivo"
                  width={466}
                  height={232}
                  loading="lazy"
                  className="archive-photo aspect-[2/1] w-full object-cover"
                />
                <figcaption className="flex items-center justify-between gap-4 px-1 pt-3 text-xs text-ink-mute sm:text-sm">
                  <span>Uno de los primeros camiones de la familia</span>
                  <span className="font-semibold tracking-[0.12em] uppercase">Archivo</span>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-5 lg:col-start-8">
              <Eyebrow>Nuestra historia</Eyebrow>
              <h2 id="historia-home" className="t-h2 mt-5 text-balance text-graphite">
                Todo empezó con un solo camión.
              </h2>
              <p className="t-lead mt-6 text-pretty text-ink-soft">
                En 1960, {company.founder} puso en marcha la empresa en El Talar. Más de seis décadas después, la
                empresa sigue en manos de la familia, ya en su tercera generación.
              </p>
              <div className="mt-10">
                <Button to="/historia" variant="secondary" iconRight="arrowRight">
                  Conocer nuestra historia
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ───────────── CTA COMERCIAL ───────────── */}
      <CtaBand
        title="Hablemos de tu próximo traslado."
        text="Escribinos por WhatsApp con el tipo de carga, origen, destino y fecha estimada. Te respondemos de manera directa."
        message={whatsappMessages.quote}
        tone="blue"
        background="white"
      />
    </>
  )
}
