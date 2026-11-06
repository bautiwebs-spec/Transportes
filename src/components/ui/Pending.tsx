import type { ReactNode } from 'react'
import { SHOW_PENDING_NOTES } from '../../config'
import { Icon } from './Icon'

/** Aviso de contenido o función pendiente. Se oculta con SHOW_PENDING_NOTES = false. */
export function PendingNote({ children, className = '' }: { children: ReactNode; className?: string }) {
  if (!SHOW_PENDING_NOTES) return null
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border border-dashed border-re/40 bg-re-50/60 px-4 py-3 text-sm text-ink-soft ${className}`}
    >
      <Icon name="info" size={18} className="mt-0.5 shrink-0 text-re-600" />
      <div>
        <span className="font-semibold text-graphite">Pendiente · </span>
        {children}
      </div>
    </div>
  )
}

export function PendingBadge({ children = 'Pendiente', className = '' }: { children?: ReactNode; className?: string }) {
  if (!SHOW_PENDING_NOTES) return null
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-dashed border-re/50 bg-white/80 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.08em] text-re-700 uppercase ${className}`}
    >
      {children}
    </span>
  )
}
