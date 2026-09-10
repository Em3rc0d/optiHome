# PRE-RUNTIME-RUNBOOK.md — OptiHome MK0 Release Verification

Status: `FROZEN_BEFORE_RUNTIME`

## 0. Authority

This runbook is the execution contract for the next validation pass.

```text
CODE_AUTHORITY_SHA  5e32d338cce28ae79273866783b8cec1c905744e
CODE_AUTHORITY_TREE 21030d1e23a18871abdd8e1ea3d8079582825b28
BRANCH_REF_MOVED    NO
VERCEL_DEV_PREVIEW  FORBIDDEN
```

The code authority MUST NOT change during verification. If a defect requires a code change, verification stops, a new detached code SHA is created, this runbook authority is updated, and all affected gates are rerun.

## 1. Meaning of “100%”

For MK0, `100%` means every release-blocking contract defined below has evidence on the exact code authority.

It does NOT mean compatibility with every browser/device ever produced. The supported baseline is the viewport/browser/capability matrix in this document.

No gate may be inferred from appearance alone.

## 2. Source design authority

The verification strategy is aligned with the project design contract and reusable knowledge in `Em3rc0d/personal_knowledge`:

- `web-design/design/design-system-contract.md`
- `web-design/test/README.md`
- `ux-laws/quarries/laws-of-ux/catalog.md`

Accepted reusable rules:

- responsive behavior is a first-class contract;
- motion must communicate causality or hierarchy;
- visible focus and keyboard operability are release requirements;
- reduced motion must be honored;
- UI density must reduce decision load;
- touch targets must be comfortably reachable;
- state, overflow and viewport baselines require explicit testing.

Project-specific refinement is documented in `../design/DR-001-one-frame-per-screen.md`.

## 3. Execution order

The next validation pass MUST occur in this order:

```text
A. repository integrity
B. dependency/mechanical build
C. route smoke
D. responsive geometry
E. keyboard/accessibility
F. CTA and navigation interactions
G. catalog interactions
H. virtual try-on — photo
I. virtual try-on — camera
J. motion/reduced-motion
K. visual acceptance
L. release evidence freeze
M. main integration
N. production deploy from main only
```

A failure in A–J blocks progression to main. A human rejection in K also blocks main.

## 4. Mechanical gate

Required on the exact code authority:

```text
npm ci
npm run lint
npm run build
```

PASS requires:

- clean dependency install from lockfile;
- lint exits 0;
- production build exits 0;
- no unresolved route/module/import error;
- no type/build diagnostic hidden as warning if it affects runtime correctness.

No Vercel preview may substitute this gate.

## 5. Route inventory

### Canonical public routes

| Route | Expected result |
|---|---|
| `/` | OptiHome homepage loads |
| `/products` | catalog + try-on entry loads |

### Legacy compatibility routes

| Route | Expected result |
|---|---|
| `/contact` | redirects to `/#solicitar-evaluacion` |
| `/finalCTA` | redirects to `/#solicitar-evaluacion` |
| `/services` | redirects to `/#proceso` |
| `/testimonials` | redirects to `/` |
| `/us` | redirects to `/` |

PASS requires no redirect loop, no 404, no stale DaVision public surface and the final canonical target must be keyboard reachable.

## 6. Viewport matrix

Every canonical route is checked at all required widths. Height is varied where interaction density depends on it.

| ID | Width × height | Purpose |
|---|---:|---|
| V1 | 320 × 568 | minimum supported narrow viewport |
| V2 | 360 × 800 | common compact mobile portrait |
| V3 | 390 × 844 | modern mobile portrait |
| V4 | 844 × 390 | mobile landscape / short height |
| V5 | 768 × 1024 | tablet portrait |
| V6 | 1024 × 768 | tablet/compact laptop landscape |
| V7 | 1366 × 768 | laptop baseline |
| V8 | 1440 × 900 | desktop baseline |
| V9 | 1920 × 1080 | wide desktop |

For every viewport, PASS requires:

- no unintended horizontal document scroll;
- no clipped heading/body text;
- no CTA rendered off-screen without a reachable scroll path;
- no overlapping sticky header/content;
- no control below the minimum touch target contract;
- images preserve intended aspect/crop without hiding essential information;
- dialogs remain closable;
- focus indicator remains visible;
- content order remains understandable.

## 7. “One frame per screen” contract

The eyewear decision surface MUST present one active frame as the visual authority at a time.

Homepage:

- featured-frame section shows one featured frame, not a competing product grid.

Catalog:

- one active frame article at a time;
- previous/next changes active frame;
- keyboard Left/Right changes active frame;
- filter resets active index safely;
- counter matches active filtered collection;
- no hidden duplicate active product CTA.

Try-on:

- one active overlay frame at a time;
- previous/next changes the overlay frame;
- selected frame name and counter remain synchronized;
- changing frame never re-requests camera permission.

## 8. CTA interaction matrix

Each critical CTA is exercised by pointer and keyboard where applicable.

| CTA | Expected behavior |
|---|---|
| Header `Solicitar evaluación` | reaches `#solicitar-evaluacion` |
| Hero `Solicitar evaluación` | reaches `#solicitar-evaluacion` |
| Hero `Explorar monturas` | opens `/products` |
| Hero try-on text link | opens `/products#prueba-virtual` |
| Journey evaluation action | reaches process/evaluation journey target |
| Journey frames action | opens catalog |
| Journey try-on action | opens try-on path |
| Featured frame CTA | opens catalog |
| Catalog `Probar virtualmente` | opens dialog for exact active frame |
| Catalog `Consultar disponibilidad` | opens truthful WhatsApp request URL |
| Final CTA | opens truthful WhatsApp request URL |

PASS requires no dead button, no fake submit, no claim that a request is already a confirmed appointment.

## 9. Keyboard/accessibility protocol

Keyboard-only pass:

1. Load `/` with no pointer use.
2. Use skip link and confirm focus lands on main content.
3. Traverse header navigation and CTA.
4. Open mobile menu at mobile viewport and close with Escape.
5. Reach every journey action.
6. Operate FAQ disclosures.
7. Navigate to catalog.
8. Focus catalog carousel and change frames with Left/Right.
9. Open try-on dialog.
10. Verify focus stays inside dialog while open.
11. Close with Escape and explicit close button.
12. Verify focus restoration to initiating control.

PASS also requires:

- one meaningful H1 per canonical page;
- logical heading hierarchy;
- no hover-only critical functionality;
- meaningful images have alt text;
- decorative imagery is ignored by assistive technology;
- status changes that matter are exposed through appropriate live/status semantics.

## 10. Virtual try-on — photo protocol

Required cases:

### P1 — valid face photo

- open try-on from an AR-enabled frame;
- upload a clear frontal face photo;
- detector loads only after this explicit user action;
- face detection positions overlay from facial geometry;
- frame width derives from inter-eye distance;
- rotation follows eye angle;
- manual +/- refinement still works;
- changing frame preserves the photo and reuses face geometry.

### P2 — face not detected

- upload an image without a detectable face;
- UI reports the fallback state;
- centered manual overlay remains usable;
- no crash or infinite loading.

### P3 — replacement photo

- replace a prior photo;
- old face geometry does not leak into the new image;
- new detection/fallback state is authoritative.

PASS requires no upload to an application backend in MK0; processing remains a browser-session experience.

## 11. Virtual try-on — camera protocol

Required capability path on a real camera-capable HTTPS browser/device:

### C1 — permission accepted

- no camera prompt before `Activar cámara`;
- explicit click triggers permission request;
- stream starts;
- face detector loads after intent;
- overlay follows face position and rotation;
- smoothing prevents obvious single-frame jitter;
- width scales with inter-eye distance;
- switching frames preserves active stream;
- +/- manual refinement works;
- close stops every media track.

### C2 — permission denied

- denial does not crash dialog;
- actionable status appears;
- photo fallback remains usable.

### C3 — close while permission is pending

- open camera permission flow;
- close try-on before permission resolves;
- if permission resolves afterward, late stream is immediately stopped;
- no hidden camera indicator/active track remains.

### C4 — reopen after close

- reopen dialog;
- previous stopped stream is not reused accidentally;
- user can intentionally start camera again.

### C5 — face temporarily lost

- move face out of view;
- overlay clears or enters searching state rather than freezing as authoritative;
- returning face resumes tracking.

### C6 — orientation/viewport change

- rotate/rescale viewport while camera is active;
- overlay mapping remains inside the rendered stage;
- controls remain reachable and closable.

Physical camera behavior cannot be certified from static inspection; C1–C6 require runtime/device evidence.

## 12. Motion protocol

Normal motion:

- hero entrance is subtle and finite;
- menu entrance indicates disclosure;
- frame changes indicate state transition;
- no continuous decorative floating/autoplay loop.

Reduced motion:

With `prefers-reduced-motion: reduce`:

- entrance/state animations collapse to effectively immediate transitions;
- smooth scrolling is disabled;
- no required interaction depends on animation completion.

## 13. Color/contrast verification

Frozen tokens remain the design authority.

Critical text/control pairs to verify mechanically or with browser tooling:

- brand on white;
- ink on white;
- muted body copy on white/surface-soft;
- white on brand;
- CTA light text on dark ink surface;
- visible focus ring against both light and dark surfaces;
- disabled state remains distinguishable without becoming unreadable.

No new color may be introduced during verification without a documented design revision.

## 14. Visual acceptance checklist

Human visual acceptance is performed on the exact stable candidate after mechanical/browser gates pass.

Confirm:

- OptiHome identity is consistent;
- hero has one clear primary message;
- no section feels like a generic card wall;
- one frame dominates each eyewear comparison screen;
- typography and spacing remain calm across widths;
- CTA hierarchy is obvious;
- WhatsApp/request language remains truthful;
- try-on looks intentional, not like a debug/demo utility;
- no legacy DaVision residue appears publicly;
- no fake price, inventory, testimonial, SLA or customer-count claim appears.

## 15. Evidence ledger requirements

For every executed gate record:

```text
GATE_ID
CODE_SHA
ENVIRONMENT / BROWSER / VIEWPORT
RESULT = PASS | FAIL | BLOCKED
EVIDENCE
NOTES
```

A failure that changes code invalidates affected prior evidence.

## 16. Release decision

`MAIN_READY` requires ALL of the following:

```text
MECHANICAL_BUILD_GATE        PASS
ROUTE_GATE                   PASS
RESPONSIVE_GATE              PASS
KEYBOARD_A11Y_GATE           PASS
CTA_INTERACTION_GATE         PASS
CATALOG_GATE                 PASS
TRYON_PHOTO_GATE             PASS
TRYON_CAMERA_GATE            PASS_DEVICE
MOTION_GATE                  PASS
CLAIM_TRUST_GATE             PASS
HUMAN_VISUAL_GATE            ACCEPTED
```

Only then:

```text
accepted detached RC
→ integrate stable state
→ main
→ one production Vercel deploy
→ production smoke check
```

No development Vercel preview is part of this contract.
