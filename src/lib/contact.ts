/**
 * Envío del formulario de contacto.
 *
 * ESTADO: PENDIENTE DE INTEGRACIÓN. Esta función todavía NO envía correos.
 * Devuelve `not-configured` para que la interfaz lo informe con honestidad.
 *
 * Para conectarlo más adelante (ej.: Formspree, Resend, un endpoint propio):
 *  1. Definir el correo definitivo de la empresa que recibirá las consultas.
 *  2. Enviar `data` al servicio elegido, configurando `reply_to = data.email`
 *     para que la empresa pueda responder directamente al remitente.
 *  3. Devolver { status: 'sent' } si el envío fue exitoso, o { status: 'error' }.
 */
export type ContactFormData = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export type SubmitResult = { status: 'sent' } | { status: 'error' } | { status: 'not-configured' }

export const CONTACT_FORM_ENABLED = false

export async function submitContactForm(_data: ContactFormData): Promise<SubmitResult> {
  if (!CONTACT_FORM_ENABLED) return { status: 'not-configured' }
  // TODO: integrar servicio real de envío.
  return { status: 'error' }
}
