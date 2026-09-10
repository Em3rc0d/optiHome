# RELEASE CERTIFICATION — OptiHome MK0.2 Try-on Rotation — 2026-09-10

Status: `RELEASE_CERTIFIED__MAIN_READY`

## Authority

```text
RUNTIME_SHA       b2b785405718664dcf1636ca1761f30bb537b08a
TREE_SHA          d8535ffd9836ab7a3da8c4e47d63e97360bc4232
CERT_RUN_ID       34496987289
CERT_JOB_ID       102937846706
ARTIFACT_ID       10160230595
ARTIFACT_SHA256   d8305e0a1134f40ba9521f97b841aadb0f13d869fc2d0220cb615e3f479c9136
RESULT            17/17 ROTATION CHECKS PASS
```

## Defect closed

Production evidence showed a nearly frontal face while the eyewear overlay could render visibly rotated. The cause was the use of a directed eye-to-eye vector for CSS rotation. Reversing the endpoints represents the same physical eye-line but can shift the mathematical angle by approximately `180°`.

MK0.2 normalizes the eye-line as an undirected orientation, applies a horizontal dead-zone, clamps rotation to `±4.5°`, gives rotation stronger temporal smoothing than translation/scale, and renders the transparent SVG frame assets directly.

## Mechanical gates

```text
npm ci                         PASS
npm audit                      PASS — 0 vulnerabilities
npm audit --omit=dev           PASS — 0 vulnerabilities
npm run lint                   PASS
npm run build                  PASS
TypeScript                     PASS
post-build repository status   CLEAN
production-local boot          PASS
```

## Focused browser contract

```text
DIRECT_TRYON_DIALOG                    PASS
CAMERA_TRACKING_ACTIVE                 PASS
CAMERA_ROTATION_FINITE                 PASS
REVERSED_EYELINE_NORMALIZES_TO_ZERO    PASS — rotation=0
SVG_RENDERED_DIRECTLY                  PASS
CAMERA_ROTATION_CLAMP_1..8             PASS
FRAME_SWITCH_PRESERVES_SVG_AUTHORITY   PASS
FRAME_SWITCH_ROTATION_STABLE           PASS
PHOTO_FIXTURE_AVAILABLE                PASS
PHOTO_ROTATION_STABLE                  PASS — bounded at -4.5°
TOTAL                                   17/17 PASS
```

The authoritative browser run checked out `RUNTIME_SHA` detached. The temporary certification workflow was outside runtime authority and must not be included in the stable integration lineage.

## Evidence interpretation

The camera fixture is synthetic and intentionally supplies reversed eye endpoints. This directly tests the reported rotation failure mode through the production DOM path: detector output → geometry → smoothing → overlay CSS transform. Its screenshots verify control/rotation behavior, not cosmetic fit on a specific person's face.

Physical-device confirmation after deployment remains the final observation for the exact user's camera characteristics; it is not a blocker for the deterministic rotation defect itself because the faulty transformation is now bounded by construction and verified in-browser.
