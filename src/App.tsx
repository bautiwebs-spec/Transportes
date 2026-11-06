import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/layout/SiteLayout'
import { Home } from './pages/Home'
import { Historia } from './pages/Historia'
import { Servicios } from './pages/Servicios'
import { PreguntasFrecuentes } from './pages/PreguntasFrecuentes'
import { Contacto } from './pages/Contacto'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="historia" element={<Historia />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="preguntas-frecuentes" element={<PreguntasFrecuentes />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
