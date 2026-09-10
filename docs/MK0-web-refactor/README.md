# MK0 — OptiHome Web Refactor

Status: `DOCUMENTATION_GATE_OPEN`
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

## Canonical product framing

**OptiHome** is the canonical public brand for this refactor.

`DaVision` is treated as a legacy naming residue in the current codebase and must not remain in the release candidate unless later evidence explicitly reverses this decision.

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

## Current evidence that triggered the refactor

The current repository contains a technically ambitious optical experience with a catalog, at-home service messaging and virtual try-on. However, the public experience mixes `OptiHome` and `DaVision`, includes unsupported proof/availability claims in UI copy, duplicates design patterns, and contains CTAs whose business behavior is incomplete or inconsistent.

The refactor therefore optimizes first for **clarity, trust and intentional journeys**, not for adding more features.

## Documentation map

- `brainstorming/BR-000-product-thesis.md`
- `design/DESIGN.md`
- `architecture/ARCHITECTURE.md`
- `plan/PLAN.md`
- `build/BUILD.md`
- `test/TEST.md`
- `../../mining-site/MK0-web-refactor/README.md`
- `../../quarries/MK0-web-refactor/QRY-000-optical-web-patterns.md`

## Gate

Implementation starts only after the documentation set is internally consistent and the human acceptance gate for the web direction is closed.
