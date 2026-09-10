# DESIGN.md — OptiHome MK0 Web Refactor

Status: `FROZEN_FOR_BUILD`

## 0. Evidence vocabulary

Every important design decision uses one provenance label:

- `OFFICIAL` — supplied/owned business truth.
- `OBSERVED` — directly observed in the legacy OptiHome repository or external reference.
- `INFERRED` — logically derived from available evidence.
- `INSPIRED` — informed by external patterns without copying them.
- `GENERATED` — newly proposed for OptiHome.

## 1. Design objective

Create a calm, credible, modern optical experience that feels closer to a trusted service than a generic technology landing page.

The desired impression is:

> clear → professional → human → useful → technologically capable

Not:

> flashy → AI-first → feature-dense → decorative

## 2. Legacy observations

| Observation | Provenance | Action |
|---|---|---|
| Blue + green are the dominant existing brand colors | OBSERVED | Preserve the family, refine the palette |
| Very rounded cards/buttons are frequent | OBSERVED | Reduce radius variety and formalize tokens |
| Large gradients, shadows and motion are heavily used | OBSERVED | Reduce decorative intensity |
| OptiHome and DaVision coexist | OBSERVED | Normalize to OptiHome |
| Hero uses rotating imagery and multiple floating decorations | OBSERVED | Simplify; prioritize message and action |
| Many sections use similar card grids | OBSERVED | Introduce more varied but systematic information layouts |
| Product and try-on capability are visually prominent | OBSERVED | Keep, but place inside a clear decision journey |

## 3. External pattern quarry

Current optical-commerce references consistently expose the customer journey explicitly: frame discovery, try-on/advisor, prescription/eye exam and continuation toward purchase.

Accepted pattern: **make journeys visible and actionable.**

Rejected pattern: copying brand visual language, layouts, typography or proprietary content.

## 4. Information architecture

### Global navigation

Desktop:

```text
OptiHome
Monturas
Cómo funciona
Prueba virtual
Preguntas frecuentes
[Solicitar evaluación]
```

Mobile:

- compact header
- accessible menu trigger
- same route hierarchy
- primary CTA reachable without excessive scrolling

### Homepage hierarchy

1. Header
2. Hero
3. Choose-your-path module
4. How OptiHome works
5. Featured frames
6. Virtual try-on module
7. Trust/service information
8. FAQ
9. Final CTA
10. Footer

## 5. Hero specification

### Goal

A visitor should understand OptiHome within ~5 seconds.

### Copy direction

Eyebrow:

`Óptica a domicilio`

H1 direction:

`Cuida tu visión y encuentra tus próximos lentes desde casa.`

Supporting copy:

Explain the at-home evaluation + frame-selection experience without unsupported promises.

Primary CTA:

`Solicitar evaluación`

Secondary CTA:

`Explorar monturas`

Optional tertiary text link:

`Probar una montura virtualmente`

### Visual

- One strong optical/home-service image, not an autoplay carousel.
- No fabricated customer-count strip.
- No `Atención hoy` floating badge unless operational evidence exists.
- Motion limited to subtle entrance only and disabled/reduced under `prefers-reduced-motion`.

## 6. Choose-your-path module

Three paths, each with one action:

### Evaluation

`Quiero revisar mi visión`
→ `Conocer la evaluación`

### Frames

`Quiero encontrar una montura`
→ `Explorar monturas`

### Virtual Try-On

`Quiero ver cómo me queda`
→ `Abrir prueba virtual`

This module implements progressive disclosure and lowers navigation uncertainty.

## 7. Visual tokens

All values below are `GENERATED` proposals for MK0 and may only change through a documented design revision.

### Color

```text
--color-ink:          #10212B
--color-ink-muted:    #53646D
--color-brand:        #126E82
--color-brand-strong: #0A5567
--color-accent:       #198F72
--color-accent-soft:  #E9F6F1
--color-surface:      #FFFFFF
--color-surface-soft: #F4F8F9
--color-border:       #DCE6E9
--color-focus:        #0B74DE
--color-danger:       #B42318
```

Rules:

- Brand/accent color communicates action, not decoration everywhere.
- Body copy must preserve WCAG contrast.
- Gradients are optional accents, never primary readability surfaces.

### Typography

Use the existing application font mechanism unless audit reveals a strong reason to change.

Roles:

```text
Display   — hero only
H1        — page purpose
H2        — major section
H3        — card/subsection title
Body L    — lead copy
Body      — default content
Small     — metadata/supporting copy
```

Rules:

- Maximum readable text width: approximately 60–72 characters.
- Avoid ultra-heavy weight on long headings.
- Use sentence case for UI labels.

### Spacing

Base unit: `4px`.

Preferred scale:

```text
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96
```

### Radius

```text
small:  8px
medium: 16px
large:  24px
pill:   999px
```

Avoid arbitrary `3rem` / `4rem` radii unless documented as an intentional exception.

### Shadow

Two levels maximum:

- subtle elevation
- interactive/overlay elevation

No permanent heavy shadow on every card.

## 8. Component rules

### Buttons

Variants:

- primary
- secondary
- ghost/text
- destructive only when necessary

Requirements:

- minimum comfortable touch target
- visible focus ring
- disabled/loading states
- no fake buttons without behavior

### Cards

A card exists only when grouping meaningfully related content. Do not turn every section into a collection of floating cards.

### Product card

Must support:

- image
- name
- category/material context
- price only if authoritative
- `Ver detalles`
- `Probar` when try-on is supported

A `Comprar` CTA must not exist until the target purchase behavior is real.

### Forms

- explicit labels, not placeholder-only
- inline validation
- error summary if useful
- privacy/context copy before sending personal information
- predictable submit state

### Dialogs

- trap focus
- close via button and Escape
- restore focus
- descriptive title
- mobile-safe dimensions

## 9. Motion

Motion supports causality and hierarchy only.

Allowed:

- subtle reveal
- dialog transition
- state change
- try-on feedback

Avoid:

- continuous decorative floating
- autoplay visual rotation in the hero
- motion on every card during normal scrolling

Respect `prefers-reduced-motion`.

## 10. Responsive rules

Breakpoints must be content-driven rather than device-name-driven.

Required checks:

- 320px minimum supported viewport
- mobile portrait
- mobile landscape
- tablet
- laptop
- wide desktop

No horizontal scrolling except intentional catalog controls.

Primary actions must remain reachable with one hand on common mobile layouts.

## 11. Accessibility contract

Release-blocking requirements:

- semantic landmarks
- one meaningful H1 per page
- correct heading order
- keyboard operability
- visible focus
- text alternatives for meaningful images
- decorative images ignored by assistive technology
- contrast compliance
- reduced-motion support
- form labels and errors
- dialog semantics
- no hover-only functionality

## 12. Content/trust rules

Do not publish as fact without evidence:

- customer counts
- same-day availability
- fixed delivery SLA
- free exams
- diagnostic accuracy
- clinical superiority
- guaranteed outcomes
- real inventory quantities

Where the repository is functioning as a portfolio/demo before operational evidence exists, presentation must not imply fabricated real-world business performance.

## 13. Analytics-ready semantics

Important actions receive stable semantic IDs/data attributes, for example:

```text
cta_hero_request_evaluation
cta_hero_explore_frames
cta_path_virtual_try_on
cta_catalog_view_frame
cta_catalog_try_on
cta_final_request_evaluation
```

MK0 does not send these events to a production analytics pipeline; it merely prevents future instrumentation from requiring UI redesign.

## 14. Design acceptance criteria

`DESIGN_GATE_PASS` requires:

- one canonical brand
- one clear homepage narrative
- primary journeys explicit
- unsupported proof removed
- systematic tokens
- responsive behavior specified
- accessibility states specified
- motion constrained
- components have state contracts
- future analytics integration does not change the information architecture
