import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navItems } from '../../data/navigation'
import { contact, whatsappMessages } from '../../data/company'
import { useScrolled } from '../../hooks/useScrolled'
import { Container } from '../ui/Layout'
import { Icon } from '../ui/Icon'
import { WhatsAppButton } from '../ui/Button'
import { Logo } from './Logo'

export function Header() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out-soft ${
        solid ? 'bg-white/92 shadow-[0_1px_0_var(--color-line),0_10px_30px_-24px_rgb(37_45_58/0.5)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-graphite focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido
      </a>
      <Container>
        <div
          className={`flex items-center justify-between gap-6 transition-[height] duration-500 ease-out-soft ${
            scrolled ? 'h-[68px]' : 'h-[76px] lg:h-[88px]'
          }`}
        >
          <Logo className={`transition-[height] duration-500 ease-out-soft ${scrolled ? 'h-10' : 'h-11 lg:h-14'}`} />

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `relative px-3 py-2 text-[0.92rem] font-medium transition-colors duration-300 after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-re after:transition-transform after:duration-400 ${
                        isActive
                          ? 'text-graphite after:scale-x-100'
                          : 'text-ink-soft after:scale-x-0 hover:text-graphite hover:after:scale-x-100'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <WhatsAppButton message={whatsappMessages.general} size="sm" className="h-11 px-5">
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
      </Container>
    </header>

      {/* Menú mobile (fuera del header: su backdrop-filter rompería position:fixed) */}
      <div
        id="menu-movil"
        className={`fixed inset-x-0 top-[76px] bottom-0 z-40 overflow-y-auto bg-white transition-[opacity,visibility] duration-400 ease-out-soft lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        } ${scrolled ? 'top-[68px]' : ''}`}
      >
        <Container className="flex min-h-full flex-col pt-6 pb-10">
          <nav aria-label="Menú móvil">
            <ul className="divide-y divide-line border-y border-line">
              {navItems.map((item, i) => (
                <li
                  key={item.to}
                  className={`transition-[opacity,transform] duration-500 ease-out-soft ${open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                  style={{ transitionDelay: open ? `${60 + i * 40}ms` : '0ms' }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-5 font-display text-2xl font-bold tracking-[-0.02em] ${
                        isActive ? 'text-re-700' : 'text-graphite'
                      }`
                    }
                  >
                    {item.label}
                    <Icon name="arrowRight" size={20} className="text-ink-mute" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto space-y-4 pt-10">
            <WhatsAppButton message={whatsappMessages.general} size="lg" className="w-full" />
            <a
              href={`tel:${contact.phoneTel}`}
              className="flex h-14 w-full items-center justify-center gap-2.5 rounded-full border border-graphite/15 font-semibold text-graphite"
            >
              <Icon name="phone" size={18} /> {contact.phoneDisplay}
            </a>
            <p className="pt-2 text-center text-sm text-ink-mute">{contact.hours}</p>
          </div>
        </Container>
      </div>
    </>
  )
}
