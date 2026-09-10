# BUILD.md — OptiHome MK0 Build Ledger

Status: `RELEASE_CERTIFIED__MAIN_READY`

This ledger separates implementation completion from release certification.

Final release receipt: `../test/RELEASE-CERTIFICATION-20260910.md`.

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

Status: `COMPLETE_CODE__CERTIFIED`

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

Status: `COMPLETE_CODE__CERTIFIED`

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

Status: `COMPLETE_CODE__CERTIFIED`

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
- camera inference from a reusable canvas frame
- invalid detector ROI recovery when returned geometry is non-finite

## BUILD-005 — Responsive + accessibility hardening

Status: `COMPLETE__CERTIFIED`

Outputs:

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
- V1–V9 homepage and product matrix certified
- keyboard/mobile-menu/FAQ contract certified

## BUILD-006 — SEO + performance hardening

Status: `COMPLETE__CERTIFIED`

Outputs:

- metadata/Open Graph foundation
- responsive image sizing
- constrained client boundaries
- deferred try-on/ML work
- legacy route redirects
- obsolete legacy landing implementation removed from RC tree
- dependency audit, lint and production build certified

## Certified runtime authority

```text
CODE_SHA  6ef350dada66524c6197a158225d6abcf3ce99e0
TREE_SHA  1828102bbd46b958b97dfdadaa9fd84c867d6b9c
```

Release evidence:

```text
FULL_RUN_ID       34437644311
FULL_RESULT       SUCCESS
FULL_ARTIFACT_ID  10136833105
BROWSER_CHECKS    29/29 PASS
TARGETED_RUN_ID   34437602932
TARGETED_RESULT   SUCCESS
```

Documentation-only descendants may carry the receipt into the integration PR. Runtime/source/config/dependency changes after the certified SHA invalidate affected evidence.

## Verification authority

The frozen execution contract remains:

```text
docs/MK0-web-refactor/test/PRE-RUNTIME-RUNBOOK.md
```

The final executed evidence and gate closure are recorded in:

```text
docs/MK0-web-refactor/test/RELEASE-CERTIFICATION-20260910.md
```

## Certified evidence state

```text
DESIGN_SYSTEM_CONTRACT           PASS_BROWSER
DR_001_ONE_FRAME                 PASS_BROWSER
CLAIM_TRUST_CONTRACT             PASS_STATIC
CAMERA_INTENT_BOUNDARY           PASS_BROWSER
LATE_PERMISSION_INVALIDATION     PASS_BROWSER
PHOTO_FALLBACK_PATH              PASS_BROWSER
RESPONSIVE_CONTROL_RULES         PASS_BROWSER
REDUCED_MOTION_CONTRACT          PASS_BROWSER
DEPENDENCY_AUDIT                 PASS_MECHANICAL__ZERO_VULNERABILITIES
LINT                             PASS_MECHANICAL
PRODUCTION_BUILD                 PASS_MECHANICAL
C5_FACE_TRACKING                 PASS_BROWSER__FACE_GEOMETRY
VISUAL_EVIDENCE_REVIEW           PASS
MAIN_READY                       YES
```

## Gates closed

```text
npm ci                           PASS
npm run lint                     PASS
npm run build                    PASS
route smoke                      PASS
responsive V1–V9                PASS
keyboard/focus traversal         PASS
CTA interactions                 PASS
catalog runtime                  PASS
try-on photo P1–P3              PASS
try-on camera C1–C6 contract     PASS
motion/reduced-motion            PASS
visual evidence review           PASS
release continuation             ACCEPTED
```

## Release invariant

```text
CERTIFIED_RUNTIME_SHA
→ DOCS_ONLY_RELEASE_RECEIPT
→ STABLE_INTEGRATION_PR
→ MAIN
→ ONE_PRODUCTION_VERCEL_DEPLOY
→ PRODUCTION_SMOKE
```

The runtime authority is immutable at `6ef350dada66524c6197a158225d6abcf3ce99e0`. Any non-documentation change before merge requires affected gates to be rerun.
