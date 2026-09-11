# MK0.4.1 — Test Contract

## Automated gates

- `npm ci`
- `npm audit --audit-level=high`
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
- exact frozen try-on blob SHA remains `c211cfc4025a2963fed7ae49b76e218aaeee5cb2`
- Hero uses existing optimized WebP family assets
- previous near-full-viewport hero contract is absent
- runtime smoke on `/` and `/products`

## Visual acceptance

Desktop:
- family image occupies the visual panel without a large empty lower region;
- copy/CTA hierarchy remains left-aligned and immediately scannable;
- hero is noticeably shorter than the previous `100svh` treatment;
- the step overlay is legible over photography.

Mobile:
- image appears below copy without horizontal overflow;
- three journey labels remain visible;
- manual carousel controls remain reachable.

Reduced motion:
- first scene remains fully visible;
- no automatic scene rotation;
- all CTAs and journey information remain available.
