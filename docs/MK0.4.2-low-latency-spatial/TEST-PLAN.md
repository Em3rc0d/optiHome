# MK0.4.2 — Test plan

## Automatizado

- `npm ci`
- `npm audit --audit-level=high`
- `npm run lint`
- `npx tsc --noEmit`
- hash del try-on histórico congelado
- contratos de low-latency source
- contratos de progressive 3D source
- `npm run build`
- smoke SSR `/` y `/products`

## Dispositivo real

La validación móvil debe observar:

- desplazamiento lateral rápido de cabeza;
- acercamiento/alejamiento;
- recuperación tras oclusión corta;
- cambio de montura con cámara activa;
- cierre/reapertura de modal;
- cámara frontal en Android Chrome;
- portrait y landscape.

## Criterio visual

La montura no debe permanecer visiblemente en una posición pasada tras un movimiento normal de cabeza. El fallback estático y `prefers-reduced-motion` deben conservar toda la información y navegación.

## 3D

- escena visible únicamente cuando está en viewport;
- pointer motion desktop;
- fallback en reduced motion/low capability;
- navegación funcional si CDN/WebGL falla;
- ninguna dependencia de la escena para conversión.
