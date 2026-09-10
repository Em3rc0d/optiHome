# MK0.3 — Realistic frame assets and warm face-model cache

## Goal

Replace the illustrative frame artwork used by the OptiHome catalog and Virtual Try-On with production-style transparent eyewear assets while preserving the certified MK0.2 tracking geometry and rotation constraints.

## Runtime contract

- Catalog and Virtual Try-On use the same frame asset for a given reference.
- Realistic frame assets are transparent and pre-cropped; the browser must not run background-removal heuristics over them.
- The face model remains lazy: opening `/products` or opening the Try-On dialog does not initialize TensorFlow/FaceMesh.
- The first explicit Camera or Photo action initializes the detector.
- Subsequent close/re-open cycles in the same browser session reuse one detector instance from a window-scoped cache instead of recreating the model.
- Hard reload/new tab may initialize a new JS detector instance; normal HTTP caching still applies to model/script resources.
- MK0.2 geometry remains unchanged: eye-line normalization, 1.25° dead zone, ±4.5° clamp, stronger rotation smoothing, and retained valid tracking.

## Asset set

Eight transparent photorealistic references are used: Urban Acetate, Titanium Air, Crystal Vision, Vintage Tortoise, Solar Noir, Solar Aviator, Circle Brown and Solar Color.

## Release gates

The final candidate must pass dependency audit, lint, TypeScript/Next production build, source-clean, all eight assets served and decoded, all eight catalog references, all eight Try-On switches, lazy model behavior, one detector initialization across dialog close/re-open in one SPA session, and production smoke after merge.
