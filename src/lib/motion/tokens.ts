export const motionTokens = {
  duration: {
    fast: 0.18,
    normal: 0.32,
    slow: 0.55,
  },
  distance: {
    xs: 6,
    sm: 12,
    md: 24,
  },
  spring: {
    soft: { type: "spring" as const, stiffness: 120, damping: 24, mass: 0.9 },
    product: { type: "spring" as const, stiffness: 90, damping: 20, mass: 1.05 },
    ui: { type: "spring" as const, stiffness: 260, damping: 28, mass: 0.72 },
  },
  stagger: {
    fast: 0.06,
    section: 0.1,
  },
} as const;

export const revealViewport = {
  once: true,
  amount: 0.22,
} as const;
