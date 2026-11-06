import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react'

/**
 * Revelado discreto (sube 14 px y aparece). Es la única animación de scroll del sitio
 * y se usa solo en encabezados y bloques clave, no en cada elemento.
 * Sin JS o con movimiento reducido, el contenido se ve siempre.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
  id,
}: {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
  id?: string
}) {
  const ref = useRef<HTMLElement>(null)
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
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag
      ref={ref}
      id={id}
      data-in={inView}
      className={`rv ${className}`}
      style={delay ? ({ transitionDelay: `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
