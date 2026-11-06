import type { IconName } from '../components/ui/Icon'

export type Service = {
  id: string
  icon: IconName
  title: string
  summary: string
  description: string
}

/**
 * Servicios confirmados. Para sumar servicios específicos más adelante,
 * agregar un objeto a este arreglo: Inicio y Servicios se actualizan solos.
 */
export const services: Service[] = [
  {
    id: 'cargas-generales',
    icon: 'box',
    title: 'Transporte de cargas generales',
    summary: 'Transporte de cargas generales, con la responsabilidad de siempre.',
    description:
      'Nuestra actividad es el transporte de cargas generales. Contanos qué necesitás trasladar, desde dónde y hacia dónde, y te respondemos de manera directa.',
  },
  {
    id: 'flota-propia',
    icon: 'truck',
    title: 'Flota propia',
    summary: 'Camiones propios, de distintos modelos, en operación activa.',
    description:
      'Trabajamos con camiones propios, de distintos modelos, en operación activa. Una flota que creció desde aquel primer camión de 1960.',
  },
  {
    id: 'cobertura',
    icon: 'route',
    title: 'Buenos Aires y AMBA',
    summary: 'Operamos en Buenos Aires y el Área Metropolitana, desde El Talar.',
    description:
      'Nuestra zona de operación es Buenos Aires y el AMBA. La base de la empresa está en El Talar, donde comenzó la historia de la familia en 1960.',
  },
  {
    id: 'atencion',
    icon: 'people',
    title: 'Atención personalizada',
    summary: 'Trato familiar y directo: hablás con la empresa, sin intermediarios.',
    description:
      'Somos una empresa familiar y lo sostenemos en el trato: cada consulta la atiende la propia empresa, de manera directa, por WhatsApp, teléfono o correo.',
  },
]

/**
 * Estructura preparada para tipos de carrocería / características de flota.
 * Pendiente de confirmación por la empresa (cantidad de camiones, carrocerías, etc.).
 * Mientras esté vacío, la página de Servicios muestra un aviso de "pendiente".
 */
export type FleetItem = { title: string; detail: string; image?: string }
export const fleetDetails: FleetItem[] = []
