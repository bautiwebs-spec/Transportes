import { company, contact } from './company'

export type Faq = { q: string; a: string }

/** Respuestas basadas únicamente en datos confirmados. */
export const faqs: Faq[] = [
  {
    q: '¿Qué tipo de cargas transportan?',
    a: 'Nos dedicamos al transporte de cargas generales. Si tenés una carga en particular y querés saber si podemos trasladarla, escribinos con el detalle y lo conversamos.',
  },
  {
    q: '¿En qué zonas trabajan?',
    a: `Operamos en ${company.area}. Nuestra base está en El Talar, provincia de Buenos Aires.`,
  },
  {
    q: '¿Cuentan con flota propia?',
    a: 'Sí. Trabajamos con camiones propios, de distintos modelos, en operación activa.',
  },
  {
    q: '¿Cómo puedo solicitar información o un presupuesto?',
    a: 'La forma más rápida es escribirnos por WhatsApp. Para agilizar la respuesta, contanos qué tipo de carga necesitás trasladar, el origen, el destino y la fecha estimada.',
  },
  {
    q: '¿Cómo puedo comunicarme con la empresa?',
    a: `Por WhatsApp o teléfono al ${contact.phoneDisplay}, o por correo a ${contact.email}. También podés usar el formulario de la página de contacto para consultas generales.`,
  },
  {
    q: '¿Cuál es el horario de atención?',
    a: `${contact.hours}.`,
  },
  {
    q: '¿Dónde están ubicados?',
    a: `En ${contact.address.street}, ${contact.address.between}, ${contact.address.town}, ${contact.address.province}.`,
  },
]
