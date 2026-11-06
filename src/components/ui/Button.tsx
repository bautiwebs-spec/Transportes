import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from './Icon'
import { whatsappUrl } from '../../lib/whatsapp'

type Variant = 'primary' | 'secondary' | 'light' | 'outline-light' | 'dark'
type Size = 'sm' | 'md' | 'lg'

/*
  Sistema de botones V2
  - Al pasar el cursor (o con foco de teclado) un relleno sube desde abajo y cambia el contraste.
  - La flecha sale por la derecha y vuelve a entrar por la izquierda.
*/
const base =
  'group/btn relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold whitespace-nowrap transition-[color,border-color,transform] duration-500 ease-out-soft active:scale-[0.98] disabled:opacity-60'

const variants: Record<Variant, { cls: string; fill: string }> = {
  primary: {
    cls: 'bg-re-600 text-white hover:text-white focus-visible:text-white',
    fill: 'bg-graphite',
  },
  dark: {
    cls: 'bg-graphite text-white',
    fill: 'bg-re-600',
  },
  secondary: {
    cls: 'border border-graphite/20 bg-transparent text-graphite hover:text-white focus-visible:text-white hover:border-graphite',
    fill: 'bg-graphite',
  },
  light: {
    cls: 'bg-white text-re-700 hover:text-white focus-visible:text-white',
    fill: 'bg-graphite',
  },
  'outline-light': {
    cls: 'border border-white/35 text-white hover:text-graphite focus-visible:text-graphite hover:border-white',
    fill: 'bg-white',
  },
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-14 px-7 text-base',
}

/** Flecha que se desplaza: sale por la derecha y vuelve a entrar. */
export function ArrowSwap({ size = 17, name = 'arrowRight' }: { size?: number; name?: IconName }) {
  return (
    <span className="relative inline-flex overflow-hidden" aria-hidden>
      <Icon
        name={name}
        size={size}
        className="transition-transform duration-500 ease-out-soft group-hover/btn:translate-x-[150%] group-focus-visible/btn:translate-x-[150%] group-hover/link:translate-x-[150%]"
      />
      <Icon
        name={name}
        size={size}
        className="absolute inset-0 -translate-x-[150%] transition-transform duration-500 ease-out-soft group-hover/btn:translate-x-0 group-focus-visible/btn:translate-x-0 group-hover/link:translate-x-0"
      />
    </span>
  )
}

type CommonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  icon?: IconName
  arrow?: boolean | IconName
  className?: string
}

type Props = CommonProps & ({ to: string; href?: never } | { href: string; to?: never; external?: boolean })

export function Button(props: Props) {
  const { children, variant = 'primary', size = 'md', icon, arrow, className = '' } = props
  const v = variants[variant]
  const cls = `${base} ${v.cls} ${sizes[size]} ${className}`
  const content = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 translate-y-[101%] rounded-full ${v.fill} transition-transform duration-500 ease-out-soft group-hover/btn:translate-y-0 group-focus-visible/btn:translate-y-0`}
      />
      {icon ? <Icon name={icon} size={size === 'sm' ? 16 : 19} /> : null}
      <span>{children}</span>
      {arrow ? <ArrowSwap size={size === 'sm' ? 15 : 17} name={arrow === true ? 'arrowRight' : arrow} /> : null}
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
  arrow = true,
}: {
  message?: string
  children?: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  arrow?: boolean
}) {
  return (
    <Button href={whatsappUrl(message)} external icon="whatsapp" variant={variant} size={size} className={className} arrow={arrow}>
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
      <ArrowSwap size={16} name={external ? 'arrowUpRight' : 'arrowRight'} />
    </>
  )
  if (to)
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    )
  return (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  )
}
