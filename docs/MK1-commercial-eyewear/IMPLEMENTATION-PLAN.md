# MK1 Commercial Eyewear — Implementation Plan

Status: READY FOR IMPLEMENTATION AFTER AUDIT
Baseline: `master@8bf33df537248f6ebdcaaa76db8575e91e9222d9`

## Architecture target

### Home

1. Commercial header
   - OptiHome identity.
   - Monturas.
   - Cómo funciona.
   - Preguntas frecuentes / información útil.
   - Primary CTA to WhatsApp/coordination.

2. High-impact hero
   - editorial/lifestyle or product-led visual;
   - one clear commercial promise;
   - primary CTA: coordinate;
   - secondary CTA: explore frames;
   - no technology language.

3. Compact trust/value strip
   - only verified claims;
   - initially limited to safe statements already supported by current flow.

4. Featured collection
   - product grid, not carousel;
   - 4–6 strong frames;
   - large imagery;
   - direct consultation.

5. Editorial brand/lifestyle block
   - break the component-grid feeling;
   - use photography and strong typography;
   - position eyewear as personal style + visual care.

6. Optical service block
   - clear explanation of home coordination;
   - owner-confirmed service details only;
   - preparation/helpful guidance when verified.

7. One concise process
   - Explora → Elige → Coordina;
   - max 3–4 steps;
   - no duplicate journey chooser.

8. Trust / FAQ
   - objection handling;
   - owner-confirmed facts only.

9. Strong final WhatsApp CTA.

### Catalog

- grid-first layout;
- simple category/filter controls;
- product cards that prioritize imagery;
- material/color only where current reference data remains intentionally marked or owner-confirmed;
- direct WhatsApp inquiry per frame;
- architecture ready for future PDP routes;
- no public try-on controls.

## Visual system direction

- editorial eyewear retail, not SaaS;
- fewer rounded container cards;
- larger image surfaces;
- stronger typography hierarchy;
- alternating composition;
- less decorative iconography;
- neutral/optical palette with one strong brand accent;
- controlled motion only;
- mobile-first composition.

## Technical changes expected

- remove SpatialOptics from public home;
- ensure Three.js runtime is not loaded by public routes;
- reduce duplicate Framer Motion interactions;
- simplify home section count;
- redesign FeaturedFrames;
- redesign FrameCatalog;
- fix not-found copy;
- review metadata/SEO;
- review unused dependencies only after import graph is safe;
- preserve internal try-on source and contracts without exposing it publicly.

## SEO target

- one descriptive H1;
- commercial title/meta description;
- clean internal linking;
- Product/LocalBusiness structured data only when required real data exists;
- canonical/robots/sitemap validation;
- useful indexable service copy;
- no keyword stuffing;
- no unverified location claims.

## QA evidence

Create:
- `docs/MK1-commercial-eyewear/qa/before/`
- `docs/MK1-commercial-eyewear/qa/after/`

Required viewports:
- mobile 360x800;
- mobile 390x844;
- mobile 430x932;
- desktop 1440x900.

Required routes:
- /
- /products
- /non-existent-route (404)

Do not mark visual QA PASS without real captures.
