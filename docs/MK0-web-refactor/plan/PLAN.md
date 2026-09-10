# PLAN.md — OptiHome MK0 Web Refactor

Status: `READY_FOR_HUMAN_ACCEPTANCE`

## Objective

Execute the public web refactor without opening later commercial-system scope.

## Build sequence

### BUILD-001 — Foundation cleanup

- Normalize canonical brand to `OptiHome`.
- Introduce design tokens and remove arbitrary duplicated styling where practical.
- Establish `SiteHeader` and `SiteFooter`.
- Centralize authoritative/demo site content and business contact configuration.
- Remove/replace unsupported claims.
- Establish analytics-ready event IDs/no-op wrapper.

**Exit:** coherent foundation, no visible legacy brand residue in refactored surfaces.

### BUILD-002 — Homepage narrative

- Replace rotating hero with a single clear value proposition.
- Implement primary/secondary hero actions.
- Implement three-path journey chooser.
- Refactor process explanation.
- Add featured frame entry point.
- Add focused virtual try-on explanation.
- Refactor FAQ/trust section.
- Implement final CTA.

**Exit:** first-time visitor can understand the service and next action without external explanation.

### BUILD-003 — Catalog experience

- Move frame data out of monolithic route code.
- Normalize categories/material/color labels.
- Remove false checkout behavior.
- Make product actions explicit: details / try-on / contact as supported.
- Improve filter accessibility and mobile behavior.

**Exit:** catalog behaves as a real discovery surface rather than a demo grid.

### BUILD-004 — Virtual try-on decomposition

- Isolate model loading and camera lifecycle.
- Separate UI states from detection logic.
- Add explicit camera consent/context.
- Preserve upload fallback.
- Add loading, unavailable, denied and error states.
- Ensure media tracks stop correctly.
- Avoid loading ML dependencies before user intent.

**Exit:** try-on is an intentional product feature with understandable states and bounded performance cost.

### BUILD-005 — Responsive + accessibility hardening

- Keyboard pass.
- Focus pass.
- Heading/landmark pass.
- Contrast pass.
- Touch target pass.
- `prefers-reduced-motion` pass.
- 320px layout pass.
- tablet/laptop/wide layout pass.

**Exit:** no P0/P1 accessibility or responsive defects known.

### BUILD-006 — SEO + performance hardening

- Metadata.
- Image priorities/sizes.
- Client-boundary review.
- Lazy/deferred ML loading verification.
- Dead code/assets review.
- Production build/lint.

**Exit:** release candidate passes automated quality gates.

## Explicit non-goals during these builds

Do not add:

- TikTok API
- social automation
- CRM
- lead database
- payment processor
- real appointment scheduler
- content generation pipeline
- revenue dashboard

If implementation discovers a seam needed by those systems, document it; do not build the future system inside MK0.

## Release gates

```text
DOCS_GATE
→ BUILD_GATE
→ LINT_GATE
→ TYPE/BUILD_GATE
→ RESPONSIVE_GATE
→ ACCESSIBILITY_GATE
→ UX_JOURNEY_GATE
→ PERFORMANCE_REVIEW
→ HUMAN_VISUAL_GATE
```

## Human gate before BUILD-001

The documentation can proceed autonomously, but implementation should begin only once the product/design direction in this MK0 set is accepted by the owner.

This preserves the repository rule: major decisions are closed before coding.
