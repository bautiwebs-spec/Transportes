/**
 * Compatibilidad de React Router (BrowserRouter) con GitHub Pages.
 * GitHub Pages solo sirve archivos estáticos: para que cada ruta funcione al abrirla
 * directamente o al recargar, se copia index.html dentro de una carpeta por ruta
 * (responde 200) y como 404.html (cualquier otra ruta → la app muestra su página 404).
 * Mantener esta lista sincronizada con las rutas de src/App.tsx.
 */
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const routes = ['historia', 'servicios', 'preguntas-frecuentes', 'contacto']
const dist = 'dist'
const index = join(dist, 'index.html')

for (const r of routes) {
  mkdirSync(join(dist, r), { recursive: true })
  copyFileSync(index, join(dist, r, 'index.html'))
}
copyFileSync(index, join(dist, '404.html'))
writeFileSync(join(dist, '.nojekyll'), '')
console.log(`pages-fallback: ${routes.length} rutas + 404.html`)
