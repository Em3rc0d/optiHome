# BUILD.md — OptiHome MK0 Build Ledger

Status: `IN_PROGRESS`

This ledger records implementation receipts. Documentation completion does not imply build completion.

## BUILD-001 — Foundation cleanup

Status: `COMPLETE`

Completed outputs:

- canonical `OptiHome` brand on the refactored public shell
- frozen design tokens applied to the application foundation
- reusable `SiteHeader` and `SiteFooter`
- centralized site/contact/appointment configuration
- unsupported visible homepage claims removed or replaced
- request/confirmation semantics aligned with the frozen appointment-capacity contract
- analytics-ready semantic interaction IDs
- accessible skip link, navigation semantics and explicit form labels

### Receipt

```text
BUILD_ID           BUILD-001
SOURCE_SHA         3b0e9791c75a88514553fcb235d19d867ff0a05c
OUTPUT_SHA         01bff16741ea4440745856c99a7fa2977f7ae37f
FILES_CHANGED      14 source files

AUTOMATED_GATES
- Vercel Git preview for exact OUTPUT_SHA: SUCCESS / READY
- npm run build -> next build --turbopack: PASS
- Next.js production compilation: PASS (8.3s reported by Vercel)
- TypeScript build phase: PASS
- Preview HTTP response on `/`: 200 OK
- GitHub commit status `Vercel`: success

MANUAL_GATES
- rendered HTML / metadata / journey semantics inspection: PASS
- final human visual acceptance: DEFERRED to homepage and responsive hardening gates

KNOWN_LIMITATIONS
- hero image rotation remains temporarily and is replaced by the single-message hero in BUILD-002
- `/products` remains the legacy catalog, including demo commerce behavior; BUILD-003 owns its cleanup
- unused legacy `DaVision` routes/components/assets may remain in the repository until their replacements are verified; they are no longer part of the refactored homepage shell
- no real appointment database, capacity engine or scheduler exists in MK0; the web currently exposes the truthful WhatsApp request seam only
- TikTok/content automation remains outside MK0

DECISIONS_CHANGED
- none; implementation follows the frozen MK0 design/architecture and appointment-capacity contract
```

## BUILD-002 — Homepage narrative

Status: `READY`

Planned outputs:

- single-message hero
- journey chooser
- service process
- featured frames
- try-on feature section
- trust/FAQ
- final CTA

## BUILD-003 — Catalog experience

Status: `BLOCKED_BY_BUILD_002`

## BUILD-004 — Virtual try-on decomposition

Status: `BLOCKED_BY_BUILD_003`

## BUILD-005 — Responsive + accessibility hardening

Status: `BLOCKED_BY_BUILD_004`

## BUILD-006 — SEO + performance hardening

Status: `BLOCKED_BY_BUILD_005`

## Receipt format

Each completed BUILD must record:

```text
BUILD_ID
SOURCE_SHA
OUTPUT_SHA
FILES_CHANGED
AUTOMATED_GATES
MANUAL_GATES
KNOWN_LIMITATIONS
DECISIONS_CHANGED (if any)
```

No BUILD may be marked complete from visual inspection alone.
