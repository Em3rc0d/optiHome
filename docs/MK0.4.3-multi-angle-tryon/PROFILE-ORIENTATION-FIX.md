# MK0.4.3 Profile Orientation Fix

## Observed failure

Physical-device screenshots exposed a profile-orientation defect in the generated-reference try-on:

- when the nose moved toward rendered left, the temple arm extended toward rendered left instead of toward the visible ear on rendered right;
- the inverse happened when the nose moved toward rendered right;
- the generated side-arm path climbed too aggressively, producing an obviously rotated/unnatural temple;
- side views also looked visually undersized because the profile asset concentrates the visible lens into a smaller part of the canvas.

## Root cause

`estimateYaw()` reports nose displacement in rendered-image coordinates. The multi-angle resolver previously selected directional assets using the same side as the nose. For eyewear profile rendering, the visible temple/ear is on the opposite side.

Correct mapping:

- nose left -> visible temple / ear right;
- nose right -> visible temple / ear left.

## Corrective design

1. Resolve generated multi-angle assets by visible temple side, not nose side.
2. Generate explicit left and right 3/4 and side references instead of relying on runtime mirroring for the normal generated-reference path.
3. Flatten the temple trajectory so it runs approximately toward the ear rather than sharply upward.
4. Shift profile artwork toward the visible ear to keep the visible lens anchored around the eye as the asset becomes asymmetric.
5. Add a bounded profile scale gain so the visible lens does not collapse visually in strong yaw.
6. Preserve the frozen historical `VirtualTryOn.tsx` rollback baseline and the low-latency detector pipeline.

## Acceptance

### Automated

- lint PASS;
- TypeScript PASS;
- production build PASS;
- exact frozen rollback hash PASS;
- left/right generated-reference views present;
- resolver contract encodes `earRight = yaw < 0`;
- public copy remains free of implementation jargon;
- runtime smoke PASS.

### Physical device

Status remains `PHYSICAL_DEVICE_GATE_OPEN` until verified on a real phone.

Required sequence:

`0° -> profile left -> 0° -> profile right -> 0°`

PASS requires:

- temple always points from hinge toward visible ear;
- visible lens stays centered around the near eye;
- no abrupt mirrored jump during 3/4-to-side transition;
- temple slope appears approximately natural after roll compensation;
- profile lens remains large enough to read as the same frame;
- returning to frontal view does not create a positional jump.

Generated references remain `GENERATED_REFERENCE`, not authoritative product geometry.
