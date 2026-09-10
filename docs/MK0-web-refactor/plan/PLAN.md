# PLAN.md — OptiHome MK0 Web Refactor

Status: `RC_CODE_READY`

## Objective

Produce a stable public-web candidate without opening later commercial-system scope and without using development Vercel previews as an execution gate.

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
- featured frame discovery
- focused virtual try-on explanation
- trust/FAQ
- final WhatsApp CTA
- server-rendered composition except interactive boundaries

### BUILD-003 — Catalog experience

Status: `COMPLETE_CODE`

Delivered:

- frame data moved to `src/content/frames.ts`
- typed `Frame` domain model
- localized filter taxonomy
- demo authority explicit
- fake price/checkout/cart behavior removed
- try-on and WhatsApp availability actions modeled honestly
- accessible pressed-state filters

### BUILD-004 — Virtual try-on decomposition

Status: `COMPLETE_CODE`

Delivered:

- dedicated `VirtualTryOn` client boundary
- catalog no longer owns face-detection implementation
- no TensorFlow/model preload on catalog entry
- camera requested only after explicit action
- photo fallback
- loading/error/status communication
- media-track cleanup
- model cache bounded to the browser session
- explicit non-diagnostic/privacy context

### BUILD-005 — Responsive + accessibility hardening

Status: `STATIC_HARDENING_COMPLETE__HUMAN_VISUAL_GATE_OPEN`

Implemented in code:

- skip link and semantic main landmark
- accessible mobile-navigation state
- semantic ordered process
- native FAQ disclosure
- visible focus contract
- reduced-motion CSS contract
- minimum touch-oriented control sizes
- mobile-first grid/layout rules
- no hover-only catalog action
- dialog primitive provides focus management and Escape handling

Remaining gate:

- human visual/browser verification at required widths and keyboard traversal on the final integrated candidate

### BUILD-006 — SEO + performance hardening

Status: `STATIC_HARDENING_COMPLETE__MECHANICAL_BUILD_GATE_OPEN`

Implemented in code:

- route metadata and Open Graph foundation
- hero image priority only where justified
- `sizes` supplied to responsive imagery
- home mostly Server Components
- interactive client boundaries constrained
- virtual try-on dynamically imported
- TensorFlow/model loading deferred until camera intent
- legacy public pages converted to redirects
- obsolete landing implementation removed from the RC tree

Remaining gate:

- `npm ci`
- `npm run lint`
- `npm run build`

These commands are intentionally not substituted with a Vercel development preview. The current execution environment cannot resolve the npm registry, so this gate remains visible rather than being falsely marked PASS.

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

## Release gates

```text
DOCS_GATE                         PASS
BUILD_001_GATE                    PASS
BUILD_002_CODE_GATE               PASS
BUILD_003_CODE_GATE               PASS
BUILD_004_CODE_GATE               PASS
BUILD_005_STATIC_GATE             PASS
BUILD_006_STATIC_GATE             PASS
STATIC_TS_SYNTAX_GATE             PASS
INTERNAL_IMPORT_RESOLUTION_GATE   PASS
CLAIM_SANITIZATION_GATE           PASS
LINT_GATE                         OPEN
TYPE/PRODUCTION_BUILD_GATE        OPEN
HUMAN_VISUAL_GATE                 OPEN
MAIN_INTEGRATION_GATE             BLOCKED_BY_OPEN_GATES
PRODUCTION_DEPLOY                 BLOCKED_BY_MAIN
```

## Release rule

No development Vercel preview is required or desired. Only an accepted stable `main` state is deployed.
