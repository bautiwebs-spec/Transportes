import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { FloatingWhatsApp } from './FloatingWhatsApp'

/** Navegación directa entre páginas: sin transiciones ni demoras. Respeta Atrás y enlaces directos. */
export function SiteLayout() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView(), 60)
      return () => clearTimeout(t)
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return (
    <>
      <Header />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
