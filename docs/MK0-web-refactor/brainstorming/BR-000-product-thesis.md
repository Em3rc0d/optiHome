# BR-000 — Product Thesis for the Web Refactor

Status: `FROZEN_FOR_MK0`

## 1. Problem

The legacy site demonstrates technical capabilities, but a visitor must infer too much:

- Is the product called OptiHome or DaVision?
- Is the core value an optical exam at home, a frame store, a virtual try-on demo, or all three?
- Which claims are real and which are placeholder/demo copy?
- What should the visitor do first?
- What happens after clicking the main CTAs?

A website that forces these questions creates cognitive load and weakens trust.

## 2. Product thesis

OptiHome should present one coherent promise:

> **Optical care and eyewear selection with a home-first experience, from evaluation to choosing frames.**

The web must make that promise understandable before it attempts to impress with technology.

Virtual try-on is a conversion aid, not the product thesis.

## 3. Primary visitor intents

### JTBD-01 — I need an optical evaluation

Visitor goal: understand the service, trust the process, and request an evaluation.

Desired web path:

```text
Landing
→ Understand home service
→ See process / trust information
→ Request evaluation
```

### JTBD-02 — I need or want new frames

Visitor goal: explore options, understand price/category context, and continue toward contact/purchase.

Desired web path:

```text
Landing / Catalog
→ Explore frames
→ Inspect a frame
→ Try on or request help
→ Continue to next action
```

### JTBD-03 — I want to know whether a frame suits me

Visitor goal: use the try-on experience without having to understand the technology underneath.

Desired web path:

```text
Frame
→ Try on
→ Evaluate fit/style
→ Save/select
→ Continue toward consultation or purchase
```

## 4. Experience principles

1. **Outcome before technology.** Explain what the visitor gains before mentioning AI/Face Mesh/TensorFlow.
2. **One canonical brand.** OptiHome throughout.
3. **Evidence before claims.** No fabricated counts, guarantees, availability windows or clinical assertions.
4. **One primary action per decision point.** Secondary CTAs may exist but cannot compete equally everywhere.
5. **Progressive disclosure.** Show enough to decide; reveal technical or detailed information when requested.
6. **Familiar mental models.** Catalog behaves like a catalog; appointment request behaves like an appointment request.
7. **Accessible by default.** Keyboard, focus, contrast, reduced motion, semantic structure and usable touch targets are release requirements.
8. **Mobile-first decision paths.** The likely social/search visitor must be able to understand and act comfortably on a phone.
9. **No dead-end CTAs.** Every visible action must lead somewhere meaningful.
10. **Analytics-ready semantics.** Important interactions receive stable identifiers so later MKs can measure them without redesigning the UI.

## 5. Copy policy

### Remove or qualify unless evidence exists

- `+500 familias`
- `Atención Hoy`
- `menos de 48 horas`
- `examen gratuito`
- `calidad garantizada`
- medical/clinical superiority statements
- inventory quantities represented as real

These may return only when supported by business evidence and explicit source ownership.

### Preferred language

Use concrete verbs:

- `Explorar monturas`
- `Probar una montura`
- `Solicitar evaluación`
- `Conocer cómo funciona`

Avoid vague CTA language such as `Descubre más` when a specific action is available.

## 6. Proposed homepage narrative

```text
Header
↓
Hero: what OptiHome does + primary CTA
↓
Three clear paths: evaluation / frames / virtual try-on
↓
How the service works
↓
Selected frames / catalog entry
↓
Virtual try-on explanation
↓
Trust / service boundaries / FAQ
↓
Final CTA
↓
Footer
```

## 7. What we explicitly do not solve in MK0

The public web will be prepared for future acquisition and measurement, but MK0 does not build:

- TikTok automation
- content generation
- social attribution
- CRM
- sales pipeline
- automated messaging
- recurring customer lifecycle

Those systems must attach later to a stable, tested public experience.

## 8. Decision log

| ID | Decision | Status |
|---|---|---|
| D-001 | Canonical brand is OptiHome | FROZEN_FOR_MK0 |
| D-002 | Public thesis is home-first optical care + eyewear selection | FROZEN_FOR_MK0 |
| D-003 | Virtual try-on is a supporting journey, not the hero thesis | FROZEN_FOR_MK0 |
| D-004 | Unsupported social proof and operational claims are removed | FROZEN_FOR_MK0 |
| D-005 | Business automation is deferred to later MKs | FROZEN_FOR_MK0 |
