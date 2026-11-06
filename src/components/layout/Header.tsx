import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navItems } from '../../data/navigation'
import { contact, whatsappMessages } from '../../data/company'
import { Icon } from '../ui/Icon'
import { WhatsAppButton } from '../ui/Button'
import { Logo } from './Logo'

/**
 * Header V3: barra fija y estable. Al hacer scroll solo suma una línea inferior.
 * No se oculta ni cambia de forma: navegación siempre a mano.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolled || open ? 'shadow-[0_1px_0_var(--color-line)]' : ''
        }`}
      >
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-graphite focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido
        </a>
        <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-20 lg:px-10">
          <Logo className="h-10 lg:h-11" />

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `text-[0.92rem] font-medium transition-colors duration-200 ${isActive ? 'text-graphite' : 'text-ink-soft hover:text-graphite'}`
                    }
                  >
                    <span className="link-u">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <WhatsAppButton message={whatsappMessages.general} size="sm" className="px-5">
              Consultar
            </WhatsAppButton>
          </div>

          <button
            type="button"
            className="-mr-2 flex size-11 items-center justify-center rounded-full text-graphite lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </header>

      {/* Menú mobile: panel blanco simple, fuera del header (backdrop-filter rompería position:fixed) */}
      <div
        id="menu-movil"
        className={`fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-white transition-[opacity,visibility] duration-200 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="flex min-h-full flex-col px-5 pt-4 pb-10 sm:px-8">
          <nav aria-label="Menú móvil">
            <ul className="divide-y divide-line border-y border-line">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-5 font-display text-[1.4rem] font-semibold tracking-[-0.015em] ${
                        isActive ? 'text-re-700' : 'text-graphite'
                      }`
                    }
                  >
                    {item.label}
                    <Icon name="arrowRight" size={18} className="text-ink-mute" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto space-y-3 pt-10">
            <WhatsAppButton message={whatsappMessages.general} size="lg" className="w-full" />
            <a
              href={`tel:${contact.phoneTel}`}
              className="flex h-[3.25rem] w-full items-center justify-center gap-2.5 rounded-full border border-graphite/20 font-semibold text-graphite"
            >
              <Icon name="phone" size={18} /> {contact.phoneDisplay}
            </a>
            <p className="pt-2 text-center text-sm text-ink-mute">{contact.hours}</p>
          </div>
        </div>
      </div>
    </>
  )
}
