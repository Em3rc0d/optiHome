# ARCHITECTURE

## Layers

### A — Motion UI
Framer Motion handles reveals, springs, layout projection and viewport-linked animation.

### B — Spatial 2.5D
Existing WebP assets use perspective, restrained rotation, translation and product shadow.

### C — True 3D
**GATED OUT for MK0.4** because no authoritative GLB geometry exists.

### D — Shared layout
The catalog uses Framer Motion layout projection between quick-view frames and the active showroom surface.

## Motion foundation

- `src/lib/motion/tokens.ts`
- `src/lib/motion/capabilities.ts`
- `src/components/motion/MotionProvider.tsx`
- `src/components/motion/Reveal.tsx`

## Runtime priority

The virtual try-on remains dynamically loaded and unchanged. No additional WebGL runtime is introduced, so TensorFlow.js/MediaPipe retain full GPU priority.

## Failure behavior

If motion APIs are unavailable or reduced motion is requested, content and navigation remain complete. Existing WebP assets are always the visible authority.
