# MK0.4.3 — Multi-Angle Asset Contract

## Required product views

Per frame, the preferred complete bundle is:

```text
public/frames/try-on/<slug>/
  front.webp
  left-3q.webp
  right-3q.webp
  left-side.webp
  right-side.webp
```

All files must be transparent WebP assets representing the same physical/reference frame.

## Authenticity rule

Do not fabricate temples, side geometry, hinges, lens thickness, material, or proportions from the current frontal WebP and present them as the actual product.

Generated placeholders may be used only in isolated development experiments and must never be registered in `src/content/frames.ts` as authoritative try-on angles.

## Normalization

All views for one frame must use:

- identical canvas dimensions;
- consistent optical center;
- consistent bridge position;
- consistent physical scale;
- transparent background;
- no arbitrary crop/padding change between angles.

Angle names are relative to the rendered image direction.

## Geometry metadata

Once assets are approved, each frame may provide normalized `0..1` calibration values for optical center, bridge and temple anchors plus `maxYaw`.

## Current gate

`EXTERNAL_ASSET_GATE_OPEN`

As of MK0.4.3 engineering integration, the existing eight frames have frontal try-on images only. Therefore `tryOnAngles` must remain unregistered until authentic side/three-quarter views are supplied and normalized.

This is intentional: the runtime falls back to the certified frontal experience instead of inventing product geometry.
