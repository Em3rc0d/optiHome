# TEST.md — OptiHome MK0 Verification Contract

Status: `RC_STATIC_GATES_PASS__RUNTIME_GATES_OPEN`

## 1. Evidence policy

A green visual impression is not enough. Each release claim must identify whether it is statically verified, mechanically executed, visually verified or still open.

## 2. Current detached RC

```text
CODE_SHA 2728c4928ca955aa8f9af3acabad248aec69d636
TREE_SHA 70e7bd6d8f699c2b50d49d0971f45f4f57ca493f
BRANCH_REF_MOVED NO
VERCEL_PREVIEW_USED NO
```

## 3. Static gates executed

### TS/TSX syntax

Result: `PASS`

- 25 TypeScript/TSX source files inspected with TypeScript parsing/transpilation.
- 0 syntax diagnostics.

This is not equivalent to a full project typecheck.

### Internal alias import resolution

Result: `PASS`

All inspected `@/…` imports in the candidate resolve to a file/module in the reconstructed candidate source tree.

### Public-claim sanitization

Result: `PASS`

The candidate runtime source was scanned for known legacy/unsupported patterns. No matches remained for:

- `DaVision`
- fake `S/` price labels
- `Comprar`
- `Agregar Carrito`
- `+500`
- fixed `<48h` wording
- unsupported free/gratuity wording

Historical assets/docs are not interpreted as current public runtime claims.

### Client-boundary review

Result: `PASS`

Interactive/product client boundaries are limited to:

- `components/layout/SiteHeader.tsx`
- `components/catalog/FrameCatalog.tsx`
- `components/try-on/VirtualTryOn.tsx`
- the existing Radix dialog UI primitive

The homepage composition itself remains server-rendered.

### ML/camera intent boundary

Result: `PASS_STATIC`

- catalog route does not call face-model loading on mount
- try-on is dynamically imported
- `getUserMedia` is reached only by explicit camera activation
- TensorFlow/model CDN loading is reached from that activation path
- media tracks have cleanup paths
- pending camera requests are invalidated on close/unmount
- upload fallback exists
- neutral light frame backgrounds are preprocessed before overlay when possible

### Local execution capability probe

Result: `ENVIRONMENT_LIMITED`

Observed:

```text
Node.js v22.16.0
npm 10.9.2
TypeScript binary available
node_modules absent
Next.js binary absent
ESLint binary absent
```

## 4. Required final gates

### Mechanical build

Status: `OPEN_ENVIRONMENT_LIMITATION`

Required commands:

```text
npm ci
npm run lint
npm run build
```

Current detached-validation environment cannot install/resolve the project dependency set. Development Vercel previews are disabled by project policy, so no preview is used as a substitute.

### Responsive/browser

Status: `OPEN`

Required viewport checks:

```text
320px
mobile portrait
mobile landscape
tablet
laptop
wide desktop
```

Verify no unintended horizontal scrolling, CTA reachability and modal usability.

### Accessibility interaction

Status: `OPEN`

Verify with a real browser:

- keyboard-only traversal
- skip link
- visible focus
- mobile-menu state
- FAQ disclosure
- dialog open/close/focus restoration/Escape
- camera-denied path
- upload-photo path
- late camera-permission close path
- reduced-motion behavior

### Human visual acceptance

Status: `OPEN`

Confirm hierarchy, copy, spacing, imagery, catalog density and try-on presentation on the exact stable candidate.

## 5. Release blockers

Any of the following blocks `main` integration:

- lint/type/build failure
- broken route/import
- inaccessible critical CTA
- modal/camera lifecycle failure
- public unsupported claim regression
- severe responsive overflow
- human rejection of the stable visual state

## 6. Deployment policy

Only stable `main` is deployed. Development branch pushes/previews are not part of the MK0 validation workflow.
