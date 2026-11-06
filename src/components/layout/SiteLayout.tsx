import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { FloatingWhatsApp } from './FloatingWhatsApp'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export function SiteLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
