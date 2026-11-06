import { useEffect, useState } from 'react'

export function useMedia(query: string, initial = false) {
  const [match, setMatch] = useState(() =>
    typeof window === 'undefined' ? initial : window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}

/** true si el usuario no pidió reducir el movimiento */
export const useMotionOK = () => !useMedia('(prefers-reduced-motion: reduce)')
/** Escritorio con puntero fino (hover real) */
export const useFinePointer = () => useMedia('(hover: hover) and (pointer: fine)')
export const useDesktop = () => useMedia('(min-width: 1024px)')
