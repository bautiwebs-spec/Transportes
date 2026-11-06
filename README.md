# Transportes RE S.R.L. — Sitio web institucional

Primera versión visual (v0.1) del sitio de Transportes RE S.R.L.
React + TypeScript + Tailwind CSS (v4), con Vite.

## Ejecutar localmente

Requisitos: Node.js 18 o superior.

```bash
npm install
npm run dev        # servidor de desarrollo → http://localhost:5173
npm run build      # build de producción en /dist
npm run preview    # sirve /dist → http://localhost:4173
```

## Estructura

```
src/
  config.ts              → SHOW_PENDING_NOTES: muestra/oculta marcas de "pendiente"
  data/                  → TODOS los datos de la empresa (editar acá, no en los componentes)
    company.ts           → nombre, contacto, horarios, WhatsApp, mensajes predefinidos
    services.ts          → servicios + estructura vacía para tipos de flota (fleetDetails)
    faqs.ts              → preguntas frecuentes
    history.ts           → hitos, generaciones y valores
    navigation.ts        → menú
  lib/
    whatsapp.ts          → enlaces wa.me / mailto
    contact.ts           → envío del formulario (PENDIENTE de integración)
  components/
    layout/              → Header, Footer, Logo, botón flotante de WhatsApp (mobile)
    ui/                  → Button, Section, Accordion, Icon, Reveal, Photo, Pending
    sections/            → PageHero, CtaBand
    forms/               → ContactForm, Field
  pages/                 → Inicio, Historia, Servicios, Preguntas frecuentes, Contacto, 404
  assets/img/            → imágenes optimizadas (webp)
recursos-originales/     → archivos originales entregados por el cliente (sin modificar)
```

## Imágenes

- `logo-re.webp`: logo oficial, solo recortado al área útil (fondo transparente original).
- `flota-el-talar.webp`: foto de flota tomada del collage entregado; se quitó el banner superior y las líneas negras de la grilla.
- `archivo-camion-1/2.webp`: fotos de archivo recortadas de la captura histórica. El blanco y negro se aplica por CSS.
- Los espacios rayados con la leyenda "Foto real pendiente" esperan fotografías reales de la empresa.

Para reemplazar una foto: sustituir el archivo en `src/assets/img/` manteniendo el nombre,
o cambiar el import en la página correspondiente.

## Pendientes

- Formulario: conectar un servicio de envío en `src/lib/contact.ts` (con `reply_to` = correo del remitente) y confirmar el correo definitivo. Mientras tanto, NO simula envíos: ofrece continuar por WhatsApp o correo.
- Mapa interactivo en Contacto (hoy: espacio reservado + enlace a Google Maps).
- Instagram: completar `contact.instagram` en `src/data/company.ts`.
- Flota: cantidad, tipos de carrocería y fotos → `fleetDetails` en `src/data/services.ts`.
- Hitos históricos intermedios → `src/data/history.ts`.
- Antes de publicar: `SHOW_PENDING_NOTES = false` en `src/config.ts`.

## Publicación

Es una SPA con rutas reales (`/historia`, `/servicios`, …). El hosting debe redirigir
todas las rutas a `index.html` (Netlify, Vercel y Cloudflare Pages lo resuelven con una regla de rewrite).
