/**
 * Datos empresariales confirmados de Transportes RE S.R.L.
 * Todo el texto institucional del sitio se alimenta desde /src/data.
 * Modificá estos valores sin tocar los componentes de presentación.
 */
export const company = {
  name: 'Transportes RE S.R.L.',
  shortName: 'Transportes RE',
  activity: 'Transporte de cargas generales',
  founder: 'Juan Bautista Re',
  foundedYear: 1960,
  generation: 'tercera',
  origin: {
    // Primera dirección, según material de archivo de la familia
    label: 'Calle 16, El Talar F.C.C.A.',
    town: 'El Talar, Buenos Aires',
  },
  area: 'Buenos Aires y AMBA',
  values: ['Honestidad', 'Responsabilidad', 'Compromiso', 'Trato familiar'],
  /** Texto histórico redactado por la propia empresa (no modificar sin aprobación). */
  officialHistory:
    'TRANSPORTES RE S.R.L. es una empresa de familia que desde sus comienzos, allá por 1960 y por aquel entonces con un solo camión, ha trabajado con todos sus esfuerzos para brindar a sus clientes un continuo crecimiento y desarrollo en lo que respecta al servicio de transporte, siempre basados en dos pilares fundamentales que son la honestidad y el sentido de responsabilidad.',
} as const

export const contact = {
  address: {
    street: 'Paraguay 1330',
    between: 'entre Belgrano y Güemes',
    town: 'El Talar',
    province: 'Buenos Aires',
  },
  phoneDisplay: '011 2155-3296',
  /** Formato internacional para enlaces tel: */
  phoneTel: '+541121553296',
  /** Formato wa.me (54 + 9 + código de área sin 0 + número) */
  whatsapp: '5491121553296',
  /** Correo provisional. El correo definitivo está pendiente de confirmación. */
  email: 're.transportessrl@gmail.com',
  emailIsProvisional: true,
  hours: 'Lunes a viernes, de 9 a 18 h',
  hoursShort: 'Lun. a vie. · 9 a 18 h',
  /** Completar cuando se confirme el usuario. `null` = no se muestra. */
  instagram: null as null | { user: string; url: string },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Paraguay 1330, El Talar, Buenos Aires, Argentina'),
}

export const fullAddress = `${contact.address.street}, ${contact.address.between}, ${contact.address.town}, ${contact.address.province}`

/** Mensajes predefinidos para WhatsApp según el contexto del botón. */
export const whatsappMessages = {
  general: 'Hola, Transportes RE. Quisiera hacer una consulta.',
  quote:
    'Hola, Transportes RE. Quisiera solicitar un presupuesto de transporte. Tipo de carga: ... Origen: ... Destino: ... Fecha estimada: ...',
  services: 'Hola, Transportes RE. Quisiera consultar por sus servicios de transporte de cargas generales.',
  faq: 'Hola, Transportes RE. Tengo una consulta que no encontré en las preguntas frecuentes.',
} as const
