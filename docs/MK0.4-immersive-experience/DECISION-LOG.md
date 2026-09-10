# DECISION LOG

## D-001 — Preserve conversion model
WhatsApp remains primary CTA. No checkout or booking flow is introduced.

## D-002 — Try-on frozen
`VirtualTryOn.tsx` must retain baseline Git blob SHA `c211cfc4025a2963fed7ae49b76e218aaeee5cb2`.

## D-003 — 2.5D before WebGL
The experience must be compelling without Three.js.

## D-004 — Reject fake 3D
No GLB exists in the baseline. True‑3D is rejected for this release rather than simulated from a flat image.

## D-005 — One dark narrative section
OpticalStory uses the existing ink/accent palette to create visual rhythm without introducing a new brand system.

## D-006 — Progressive capability
High devices receive pointer depth; medium devices receive motion without pointer depth; low/reduced-motion devices receive static content.
