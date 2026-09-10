# QRY-000 — Optical Web Patterns

Status: `EXTRACTED`

## Question

Which patterns from the legacy OptiHome implementation and current optical-commerce experiences are reusable for MK0 without copying another brand?

## Findings

### Q-001 — The customer journey must be visible

Evidence class: `OBSERVED + OBSERVED_EXTERNAL`

Legacy OptiHome exposes services, products and try-on, but the relationship between them is weak. Current optical-commerce references make the sequence between frame discovery, optical care, try-on and continuation much more explicit.

Decision:

**ACCEPT.** MK0 will organize the homepage around visitor intents and supported next actions.

### Q-002 — Virtual try-on should reduce purchase/selection uncertainty

Evidence class: `OBSERVED_EXTERNAL`

Try-on is most useful when attached to frame discovery rather than presented as an isolated AI demonstration.

Decision:

**ACCEPT.** Try-on is a product-selection aid. Technical implementation details remain secondary.

### Q-003 — Eye evaluation/prescription is a first-class pathway

Evidence class: `OBSERVED_EXTERNAL + INFERRED`

Optical commerce is not only a frame catalog. Visitors often need an eye exam/prescription journey.

Decision:

**ACCEPT WITH LOCAL BOUNDARY.** OptiHome will clearly expose an evaluation-request path, but MK0 will not imply clinical capabilities or scheduling behavior that have not been verified.

### Q-004 — Social proof is useful only when defensible

Evidence class: `INFERRED`

The legacy UI contains strong trust claims, but unsupported trust signals can reduce credibility once scrutinized.

Decision:

**ACCEPT AS RULE.** Remove unsupported proof rather than replacing it with invented numbers.

### Q-005 — Product cards need honest actions

Evidence class: `OBSERVED`

Legacy catalog cards expose `Comprar` even though a production checkout is not established in MK0 scope.

Decision:

**ACCEPT AS CORRECTION.** Use only actions that exist: details, try-on, request/contact. Add purchase only when a real purchase path exists.

### Q-006 — Autoplay hero media adds little to the primary decision

Evidence class: `INFERRED`

The legacy rotating hero increases motion, image priority pressure and message competition without materially improving the visitor's understanding.

Decision:

**REJECT FOR MK0.** One intentional hero visual.

### Q-007 — Repeated cards are not a design system

Evidence class: `OBSERVED + INFERRED`

The legacy site uses many rounded card grids with strong shadows/gradients. Repetition creates visual sameness instead of hierarchy.

Decision:

**REJECT AS DEFAULT.** Cards are used only when they improve grouping. Section composition should reflect information type.

## Extracted system rules

```text
RULE-01: one canonical brand
RULE-02: visitor intent precedes feature inventory
RULE-03: every CTA has a real destination
RULE-04: try-on belongs to frame selection
RULE-05: no unsupported business/clinical proof
RULE-06: mobile journey is first-class
RULE-07: motion must explain state or hierarchy
RULE-08: catalog data has an authority classification
RULE-09: future analytics attaches to stable semantic actions
RULE-10: later acquisition automation cannot distort MK0 information architecture
```

## Quarry output

These rules are consumed by:

- `docs/MK0-web-refactor/brainstorming/BR-000-product-thesis.md`
- `docs/MK0-web-refactor/design/DESIGN.md`
- `docs/MK0-web-refactor/architecture/ARCHITECTURE.md`
- `docs/MK0-web-refactor/plan/PLAN.md`
