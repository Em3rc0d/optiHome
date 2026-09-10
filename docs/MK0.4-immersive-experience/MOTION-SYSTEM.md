# MOTION SYSTEM

## Tokens

Centralized in `src/lib/motion/tokens.ts`:

- `duration.fast`, `normal`, `slow`
- `distance.xs`, `sm`, `md`
- `spring.soft`, `product`, `ui`
- `stagger.fast`, `section`

## Rules

- Motion explains hierarchy, selection or continuity.
- No essential information enters only through animation.
- Pointer motion is bounded and spring-smoothed.
- Repeated idle motion is subtle and disabled under reduced motion.
- Catalog transitions preserve keyboard controls and aria state.

## Capability policy

`useMotionCapability()` maps reduced-motion/save-data to `low`, coarse pointer or constrained hardware hints to `medium`, and capable fine-pointer devices to `high`.
