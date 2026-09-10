# 3D ASSET CONTRACT

## Gate result

`3D_ASSET_GATE = FAIL_BY_DESIGN`

Reason: baseline contains photoreal `.webp` and legacy `.svg` assets, but no authoritative `.glb` geometry for Urban Acetate.

## Acceptance contract for future True‑3D

A model may enter the runtime only when all are true:

- GLB is derived from real frame geometry or defensible modeling evidence.
- Target size ≤ 1.5 MB.
- Geometry target ≈ 50k triangles or lower unless justified.
- Textures ≤ 2K.
- Materials and scale are validated.
- Asset has explicit provenance and license/ownership status.
- Runtime spike proves load, resize, navigation cleanup and reduced-motion fallback.

Until then, 2.5D is the certified production path.
