# MK0.2 — Try-on rotation stability

Status: `DESIGN_FROZEN__BUILD_OPEN`

## Problem

The production try-on can visually rotate an eyewear overlay even when the user is facing almost straight ahead. The current geometry derives CSS rotation from a directed vector between the two eye landmarks. The same physical eye-line may therefore be represented close to `0°` or close to `180°` depending on point ordering/mirroring, which is not a meaningful distinction for an eyeglass frame.

## Frozen fix contract

1. Treat the eye-line as an undirected line and normalize its angle to the nearest horizontal orientation in `[-90°, 90°)`.
2. Apply a small dead-zone around horizontal so detector noise does not visibly rotate the frame.
3. Clamp rendered eyewear rotation to `±4.5°`; MK0.2 prioritizes a stable frontal fitting over reproducing large head-roll.
4. Smooth rotation more strongly than x/y position and scale.
5. Preserve the existing iris/eye-center anchoring, transient tracking retention, canvas-based camera inference and manual size control.
6. For the new transparent SVG eyewear authorities, render the SVG directly instead of rasterizing/background-cleaning it.
7. Do not alter appointment, catalog, privacy or commercial contracts.

## Verification

Release is blocked until the candidate passes dependency audit, lint, production build and focused browser checks proving:

- photo try-on produces finite geometry;
- camera try-on produces finite geometry;
- overlay rotation remains finite and within `±4.5°`;
- an eye-line represented with reversed endpoint direction cannot produce a `~180°` flip;
- frame switching preserves the stability rule;
- close/reopen and camera permission lifecycle remain functional;
- no Vercel preview is produced from this branch.

Any runtime change after certification invalidates the affected evidence.
