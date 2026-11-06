import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useDesktop, useMotionOK } from '../../hooks/useMedia'

/**
 * Bloque de contraste que entra como una pieza recortada y se expande a todo el ancho
 * a medida que se desplaza: la composición gana profundidad con el scroll.
 */
export function ExpandSection({
  children,
  className = '',
  tone = 'graphite',
  id,
  labelledBy,
}: {
  children: ReactNode
  className?: string
  tone?: 'graphite' | 'blue'
  id?: string
  labelledBy?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const ok = useMotionOK()
  const desktop = useDesktop()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.15'] })
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [desktop ? 'inset(0% 5% 0% 5% round 40px)' : 'inset(0% 2.5% 0% 2.5% round 24px)', 'inset(0% 0% 0% 0% round 0px)'],
  )
  const bg = tone === 'graphite' ? 'bg-graphite' : 'bg-re-600'
  return (
    <motion.section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      style={ok ? { clipPath } : undefined}
      className={`relative ${bg} text-white ${className}`}
    >
      {children}
    </motion.section>
  )
}
