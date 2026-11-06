import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { useMotionOK } from '../../hooks/useMedia'

/** Parallax leve: el elemento se desplaza a otra velocidad que el scroll. */
export function Parallax({
  children,
  amount = 60,
  className = '',
}: {
  children: ReactNode
  amount?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const ok = useMotionOK()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount])
  return (
    <motion.div ref={ref} style={ok ? { y } : undefined} className={className}>
      {children}
    </motion.div>
  )
}

/**
 * Franja de palabras que se desplaza horizontalmente al ritmo del scroll.
 * Es el "movimiento" de la marca: no se mueve sola, la mueve el visitante.
 */
export function ScrollMarquee({
  items,
  className = '',
  reverse = false,
}: {
  items: ReactNode[]
  className?: string
  reverse?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const ok = useMotionOK()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const x = useTransform(smooth, [0, 1], reverse ? ['-28%', '0%'] : ['0%', '-28%'])
  const row = [...items, ...items, ...items]
  return (
    <div ref={ref} className={`overflow-hidden ${className}`} aria-hidden>
      <motion.div style={ok ? { x } : undefined} className="flex w-max items-center whitespace-nowrap">
        {row.map((it, i) => (
          <span key={i} className="flex items-center">
            {it}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/** Texto que se "ilumina" palabra por palabra mientras se lee con el scroll. */
export function ScrollHighlight({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const ok = useMotionOK()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} ok={ok}>
          {w}
        </Word>
      ))}
    </p>
  )
}

function Word({
  children,
  progress,
  range,
  ok,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  ok: boolean
}) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <>
      <motion.span style={ok ? { opacity } : undefined}>{children}</motion.span>{' '}
    </>
  )
}
