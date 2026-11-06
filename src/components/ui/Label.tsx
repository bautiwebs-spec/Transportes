import type { ReactNode } from 'react'

/** Etiqueta de sección: texto en versalitas con una línea corta azul. */
export function Label({ children, light = false, className = '' }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <p className={`t-label flex items-center gap-3 ${light ? 'text-white/60' : 'text-ink-mute'} ${className}`}>
      <span aria-hidden className="h-px w-6 bg-re" />
      {children}
    </p>
  )
}

/** Contenedor estándar */
export const wrap = 'mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10'
