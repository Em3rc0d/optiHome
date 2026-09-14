# MK0.4.3 — Realistic Multi-Angle Try-On Architecture

## Goal

Evolve the low-latency 2D try-on into a yaw-aware 2.5D renderer that can show authentic three-quarter and side product views, including temples, without inventing product geometry.

## Runtime pipeline

```text
Camera / Photo
  -> FaceMesh
  -> faceGeometry {x,y,width,roll,yaw}
  -> adaptive position/scale/roll smoothing
  -> adaptive yaw smoothing
  -> MultiAngleResolver
  -> MultiAngleFrameOverlay
  -> transparent product-view blend
```

The camera path keeps the MK0.4.2 low-latency contract: inference width is capped at 480 px and 384 px on constrained devices, `refineLandmarks=false`, stale tracking expires after 420 ms, and the historical `VirtualTryOn.tsx` rollback baseline remains byte-identical.

## Yaw convention

Yaw is defined relative to the rendered image. Negative yaw means the nose moves toward rendered left; positive yaw means rendered right. Camera inference already uses horizontal flipping to match the mirrored preview, so the overlay and detector share one coordinate convention.

## Angle resolver

Initial bands:

- `0–7°`: frontal view.
- `7–27°`: continuous blend frontal <-> three-quarter.
- `27°–maxYaw`: continuous blend three-quarter <-> side.
- Default max yaw: 42°.

There is no hard image switch.

## Progressive capability contract

`Frame.tryOnImage` remains the guaranteed legacy fallback.

`Frame.tryOnAngles` is optional. Missing angles degrade to the best authentic view available:

- no angle bundle -> legacy frontal image, unchanged behavior;
- front + one three-quarter -> front/three-quarter blend only;
- complete bundle -> front/three-quarter/side blend.

Perspective compression is disabled when no angle bundle exists so the fallback remains visually equivalent to MK0.4.2.

## GPU boundary

This renderer remains DOM/image based. Three.js is not introduced into the try-on modal. TensorFlow/FaceMesh keeps camera GPU priority.

## Occlusion

MK0.4.3 does not claim true head-depth occlusion. Authentic side assets may encode product self-perspective, but hair/head segmentation is deferred to a later true-3D/segmentation milestone.

## Release rule

Engineering may be certified independently, but customer-visible multi-angle behavior must not be claimed as complete until authentic per-frame angle assets pass the asset contract and physical-device QA passes.
