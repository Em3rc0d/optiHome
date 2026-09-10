# TEST PLAN

## Automated candidate gates

1. `npm ci`
2. `npm audit --audit-level=high`
3. `npm run lint`
4. `npx tsc --noEmit`
5. Frozen try-on blob SHA equals `c211cfc4025a2963fed7ae49b76e218aaeee5cb2`
6. TryOnFeature uses `urban-acetate.webp`
7. Motion/web hygiene/source contracts present
8. `npm run build`
9. Runtime smoke: `/`, `/products`, `/robots.txt`, `/sitemap.xml`
10. Runtime log scan for `error|fatal`

## Visual/runtime matrix

- Desktop fine pointer: spatial Hero and catalog depth.
- Mobile/coarse pointer: no hover dependency, complete content.
- Reduced motion: complete static experience.
- Keyboard: journey links, filters, carousel arrows, CTAs.
- Try-on: open/close/reopen, frame switching, camera/photo paths remain governed by frozen MK0.3b implementation.

The certification workflow does not claim physical-camera validation; that remains a device-level external gate when not available to automation.
