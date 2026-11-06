import type { ReactNode } from 'react'
import { AxleMark } from './AxleMark'

/** Etiqueta de sección: marca de ejes del logo + índice opcional. */
export function Label({
  children,
  index,
  light = false,
  className = '',
}: {
  children: ReactNode
  index?: string
  light?: boolean
  className?: string
}) {
  return (
    <p className={`t-label flex items-center gap-3 ${light ? 'text-white/60' : 'text-ink-soft'} ${className}`}>
      <AxleMark className="text-re" />
      {index ? <span className={light ? 'text-white/40' : 'text-ink-mute'}>{index}</span> : null}
      <span>{children}</span>
    </p>
  )
}
