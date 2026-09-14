# MK0.4.3 — Test Plan

## Automated gates

- dependency audit;
- lint;
- TypeScript;
- build;
- frozen rollback source hash;
- low-latency tracking constants;
- yaw estimator present;
- yaw smoothing present;
- multi-angle resolver present;
- overlay renderer present;
- optional `Frame.tryOnAngles` and geometry model present;
- frontal fallback remains valid when angle assets are absent;
- runtime smoke for `/` and `/products`.

## Physical mobile QA

Physical-device validation is required before declaring multi-angle try-on complete.

| Test | Expected result |
| --- | --- |
| frontal | frame centered and stable |
| ±5° yaw | visually frontal |
| ±15° yaw | three-quarter view begins when authentic asset exists |
| ±25° yaw | three-quarter view dominates |
| ±35° yaw | side/temple is clearly visible when authentic asset exists |
| left -> right fast | no image flash or hard asset jump |
| approach camera | scale follows quickly |
| move away | stable reduction |
| head roll | frame roll remains coherent |
| yaw + roll | both remain coherent |
| face hidden <420 ms | no immediate disappearance |
| face lost >420 ms | overlay clears |
| reacquire face | no violent jump |
| switch frame | current pose remains coherent |
| angle asset missing | certified frontal fallback remains usable |

Canonical motion sequence:

```text
0° -> +35° -> 0° -> -35° -> 0°
```

Repeat under good indoor light, lower indoor light, and normal hand-held phone movement.

## Pass criterion

With authentic angle assets installed, the user should perceive the frame rotating with the head rather than perceive an image swap.

## Open gates

- `EXTERNAL_ASSET_GATE_OPEN`: authentic three-quarter/side views are not currently available in the repository.
- `PHYSICAL_DEVICE_GATE_OPEN`: end-to-end camera/yaw feel requires a real phone and human visual review.
