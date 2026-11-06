import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo-re.webp'
import { company } from '../../data/company'

/** Logo oficial, sin modificaciones (solo recortado al área útil). */
export function Logo({ className = '', onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className={`inline-flex shrink-0 ${className}`} aria-label={`${company.name} — Inicio`}>
      <img src={logo} alt={company.name} width={480} height={229} className="h-full w-auto" decoding="async" />
    </Link>
  )
}
