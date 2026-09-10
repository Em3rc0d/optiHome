# PLAN.md — OptiHome MK0 Web Refactor

Status: `PRE_RUNTIME_CONTRACT_FROZEN`

## Objective

Produce a stable public-web candidate without opening later commercial-system scope and without using development Vercel previews as an execution gate.

## Current authority

```text
CODE_SHA  5e32d338cce28ae79273866783b8cec1c905744e
TREE_SHA  21030d1e23a18871abdd8e1ea3d8079582825b28
REF_MOVED  NO
VERCEL_DEV FORBIDDEN
```

Runtime verification MUST follow `../test/PRE-RUNTIME-RUNBOOK.md`.

## Build sequence

### BUILD-001 — Foundation cleanup

Status: `COMPLETE`

Delivered:

- canonical `OptiHome` brand
- design tokens
- `SiteHeader` / `SiteFooter`
- centralized site/contact configuration
- unsupported-claim cleanup on canonical surfaces
- typed analytics-ready intent semantics
- truthful WhatsApp request wording

Historical certification: implementation SHA `01bff16741ea4440745856c99a7fa2977f7ae37f` passed the then-active build preview before the no-development-preview policy was frozen.

### BUILD-002 — Homepage narrative

Status: `COMPLETE_CODE`

Delivered:

- static single-message hero
- primary/secondary/tertiary actions
- three-path journey chooser
- request/capacity process
- one featured-frame authority per screen
- focused virtual try-on explanation
- trust/FAQ
- final WhatsApp CTA
- server-rendered composition except interactive boundaries

### BUILD-003 — Catalog experience

Status: `COMPLETE_CODE__HARDENED`

Delivered:

- frame data in `src/content/frames.ts`
- typed `Frame` domain model
- localized filter taxonomy
- demo authority explicit
- fake price/checkout/cart behavior removed
- try-on and WhatsApp availability actions modeled honestly
- one active frame at a time
- previous/next navigation
- keyboard Left/Right navigation
- accessible filter pressed states and active counter

### BUILD-004 — Virtual try-on

Status: `COMPLETE_CODE__HARDENED`

Delivered:

- dedicated `VirtualTryOn` client boundary
- no TensorFlow/model preload on catalog entry
- camera requested only after explicit action
- browser-session model cache
- photo fallback with face-detection attempt
- manual fallback when photo face detection fails
- mapping for camera `object-cover` and photo `object-contain`
- frame width derived from inter-eye distance
- face rotation tracking
- smoothing against obvious single-frame jitter
- late permission-resolution invalidation
- media-track cleanup
- one active overlay frame at a time
- safe-area aware responsive control panel
- explicit non-diagnostic/privacy context

### BUILD-005 — Responsive + accessibility hardening

Status: `STATIC_HARDENING_COMPLETE__RUNTIME_GATE_OPEN`

Implemented in code:

- skip link and semantic main landmark
- mobile menu with state and Escape close
- visible global focus contract
- reduced-motion contract
- touch-oriented control sizes
- mobile-first responsive layouts
- safe-area handling for try-on controls
- no hover-only critical catalog action
- dialog focus semantics via Radix primitive
- one-frame-per-screen design revision `DR-001`

Remaining gate:

- execute exact viewport/browser/keyboard matrix in `PRE-RUNTIME-RUNBOOK.md`

### BUILD-006 — SEO + performance hardening

Status: `STATIC_HARDENING_COMPLETE__MECHANICAL_BUILD_GATE_OPEN`

Implemented in code:

- route metadata and Open Graph foundation
- hero image priority only where justified
- responsive image `sizes`
- home mostly Server Components
- interactive client boundaries constrained
- virtual try-on dynamically imported
- TensorFlow/model loading deferred until explicit camera/photo intent
- legacy public pages converted to redirects
- obsolete landing implementation removed from RC tree

Remaining gate:

```text
npm ci
npm run lint
npm run build
```

No Vercel development preview may substitute this gate.

## Explicit non-goals

Do not add during MK0:

- TikTok API / social automation
- CRM / lead database
- production appointment scheduler
- notification backend / internal agenda
- payments or checkout
- real inventory
- content generation pipeline
- revenue dashboard

## Commercial continuation after MK0

```text
Appointment & Capacity
→ Notifications + operational agenda
→ WhatsApp coordination backed by appointment state
→ acquisition/content automation
```

## Next execution sequence

```text
freeze docs authority
→ mechanical build
→ route smoke
→ responsive matrix
→ keyboard/accessibility
→ CTA/catalog interaction
→ try-on photo protocol
→ try-on camera/device protocol
→ motion/reduced-motion
→ human visual acceptance
→ evidence freeze
→ stable integration
→ main
→ one production Vercel deploy
→ production smoke
```

## Release gates

```text
DOCS_GATE                         PASS
BUILD_001_GATE                    PASS
BUILD_002_CODE_GATE               PASS
BUILD_003_CODE_GATE               PASS
BUILD_004_CODE_GATE               PASS
BUILD_005_STATIC_GATE             PASS
BUILD_006_STATIC_GATE             PASS
ONE_FRAME_DESIGN_GATE             PASS_STATIC
LINT_GATE                         OPEN
TYPE/PRODUCTION_BUILD_GATE        OPEN
ROUTE_RUNTIME_GATE                OPEN
RESPONSIVE_GATE                   OPEN
KEYBOARD_A11Y_GATE                OPEN
CTA_INTERACTION_GATE              OPEN
CATALOG_RUNTIME_GATE              OPEN
TRYON_PHOTO_GATE                  OPEN
TRYON_CAMERA_DEVICE_GATE          OPEN
MOTION_GATE                       OPEN
HUMAN_VISUAL_GATE                 OPEN
MAIN_INTEGRATION_GATE             BLOCKED_BY_OPEN_GATES
PRODUCTION_DEPLOY                 BLOCKED_BY_MAIN
```

## Release rule

Only the exact stable candidate that passes the frozen runbook may move to `main`. Development Vercel previews are forbidden. Production deploy happens once from accepted `main`.
