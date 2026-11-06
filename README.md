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

## Publicación (GitHub Pages)

- URL pública: https://bautiwebs-spec.github.io/Transportes/
- Se publica automáticamente con GitHub Actions (`.github/workflows/deploy.yml`) cada vez que se actualiza la rama `main`.
  También se puede lanzar a mano desde la pestaña **Actions → Publicar en GitHub Pages → Run workflow**.
- La build usa la base `/Transportes/` (`vite.config.ts`). En desarrollo local sigue siendo `http://localhost:5173/`.
- Compatibilidad con React Router: `scripts/pages-fallback.mjs` copia `index.html` en una carpeta por ruta
  y como `404.html`, así cada página funciona al abrirla directamente o al recargar.
  Si se agrega una página nueva, sumarla también a la lista de ese script.

### Flujo de versiones

1. Cada cambio se trabaja en una rama y se confirma con Git (la versión anterior queda en el historial).
2. Se verifica la build (`npm run build`) y las páginas.
3. Al llevarlo a `main`, GitHub Actions publica la nueva versión en la misma URL.
4. Para volver atrás: revertir el commit en `main` (`git revert`), y se republica sola.
