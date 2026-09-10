# RELEASE CERTIFICATION — OptiHome MK0.1 — 2026-09-10

Status: `RELEASE_CERTIFIED__MAIN_READY`

## Release authority

```text
RUNTIME_SHA       d1b214e3d922ff53e3f6934063c11213a3733722
TREE_SHA          a0186b4a94a72192fc4de05726d574baaff1702d
CERT_RUN_ID       34488806649
CERT_JOB_ID       102909860330
HARNESS_SHA       f9c285b172cdc028a7405c319607a2e89d53dfb6
ARTIFACT_ID       10156907729
ARTIFACT_SHA256   87d6d8f2d2588b7ac1d83c86eaaed5c61d5c9b2284b0b6f7e719226f5cda00eb
RESULT            39/39 PASS
```

The runtime was checked out detached at the exact SHA above. The certification harness is not part of runtime authority and is deliberately excluded from the release tree.

## Mechanical gates

```text
npm ci                        PASS
npm audit                     PASS — 0 vulnerabilities
npm audit --omit=dev          PASS — 0 vulnerabilities
npm run lint                  PASS
npm run build                 PASS
TypeScript                    PASS
static generation             PASS — 11/11
post-build repository status  CLEAN
production-local boot         PASS
```

## Browser contract

```text
RESPONSIVE V1–V9 × home/products/privacy  27/27 PASS
COMMERCIAL_PRODUCT_IDENTITY               PASS
FRAME_ASSET_AUTHORITY                     PASS
CATALOG_DESKTOP_DISCOVERY                 PASS
CATALOG_MOBILE_FOCUS                      PASS
DIRECT_TRYON_INTENT_NO_AUTO_CAMERA        PASS
HOME_TRYON_CTA_CONTRACT                   PASS
KEYBOARD_FOCUS_MENU_FAQ                   PASS
MOTION_REDUCED                            PASS
TRYON_PHOTO_ALL_FRAMES                    PASS
TRYON_CAMERA_C1_C5_C6                     PASS
TRYON_CAMERA_C2_DENIED                    PASS
TRYON_CAMERA_C3_PENDING_CLOSE_C4_REOPEN   PASS
TOTAL                                     39/39 PASS
```

## Camera fixture authority

The release run reproduced the historical C5 fixture byte-for-byte before camera tests were allowed to execute.

```text
SOURCE_IMAGE_BLOB  b8b8de458d37b939ad7831897adf022861ebf533
Y4M_SHA256         1b96aed93962a6ee0b6dc0e328d3acb3d54da70fb03f9f357642db1bdf9ea9ac
WIDTH              640
HEIGHT             480
SAR                 1:1
FPS                 10
```

The workflow hard-fails if the regenerated fixture does not match the frozen hash.

## False-green closure

A previous run exposed two harness defects rather than release defects:

1. shell piping through `tee` did not preserve the E2E exit code;
2. reopening the direct try-on URL could perform a same-document navigation for which Playwright returns no HTTP response.

The authoritative run uses `set -euo pipefail` and a deterministic same-URL reload path. Therefore a browser-contract failure now fails the job, and the recorded `39/39 PASS` is not a masked result.

## Visual acceptance

Representative evidence was inspected after the automated run:

- mobile homepage;
- desktop homepage;
- mobile products/catalog;
- desktop catalog;
- photo try-on;
- camera try-on.

No release-blocking hierarchy, overflow, contrast, control-access, one-frame-focus or try-on presentation defect was observed in the certified captures.

Result: `VISUAL_EVIDENCE_REVIEW = PASS`.

## MK0.1 release scope

MK0.1 hardens the commercial surface without opening later operational MKs. It includes the production-facing OptiHome framing, privacy surface, commercial catalog presentation, eight transparent eyewear authorities, direct virtual try-on intent, responsive/accessibility hardening, photo try-on and camera lifecycle/tracking behavior.

It does not claim a production appointment scheduler, CRM, payments, real inventory, analytics attribution or acquisition automation.

## Release rule

Any runtime/source/config/dependency change after `d1b214e3d922ff53e3f6934063c11213a3733722` invalidates the affected certification gates. Documentation-only descendants may carry this receipt into the stable integration PR.

Next state:

```text
CERTIFIED_RUNTIME
→ DOCS_ONLY_RECEIPT
→ STABLE_INTEGRATION_PR
→ master
→ ONE_PRODUCTION_VERCEL_DEPLOY
→ PRODUCTION_SMOKE
```
