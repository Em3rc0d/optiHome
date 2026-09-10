# BUILD.md — OptiHome MK0 Build Ledger

Status: `NOT_STARTED`

This ledger records implementation receipts. Documentation completion does not imply build completion.

## BUILD-001 — Foundation cleanup

Status: `BLOCKED_BY_HUMAN_DOCS_GATE`

Planned outputs:

- canonical OptiHome brand
- design tokens
- site shell
- centralized content/contact config
- unsupported claim cleanup
- analytics-ready semantic interaction IDs

## BUILD-002 — Homepage narrative

Status: `BLOCKED_BY_BUILD_001`

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
