import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from './Icon'
import { whatsappUrl } from '../../lib/whatsapp'

type Variant = 'primary' | 'secondary' | 'light' | 'outline-light'
type Size = 'sm' | 'md' | 'lg'

/*
  Botones V3: cambio de color y contraste al pasar el cursor, y una flecha que
  avanza 3 px. Sin rellenos animados ni efectos llamativos.
*/
const base =
  'group/btn inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,border-color] duration-300 ease-out-soft'

const variants: Record<Variant, string> = {
  primary: 'bg-re-600 text-white hover:bg-re-700',
  secondary: 'border border-graphite/20 bg-white text-graphite hover:border-graphite/60',
  light: 'bg-white text-graphite hover:bg-mist',
  'outline-light': 'border border-white/30 text-white hover:border-white/70 hover:bg-white/5',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-[3.25rem] px-7 text-[0.98rem]',
}

export function Arrow({ name = 'arrowRight', size = 16 }: { name?: IconName; size?: number }) {
  return (
    <Icon
      name={name}
      size={size}
      className="transition-transform duration-300 ease-out-soft group-hover/btn:translate-x-[3px] group-hover/link:translate-x-[3px] group-focus-visible/btn:translate-x-[3px]"
    />
  )
}

type CommonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  icon?: IconName
  arrow?: boolean
  className?: string
}
type Props = CommonProps & ({ to: string; href?: never } | { href: string; to?: never; external?: boolean })

export function Button(props: Props) {
  const { children, variant = 'primary', size = 'md', icon, arrow, className = '' } = props
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  const content = (
    <>
      {icon ? <Icon name={icon} size={size === 'sm' ? 16 : 18} /> : null}
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </>
  )
  if ('to' in props && props.to)
    return (
      <Link to={props.to} className={cls}>
        {content}
      </Link>
    )
  const external = 'external' in props && props.external
  return (
    <a href={(props as { href: string }).href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {content}
    </a>
  )
}

/** Botón comercial de WhatsApp: azul institucional + ícono reconocible. */
export function WhatsAppButton({
  message,
  children = 'Consultar por WhatsApp',
  variant = 'primary',
  size = 'md',
  className,
}: {
  message?: string
  children?: ReactNode
  variant?: Variant
  size?: Size
  className?: string
}) {
  return (
    <Button href={whatsappUrl(message)} external icon="whatsapp" variant={variant} size={size} className={className}>
      {children}
    </Button>
  )
}

/** Enlace de texto con subrayado animado y flecha. */
export function TextLink({
  to,
  href,
  children,
  className = '',
  external,
}: {
  to?: string
  href?: string
  children: ReactNode
  className?: string
  external?: boolean
}) {
  const cls = `group/link inline-flex items-center gap-2 font-semibold ${className}`
  const inner = (
    <>
      <span className="link-u">{children}</span>
      <Arrow name={external ? 'arrowUpRight' : 'arrowRight'} size={15} />
    </>
  )
  return to ? (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  )
}
