# OptiHome

Web comercial de óptica a domicilio, con catálogo de estilos y coordinación directa por WhatsApp.

- Producción: https://optihome-v1.vercel.app
- Contacto configurado: +51 933 075 200
- Las imágenes del catálogo son referencias; no representan stock, precios ni materiales confirmados.
- Cobertura y condiciones se consultan antes de confirmar una atención.

## Desarrollo

Node.js 22 y npm. Next.js App Router, React, TypeScript y CSS con Tailwind.

```sh
npm ci
npm run dev
```

## Verificación

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install --with-deps chromium
npm run test:e2e
```

La verificación visual usa Chromium a 360, 390, 430 y 1440 px. Guarda capturas, comprobaciones de accesibilidad, enlaces y consola en `qa-results/`. El script inicia y detiene su propio servidor de producción. `QA_PORT`, `QA_OUTPUT` y `QA_CHROMIUM` permiten adaptar el entorno.

## Contenido y arquitectura

- `src/content/site.ts`: número y mensajes base de WhatsApp.
- `src/content/catalog.ts`: referencias comerciales independientes del código experimental.
- `src/components/home/CommercialHome.tsx`: secciones de la home, renderizadas en servidor.
- `src/components/catalog/`: tarjetas y filtros por estilo/color.
- `src/app/globals.css`: tokens, tipografía, composición y responsive.
- Rutas públicas: `/`, `/products`, `/privacy`; se preservan las redirecciones históricas.

El probador interno se conserva en `src/components/try-on` y `src/lib/try-on`. No se importa desde la experiencia pública y no puede habilitarse con parámetros de URL. El componente SpatialOptics se conserva fuera de las rutas comerciales. Los contratos comprueban esta separación y la integridad del código interno.

## Documentación del candidato

- [Auditoría y referencias](docs/MK1-commercial-eyewear/AUDIT.md)
- [Dirección y sistema visual](docs/MK1-commercial-eyewear/DESIGN.md)
- [Información y fotografías pendientes del propietario](docs/MK1-commercial-eyewear/OWNER-INVENTORY.md)
- [Evidencia de QA](docs/MK1-commercial-eyewear/QA.md)

No se publican precios, cobertura geográfica, garantías, testimonios ni credenciales sin evidencia del negocio. Las dependencias del prototipo permanecen instaladas para preservar su implementación, pero no se incluyen en el grafo de importaciones público.
