# TEST.md — OptiHome MK0 Verification Contract

Status: `RELEASE_CERTIFIED__MAIN_READY`

## 1. Evidence policy

A green visual impression is not enough. Each release claim identifies whether it was statically verified, mechanically executed, browser-verified or explicitly accepted.

The executable validation procedure is `PRE-RUNTIME-RUNBOOK.md` and the immutable final receipt is `RELEASE-CERTIFICATION-20260910.md`.

## 2. Certified runtime authority

```text
CODE_SHA  6ef350dada66524c6197a158225d6abcf3ce99e0
TREE_SHA  1828102bbd46b958b97dfdadaa9fd84c867d6b9c
```

Final full certification:

```text
RUN_ID       34437644311
RESULT       PASS
ARTIFACT_ID  10136833105
CHECKS       29/29 PASS
```

Targeted final certification:

```text
RUN_ID       34437602932
RESULT       PASS
ARTIFACT_ID  10136769421
```

Documentation-only descendants do not alter runtime authority. Any runtime/source/config/dependency change after the certified SHA requires affected gates to be rerun.

## 3. Static gates

### Structural/code review

Result: `PASS_STATIC`

Confirmed in the certified code authority:

- canonical OptiHome public framing;
- demo-safe catalog authority;
- one active frame per comparison surface;
- catalog previous/next + keyboard semantics;
- try-on dynamically imported;
- camera request after explicit user action only;
- photo fallback and photo face-detection attempt;
- camera/photo geometry handled with distinct fit modes;
- frame width based on inter-eye geometry;
- face rotation mapping;
- smoothing path for tracking;
- late camera-permission invalidation;
- media-track cleanup paths;
- responsive safe-area control panel;
- reduced-motion CSS override;
- no development Vercel preview in the validation path.

### Public-claim contract

Result: `PASS_STATIC`

Release-blocking public regressions remain:

- `DaVision` as active public brand;
- fake prices or checkout/cart actions;
- fabricated customer counts/testimonials;
- fixed fast SLA without evidence;
- unsupported free-service claims;
- wording that treats a request as a confirmed appointment.

Historical assets/docs are not interpreted as current runtime claims unless exposed publicly.

### AR asset contract

Result: `PASS_STATIC_MINIMUM__PASS_BROWSER`

Frames configured for try-on use eyewear-like assets and runtime photo/camera geometry passed the final browser contract.

## 4. Mechanical runtime gate

Status: `PASS_MECHANICAL`

Executed on exact runtime authority:

```text
npm ci                        PASS
npm audit                     PASS — 0 vulnerabilities
npm audit --omit=dev          PASS — 0 vulnerabilities
npm run lint                  PASS
npm run build                 PASS
post-build repository status  CLEAN
production-local boot         PASS
```

## 5. Browser/runtime gates

Status: `PASS_BROWSER`

The frozen runbook contract passed:

- canonical and legacy route smoke;
- V1–V9 viewport matrix for homepage and products;
- no release-blocking overflow geometry;
- CTA interaction matrix;
- keyboard-only traversal;
- mobile menu / Escape behavior;
- FAQ disclosure;
- catalog filtering and one-frame carousel behavior;
- photo try-on P1–P3;
- camera try-on C1/C2/C3/C4/C5/C6 behavior represented by the automated release contract;
- normal motion and reduced-motion behavior;
- final visual evidence review.

The full browser harness reports `29/29 PASS`.

## 6. C5 face-tracking closure

The historical Y4M fixture was frozen and verified byte-for-byte:

```text
SOURCE_RUN_ID       34434424803
SOURCE_ARTIFACT_ID  10135682652
Y4M_BYTES           69120978
Y4M_SHA256          1b96aed93962a6ee0b6dc0e328d3acb3d54da70fb03f9f357642db1bdf9ea9ac
```

The defect was isolated before certification: direct detector inference from the fake-webcam `<video>` returned non-finite landmarks, while the same pixels captured to canvas produced `478/478` finite landmarks. The production path now infers camera frames through a reusable canvas and resets detector state only for invalid returned face geometry.

Final gate evidence:

```text
FACE_GEOMETRY_PIXELS   PASS
CENTER_FALLBACK_48     NOT_USED
TRACKING_RETAINED      PASS
C5_RESULT              PASS_BROWSER
```

## 7. Evidence taxonomy

Final outcomes use:

```text
PASS_STATIC
PASS_MECHANICAL
PASS_BROWSER
ACCEPTED
FAIL
BLOCKED_ENVIRONMENT
```

The final artifact contains authority metadata, dependency audits, lint/build logs, browser results, C5 metrics and V1–V9/try-on screenshots.

## 8. Release blockers

No known release blocker remains on the certified runtime authority.

Any future occurrence of the following blocks a replacement release candidate:

- dependency/lint/build failure;
- broken route or redirect loop;
- unintended severe overflow;
- inaccessible critical CTA;
- keyboard/focus failure on critical journey;
- catalog state/index mismatch;
- try-on crash or unusable fallback;
- camera stream remaining active after close;
- late camera permission resolving into hidden active stream;
- overlay geometry clearly detached from the face under supported test conditions;
- reduced-motion violation;
- unsupported public claim regression;
- rejection of hierarchy/spacing/brand/try-on presentation.

## 9. Final release gates

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

## 10. Deployment policy

Only the certified stable integration is promoted to `master`, followed by one production Vercel deployment and production smoke. Development previews are not part of the MK0 release evidence chain.
