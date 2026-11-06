import flota from '../assets/img/flota-el-talar.webp'
import archivo1 from '../assets/img/archivo-camion-1.webp'
import archivo2 from '../assets/img/archivo-camion-2.webp'
import { company, whatsappMessages } from '../data/company'
import { generations, milestones, valuesDetail } from '../data/history'
import { usePageMeta } from '../hooks/usePageMeta'
import { SHOW_PENDING_NOTES } from '../config'
import { Container, Eyebrow, Section, SectionHeading } from '../components/ui/Layout'
import { Reveal } from '../components/ui/Reveal'
import { PendingBadge } from '../components/ui/Pending'
import { CtaBand } from '../components/sections/CtaBand'

function ArchivePrint({
  src,
  alt,
  w,
  h,
  caption,
  className = '',
}: {
  src: string
  alt: string
  w: number
  h: number
  caption: string
  className?: string
}) {
  return (
    <figure className={`bg-white p-3 shadow-[0_30px_60px_-34px_rgb(37_45_58/0.5)] sm:p-4 ${className}`}>
      <img src={src} alt={alt} width={w} height={h} loading="lazy" className="archive-photo w-full object-cover" />
      <figcaption className="flex items-center justify-between gap-3 px-1 pt-3 text-xs text-ink-mute sm:text-sm">
        <span>{caption}</span>
        <span className="shrink-0 font-semibold tracking-[0.12em] uppercase">Archivo familiar</span>
      </figcaption>
    </figure>
  )
}

export function Historia() {
  usePageMeta(
    'Nuestra historia',
    'La historia de Transportes RE S.R.L.: fundada en 1960 por Juan Bautista Re en El Talar con un solo camión. Hoy, una empresa familiar en su tercera generación.',
  )
  const visibleMilestones = milestones.filter((m) => !m.pending || SHOW_PENDING_NOTES)

  return (
    <>
      {/* ───────────── INTRO EDITORIAL ───────────── */}
      <section className="relative overflow-hidden bg-mist pt-[calc(76px+3.5rem)] lg:pt-[calc(88px+4.5rem)]">
        <Container className="relative">
          <Reveal>
            <Eyebrow>Nuestra historia · Desde {company.foundedYear}</Eyebrow>
          </Reveal>
          <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal delay={60} className="lg:col-span-7">
              <h1 className="t-display text-balance text-graphite">
                Una historia que empezó con un solo camión.
              </h1>
            </Reveal>
            <Reveal delay={140} className="lg:col-span-5 lg:pb-2">
              <p className="t-lead text-pretty text-ink-soft">
                {company.founder} fundó la empresa en El Talar en {company.foundedYear}. Tres generaciones después,
                seguimos trabajando con los mismos valores.
              </p>
            </Reveal>
          </div>
        </Container>

        {/* Numeral 1960 como recurso visual */}
        <div aria-hidden className="relative mt-10 select-none sm:mt-6">
          <Container>
            <p className="numeral-outline -mb-[0.16em] text-[clamp(7rem,30vw,25rem)]">1960</p>
          </Container>
        </div>
      </section>

      {/* ───────────── TEXTO INSTITUCIONAL + ARCHIVO ───────────── */}
      <Section tone="white" labelledBy="origen" className="pt-16! sm:pt-20! lg:pt-24!">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-6">
              <Eyebrow>En palabras de la empresa</Eyebrow>
              <h2 id="origen" className="sr-only">
                Nuestros orígenes
              </h2>
              <blockquote className="mt-8">
                <p className="font-display text-[1.35rem] leading-[1.5] font-semibold tracking-[-0.015em] text-pretty text-graphite sm:text-[1.6rem]">
                  “{company.officialHistory.replace('TRANSPORTES RE S.R.L. es', 'Transportes RE S.R.L. es')}”
                </p>
                <footer className="mt-8 flex items-center gap-4 text-sm text-ink-soft">
                  <span className="h-px w-10 bg-re" aria-hidden />
                  Texto institucional de {company.name}
                </footer>
              </blockquote>

              <div className="mt-14 rounded-2xl border border-line bg-smoke p-6 sm:p-8">
                <p className="t-eyebrow text-ink-mute">Primera dirección</p>
                <p className="mt-4 font-display text-2xl font-extrabold tracking-[-0.02em] text-graphite uppercase sm:text-[1.7rem]">
                  {company.founder}
                </p>
                <p className="mt-1.5 font-display text-lg font-semibold tracking-[0.04em] text-ink-soft uppercase">
                  {company.origin.label}
                </p>
              </div>
            </Reveal>

            <div className="relative lg:col-span-6">
              <Reveal>
                <ArchivePrint
                  src={archivo1}
                  alt="Uno de los primeros camiones de la familia Re, con caja de madera. Fotografía de archivo"
                  w={466}
                  h={232}
                  caption="Uno de los primeros camiones de la familia"
                />
              </Reveal>
              <Reveal delay={120} className="mt-8 sm:ml-auto sm:w-[68%]">
                <ArchivePrint
                  src={archivo2}
                  alt="Camión con acoplado y un hombre junto a la cabina, fotografía de archivo en blanco y negro"
                  w={323}
                  h={234}
                  caption="Los primeros años"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ───────────── PASADO / PRESENTE ───────────── */}
      <Section tone="smoke" labelledBy="pasado-presente">
        <Container>
          <Reveal>
            <SectionHeading
              id="pasado-presente"
              eyebrow="Ayer y hoy"
              title="De un camión a una flota propia."
              lead="La escala cambió; la forma de trabajar, no."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16 lg:gap-6">
            <Reveal className="group relative overflow-hidden rounded-2xl bg-graphite">
              <img
                src={archivo2}
                alt="Uno de los primeros camiones de la familia Re, con acoplado"
                width={323}
                height={234}
                loading="lazy"
                className="archive-photo aspect-[4/3] w-full object-cover opacity-90 transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-graphite/90 to-transparent p-6 pt-20 sm:p-8 sm:pt-24">
                <p className="font-display text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl">1960</p>
                <p className="mt-2 text-white/80">Un solo camión, en El Talar.</p>
              </div>
            </Reveal>
            <Reveal delay={100} className="group relative overflow-hidden rounded-2xl bg-graphite">
              <img
                src={flota}
                alt="Flota actual de camiones de Transportes RE"
                width={1080}
                height={355}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover object-[58%_50%] transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-graphite/90 to-transparent p-6 pt-20 sm:p-8 sm:pt-24">
                <p className="font-display text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl">Hoy</p>
                <p className="mt-2 text-white/80">Flota propia, en Buenos Aires y AMBA.</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ───────────── TRES GENERACIONES ───────────── */}
      <Section tone="white" labelledBy="generaciones">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <SectionHeading id="generaciones" eyebrow="Empresa familiar" title="Tres generaciones." />
            </Reveal>
            <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:col-span-8">
              {generations.map((g, i) => (
                <Reveal as="li" key={g.n} delay={i * 90} className="bg-white p-7 sm:p-8">
                  <span className="font-display text-5xl font-extrabold tracking-[-0.05em] text-re">{g.n}</span>
                  <p className="t-eyebrow mt-3 text-ink-mute">generación</p>
                  <h3 className="t-h3 mt-6 text-graphite">{g.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{g.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* ───────────── LÍNEA DE TIEMPO ───────────── */}
      <Section tone="mist" labelledBy="linea-tiempo">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <SectionHeading
                id="linea-tiempo"
                eyebrow="Línea de tiempo"
                title="Hitos de nuestra historia."
                lead="Solo incluimos fechas confirmadas por la familia."
              />
            </Reveal>
            <ol className="relative lg:col-span-7 lg:col-start-6">
              <span aria-hidden className="absolute top-3 bottom-3 left-[7px] w-px bg-fog sm:left-[9px]" />
              {visibleMilestones.map((m, i) => (
                <Reveal as="li" key={m.title} delay={i * 90} className="relative pb-12 pl-10 last:pb-0 sm:pl-14">
                  <span
                    aria-hidden
                    className={`absolute top-2 left-0 size-[15px] rounded-full border-[3px] sm:size-[19px] ${
                      m.pending ? 'border-dashed border-re/50 bg-mist' : 'border-mist bg-re ring-1 ring-re'
                    }`}
                  />
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                    <p
                      className={`font-display text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl ${
                        m.pending ? 'text-ink-mute/60' : 'text-graphite'
                      }`}
                    >
                      {m.year}
                    </p>
                    {m.pending ? <PendingBadge>A confirmar</PendingBadge> : null}
                  </div>
                  <h3 className={`t-h3 mt-3 ${m.pending ? 'text-ink-mute' : 'text-graphite'}`}>{m.title}</h3>
                  <p className={`mt-2 max-w-lg leading-relaxed ${m.pending ? 'text-ink-mute' : 'text-ink-soft'}`}>{m.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* ───────────── VALORES ───────────── */}
      <Section tone="white" labelledBy="valores">
        <Container>
          <Reveal>
            <SectionHeading
              id="valores"
              eyebrow="Nuestros valores"
              title="Los pilares de siempre."
              lead="Desde el comienzo, la empresa se apoyó en dos pilares fundamentales: la honestidad y el sentido de responsabilidad."
            />
          </Reveal>
          <ul className="mt-14 grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {valuesDetail.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 70} className="border-t-2 border-graphite pt-6 pb-8 first:border-re [&:nth-child(2)]:border-re">
                <h3 className="t-h3 text-graphite">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        title="La misma familia, el mismo compromiso."
        text="Si necesitás transportar cargas generales en Buenos Aires o AMBA, escribinos y lo conversamos."
        message={whatsappMessages.general}
        tone="graphite"
        background="smoke"
      />
    </>
  )
}
