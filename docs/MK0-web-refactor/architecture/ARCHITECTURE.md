# ARCHITECTURE.md — OptiHome MK0 Web Refactor

Status: `FROZEN_FOR_BUILD`

## 1. Architectural goal

Preserve the useful parts of the existing Next.js application while reorganizing it around clear public journeys, reusable domain components and explicit boundaries for future commercial systems.

MK0 is a **web refactor**, not a platform rewrite.

## 2. Current baseline

Observed stack:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix-based UI components
- React Hook Form
- TensorFlow.js / MediaPipe-related virtual try-on logic

The stack is adequate for MK0. No framework migration is justified.

## 3. Architecture principles

1. Server Components by default; Client Components only where interaction/browser APIs require them.
2. Route components compose domain components; they should not contain large feature implementations.
3. Product/content data must be separated from presentation.
4. Business claims must have an explicit source or remain non-authoritative/demo data.
5. Virtual try-on logic must be isolated from catalog rendering.
6. No hidden backend behavior: if a CTA only opens WhatsApp, it must be named and modeled accordingly.
7. Future acquisition/CRM systems attach through stable interfaces, not page-specific hacks.
8. Future appointment availability is owned by a scheduler/capacity system, never by WhatsApp conversation state.

## 4. Target public routes

Proposed MK0 routes:

```text
/
/monturas
/monturas/[slug]        # only if detail quality can be completed in MK0
/prueba-virtual          # optional dedicated entry; may initially route into supported catalog flow
/como-funciona
/preguntas-frecuentes   # may remain anchored on home if content is modest
/contacto               # only if it adds value beyond the request-evaluation flow
```

Route count is intentionally small.

## 5. Target source structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── monturas/
│   ├── prueba-virtual/
│   └── ...
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx
│   │   └── SiteFooter.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── JourneyChooser.tsx
│   │   ├── ServiceProcess.tsx
│   │   ├── FeaturedFrames.tsx
│   │   ├── TryOnFeature.tsx
│   │   ├── TrustSection.tsx
│   │   └── FinalCTA.tsx
│   ├── catalog/
│   ├── try-on/
│   ├── forms/
│   └── ui/
├── content/
│   ├── site.ts
│   ├── faq.ts
│   └── frames.ts
├── lib/
│   ├── analytics-events.ts
│   ├── cn.ts
│   └── ...
└── types/
    └── frame.ts
```

The exact folders may vary during implementation, but the separation of concerns may not.

## 6. Component boundaries

### Home

Home components receive content/data and render one narrative section each. They do not own unrelated network/browser logic.

### Catalog

Catalog responsibilities:

- filtering
- frame presentation
- frame selection
- entry into try-on

Catalog does **not** pretend to complete checkout unless a real checkout exists.

### Try-on

Try-on responsibilities:

- camera/photo acquisition
- model loading
- face landmark detection
- frame overlay
- clear loading/error/fallback states
- privacy-friendly client-side behavior where feasible

The current monolithic products page must be decomposed so this logic is testable and does not dominate the catalog route.

### Evaluation request

For MK0, this remains a clearly modeled contact/request flow. If WhatsApp is the actual destination, the interface must say so and the implementation must not imply that a database appointment has been booked.

Once the future appointment engine exists, the request flow changes authority:

```text
request UI
→ availability/capacity validation
→ structured appointment request
→ WhatsApp handoff / business notification
→ confirmation
```

WhatsApp is a downstream communication channel, not the source of truth for appointment availability or status.

## 7. Data authority

Define three data classes:

```text
AUTHORITATIVE
DEMO
DERIVED
```

### AUTHORITATIVE

Business-approved facts such as real contact details, actual service areas, verified pricing or service conditions.

### DEMO

Portfolio/sample catalog content that must never be presented as verified real-world inventory or performance.

### DERIVED

Safe presentation values computed from authoritative/demo data, e.g. filter options.

No component may silently promote `DEMO` data into `AUTHORITATIVE` claims.

## 8. Analytics seam

Define a typed event catalog even before production analytics exists:

```ts
type WebIntentEvent =
  | "cta_hero_request_evaluation"
  | "cta_hero_explore_frames"
  | "cta_path_virtual_try_on"
  | "cta_catalog_view_frame"
  | "cta_catalog_try_on"
  | "cta_request_whatsapp";
```

MK0 may implement a no-op/event wrapper. A later MK can attach a real provider.

Future appointment events are reserved conceptually but not implemented in MK0:

```text
appointment_flow_started
appointment_slot_viewed
appointment_request_created
appointment_whatsapp_handoff
appointment_confirmed
appointment_rescheduled
appointment_cancelled
appointment_completed
```

## 9. SEO foundation

- canonical metadata per public route
- useful titles/descriptions
- semantic headings
- Open Graph basics
- robots/sitemap only when deployment context is known
- structured data only when facts are authoritative and schema is appropriate

No fake ratings/reviews schema.

## 10. Performance constraints

- No hero autoplay carousel.
- Optimize above-the-fold images with Next Image.
- Avoid loading TensorFlow/MediaPipe on homepage.
- Load try-on dependencies only after explicit user intent or in the dedicated experience.
- Minimize client boundaries.
- Avoid animation libraries for interactions CSS can handle cleanly.

## 11. Security/privacy constraints

- Camera access only after explicit user action.
- Explain camera/photo purpose near try-on entry.
- Stop media tracks when try-on closes/unmounts.
- Do not upload face imagery in MK0 unless explicitly required and documented.
- Avoid collecting unnecessary personal fields.
- Business phone/contact configuration must not be scattered through components.

## 12. Migration strategy

This is an incremental refactor on the new branch:

```text
legacy master
→ documentation baseline
→ foundation cleanup
→ new layout/design tokens
→ new home narrative
→ catalog decomposition
→ try-on isolation
→ hardening
→ test gate
```

Delete legacy structures only after their replacement is verified.

## 13. Architecture gate

`ARCHITECTURE_GATE_PASS` requires:

- no framework migration without evidence
- route responsibilities explicit
- catalog and try-on separated
- content authority modeled
- future analytics seam defined
- camera/privacy boundary defined
- performance budget direction defined
- no future CRM/TikTok implementation leaking into MK0 scope
- no WhatsApp-only scheduling semantics masquerading as a confirmed appointment

## 14. Future appointment-capacity boundary

Detailed decision authority: `brainstorming/BR-001-appointment-capacity-contract.md`.

The future scheduler must be able to constrain service capacity using operating windows, duration, daily/team capacity, buffers, lead time, blackout periods and service areas. More advanced route optimization may follow later and is not required for the first scheduling release.

Canonical appointment states begin with a clear distinction between `REQUESTED` and `CONFIRMED`. The public UI may never collapse those states into a single ambiguous “booked” state.

MK0 only preserves the interface seam and truthful wording. Scheduler persistence, notifications and internal agenda remain outside this build scope.
