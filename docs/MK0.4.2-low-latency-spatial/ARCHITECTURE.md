# MK0.4.2 — Architecture

## GPU ownership

El principio rector es **una experiencia GPU intensiva a la vez**.

- Home: Three.js puede renderizar únicamente la sección `SpatialOptics` cuando está visible.
- Products / try-on: Three.js de Home no está montado; TensorFlow.js recibe la GPU.
- El try-on no introduce Three.js ni un segundo canvas WebGL.

## Tracking pipeline

`camera 960×540 target → downscaled canvas 384/480px → FaceMesh → eye geometry → adaptive smoothing → overlay`

La mejora principal no depende de aumentar frecuencia artificialmente. Reduce píxeles procesados y disminuye el retraso causado por el smoothing fijo.

## 3D runtime

Three.js se carga bajo demanda desde un URL versionado. El componente no lo solicita cuando:

- `prefers-reduced-motion: reduce`;
- capability = low;
- WebGL no está disponible.

La escena usa geometría procedural y puede desaparecer sin afectar contenido, CTA o navegación.

## Rollback

`src/components/try-on/VirtualTryOn.tsx` permanece byte-identical al baseline MK0.3b/MK0.4.1. `FrameCatalog` apunta al nuevo `VirtualTryOnFast.tsx`; revertir esa importación restaura el motor anterior.
