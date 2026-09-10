# TEST.md — OptiHome MK0 Acceptance Contract

Status: `DEFINED`

## 1. Automated gates

Minimum automated checks after each implementation build:

```text
npm ci
npm run lint
npm run build
```

If a dedicated typecheck/test script is introduced, it becomes mandatory thereafter.

## 2. Brand/content tests

Release candidate must contain:

- `OptiHome` as the canonical public brand.
- no accidental `DaVision` residue on public surfaces.
- no unsupported `+500 familias`, same-day, `<48h`, free-exam, guarantee or equivalent claims unless backed by newly documented authoritative evidence.
- no CTA labeled as a completed transaction when it merely opens contact/WhatsApp.

## 3. Journey tests

### J-01 Evaluation

A new visitor can:

```text
Home
→ understand at-home optical evaluation
→ find request CTA
→ understand what happens next
→ complete the supported contact/request action
```

### J-02 Frames

```text
Home
→ enter catalog
→ filter/browse frames
→ understand product context
→ continue through a real supported action
```

### J-03 Try-on

```text
Home/Catalog
→ intentionally open try-on
→ understand camera/photo use
→ grant/deny camera access
→ receive usable fallback/error state
→ close experience cleanly
```

## 4. Accessibility tests

Release blocking:

- keyboard-only navigation works
- visible focus is present
- menu/dialog focus behavior is correct
- meaningful images have useful alt text
- decorative imagery does not pollute accessibility tree
- no hover-only required action
- labels exist for form fields
- error messages are programmatically understandable
- heading hierarchy is valid
- reduced-motion preference is respected
- contrast is acceptable for text and controls

## 5. Responsive matrix

Required visual/interaction checks at minimum:

```text
320x568
360x800
390x844
768x1024
1280x800
1440x900
```

Expected:

- no accidental horizontal overflow
- no clipped CTAs
- no unreadable text wrapping
- no overlapping dialog/catalog UI
- touch targets remain usable
- hero does not consume the entire mobile experience without revealing purpose/action

## 6. Try-on robustness

Test states:

- supported camera + permission granted
- permission denied
- camera API unavailable
- insecure/unsupported environment
- photo upload fallback
- model loading
- model load failure
- no face detected
- close/unmount releases media tracks
- repeated open/close does not leak streams

## 7. Performance review

Must verify:

- homepage does not eagerly load ML stack
- hero contains no autoplay carousel
- above-the-fold image uses appropriate Next Image settings
- major client components are justified
- catalog interaction does not force unnecessary try-on loading

## 8. UX content comprehension gate

A human reviewer should be able to answer after a brief first visit:

1. What does OptiHome do?
2. Can I request an optical evaluation?
3. Can I browse frames?
4. Can I try frames virtually?
5. What happens when I click the main CTA?

If any answer is ambiguous, `UX_JOURNEY_GATE = FAIL`.

## 9. Visual regression evidence

For the release candidate capture at least:

- homepage desktop
- homepage mobile
- catalog desktop
- catalog mobile
- try-on ready state
- try-on denied/error fallback

These become the initial visual regression baseline for later MKs.
