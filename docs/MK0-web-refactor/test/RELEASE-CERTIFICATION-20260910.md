# OptiHome MK0 — Release Certification Receipt

Status: `CERTIFIED_FOR_STABLE_INTEGRATION`
Date: `2026-09-10`

## Certified runtime authority

```text
CODE_SHA   6ef350dada66524c6197a158225d6abcf3ce99e0
TREE_SHA   1828102bbd46b958b97dfdadaa9fd84c867d6b9c
```

This is the exact runtime/code authority validated by the final certification. Documentation commits created after this SHA do not alter the runtime implementation and MUST remain docs-only until integration.

## Full release certification

```text
HARNESS_REPO      Em3rc0d/Vigia
RUN_ID            34437644311
RUN_ATTEMPT       1
HARNESS_SHA       0985cb2251884855d67df9f489489c034304c132
RUNNER            vigia-wsl-FaridMerino
FINISHED_UTC      2026-09-10T04:37:21Z
RESULT            PASS
ARTIFACT_ID       10136833105
ARTIFACT_NAME     optihome-mk0-release-34437644311-1
ARTIFACT_SHA256   eff1f9a1a1d9ffa96047225e075f1946472da5e67c956ff9d4d7ab0423bd5d63
```

Mechanical/security result:

```text
npm ci                 PASS
npm audit              PASS — 0 vulnerabilities
npm audit --omit=dev   PASS — 0 vulnerabilities
npm run lint           PASS
npm run build          PASS
post-build git status  CLEAN
production-local boot  PASS
```

## Browser contract

Result: `29/29 PASS`

```text
RESPONSIVE_V1_home
RESPONSIVE_V1_products
RESPONSIVE_V2_home
RESPONSIVE_V2_products
RESPONSIVE_V3_home
RESPONSIVE_V3_products
RESPONSIVE_V4_home
RESPONSIVE_V4_products
RESPONSIVE_V5_home
RESPONSIVE_V5_products
RESPONSIVE_V6_home
RESPONSIVE_V6_products
RESPONSIVE_V7_home
RESPONSIVE_V7_products
RESPONSIVE_V8_home
RESPONSIVE_V8_products
RESPONSIVE_V9_home
RESPONSIVE_V9_products
DESIGN_TOKENS
LEGACY_REDIRECTS
KEYBOARD_FOCUS_MENU_FAQ
CTA_MATRIX
CATALOG_ONE_FRAME_AND_KEYBOARD
MOTION_NORMAL_AND_REDUCED
TRYON_PHOTO_P1_P2_P3
TRYON_CAMERA_C1_C4_C6
TRYON_CAMERA_C2_DENIED
TRYON_CAMERA_C3_PENDING_CLOSE
TRYON_CAMERA_C5_FACE_TRACKING
```

## C5 camera authority

The final C5 gate uses the frozen historical Y4M fixture rather than a regenerated input.

```text
SOURCE_RUN_ID       34434424803
SOURCE_ARTIFACT_ID  10135682652
SOURCE_ARTIFACT     optihome-mk0-targeted-34434424803
Y4M_BYTES           69120978
Y4M_SHA256          1b96aed93962a6ee0b6dc0e328d3acb3d54da70fb03f9f357642db1bdf9ea9ac
```

The camera defect was isolated before release: direct FaceMesh inference from the fake-webcam `<video>` returned non-finite landmarks, while the exact same pixels captured into a canvas produced `478/478` finite landmarks. Production now performs camera inference from a reusable canvas frame and resets detector state only when a returned face has invalid geometry.

Final C5 evidence includes pixel-based face geometry rather than the legacy centered fallback:

```text
TOP_INITIAL    103.118px
LEFT_INITIAL   -0.0319625px
WIDTH          254.782px
TOP_RETAINED   103.187px
LEFT_RETAINED  -0.11055px
FALLBACK_48    NO
```

## Targeted final certification

A separate targeted run validated the same runtime authority before the full suite:

```text
RUN_ID       34437602932
RESULT       PASS
ARTIFACT_ID  10136769421
```

It independently passed exact fixture authority, audits, lint, build, photo detection, mobile menu behavior and anti-fallback C5 tracking.

## Visual review

The frozen screenshots for V1–V9, catalog, photo try-on and camera tracking were reviewed after the final run. No release-blocking overflow, hierarchy, brand, catalog or try-on presentation defect was identified. The multi-face C5 fixture can cause FaceMesh to select one of the visible faces; the release contract requires valid face-derived geometry and retained tracking, both of which passed.

User release continuation was explicitly authorized after the targeted C5 evidence was reviewed and before stable integration.

## Gate closure

```text
MECHANICAL_BUILD_GATE        PASS_MECHANICAL
ROUTE_GATE                   PASS_BROWSER
RESPONSIVE_GATE              PASS_BROWSER
KEYBOARD_A11Y_GATE           PASS_BROWSER
CTA_INTERACTION_GATE         PASS_BROWSER
CATALOG_GATE                 PASS_BROWSER
TRYON_PHOTO_GATE             PASS_BROWSER
TRYON_CAMERA_GATE            PASS_BROWSER
MOTION_GATE                  PASS_BROWSER
CLAIM_TRUST_GATE             PASS_STATIC
VISUAL_EVIDENCE_REVIEW       PASS
RELEASE_AUTHORIZATION        ACCEPTED
MAIN_READY                   YES
```

## Integration invariant

The certified runtime SHA is immutable. Any descendant used for the integration PR may add only release documentation. If a runtime/source/config/dependency file changes after `6ef350dada66524c6197a158225d6abcf3ce99e0`, the affected release gates MUST be rerun before merge.

Next sequence:

```text
CERTIFIED_RUNTIME
→ DOCS-ONLY RECEIPT
→ STABLE INTEGRATION PR
→ MAIN
→ ONE PRODUCTION VERCEL DEPLOY
→ PRODUCTION SMOKE
```
