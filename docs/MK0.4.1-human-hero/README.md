# MK0.4.1 — Human-first Hero Refinement

Baseline: `master@db8c092cc2b9b718b94ce8505d7e11a57975dbd1`

## Objective

Refine the MK0.4 hero after visual review. The previous 2.5D flagship frame communicated technology well but left excessive unused space and did not communicate OptiHome's human/home-service value as strongly as desired.

## Decision

The hero becomes **human-first**:

- existing family photography in `/public/family*.webp` becomes the primary visual layer;
- subtle crossfade + slow scale transitions preserve the immersive character;
- `Explora → Pruébate → Coordina` remains visible as a glass overlay;
- the hero no longer attempts to occupy almost the full viewport by contract;
- the product-focused 2.5D treatment remains in the lower showroom where product inspection is the correct hierarchy;
- WhatsApp/evaluation and catalog/try-on conversion paths remain unchanged;
- `VirtualTryOn.tsx` remains frozen.

## UX rationale

Negative space is useful only while it reinforces hierarchy. In the previous hero, the empty lower half of the product panel read as missing content. A full-bleed lifestyle image uses that area to communicate trust, home and family while keeping the actual conversion controls in HTML.

## Motion contract

- native scrolling only;
- automatic scene changes disabled for `prefers-reduced-motion`;
- keyboard arrows and visible controls support manual navigation;
- no information or CTA depends on animation;
- scene transitions remain transform/opacity based.
