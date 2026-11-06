import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * GitHub Pages publica el sitio en https://bautiwebs-spec.github.io/Transportes/
 * por eso la build usa la base "/Transportes/". En desarrollo local se mantiene "/".
 * Si el repositorio cambia de nombre, actualizar REPO_BASE.
 */
const REPO_BASE = '/Transportes/'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? REPO_BASE : '/',
  plugins: [react(), tailwindcss()],
}))
