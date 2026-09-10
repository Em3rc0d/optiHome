# MK0 — OptiHome Web Refactor

Status: `PRE_RUNTIME_RELEASE_CANDIDATE_READY`
Branch authority: `refactor/mk0-web-foundation-20260909`
Detached code authority: `5e32d338cce28ae79273866783b8cec1c905744e`
Detached code tree: `21030d1e23a18871abdd8e1ea3d8079582825b28`
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
```

Research/evidence runs in parallel through:

```text
mining-site
→ quarries
→ accepted decisions
```

## Canonical product framing

**OptiHome** is the canonical public brand.

The release-candidate public surface no longer exposes legacy `DaVision` routes/components as canonical experiences. Historical assets may remain in `public/` until a later dead-asset cleanup proves they are unused.

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

## RC scope now implemented

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

## Design refinement

`design/DR-001-one-frame-per-screen.md` freezes the rule that eyewear comparison surfaces expose one active frame at a time, while preserving access to all references through progressive navigation.

## Pre-runtime verification

No browser, device or production claim is inferred from static code.

The next execution is governed by:

```text
test/PRE-RUNTIME-RUNBOOK.md
```

It freezes:

- exact code/tree authority;
- canonical + legacy route inventory;
- V1–V9 viewport matrix;
- CTA interaction matrix;
- keyboard/accessibility protocol;
- one-frame-per-screen runtime criteria;
- photo try-on P1–P3;
- camera/device try-on C1–C6;
- motion/reduced-motion criteria;
- visual acceptance;
- evidence taxonomy and invalidation rules.

Any code change during runtime validation creates a new authority SHA and requires affected gates to be rerun.

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

```text
frozen detached code
→ frozen verification contract
→ mechanical build
→ browser/device verification
→ human visual acceptance
→ evidence freeze
→ stable integration
→ main
→ one production Vercel deploy
→ production smoke
```

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
- `../../mining-site/MK0-web-refactor/README.md`
- `../../quarries/MK0-web-refactor/QRY-000-optical-web-patterns.md`
