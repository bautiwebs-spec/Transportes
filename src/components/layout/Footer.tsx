import { Link } from 'react-router-dom'
import { navItems } from '../../data/navigation'
import { company, contact, fullAddress, whatsappMessages } from '../../data/company'
import { whatsappUrl } from '../../lib/whatsapp'
import { Container } from '../ui/Layout'
import { Icon } from '../ui/Icon'
import { AxleMark } from '../ui/AxleMark'
import { Logo } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-smoke">
      <Container className="pt-16 pb-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo className="h-14" />
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-ink-soft">
              {company.activity} en {company.area}. Empresa familiar desde {company.foundedYear}.
            </p>
            <AxleMark className="mt-8 text-re" />
          </div>

          <nav aria-label="Pie de página" className="lg:col-span-2">
            <h2 className="t-eyebrow text-ink-mute">Navegación</h2>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-[0.95rem] text-graphite transition-colors hover:text-re-700">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="t-eyebrow text-ink-mute">Contacto</h2>
            <ul className="mt-5 space-y-3.5 text-[0.95rem]">
              <li>
                <a
                  href={whatsappUrl(whatsappMessages.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-graphite transition-colors hover:text-re-700"
                >
                  <Icon name="whatsapp" size={17} className="text-re" /> WhatsApp {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phoneTel}`} className="inline-flex items-center gap-2.5 text-graphite transition-colors hover:text-re-700">
                  <Icon name="phone" size={17} className="text-re" /> {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2.5 break-all text-graphite transition-colors hover:text-re-700">
                  <Icon name="mail" size={17} className="shrink-0 text-re" /> {contact.email}
                </a>
              </li>
              {contact.instagram ? (
                <li>
                  <a href={contact.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-graphite hover:text-re-700">
                    <Icon name="instagram" size={17} className="text-re" /> @{contact.instagram.user}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="t-eyebrow text-ink-mute">Ubicación</h2>
            <address className="mt-5 space-y-3.5 text-[0.95rem] not-italic text-graphite">
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-2.5 transition-colors hover:text-re-700">
                <Icon name="pin" size={17} className="mt-0.5 shrink-0 text-re" />
                <span>{fullAddress}</span>
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
          <p>
            Desde {company.foundedYear} · {contact.address.town}, {contact.address.province}
          </p>
        </div>
      </Container>
    </footer>
  )
}
