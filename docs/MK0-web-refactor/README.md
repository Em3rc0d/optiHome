# MK0 — OptiHome Web Refactor

Status: `RELEASE_CERTIFIED__MAIN_READY`
Certified runtime authority: `6ef350dada66524c6197a158225d6abcf3ce99e0`
Certified runtime tree: `1828102bbd46b958b97dfdadaa9fd84c867d6b9c`
Scope: public website refactor only.

## Mission

Refactor OptiHome from a feature-oriented marketing website into a coherent, credible and conversion-ready public experience that can later become the front door of a measurable commercial system.

MK0 deliberately does **not** implement the future acquisition/content engine, CRM, revenue attribution, retention automation, production appointment scheduler or TikTok automation. Those belong to later MKs.

## Execution flow

```text
brainstorming
→ design
→ architecture
→ plan
→ build
→ test
→ release certification
```

Research/evidence runs in parallel through:

```text
mining-site
→ quarries
→ accepted decisions
```

## Canonical product framing

**OptiHome** is the canonical public brand.

The certified public surface no longer exposes legacy `DaVision` routes/components as canonical experiences. Historical assets may remain in `public/` until a later dead-asset cleanup proves they are unused.

## Product truth

The website is a public decision and request surface, not the future appointment system.

```text
visitor
→ understand OptiHome
→ choose journey
→ explore frames / virtual try-on / request evaluation
→ structured intent
→ WhatsApp continuation
→ future Appointment & Capacity system
```

`REQUESTED` and `CONFIRMED` remain distinct states. WhatsApp is communication, not capacity authority.

## MK0 implemented and certified

- canonical OptiHome shell and design tokens
- single-message homepage hero
- three explicit visitor journeys
- truthful request/capacity process
- one featured eyewear frame as visual authority
- demo-safe catalog with one active frame at a time
- filter + previous/next + keyboard catalog navigation
- virtual try-on isolated from catalog rendering
- camera/model loading only after explicit user intent
- camera overlay geometry based on face/inter-eye measurements
- camera inference through a reusable canvas frame
- invalid detector-state recovery for non-finite returned geometry
- face rotation + smoothing path
- photo detection attempt + manual fallback
- one active frame overlay at a time
- safe-area aware try-on controls
- late camera-permission invalidation and media cleanup paths
- reduced-motion and finite semantic motion rules
- no fake checkout, price, inventory, social proof or SLA
- native/semantic FAQ and accessibility-oriented navigation
- legacy public routes redirected to canonical journeys
- route metadata and deferred ML loading foundation

## Release certification

The exact runtime authority was certified end-to-end:

```text
CODE_SHA          6ef350dada66524c6197a158225d6abcf3ce99e0
TREE_SHA          1828102bbd46b958b97dfdadaa9fd84c867d6b9c
FULL_RUN_ID       34437644311
FULL_RESULT       SUCCESS
FULL_ARTIFACT_ID  10136833105
BROWSER_CHECKS    29/29 PASS
TARGETED_RUN_ID   34437602932
TARGETED_RESULT   SUCCESS
AUDIT              0 vulnerabilities
```

The immutable receipt is:

```text
test/RELEASE-CERTIFICATION-20260910.md
```

The V1–V9 responsive matrix, route/redirect behavior, keyboard/accessibility path, CTA matrix, catalog state, motion/reduced-motion, photo try-on and camera C1–C6 release contract all passed on the certified runtime authority.

## Design refinement

`design/DR-001-one-frame-per-screen.md` freezes the rule that eyewear comparison surfaces expose one active frame at a time, while preserving access to all references through progressive navigation.

## Explicitly deferred

- production appointment scheduler
- operational agenda / notifications
- CRM
- payments / checkout
- real inventory
- production analytics provider
- TikTok/content automation
- revenue attribution

## Release policy

Development branches are **not** deployed to Vercel for validation.

The remaining release sequence is:

```text
certified runtime
→ docs-only certification receipt
→ stable integration PR
→ master
→ one production Vercel deploy
→ production smoke
```

Any runtime/source/config/dependency change after the certified SHA invalidates affected evidence and requires recertification. Documentation-only descendants may carry the release receipt into stable integration.

## Documentation map

- `brainstorming/BR-000-product-thesis.md`
- `brainstorming/BR-001-appointment-capacity-contract.md`
- `design/DESIGN.md`
- `design/DR-001-one-frame-per-screen.md`
- `architecture/ARCHITECTURE.md`
- `plan/PLAN.md`
- `build/BUILD.md`
- `test/TEST.md`
- `test/PRE-RUNTIME-RUNBOOK.md`
- `test/RELEASE-CERTIFICATION-20260910.md`
- `../../mining-site/MK0-web-refactor/README.md`
- `../../quarries/MK0-web-refactor/QRY-000-optical-web-patterns.md`
