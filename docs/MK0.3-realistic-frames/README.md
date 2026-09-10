# MK0.3a — Realistic SVG frame assets

Status: `RELEASE_CANDIDATE_CLEAN`

## Scope

This cut promotes only the eight transparent realistic SVG eyewear assets already exercised by the MK0.3 frame certification. It intentionally excludes the unfinished WebP photorealistic layer, detector-cache experiments, temporary workflows, asset chunks, placeholders, staging notes, and any unrelated runtime change.

## Runtime invariants

- Catalog and Virtual Try-On continue to use the same frame reference per model.
- MK0.2 tracking geometry, eye-line normalization, rotation clamp, smoothing, camera inference and privacy behavior remain unchanged.
- SVG assets remain transparent and are rendered directly by the existing try-on path.
- No production inventory, pricing or appointment semantics change in this cut.

## Asset authority

- Urban Acetate
- Titanium Air
- Crystal Vision
- Vintage Tortoise
- Solar Noir
- Solar Aviator
- Circle Brown
- Solar Color

## Verification requirement

The clean candidate must be re-run through dependency audit, lint, production build, source-clean, 8/8 asset serving, catalog decoding and 8/8 try-on switching before merge.
