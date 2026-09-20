# MK1 Commercial Eyewear — Recovery Audit

Status: DESIGN / AUDIT
Baseline: `master@8bf33df537248f6ebdcaaa76db8575e91e9222d9`
Branch: `feat/mk1-commercial-eyewear`
Date: 2026-09-20

## 1. Recovery finding

The interrupted Work/Astra session did not publish a durable branch, commit, PR, MK1 document, QA baseline, or commerce component to GitHub.

The MK1 branch has therefore been recreated from the latest production baseline. No local-only Work changes are assumed to have survived.

## 2. Product objective

OptiHome must read as a real optical business website first, not as a software showcase.

Primary outcome:
- attract attention visually;
- explain the optical-at-home proposition quickly;
- make frames desirable;
- build trust with only verified business information;
- convert to WhatsApp;
- remain fast and credible on mobile.

The public experience must not advertise virtual try-on, facial tracking, AI, GPU, Three.js, 360-degree product geometry, or any capability that is not commercially ready.

## 3. Current baseline audit

### Keep

- WhatsApp as the primary conversion channel.
- Clear appointment coordination language.
- Existing accessibility baseline: focus states, reduced motion, semantic navigation, keyboard-compatible controls.
- Existing responsive shell and spacing tokens as implementation primitives where useful.
- Existing internal try-on implementation, but outside the public customer journey.
- Existing frame image assets as REFERENCE assets until the owner confirms what is actually sold.

### Rebuild / remove from public home

#### A. SpatialOptics
Current implementation dynamically loads Three.js and renders procedural glasses.

Problem:
- visually demonstrates frontend capability rather than product authenticity;
- the rendered frame is not a real catalog product;
- adds runtime complexity without improving trust or conversion enough;
- conflicts with the commercial direction.

Decision: replace the public section with editorial/product storytelling. Preserve code only if needed for historical/internal purposes.

#### B. OpticalStory
Current section uses a 220vh sticky storytelling experience and a single floating frame.

Problem:
- long interaction cost for a simple sales message;
- duplicates the Explora / Compara / Elige / Coordina journey already explained elsewhere;
- resembles a product-demo narrative more than retail merchandising.

Decision: replace with a shorter high-impact editorial section or merge its useful copy into the commercial architecture.

#### C. JourneyChooser + HowItWorks
Both explain user paths and process.

Problem:
- information architecture is repetitive;
- too many sections answer "what do I do next?" instead of showing product, service, credibility, and desire.

Decision: retain one concise process block and convert the freed space to product, service, trust, or lifestyle content.

#### D. FeaturedFrames
Current section uses a carousel/showcase model.

Problem:
- forces sequential browsing;
- does not resemble a commercial frame collection;
- eight products should be visible through a strong grid, not hidden one at a time.

Decision: redesign as editorial retail collection teaser with direct product discovery.

#### E. /products
Current catalog is a carousel with thumbnail selector.

Problem:
- does not behave like a real optical catalog;
- weak scanability;
- low information density;
- no product detail route;
- frame names/material/color are reference data and not yet confirmed as owner inventory;
- "Showroom interactivo" wording still reads like a demo.

Decision: redesign as grid-first catalog with simple filters and WhatsApp consultation. PDP-ready architecture, but no invented data.

#### F. Branding
Current header logo is a colored square with the letter O.

Problem:
- reads as placeholder identity;
- insufficient for a real business launch.

Decision: create a temporary but deliberate OptiHome wordmark system only if the owner has no official logo. Mark provenance GENERATED until replaced by official brand assets.

#### G. 404
Current copy still says "probar estilos virtualmente".

Problem:
- leaks a hidden experimental capability into the public surface.

Decision: remove during implementation.

## 4. Reference audit

References reviewed:
- Vision Center Peru — https://www.visioncenter.com.pe/pages/examen-visual
- Econolentes — https://econolentes.com.pe/collections/lentes-oftalmicos
- GMO Peru — https://gmo.com.pe/
- The Friend of Pablo — https://thefriendofpablo.pe/
- Prisma Optica — https://prismaoptica.pe/

Observed transferable patterns:

### Vision Center
- appointment action is explicit;
- visual-health education supports conversion;
- pre-appointment information reduces uncertainty;
- the experience feels tied to an operating optical business.

### Econolentes
- real product data is dense and scannable;
- brand, material, shape, size, price, pickup/availability and legal/service information signal commercial maturity;
- product browsing is the center of the experience.

### GMO
- strong category navigation;
- appointment path is visible;
- commercial trust signals are repeated;
- WhatsApp is presented as an assisted-sales channel;
- store/contact/legal information reinforces legitimacy.

### The Friend of Pablo
- eyewear is merchandised as fashion;
- product imagery and price dominate;
- browsing feels retail-first rather than technology-first.

### Prisma Optica
- product commerce is combined with optical/editorial content;
- quick product discovery and information depth coexist.

## 5. Main commercial gap

OptiHome currently has enough frontend quality, but lacks enough verified business truth.

A visually excellent redesign cannot compensate for missing real-world evidence. The next implementation must therefore distinguish:

- OFFICIAL: supplied/confirmed by owner;
- OBSERVED: existing public/business evidence;
- REFERENCE: current repository assets/data not yet confirmed as actual inventory;
- GENERATED: temporary brand/editorial assets created for the redesign;
- INFERRED: UX decisions derived from evidence, never presented as business facts.

## 6. MK1 release gates

MK1 must not merge until:

- public home no longer contains technology-showcase sections;
- public catalog is grid-first and retail-like;
- no public try-on activation path exists;
- 404 contains no try-on language;
- no unverified business claim is presented as fact;
- WhatsApp conversion works from home and catalog;
- desktop visual QA is complete;
- 360–430 px mobile visual QA is complete;
- no horizontal overflow;
- lint PASS;
- TypeScript PASS;
- build PASS;
- existing relevant regression checks PASS;
- final Vercel preview READY;
- exact candidate SHA frozen before merge.

## 7. Current decision

DO NOT implement a cosmetic patch over the existing architecture.

The next change should be a coherent MK1 commercial rebuild based on the architecture in IMPLEMENTATION-PLAN.md and the owner data constraints in OWNER-DATA-GATE.md.
