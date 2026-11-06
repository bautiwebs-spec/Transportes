import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react'

type Variant = 'up' | 'left' | 'right' | 'mask' | 'mask-x' | 'fade'

function useInView<T extends HTMLElement>(margin = '0px 0px -10% 0px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (e) => {
        if (e.some((x) => x.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: margin, threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [margin])
  return [ref, inView] as const
}

/**
 * Revelado al entrar en pantalla. Cada variante tiene una intención:
 * up = lectura, left/right = movimiento horizontal, mask = fotografía, fade = detalle.
 * Sin html.motion-ok (JS caído) o con movimiento reducido, el contenido se ve siempre.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  style,
  id,
}: {
  children: ReactNode
  as?: ElementType
  variant?: Variant
  delay?: number
  className?: string
  style?: CSSProperties
  id?: string
}) {
  const [ref, inView] = useInView<HTMLElement>()
  const vars = { ...style, ...(delay ? { '--d': `${delay}ms` } : {}) } as CSSProperties
  // Las máscaras recortan el elemento por completo: el observador no lo "vería".
  // Por eso se observa un contenedor sin recorte y la máscara se aplica adentro.
  if (variant === 'mask' || variant === 'mask-x') {
    return (
      <Tag ref={ref} id={id} className={className} style={vars}>
        <div data-in={inView} className={`rv rv-${variant} h-full`}>
          {children}
        </div>
      </Tag>
    )
  }
  return (
    <Tag ref={ref} id={id} data-in={inView} className={`rv rv-${variant} ${className}`} style={vars}>
      {children}
    </Tag>
  )
}

/** Título revelado línea por línea (cada línea sube desde una máscara). */
export function RevealLines({
  lines,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  id,
}: {
  lines: ReactNode[]
  as?: ElementType
  className?: string
  delay?: number
  id?: string
}) {
  const [ref, inView] = useInView<HTMLElement>('0px 0px -6% 0px')
  return (
    <Tag
      ref={ref}
      id={id}
      data-in={inView}
      className={`rv-lines ${className}`}
      style={(delay ? { '--d': `${delay}ms` } : {}) as CSSProperties}
    >
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <span style={{ '--i': i } as CSSProperties}>{l}</span>
        </span>
      ))}
    </Tag>
  )
}
