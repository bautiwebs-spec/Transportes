import { useEffect } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Header } from './Header'
import { Footer } from './Footer'
import { FloatingWhatsApp } from './FloatingWhatsApp'
import { useMotionOK } from '../../hooks/useMedia'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Transición entre páginas: la página actual se desvanece (0,22 s), se vuelve arriba
 * y la nueva entra con un leve desplazamiento mientras una línea azul recorre la parte superior.
 * No hay pantallas de carga: la navegación sigue siendo inmediata y respeta Atrás/Adelante.
 */
export function SiteLayout() {
  const location = useLocation()
  const outlet = useOutlet()
  const ok = useMotionOK()

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  // Con anclas (#seccion) desplazarse al destino una vez montada la página
  useEffect(() => {
    if (!location.hash) return
    const t = setTimeout(() => {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: ok ? 'smooth' : 'auto' })
    }, ok ? 480 : 50)
    return () => clearTimeout(t)
  }, [location, ok])

  return (
    <>
      <Header />
      {ok ? (
        <motion.div
          key={location.pathname + '-bar'}
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-re"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
          transition={{ duration: 0.9, times: [0, 0.6, 1], ease }}
        />
      ) : null}
      <AnimatePresence mode="wait" initial={false} onExitComplete={() => !location.hash && window.scrollTo(0, 0)}>
        <motion.main
          id="contenido"
          key={location.pathname}
          initial={ok ? { opacity: 0, y: 24 } : { opacity: 0 }}
          animate={{ opacity: 1, y: 0, transition: { duration: ok ? 0.55 : 0.01, ease } }}
          exit={{ opacity: 0, y: ok ? -12 : 0, transition: { duration: ok ? 0.22 : 0.01, ease: 'easeIn' } }}
        >
          {outlet}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
