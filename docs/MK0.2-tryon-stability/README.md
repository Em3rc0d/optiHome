# MK0.2 — Try-on rotation stability

Status: `RELEASE_CERTIFIED__MAIN_READY`

## Problem

A real production try-on session showed the eyewear overlay visibly rotating even though the face was essentially frontal. The previous geometry treated the eye-line as a directed vector, so the same physical horizontal line could be represented close to `0°` or `180°` depending on landmark order/mirroring.

## Frozen fix

1. Treat the eye-line as an undirected line and normalize its angle to the nearest horizontal orientation in `[-90°, 90°)`.
2. Apply a `1.25°` dead-zone around horizontal to suppress detector noise.
3. Clamp rendered eyewear rotation to `±4.5°`.
4. Smooth rotation more strongly than x/y position and scale.
5. Preserve iris/eye-center anchoring, transient tracking retention, canvas-based camera inference and manual size control.
6. Render the clean transparent SVG eyewear authorities directly instead of rasterizing/background-cleaning them.
7. Reduce the overlay shadow from `drop-shadow-2xl` to `drop-shadow-md` so the frame reads more naturally.
8. No appointment, catalog, privacy or commercial contract was changed.

## Certified authority

```text
RUNTIME_SHA       b2b785405718664dcf1636ca1761f30bb537b08a
TREE_SHA          d8535ffd9836ab7a3da8c4e47d63e97360bc4232
CERT_RUN_ID       34496987289
CERT_JOB_ID       102937846706
ARTIFACT_ID       10160230595
ARTIFACT_SHA256   d8305e0a1134f40ba9521f97b841aadb0f13d869fc2d0220cb615e3f479c9136
ROTATION_CHECKS   17/17 PASS
```

## Verification result

- `npm ci` — PASS
- full dependency audit — PASS, 0 vulnerabilities
- production dependency audit — PASS, 0 vulnerabilities
- ESLint — PASS
- Next.js production build + TypeScript — PASS
- post-build source-clean gate — PASS
- production-local boot — PASS
- reversed horizontal eye-line → `rotate(0deg)` — PASS
- camera rotation finite — PASS
- camera rotation never exceeds `±4.5°` — PASS
- frame switching preserves stable rotation — PASS
- SVG authority remains direct `/frames/*.svg` — PASS
- photo rotation finite and bounded — PASS

The browser certification drives the real camera path with a synthetic `MediaStream` and controlled 478-point landmarks. The reversed-eye endpoint case is deliberate: it reproduces the representation that could previously express a horizontal frame near `180°` and proves that the rendered DOM transform now normalizes it to `0°`.

The synthetic screenshots are evidence of rotation/control behavior, not a claim about aesthetic fitting on a particular human face. Final physical-device acceptance remains observable by the user after production deployment.

Any runtime/source/config/dependency modification after the certified authority invalidates affected evidence.
