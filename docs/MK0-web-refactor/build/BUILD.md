# BUILD.md — OptiHome MK0 Build Ledger

Status: `PRE_RUNTIME_RELEASE_CANDIDATE_READY`

This ledger separates implementation completion from release certification.

## BUILD-001 — Foundation cleanup

Status: `COMPLETE`

Certified implementation:

```text
SOURCE_SHA  3b0e9791c75a88514553fcb235d19d867ff0a05c
OUTPUT_SHA  01bff16741ea4440745856c99a7fa2977f7ae37f
```

Outputs:

- canonical OptiHome brand
- design tokens and global shell
- centralized contact/config authority
- unsupported-claim cleanup
- analytics-ready semantic IDs
- truthful request/WhatsApp semantics

## BUILD-002 — Homepage narrative

Status: `COMPLETE_CODE__HARDENED`

Outputs:

- `Hero.tsx`
- `JourneyChooser.tsx`
- `HowItWorks.tsx`
- `FeaturedFrames.tsx`
- `TryOnFeature.tsx`
- `TrustFaq.tsx`
- `FinalCta.tsx`
- thin server-rendered page composition
- one featured frame as the dominant eyewear visual
- motion limited to finite semantic entrance/state cues

## BUILD-003 — Catalog experience

Status: `COMPLETE_CODE__HARDENED`

Outputs:

- typed frame domain/data model
- demo-safe authority
- no fake price/cart/checkout
- one active frame at a time
- filter taxonomy
- previous/next navigation
- Left/Right keyboard support
- synchronized counter/state
- explicit try-on and WhatsApp actions

## BUILD-004 — Virtual try-on

Status: `COMPLETE_CODE__HARDENED`

Outputs:

- isolated `VirtualTryOn` client boundary
- lazy/dynamic component load
- camera permission only after explicit click
- TensorFlow/model load only after camera/photo intent
- browser-session detector cache
- camera geometry mapped for `object-cover`
- photo geometry mapped for `object-contain`
- overlay width derived from inter-eye distance
- face-angle rotation
- smoothing against obvious jitter
- photo face-detection attempt
- centered/manual fallback when photo detection fails
- frame-overlay preprocessing for neutral light backgrounds
- one active overlay frame at a time
- late permission-resolution invalidation
- media-stream cleanup
- safe-area responsive controls
- non-diagnostic/privacy context

## BUILD-005 — Responsive + accessibility hardening

Status: `STATIC_COMPLETE__RUNTIME_MATRIX_OPEN`

Static/code outputs:

- mobile-first responsive rules
- skip link
- visible focus contract
- semantic landmarks/headings/lists
- native FAQ disclosures
- mobile menu with Escape close
- minimum touch-oriented sizes
- dialog semantics via Radix primitive
- reduced-motion contract
- one-frame-per-screen revision `design/DR-001-one-frame-per-screen.md`

## BUILD-006 — SEO + performance hardening

Status: `STATIC_COMPLETE__BUILD_GATE_OPEN`

Static/code outputs:

- metadata/Open Graph foundation
- responsive image sizing
- constrained client boundaries
- deferred try-on/ML work
- legacy route redirects
- obsolete legacy landing implementation removed from RC tree

## Current detached code authority

```text
RC_PARENT_DOC_SHA ad57742e8127ad65420c737bad5574e573e1959f
RC_CODE_SHA       5e32d338cce28ae79273866783b8cec1c905744e
RC_CODE_TREE      21030d1e23a18871abdd8e1ea3d8079582825b28
REF_MOVED         NO
VERCEL_DEV        FORBIDDEN
```

The code authority is detached. The PR branch remains unchanged; no development Vercel preview is required or desired.

## Verification authority

Runtime/browser/device validation MUST follow:

```text
docs/MK0-web-refactor/test/PRE-RUNTIME-RUNBOOK.md
```

The runbook defines:

- exact route inventory;
- 9 viewport baselines;
- CTA matrix;
- keyboard/accessibility sequence;
- one-frame-per-screen behavior;
- photo protocol P1–P3;
- camera/device protocol C1–C6;
- motion/reduced-motion checks;
- visual acceptance and evidence taxonomy.

## Static evidence state

```text
DESIGN_SYSTEM_CONTRACT           FROZEN
DR_001_ONE_FRAME                 ACCEPTED
CLAIM_TRUST_CONTRACT             PASS_STATIC
CAMERA_INTENT_BOUNDARY           PASS_STATIC
LATE_PERMISSION_INVALIDATION     PASS_STATIC
PHOTO_FALLBACK_PATH              PASS_STATIC
RESPONSIVE_CONTROL_RULES         PASS_STATIC
REDUCED_MOTION_CONTRACT          PASS_STATIC
DEV_VERCEL_PREVIEW               NOT_USED_FOR_CURRENT_RC
```

Static evidence is not a substitute for browser/device execution.

## Gates intentionally open

```text
npm ci
npm run lint
npm run build
route smoke
responsive V1–V9
keyboard/focus traversal
CTA interactions
catalog runtime
try-on photo P1–P3
try-on camera/device C1–C6
motion/reduced-motion
human visual acceptance
```

## Release invariant

```text
DETACHED_CODE_AUTHORITY
→ FROZEN_PRE_RUNTIME_DOCS
→ MECHANICAL_GATE
→ BROWSER/DEVICE_GATES
→ HUMAN_VISUAL_GATE
→ EVIDENCE_FREEZE
→ STABLE_INTEGRATION
→ MAIN
→ ONE_PRODUCTION_VERCEL_DEPLOY
→ PRODUCTION_SMOKE
```

Any code change after runtime begins creates a new code authority and invalidates affected evidence.
