# MK0 — OptiHome Web Refactor

Status: `BUILD_001_COMPLETE`
Branch: `refactor/mk0-web-foundation-20260909`
Scope: public website refactor only.

## Mission

Refactor OptiHome from a feature-oriented marketing website into a coherent, credible and conversion-ready public experience that can later become the front door of a measurable commercial system.

MK0 deliberately does **not** implement the future acquisition/content engine, CRM, revenue attribution, retention automation or TikTok automation. Those belong to later MKs.

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

## Current execution state

```text
DOCS / PRODUCT DIRECTION    FROZEN
BUILD-001 FOUNDATION        COMPLETE
BUILD-002 HOMEPAGE          READY
BUILD-003 CATALOG           BLOCKED_BY_BUILD_002
BUILD-004 TRY-ON            BLOCKED_BY_BUILD_003
BUILD-005 A11Y/RESPONSIVE   BLOCKED_BY_BUILD_004
BUILD-006 SEO/PERFORMANCE   BLOCKED_BY_BUILD_005
```

Certified BUILD-001 implementation SHA:

```text
01bff16741ea4440745856c99a7fa2977f7ae37f
```

The detailed gate receipt is authoritative in `build/BUILD.md`.

## Canonical product framing

**OptiHome** is the canonical public brand for this refactor.

`DaVision` is treated as legacy naming residue. It must not remain on a refactored public surface unless later evidence explicitly reverses this decision.

## MK0 definition of success

The web refactor is successful when a first-time visitor can answer, without external explanation:

1. What OptiHome is.
2. Who it is for.
3. What useful actions can be completed.
4. How the optical-at-home journey works.
5. Why the visitor should trust the experience.
6. What the next action is.

The site must also be responsive, accessible, performant, internally consistent and free from unsupported commercial/medical claims.

## Scope boundaries

### IN

- Information architecture.
- Visual/design system.
- Homepage refactor.
- Navigation and footer.
- Catalog discovery experience.
- Virtual try-on entry experience.
- Appointment/contact journey at web level.
- Content hierarchy and copy cleanup.
- Responsive behavior.
- Accessibility.
- SEO/performance foundations.
- Explicit analytics-ready interaction identifiers where useful.

### OUT

- TikTok/content automation.
- Social scheduling.
- CRM or lead pipeline backend.
- Revenue attribution.
- Automated follow-up.
- Payments/e-commerce backend.
- Inventory management.
- Production appointment scheduling backend.
- Medical diagnosis or automated clinical recommendations.

## Appointment boundary frozen before BUILD-001

The public web may initiate a request, but it must not imply that WhatsApp itself owns appointment capacity.

Future commercial continuation:

```text
web request
→ capacity validation
→ appointment state
→ WhatsApp coordination
→ internal notification
→ operational agenda
```

`REQUESTED` and `CONFIRMED` remain distinct states. The future Appointment & Capacity MK comes after the web refactor and before scaling demand through TikTok/content automation.

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

## Next gate

`BUILD-002 — Homepage narrative` is ready. It owns the single-message hero, journey chooser and final homepage narrative before catalog and try-on refactors begin.
