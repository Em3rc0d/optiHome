# MK0 — OptiHome Web Refactor

Status: `RELEASE_CANDIDATE_CODE_READY`
Branch authority: `refactor/mk0-web-foundation-20260909`
Detached RC authority: see `build/BUILD.md`.
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

The release-candidate public surface no longer exposes legacy `DaVision` routes or components. Historical assets may remain in `public/` until a later dead-asset cleanup proves they are unused.

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
- demo-safe frame catalog with centralized data
- virtual try-on isolated from catalog rendering
- camera/model loading only after explicit user intent
- photo fallback and media-track cleanup
- no fake checkout, price, inventory, social proof or SLA
- native/semantic FAQ and accessibility-oriented navigation
- legacy public routes redirected to canonical journeys
- route metadata and deferred ML loading foundation

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

Development branches are **not** deployed to Vercel for validation. The stable state is assembled as detached Git objects and only the accepted stable state is intended to move to `main` and deploy.

The detached RC is therefore not certified by a Vercel preview. Mechanical `lint/type/build` and final human visual verification remain explicit gates before/at stable integration.

## Documentation map

- `brainstorming/BR-000-product-thesis.md`
- `brainstorming/BR-001-appointment-capacity-contract.md`
- `design/DESIGN.md`
- `architecture/ARCHITECTURE.md`
- `plan/PLAN.md`
- `build/BUILD.md`
- `test/TEST.md`
- `../../mining-site/MK0-web-refactor/README.md`
- `../../quarries/MK0-web-refactor/QRY-000-optical-web-patterns.md`
