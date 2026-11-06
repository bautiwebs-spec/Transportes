import { company } from './company'

export type Milestone = {
  year: string
  title: string
  text: string
  /** Hito marcador de contenido pendiente (solo visible con SHOW_PENDING_NOTES) */
  pending?: boolean
}

/** Solo hitos confirmados. Agregar nuevos hitos cuando la familia los confirme. */
export const milestones: Milestone[] = [
  {
    year: '1960',
    title: 'Los comienzos',
    text: `${company.founder} inicia la actividad en El Talar con un solo camión. La primera dirección: ${company.origin.label}`,
  },
  {
    year: '· · ·',
    title: 'Hitos intermedios',
    text: 'Cambios de generación, incorporación de camiones y otros momentos de la empresa, a confirmar con la familia.',
    pending: true,
  },
  {
    year: 'Hoy',
    title: 'Tercera generación',
    text: 'La empresa continúa en manos de la familia, con flota propia y operando en Buenos Aires y AMBA desde El Talar.',
  },
]

export const generations = [
  {
    n: '1ª',
    title: 'El fundador',
    text: `${company.founder} funda la empresa en 1960, en El Talar, con un solo camión.`,
  },
  {
    n: '2ª',
    title: 'La continuidad',
    text: 'La familia continúa el trabajo y sostiene los mismos pilares: honestidad y responsabilidad.',
  },
  {
    n: '3ª',
    title: 'El presente',
    text: 'Hoy la empresa está en su tercera generación, con flota propia y la misma forma de trabajar.',
  },
]

export const valuesDetail = [
  { title: 'Honestidad', text: 'Uno de los dos pilares sobre los que se construyó la empresa desde 1960.' },
  { title: 'Responsabilidad', text: 'El otro pilar fundacional: responder por cada carga y cada compromiso.' },
  { title: 'Compromiso', text: 'El esfuerzo de toda la familia puesto en el servicio a cada cliente.' },
  { title: 'Trato familiar', text: 'Una relación directa y cercana, como la de una empresa de familia.' },
]
