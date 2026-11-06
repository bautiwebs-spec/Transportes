import type { ReactNode } from 'react'
import { AxleMark } from './AxleMark'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>
}

type Tone = 'white' | 'smoke' | 'mist' | 'fog' | 'graphite'
const tones: Record<Tone, string> = {
  white: 'bg-white',
  smoke: 'bg-smoke',
  mist: 'bg-mist',
  fog: 'bg-fog',
  graphite: 'bg-graphite text-white',
}

export function Section({
  children,
  tone = 'white',
  className = '',
  id,
  labelledBy,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
  id?: string
  labelledBy?: string
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} py-20 sm:py-24 lg:py-32 ${className}`}>
      {children}
    </section>
  )
}

export function Eyebrow({ children, light = false, className = '' }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <p className={`t-eyebrow flex items-center gap-3 ${light ? 'text-white/70' : 'text-ink-soft'} ${className}`}>
      <AxleMark className={light ? 'text-re' : 'text-re'} />
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  light = false,
  className = '',
  align = 'left',
}: {
  eyebrow?: ReactNode
  title: ReactNode
  lead?: ReactNode
  id?: string
  light?: boolean
  className?: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center [&>p:first-child]:justify-center' : ''} max-w-3xl ${className}`}>
      {eyebrow ? <Eyebrow light={light}>{eyebrow}</Eyebrow> : null}
      <h2 id={id} className={`t-h2 mt-5 text-balance ${light ? 'text-white' : 'text-graphite'}`}>
        {title}
      </h2>
      {lead ? <p className={`t-lead mt-6 text-pretty ${light ? 'text-white/75' : 'text-ink-soft'}`}>{lead}</p> : null}
    </div>
  )
}
