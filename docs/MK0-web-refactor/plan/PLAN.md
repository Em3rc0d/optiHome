# PLAN.md — OptiHome MK0 Web Refactor

Status: `BUILD_001_COMPLETE`

## Objective

Execute the public web refactor without opening later commercial-system scope.

## Build sequence

### BUILD-001 — Foundation cleanup

Status: `COMPLETE`

- Normalize canonical brand to `OptiHome`.
- Introduce design tokens and remove arbitrary duplicated styling where practical.
- Establish `SiteHeader` and `SiteFooter`.
- Centralize authoritative/demo site content and business contact configuration.
- Remove/replace unsupported claims on the refactored homepage surface.
- Establish analytics-ready event IDs/no-op wrapper.
- Align the current WhatsApp handoff with the frozen appointment-capacity contract.

**Certified implementation:** `01bff16741ea4440745856c99a7fa2977f7ae37f`

**Exit:** PASS. Coherent foundation is deployed to a preview and validated; legacy surfaces outside BUILD-001 remain explicitly deferred.

### BUILD-002 — Homepage narrative

Status: `READY`

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

Status: `BLOCKED_BY_BUILD_002`

- Move frame data out of monolithic route code.
- Normalize categories/material/color labels.
- Remove false checkout behavior.
- Make product actions explicit: details / try-on / contact as supported.
- Improve filter accessibility and mobile behavior.

**Exit:** catalog behaves as a real discovery surface rather than a demo grid.

### BUILD-004 — Virtual try-on decomposition

Status: `BLOCKED_BY_BUILD_003`

- Isolate model loading and camera lifecycle.
- Separate UI states from detection logic.
- Add explicit camera consent/context.
- Preserve upload fallback.
- Add loading, unavailable, denied and error states.
- Ensure media tracks stop correctly.
- Avoid loading ML dependencies before user intent.

**Exit:** try-on is an intentional product feature with understandable states and bounded performance cost.

### BUILD-005 — Responsive + accessibility hardening

Status: `BLOCKED_BY_BUILD_004`

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

Status: `BLOCKED_BY_BUILD_005`

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

The web may expose the request handoff required by the frozen appointment contract, but the operational scheduler itself remains a later MK.

## Commercial continuation after MK0

Once BUILD-006 closes the web refactor, the next commercial MK is:

```text
Appointment & Capacity
→ Notifications + operational agenda
→ WhatsApp coordination backed by appointment state
```

Only after that foundation can absorb demand safely does the TikTok/content acquisition MK open.

## Release gates

```text
DOCS_GATE              PASS
→ BUILD_001_GATE       PASS
→ BUILD_002_GATE       READY
→ BUILD_003_GATE
→ BUILD_004_GATE
→ BUILD_005_GATE
→ BUILD_006_GATE
→ LINT_GATE
→ TYPE/BUILD_GATE
→ RESPONSIVE_GATE
→ ACCESSIBILITY_GATE
→ UX_JOURNEY_GATE
→ PERFORMANCE_REVIEW
→ HUMAN_VISUAL_GATE
```

## Human gates

The owner accepted the MK0 direction before BUILD-001. Final visual acceptance remains a release gate after the intended homepage and responsive work exists; it is not inferred from successful compilation.
