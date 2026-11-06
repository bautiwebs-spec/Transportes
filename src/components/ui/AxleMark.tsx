/**
 * Marca de "ejes": reinterpreta la disposición de ruedas del logo
 * (● ●● ●●) como pequeño indicador gráfico para etiquetas y separadores.
 */
export function AxleMark({ className = '' }: { className?: string }) {
  return (
    <svg width="34" height="8" viewBox="0 0 34 8" aria-hidden className={`shrink-0 ${className}`} fill="currentColor">
      <circle cx="4" cy="4" r="3.2" />
      <circle cx="14" cy="4" r="3.2" />
      <circle cx="21" cy="4" r="3.2" />
      <circle cx="28" cy="4" r="3.2" opacity=".35" />
    </svg>
  )
}
