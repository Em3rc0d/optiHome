# MK0.1 test matrix

## Customer-surface assertions

- No public page contains `caso de estudio`, `demo`, `demostrativo`, `SLA`, `testimonios inventados` or `capacidad real del negocio`.
- Home H1 and primary CTA explain the service without implementation language.
- Footer exposes a direct WhatsApp contact and a privacy route.
- `/privacy` describes camera/photo behavior and WhatsApp handoff without unsupported claims.

## Catalog assertions

- Eight named frames render with eight distinct `/frames/*.svg` sources.
- SVGs have no background rectangle and use a `1000 × 360` viewBox with content close to the canvas bounds.
- Each catalog item has the same `image` and `tryOnImage`.
- Desktop exposes quick-select buttons; mobile preserves a focused active frame.
- Availability copy is consultative, never represented as live inventory.

## Try-on assertions

- `/products?tryon=1#prueba-virtual` opens try-on from an explicit navigation intent.
- Opening try-on does not call `getUserMedia` until the camera action is selected.
- Transparent frame assets remain clean on camera/photo backgrounds.
- Overlay geometry remains face-derived when tracking is active and never silently reports success while using the centered fallback.
- Camera/photo cleanup and permission race protections remain intact.

## Release authority

The final candidate SHA, tree SHA, automated runner receipt, visual evidence and production smoke must be written only after successful certification.
