import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/archivo'
import './index.css'
import App from './App'

// Activa los estados iniciales de animación solo cuando el script corre.
// Si JS falla, el contenido nunca queda oculto.
document.documentElement.classList.add('motion-ok')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
