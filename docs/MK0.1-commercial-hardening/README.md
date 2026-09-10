# OptiHome MK0.1 — Commercial hardening

## Goal

Convert the certified MK0 public web surface from a technically explicit case-study voice into the public surface of a real OptiHome service, while preserving truthful claims, accessibility, responsive behavior and the request/confirmation contract.

## Frozen decisions

- OptiHome is presented as a real service, not as a portfolio demo.
- Public copy must speak to the customer; internal terms such as `demo`, `case study`, `SLA`, `capacity of the business` and `invented testimonials` do not belong on the commercial surface.
- Availability is never fabricated. Frame entries are `REFERENCE`, and availability/variants are confirmed through WhatsApp.
- Coverage is not invented. The site states that coverage by zone is confirmed during coordination.
- Appointment semantics remain truthful: a message/request does not become a confirmed visit until date and time are agreed.
- All eight frame visuals are original `GENERATED` vector assets stored as transparent SVG files under `public/frames/`.
- Catalog and virtual try-on use the same per-frame asset. No collage represents a single named frame.
- All eight current frame references are try-on compatible.
- Explicit virtual-try-on intent uses `/products?tryon=1#prueba-virtual`; this may open the try-on dialog, but never requests camera permission automatically.
- Mobile keeps focused previous/next browsing. Desktop adds a compact quick-selector for discovery while retaining one active detailed frame.
- The try-on processes camera/photo frames in the browser. The public privacy page documents the current web behavior without claiming broader legal coverage.
- No external frame imagery is introduced; the vector assets are repository-authored and transparent by construction.

## Verification contract

Release is blocked unless the candidate passes:

1. exact-SHA checkout;
2. clean dependency install;
3. full and production dependency audit with zero known vulnerabilities;
4. lint;
5. production build and source-clean check;
6. `/`, `/products`, `/privacy` and legacy redirect smoke;
7. V1–V9 responsive coverage without accidental horizontal overflow;
8. desktop quick-selector + mobile previous/next behavior;
9. direct try-on intent opens the dialog without requesting camera permission;
10. all eight SVG assets load and remain transparent;
11. photo path and camera path face-derived geometry;
12. denied permission, close-during-permission, reopen and orientation states;
13. keyboard/focus/mobile menu/FAQ and reduced-motion checks;
14. no release-blocking console/runtime errors.

## Infrastructure note

The product brand is OptiHome. The existing Vercel project slug/hostname may still expose the historical `davision` infrastructure name. Renaming or attaching a brand domain is an infrastructure action separate from this code release and must not be simulated in application copy.
