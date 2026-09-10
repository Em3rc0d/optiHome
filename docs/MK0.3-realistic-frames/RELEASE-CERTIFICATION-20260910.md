# RELEASE CERTIFICATION — OptiHome MK0.3a Realistic SVG Frames — 2026-09-10

Status: `RELEASE_CERTIFIED__MAIN_READY`

## Authority

```text
RUNTIME_SHA       e0c3d4339676674fbd41c30fed4a0f89c1f91d89
TREE_SHA          83566ac792dc66ca2b5d5f02dc87578e38193957
CERT_RUN_ID       34523060802
CERT_JOB_ID       103025050845
ARTIFACT_ID       10170452615
ARTIFACT_SHA256   d33e85440475d8e3ed375da18e4e675a91a70fdfb322ab639ded7b141f4dde49
FRAME_CHECKS      58/58 PASS
```

## Verified gates

- `npm ci` — PASS
- full dependency audit — PASS, 0 vulnerabilities
- production dependency audit — PASS, 0 vulnerabilities
- ESLint — PASS
- Next.js 16.3.4 production build — PASS
- TypeScript — PASS
- post-build source-clean — PASS
- production-local boot — PASS
- 8/8 SVG assets served — PASS
- 8/8 assets contain realistic detail primitives and transparent canvas contract — PASS
- catalog images decoded — PASS
- all eight catalog references present — PASS
- photo-driven Virtual Try-On opened — PASS
- all eight frame overlays switched and decoded inside Try-On — PASS

## Scope boundary

This certification applies only to the clean MK0.3a SVG asset promotion. It does not certify the unfinished photorealistic WebP layer or detector-cache experiments from the discarded staging branch. MK0.2 tracking geometry remains the inherited runtime authority for camera alignment and rotation stability.

Any runtime, dependency or asset modification after `RUNTIME_SHA` invalidates affected evidence.
