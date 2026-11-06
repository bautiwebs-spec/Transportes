import { Icon } from './Icon'
import { SHOW_PENDING_NOTES } from '../../config'

/**
 * Espacio reservado para una fotografía real que todavía no fue entregada.
 * Claramente identificado: nunca se usan imágenes genéricas como si fueran propias.
 */
export function PhotoPlaceholder({
  label,
  className = '',
}: {
  label: string
  className?: string
}) {
  return (
    <div
      role="img"
      aria-label={`Espacio reservado para fotografía: ${label}`}
      className={`placeholder-hatch relative flex items-center justify-center overflow-hidden rounded-2xl border border-fog ${className}`}
    >
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-white text-re shadow-sm">
          <Icon name="image" size={22} />
        </span>
        <p className="text-sm font-semibold text-graphite">{label}</p>
        {SHOW_PENDING_NOTES ? (
          <p className="text-xs tracking-[0.12em] text-ink-mute uppercase">Foto real pendiente</p>
        ) : null}
      </div>
    </div>
  )
}
