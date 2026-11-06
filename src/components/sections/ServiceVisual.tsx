import flota from '../../assets/img/flota-el-talar.webp'
import { contact } from '../../data/company'
import { Icon } from '../ui/Icon'
import { PhotoPlaceholder } from '../ui/Photo'

/** Visual asociado a cada servicio. Cambiar acá cuando lleguen fotos nuevas. */
export function ServiceVisual({ id, className = '' }: { id: string; className?: string }) {
  switch (id) {
    case 'cargas-generales':
      return <PhotoPlaceholder label="Camión en operación de carga" className={className} />
    case 'flota-propia':
      return (
        <div className={`overflow-hidden rounded-2xl bg-fog ${className}`}>
          <img
            src={flota}
            alt="Camiones de la flota propia de Transportes RE"
            width={1080}
            height={355}
            loading="lazy"
            className="h-full w-full object-cover object-[30%_55%]"
          />
        </div>
      )
    case 'cobertura':
      return (
        <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-mist ${className}`}>
          <svg aria-hidden viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
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
          <div className="relative mt-24 rounded-xl bg-white/90 px-4 py-2.5 text-center shadow-sm">
            <p className="text-[0.65rem] tracking-[0.14em] text-ink-mute uppercase">Base</p>
            <p className="font-display font-bold text-graphite">El Talar</p>
          </div>
          <p className="absolute top-5 left-5 font-display text-sm font-bold tracking-[0.12em] text-re-700 uppercase">Buenos Aires · AMBA</p>
        </div>
      )
    case 'atencion':
      return (
        <div className={`flex flex-col justify-between rounded-2xl bg-graphite p-7 text-white sm:p-9 ${className}`}>
          <Icon name="people" size={30} className="text-re" />
          <div>
            <p className="font-display text-[1.5rem] leading-tight font-bold tracking-[-0.02em] text-balance [font-stretch:106%] sm:text-[1.8rem]">
              “Hablás directamente con la empresa.”
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-white/65">
              <Icon name="clock" size={16} /> {contact.hours}
            </p>
          </div>
        </div>
      )
    default:
      return null
  }
}
