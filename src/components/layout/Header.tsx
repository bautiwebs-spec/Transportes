import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navItems } from '../../data/navigation'
import { contact, whatsappMessages } from '../../data/company'
import { Icon } from '../ui/Icon'
import { WhatsAppButton } from '../ui/Button'
import { Logo } from './Logo'

/** Estado del header: arriba de todo / con scroll / oculto (bajando). */
function useHeaderState() {
  const [state, setState] = useState({ scrolled: false, hidden: false })
  const last = useRef(0)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const goingDown = y > last.current
      const hidden = goingDown && y > 160 && Math.abs(y - last.current) > 2
      setState((s) => {
        const next = { scrolled: y > 24, hidden: Math.abs(y - last.current) > 2 ? hidden : s.hidden }
        return next.scrolled === s.scrolled && next.hidden === s.hidden ? s : next
      })
      last.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return state
}

export function Header() {
  const { scrolled, hidden } = useHeaderState()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const hide = hidden && !open

  return (
    <>
      <header
        className={`enter-header fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out-soft focus-within:translate-y-0 ${
          hide ? '-translate-y-[120%]' : 'translate-y-0'
        }`}
      >
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-graphite focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido
        </a>
        <div
          className={`mx-auto transition-[max-width,padding,margin] duration-700 ease-out-soft ${
            scrolled || open ? 'mt-2.5 max-w-[1240px] px-2.5 sm:mt-3 sm:px-4' : 'mt-0 max-w-[1320px] px-0'
          }`}
        >
          <div
            className={`flex items-center justify-between gap-6 rounded-[1.4rem] transition-[background-color,box-shadow,height,padding] duration-700 ease-out-soft ${
              scrolled || open
                ? 'h-16 bg-white/85 pr-2.5 pl-4 shadow-[0_1px_0_rgb(255_255_255/0.6)_inset,0_14px_40px_-22px_rgb(37_45_58/0.45)] backdrop-blur-xl sm:pl-5'
                : 'h-[76px] bg-transparent px-5 sm:px-8 lg:h-[96px] lg:px-10'
            }`}
          >
            <Logo className={`transition-[height] duration-700 ease-out-soft ${scrolled || open ? 'h-10' : 'h-11 lg:h-14'}`} />

            <nav aria-label="Principal" className="hidden lg:block">
              <ul className="flex items-center gap-7 xl:gap-9">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        `text-[0.92rem] font-medium transition-colors duration-300 ${isActive ? 'text-graphite' : 'text-ink-soft hover:text-graphite'}`
                      }
                    >
                      <span className="link-u">{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden lg:block">
              <WhatsAppButton message={whatsappMessages.general} size="sm" className="h-11 px-5" arrow={false}>
                Consultar
              </WhatsAppButton>
            </div>

            <button
              type="button"
              className="relative flex size-11 items-center justify-center rounded-full text-graphite lg:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3.5 w-6" aria-hidden>
                <span
                  className={`absolute left-0 h-[2px] w-6 rounded bg-current transition-transform duration-500 ease-out-soft ${open ? 'top-[6px] rotate-45' : 'top-0'}`}
                />
                <span
                  className={`absolute left-0 h-[2px] rounded bg-current transition-all duration-500 ease-out-soft ${open ? 'top-[6px] w-6 -rotate-45' : 'top-3 w-4'}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menú mobile: fuera del header (su backdrop-filter rompería position:fixed) */}
      <div
        id="menu-movil"
        className={`fixed inset-0 z-40 overflow-y-auto bg-graphite text-white transition-[clip-path,visibility] duration-700 ease-in-out-soft lg:hidden ${
          open ? 'visible [clip-path:inset(0_0_0_0)]' : 'invisible [clip-path:inset(0_0_100%_0)]'
        }`}
      >
        <div className="flex min-h-full flex-col px-5 pt-28 pb-10 sm:px-8">
          <nav aria-label="Menú móvil">
            <ul>
              {navItems.map((item, i) => (
                <li
                  key={item.to}
                  className={`overflow-hidden border-b border-white/10 transition-[opacity,transform] duration-700 ease-out-soft ${
                    open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                  style={{ transitionDelay: open ? `${180 + i * 60}ms` : '0ms' } as CSSProperties}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex items-baseline gap-4 py-4 font-display text-[2rem] font-bold tracking-[-0.03em] [font-stretch:108%] ${
                        isActive ? 'text-re' : 'text-white'
                      }`
                    }
                  >
                    <span className="font-sans text-xs font-semibold tracking-[0.16em] text-white/40">0{i + 1}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div
            className={`mt-auto space-y-3 pt-10 transition-opacity duration-700 ${open ? 'opacity-100 delay-500' : 'opacity-0'}`}
          >
            <WhatsAppButton message={whatsappMessages.general} size="lg" className="w-full" />
            <a
              href={`tel:${contact.phoneTel}`}
              className="flex h-14 w-full items-center justify-center gap-2.5 rounded-full border border-white/25 font-semibold text-white"
            >
              <Icon name="phone" size={18} /> {contact.phoneDisplay}
            </a>
            <p className="pt-2 text-center text-sm text-white/50">{contact.hours}</p>
          </div>
        </div>
      </div>
    </>
  )
}
