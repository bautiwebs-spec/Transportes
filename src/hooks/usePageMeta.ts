import { useEffect } from 'react'
import { company } from '../data/company'

function setMeta(selector: string, attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/** SEO básico por página: título y descripción. */
export function usePageMeta(title: string | null, description: string) {
  useEffect(() => {
    const full = title ? `${title} | ${company.name}` : `${company.name} — Transporte de cargas generales desde 1960`
    document.title = full
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', full)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
  }, [title, description])
}
