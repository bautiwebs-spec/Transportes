import type { SVGProps } from 'react'

/** Set de íconos propio (trazo 1.75px, 24×24), sin dependencias externas. */
const paths = {
  truck: (
    <>
      <path d="M2.5 6.5h11v9.5h-11z" />
      <path d="M13.5 9.5h4l3 3.5v3h-7" />
      <circle cx="6.5" cy="17.5" r="1.9" />
      <circle cx="17" cy="17.5" r="1.9" />
    </>
  ),
  box: (
    <>
      <path d="M12 3 20.5 7.5v9L12 21l-8.5-4.5v-9z" />
      <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" />
      <path d="m7.75 5.25 8.5 4.5" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.25" />
      <path d="M8.25 18h6.25a3.25 3.25 0 0 0 0-6.5h-5a3.25 3.25 0 0 1 0-6.5H15" />
      <path d="M18 2.75a3 3 0 0 1 3 3c0 2.2-3 4.75-3 4.75S15 7.95 15 5.75a3 3 0 0 1 3-3Z" />
      <circle cx="18" cy="5.75" r=".6" fill="currentColor" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M2.75 20c.5-3.4 3-5.5 6.25-5.5s5.75 2.1 6.25 5.5" />
      <path d="M15.5 4.9a3.25 3.25 0 0 1 0 6.2M17.5 14.8c2 .7 3.4 2.5 3.75 5.2" />
    </>
  ),
  phone: (
    <path d="M5.5 3.5h3l1.5 4.25-2 1.5a11 11 0 0 0 6.75 6.75l1.5-2 4.25 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.25 2" />
    </>
  ),
  arrowRight: <path d="M4.5 12h15M13.5 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h11" />,
  close: <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.75v.01" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.25 6.75v.01" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="1.75" />
      <path d="m21 16-5-5-9 9" />
    </>
  ),
} as const

export type IconName = keyof typeof paths | 'whatsapp'

type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number; title?: string }

export function Icon({ name, size = 20, title, ...rest }: Props) {
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true }
  if (name === 'whatsapp') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...a11y} {...rest}>
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.34m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41Z" />
      </svg>
    )
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...a11y}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  )
}
