# MK0.4.2 — Plan de acción

Baseline: `master@93323a905f0aaebe48ef73845492b1907f87e8f3`.

## Objetivos

1. Reducir la latencia perceptible del seguimiento facial en móvil.
2. Mantener intacto el try-on certificado anterior como rollback verificable.
3. Activar un nuevo runtime `VirtualTryOnFast` desde catálogo.
4. Añadir una capa visual 3D real y procedural con Three.js en Home.
5. Mantener WebGL del showroom fuera del modal de cámara para no competir por GPU.
6. Conservar accesibilidad, reduced-motion y degradación progresiva.

## Ejecución

### Tracking
- Inferencia desacoplada de la resolución visual de cámara.
- Canvas de tracking máximo 480px; 384px en pointer coarse / hardware limitado.
- `refineLandmarks=false`: se usan centros de ojos por landmarks estructurales.
- Smoothing adaptativo: movimientos grandes reciben pesos altos y alcanzan la posición actual más rápido.
- Ventana de persistencia ante pérdida temporal: 420ms en lugar de 1500ms.
- Cámara: objetivo 960×540 a 30fps con máximo 1280×720.

### Experiencia visual
- `SpatialOptics` usa Three.js r186 desde CDN fijado por versión.
- Geometría procedural inspirada en una montura; no pretende representar un SKU real.
- Pointer depth, iluminación física, partículas y floating motion.
- IntersectionObserver pausa render fuera de viewport.
- DPR y partículas se reducen en dispositivos medium.
- Reduced motion / low capability no carga Three.js y conserva fallback completo.

## Release gates

`audit → lint → tsc → source contracts → build → runtime smoke → preview → exact-head merge → production smoke`.
