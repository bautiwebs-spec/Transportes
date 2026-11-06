import { contact } from '../data/company'

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${contact.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function mailtoUrl(subject?: string, body?: string) {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const qs = params.toString().replace(/\+/g, '%20')
  return `mailto:${contact.email}${qs ? `?${qs}` : ''}`
}
