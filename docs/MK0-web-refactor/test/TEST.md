# TEST.md — OptiHome MK0 Verification Contract

Status: `PRE_RUNTIME_FROZEN__RUNTIME_GATES_OPEN`

## 1. Evidence policy

A green visual impression is not enough. Each release claim must identify whether it is statically verified, mechanically executed, visually verified, device-verified or still open.

The executable validation procedure is `PRE-RUNTIME-RUNBOOK.md`.

## 2. Current detached code authority

```text
CODE_SHA  5e32d338cce28ae79273866783b8cec1c905744e
TREE_SHA  21030d1e23a18871abdd8e1ea3d8079582825b28
BRANCH_REF_MOVED NO
VERCEL_PREVIEW_USED NO
```

If code changes after a FAIL, the affected evidence must be rerun on the replacement SHA.

## 3. Static gates available

### Structural/code review

Result: `PASS_STATIC`

Confirmed in the current code authority:

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
- no development Vercel preview in the current validation path.

### Public-claim contract

Result: `PASS_STATIC`

Release-blocking public regressions include:

- `DaVision` as active public brand;
- fake prices or checkout/cart actions;
- fabricated customer counts/testimonials;
- fixed fast SLA without evidence;
- unsupported free-service claims;
- wording that treats a request as a confirmed appointment.

Historical assets/docs are not interpreted as current runtime claims unless exposed publicly.

### AR asset contract

Result: `PASS_STATIC_MINIMUM`

Frames explicitly configured for try-on point to PNG/RGBA assets with eyewear-like proportions. Runtime visual alignment remains open and MUST be tested through photo/camera protocols.

## 4. Mechanical runtime gate

Status: `OPEN`

Required on exact code authority:

```text
npm ci
npm run lint
npm run build
```

PASS requires exit code 0 for all required commands and no unresolved production route/module/type failure.

## 5. Browser/runtime gates

Status: `OPEN`

The frozen runbook defines:

- canonical and legacy route smoke;
- V1–V9 viewport matrix;
- no-overflow geometry contract;
- CTA interaction matrix;
- keyboard-only traversal;
- mobile menu / Escape behavior;
- FAQ disclosure;
- dialog focus and restoration;
- catalog filtering and one-frame carousel behavior;
- photo try-on P1–P3;
- camera/device try-on C1–C6;
- normal motion and reduced-motion behavior;
- color/contrast acceptance;
- final human visual acceptance.

## 6. Evidence taxonomy

Use only these outcomes:

```text
PASS_STATIC
PASS_MECHANICAL
PASS_BROWSER
PASS_DEVICE
ACCEPTED_HUMAN
FAIL
BLOCKED_ENVIRONMENT
```

Every executed record must contain:

```text
GATE_ID
CODE_SHA
ENVIRONMENT
BROWSER / DEVICE
VIEWPORT
RESULT
EVIDENCE
NOTES
```

## 7. Release blockers

Any of the following blocks `main` integration:

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
- human rejection of hierarchy/spacing/brand/try-on presentation.

## 8. Final release gates

```text
MECHANICAL_BUILD_GATE        OPEN
ROUTE_GATE                   OPEN
RESPONSIVE_GATE              OPEN
KEYBOARD_A11Y_GATE           OPEN
CTA_INTERACTION_GATE         OPEN
CATALOG_GATE                 OPEN
TRYON_PHOTO_GATE             OPEN
TRYON_CAMERA_GATE            OPEN_DEVICE
MOTION_GATE                  OPEN
CLAIM_TRUST_GATE             PASS_STATIC
HUMAN_VISUAL_GATE            OPEN
MAIN_READY                   NO
```

## 9. Deployment policy

Only an accepted stable `main` is deployed. No development branch/preview is part of the MK0 validation workflow.
