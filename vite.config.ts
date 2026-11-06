import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * GitHub Pages publica el sitio en https://bautiwebs-spec.github.io/Transportes/
 * por eso la build usa la base "/Transportes/". En desarrollo local se mantiene "/".
 * La preview de una versión en evaluación se compila con BASE_PATH (ej.: /Transportes/v2/).
 */
declare const process: { env: Record<string, string | undefined> }
const REPO_BASE = process.env.BASE_PATH || '/Transportes/'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? REPO_BASE : '/',
  plugins: [react(), tailwindcss()],
}))
