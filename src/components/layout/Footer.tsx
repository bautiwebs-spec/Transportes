import { Link } from 'react-router-dom'
import { navItems } from '../../data/navigation'
import { company, contact, fullAddress, whatsappMessages } from '../../data/company'
import { whatsappUrl } from '../../lib/whatsapp'
import { Icon } from '../ui/Icon'
import { wrap } from '../ui/Label'
import { Logo } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-smoke">
      <div className={`${wrap} py-16 lg:py-20`}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo className="h-12" />
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-ink-soft">
              {company.activity} en {company.area}. Empresa familiar con base en El Talar.
            </p>
          </div>

          <nav aria-label="Pie de página" className="lg:col-span-2">
            <h2 className="t-label text-ink-mute">Navegación</h2>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-[0.95rem] text-graphite">
                    <span className="link-u">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="t-label text-ink-mute">Contacto</h2>
            <ul className="mt-5 space-y-3.5 text-[0.95rem]">
              <li>
                <a href={whatsappUrl(whatsappMessages.general)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-graphite">
                  <Icon name="whatsapp" size={17} className="text-re" /> <span className="link-u">WhatsApp {contact.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phoneTel}`} className="inline-flex items-center gap-2.5 text-graphite">
                  <Icon name="phone" size={17} className="text-re" /> <span className="link-u">{contact.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2.5 break-all text-graphite">
                  <Icon name="mail" size={17} className="shrink-0 text-re" /> <span className="link-u">{contact.email}</span>
                </a>
              </li>
              {contact.instagram ? (
                <li>
                  <a href={contact.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-graphite">
                    <Icon name="instagram" size={17} className="text-re" /> <span className="link-u">@{contact.instagram.user}</span>
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="t-label text-ink-mute">Ubicación</h2>
            <address className="mt-5 space-y-3.5 text-[0.95rem] text-graphite not-italic">
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-2.5">
                <Icon name="pin" size={17} className="mt-0.5 shrink-0 text-re" />
                <span className="link-u">{fullAddress}</span>
              </a>
              <p className="flex gap-2.5">
                <Icon name="clock" size={17} className="mt-0.5 shrink-0 text-re" />
                <span>{contact.hours}</span>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-sm text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name} · Todos los derechos reservados.
          </p>
          <p>Desde {company.foundedYear} · El Talar, Buenos Aires</p>
        </div>
      </div>
    </footer>
  )
}
