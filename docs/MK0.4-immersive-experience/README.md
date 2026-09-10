# MK0.4 — Immersive Digital Optical Experience

Status: **IMPLEMENTED — 2.5D CONTRACT TRACK**

Baseline: `master@89db095ffe65755f31131eca15e2180deb3b8ae3`.

## Product objective

Transform OptiHome from a clean static landing into a premium digital optical showroom while preserving conversion, accessibility, performance and the certified virtual try-on.

Core narrative: **Explora → Pruébate → Coordina**.

## Frozen decisions

- Existing visual palette remains authoritative.
- WhatsApp remains the primary conversion channel.
- `src/components/try-on/VirtualTryOn.tsx` is frozen.
- No scroll-jacking.
- Mobile receives the full information architecture.
- Reduced motion must remain fully usable.
- WebGL is progressive enhancement only.
- Production authority remains `master`.

## 3D decision

The baseline repository contains no true `.glb` geometry. The `3D_ASSET_GATE` therefore rejects True‑3D for this release rather than inventing geometry from flat images. MK0.4 proceeds through the contractually valid 2.5D track.

See `DECISION-LOG.md` and `3D-ASSET-CONTRACT.md`.
