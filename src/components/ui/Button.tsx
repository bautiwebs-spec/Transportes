import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from './Icon'
import { whatsappUrl } from '../../lib/whatsapp'

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outline-light'
type Size = 'md' | 'lg' | 'sm'

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out-soft active:scale-[0.98] disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary:
    'bg-re-600 text-white shadow-[0_1px_0_rgb(255_255_255/0.15)_inset,0_8px_20px_-10px_rgb(7_115_184/0.7)] hover:bg-re-700 hover:shadow-[0_1px_0_rgb(255_255_255/0.15)_inset,0_12px_26px_-12px_rgb(7_115_184/0.85)]',
  secondary: 'border border-graphite/15 bg-white text-graphite hover:border-graphite/35 hover:bg-white',
  ghost: 'text-graphite hover:text-re-700 px-0!',
  light: 'bg-white text-graphite hover:bg-mist',
  'outline-light': 'border border-white/30 text-white hover:border-white/70 hover:bg-white/5',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-14 px-7 text-base',
}

type CommonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  icon?: IconName
  iconRight?: IconName
  className?: string
}

type Props = CommonProps &
  ({ to: string; href?: never } | { href: string; to?: never; external?: boolean })

export function Button(props: Props) {
  const { children, variant = 'primary', size = 'md', icon, iconRight, className = '' } = props
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  const content = (
    <>
      {icon ? <Icon name={icon} size={size === 'sm' ? 16 : 19} /> : null}
      <span>{children}</span>
      {iconRight ? (
        <Icon
          name={iconRight}
          size={size === 'sm' ? 15 : 17}
          className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  )
  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={cls}>
        {content}
      </Link>
    )
  }
  const external = 'external' in props && props.external
  return (
    <a
      href={(props as { href: string }).href}
      className={cls}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
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
