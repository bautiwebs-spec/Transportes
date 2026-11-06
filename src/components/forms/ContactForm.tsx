import { useRef, useState, type FormEvent } from 'react'
import { contact } from '../../data/company'
import { submitContactForm, type ContactFormData } from '../../lib/contact'
import { mailtoUrl, whatsappUrl } from '../../lib/whatsapp'
import { Icon } from '../ui/Icon'
import { Arrow } from '../ui/Button'
import { PendingNote } from '../ui/Pending'
import { TextArea, TextField } from './Field'

type Errors = Partial<Record<keyof ContactFormData, string>>
const empty: ContactFormData = { name: '', email: '', phone: '', subject: '', message: '' }

function validate(d: ContactFormData): Errors {
  const e: Errors = {}
  if (d.name.trim().length < 2) e.name = 'Ingresá tu nombre y apellido.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = 'Ingresá un correo electrónico válido.'
  if (d.phone.trim() && d.phone.replace(/\D/g, '').length < 8) e.phone = 'Revisá el número de teléfono.'
  if (d.subject.trim().length < 3) e.subject = 'Contanos brevemente el motivo de tu consulta.'
  if (d.message.trim().length < 10) e.message = 'El mensaje es muy corto.'
  return e
}

function composeText(d: ContactFormData) {
  return [
    `Hola, Transportes RE. ${d.subject.trim()}`,
    '',
    d.message.trim(),
    '',
    `${d.name.trim()}`,
    `${d.email.trim()}${d.phone.trim() ? ` · ${d.phone.trim()}` : ''}`,
  ].join('\n')
}

/**
 * Formulario de contacto — diseñado para una futura integración real.
 * Mientras el envío no esté conectado, NO simula un envío exitoso:
 * informa la situación y ofrece continuar por WhatsApp o por correo con el texto ya cargado.
 */
export function ContactForm() {
  const [data, setData] = useState<ContactFormData>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<'idle' | 'sending' | 'not-configured' | 'sent' | 'error'>('idle')
  const statusRef = useRef<HTMLDivElement>(null)

  const set = (k: keyof ContactFormData) => (e: { target: { value: string } }) => {
    setData((d) => ({ ...d, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate(data)
    setErrors(errs)
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0]
      document.getElementById(`f-${first}`)?.focus()
      return
    }
    setState('sending')
    const res = await submitContactForm(data)
    setState(res.status)
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6" aria-describedby="form-nota">
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Nombre y apellido" name="name" autoComplete="name" required value={data.name} onChange={set('name')} error={errors.name} />
        <TextField label="Teléfono" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={data.phone} onChange={set('phone')} error={errors.phone} />
      </div>
      <TextField
        label="Correo electrónico"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        value={data.email}
        onChange={set('email')}
        error={errors.email}
        hint="Te responderemos a esta dirección."
      />
      <TextField label="Asunto" name="subject" required value={data.subject} onChange={set('subject')} error={errors.subject} />
      <TextArea label="Mensaje" name="message" required value={data.message} onChange={set('message')} error={errors.message} />

      <div id="form-nota">
        <PendingNote>
          El envío del formulario todavía no está conectado a un servicio de correo. Al enviarlo, te vamos a ofrecer
          continuar por WhatsApp o por correo con tu mensaje ya cargado.
        </PendingNote>
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-mute">
          <span className="text-re-700">*</span> Campos obligatorios
        </p>
        <button
          type="submit"
          disabled={state === 'sending'}
          className="group/btn inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-graphite px-7 font-semibold text-white transition-colors duration-300 hover:bg-graphite-900 disabled:opacity-60"
        >
          {state === 'sending' ? 'Enviando…' : 'Enviar consulta'}
          <Arrow />
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
        {state === 'not-configured' ? (
          <div className="rounded-2xl border border-fog bg-mist p-6 sm:p-7">
            <p className="flex items-center gap-2.5 font-display text-lg font-bold text-graphite">
              <Icon name="info" size={20} className="text-re-700" /> Tu mensaje todavía no fue enviado
            </p>
            <p className="mt-2 leading-relaxed text-ink-soft">
              El envío desde el sitio aún no está habilitado. Podés mandarlo ahora mismo por alguno de estos canales; el
              texto ya está preparado.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl(composeText(data))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-re-600 px-6 font-semibold text-white transition-colors hover:bg-re-700"
              >
                <Icon name="whatsapp" size={19} /> Enviar por WhatsApp
              </a>
              <a
                href={mailtoUrl(data.subject, composeText(data))}
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-graphite/15 bg-white px-6 font-semibold text-graphite transition-colors hover:border-graphite/35"
              >
                <Icon name="mail" size={19} /> Enviar por correo
              </a>
            </div>
          </div>
        ) : null}
        {state === 'sent' ? (
          <p className="flex items-center gap-2 rounded-2xl bg-mist p-5 font-semibold text-graphite">
            <Icon name="check" size={20} className="text-re-700" /> ¡Gracias! Recibimos tu consulta.
          </p>
        ) : null}
        {state === 'error' ? (
          <p className="rounded-2xl bg-mist p-5 text-graphite">
            No pudimos enviar tu mensaje. Escribinos por WhatsApp al {contact.phoneDisplay}.
          </p>
        ) : null}
      </div>
    </form>
  )
}
