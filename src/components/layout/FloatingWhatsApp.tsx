import { useScrolled } from '../../hooks/useScrolled'
import { whatsappMessages } from '../../data/company'
import { whatsappUrl } from '../../lib/whatsapp'
import { Icon } from '../ui/Icon'

/** Acceso persistente y discreto a WhatsApp, solo en mobile/tablet y después de un poco de scroll. */
export function FloatingWhatsApp() {
  const visible = useScrolled(420)
  return (
    <a
      href={whatsappUrl(whatsappMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      tabIndex={visible ? 0 : -1}
      className={`fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex size-14 items-center justify-center rounded-full bg-re-600 text-white shadow-[0_10px_30px_-8px_rgb(7_115_184/0.6)] transition-[opacity,transform] duration-500 ease-out-soft lg:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <Icon name="whatsapp" size={26} />
    </a>
  )
}
