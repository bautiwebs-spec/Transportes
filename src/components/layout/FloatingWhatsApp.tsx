import { useEffect, useState } from 'react'
import { whatsappMessages } from '../../data/company'
import { whatsappUrl } from '../../lib/whatsapp'
import { Icon } from '../ui/Icon'

/** Acceso persistente y discreto a WhatsApp, solo en mobile/tablet, después de un poco de scroll. */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const on = () => setVisible(window.scrollY > 480)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <a
      href={whatsappUrl(whatsappMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      tabIndex={visible ? 0 : -1}
      className={`fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex size-14 items-center justify-center rounded-full bg-re-600 text-white shadow-[0_8px_24px_-8px_rgb(7_115_184/0.55)] transition-opacity duration-300 lg:hidden ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <Icon name="whatsapp" size={26} />
    </a>
  )
}
