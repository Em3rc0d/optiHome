# BUILD.md — OptiHome MK0 Build Ledger

Status: `RELEASE_CANDIDATE_CODE_READY`

This ledger separates implementation completion from release certification.

## BUILD-001 — Foundation cleanup

Status: `COMPLETE`

Certified implementation:

```text
SOURCE_SHA  3b0e9791c75a88514553fcb235d19d867ff0a05c
OUTPUT_SHA  01bff16741ea4440745856c99a7fa2977f7ae37f
```

Outputs:

- canonical OptiHome brand
- design tokens and global shell
- centralized contact/config authority
- unsupported-claim cleanup
- analytics-ready semantic IDs
- truthful request/WhatsApp semantics

## BUILD-002 — Homepage narrative

Status: `COMPLETE_CODE`

Outputs:

- `src/components/home/Hero.tsx`
- `JourneyChooser.tsx`
- `HowItWorks.tsx`
- `FeaturedFrames.tsx`
- `TryOnFeature.tsx`
- `TrustFaq.tsx`
- `FinalCta.tsx`
- thin `src/app/page.tsx` composition

## BUILD-003 — Catalog experience

Status: `COMPLETE_CODE`

Outputs:

- `src/types/frame.ts`
- `src/content/frames.ts`
- `src/components/catalog/FrameCatalog.tsx`
- rewritten `src/app/products/page.tsx`
- no demo price/cart/checkout claim
- explicit DEMO authority

## BUILD-004 — Virtual try-on decomposition

Status: `COMPLETE_CODE`

Outputs:

- `src/components/try-on/VirtualTryOn.tsx`
- lazy component boundary from catalog
- camera permission only after explicit click
- TF/model load only after camera intent
- photo fallback
- media-stream cleanup, including late permission-resolution invalidation
- frame-overlay preprocessing for neutral light backgrounds
- stage-relative face-overlay coordinates
- clear non-diagnostic context

## BUILD-005 — Responsive + accessibility hardening

Status: `STATIC_COMPLETE__VISUAL_GATE_OPEN`

Static/code outputs:

- mobile-first responsive grids
- skip link
- focus visibility
- semantic landmarks/headings/lists
- native FAQ disclosures
- dialog semantics
- reduced-motion contract
- non-hover-only actions

## BUILD-006 — SEO + performance hardening

Status: `STATIC_COMPLETE__BUILD_GATE_OPEN`

Static/code outputs:

- route metadata/Open Graph foundation
- responsive image sizing
- constrained client boundaries
- deferred try-on/ML work
- legacy route redirects
- obsolete legacy implementation removed from RC tree

## Current detached release candidate

```text
RC_PARENT_BASE 1a228cc1b37bf869b189a8572231e033c97d1f94
RC_INITIAL_SHA 1835a1781a4bdd91c4ce9f97a0cf3350dc160f7e
RC_CODE_SHA    2728c4928ca955aa8f9af3acabad248aec69d636
RC_CODE_TREE   70e7bd6d8f699c2b50d49d0971f45f4f57ca493f
REF_MOVED      NO
VERCEL_DEV     NOT_USED
```

The RC is intentionally detached. The PR branch remains unchanged so Git integration cannot create another development preview from this candidate.

## Available automated/static evidence

```text
TS_TSX_PARSE                     25 files / 0 syntax errors
INTERNAL_ALIAS_IMPORTS           PASS
UNSUPPORTED_PUBLIC_CLAIM_SCAN    PASS
CLIENT_BOUNDARY_REVIEW           PASS
DETACHED_GIT_DIFF                PASS
CAMERA_LIFECYCLE_REVIEW          PASS_STATIC
```

Claim scan checked the candidate runtime for legacy brand residue and known invalid commercial promises/actions including fake prices, checkout/cart wording, fabricated customer counts, fixed fast-SLA wording and free-service wording.

## Local execution capability probe

```text
Node.js      v22.16.0
npm          10.9.2
TypeScript   available
node_modules absent
next binary  absent
eslint binary absent
```

The detached-validation runtime therefore cannot honestly execute the project lint/production-build gates without resolving/installing dependencies.

## Gates intentionally still open

```text
npm ci
npm run lint
npm run build
browser responsive pass
keyboard/focus traversal pass
human visual acceptance
```

Development Vercel previews are not used as a substitute.

## Release invariant

```text
DETACHED_RC
→ mechanical local/CI gates
→ human visual gate
→ move accepted stable state to PR/main
→ production deploy from main only
```
