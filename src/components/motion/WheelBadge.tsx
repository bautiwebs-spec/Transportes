import { motion, useScroll, useTransform } from 'motion/react'
import { useMotionOK } from '../../hooks/useMedia'

/**
 * Sello circular que gira como una rueda, solo cuando el visitante se desplaza.
 * Retoma las ruedas del logo. No tiene movimiento constante.
 */
export function WheelBadge({ text, className = '' }: { text: string; className?: string }) {
  const ok = useMotionOK()
  const { scrollY } = useScroll()
  const rotate = useTransform(scrollY, (v) => v * 0.18)
  return (
    <div className={`size-28 sm:size-36 ${className || 'relative'}`} aria-hidden>
      <motion.svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" style={ok ? { rotate } : undefined}>
        <defs>
          <path id="wheel-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="99" fill="white" />
        <text className="fill-graphite font-sans text-[15.5px] font-semibold tracking-[0.32em] uppercase">
          <textPath href="#wheel-path">{text}</textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-[44%] items-center justify-center rounded-full bg-graphite">
          <span className="size-[34%] rounded-full bg-re" />
        </span>
      </div>
    </div>
  )
}
