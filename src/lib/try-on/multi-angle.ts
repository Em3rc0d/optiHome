import type { Frame } from "@/types/frame";

export type AngleLayer = {
  src: string;
  opacity: number;
  mirror?: boolean;
};

export type AngleResolution = {
  layers: AngleLayer[];
  /** Side of the rendered face where the visible temple/ear sits. */
  direction: "front" | "left" | "right";
  /** Monotonic profile amount from frontal (0) to full profile (1). */
  intensity: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function rangeProgress(value: number, from: number, to: number) {
  return clamp((value - from) / Math.max(to - from, 0.001), 0, 1);
}

function directionalAsset(
  preferred?: string,
  opposite?: string
): { src: string; mirror: boolean } | null {
  if (preferred) return { src: preferred, mirror: false };
  if (opposite) return { src: opposite, mirror: true };
  return null;
}

export function availableAngleSources(frame: Frame) {
  const assets = frame.tryOnAngles;
  if (!assets) return [frame.tryOnImage ?? frame.image];

  return Array.from(
    new Set(
      [
        assets.front,
        assets.leftThreeQuarter,
        assets.rightThreeQuarter,
        assets.leftSide,
        assets.rightSide,
      ].filter((source): source is string => Boolean(source))
    )
  );
}

/**
 * FacePose yaw follows nose displacement in rendered-image coordinates.
 * The visible temple and ear are on the opposite side of that displacement:
 * nose left => temple right; nose right => temple left.
 *
 * That distinction is critical for profile try-on. Selecting by the nose side
 * makes the glasses arm point toward the nose instead of toward the ear.
 */
export function resolveFrameAngle(frame: Frame, yaw: number): AngleResolution {
  const fallback = frame.tryOnAngles?.front ?? frame.tryOnImage ?? frame.image;
  const assets = frame.tryOnAngles;

  if (!assets) {
    return {
      layers: [{ src: fallback, opacity: 1 }],
      direction: "front",
      intensity: 0,
    };
  }

  const magnitude = Math.abs(yaw);
  const maxYaw = clamp(frame.geometry?.maxYaw ?? 42, 30, 50);
  const profileIntensity = rangeProgress(magnitude, 7, maxYaw);

  // Yaw sign tracks the nose. The visible temple is opposite the nose.
  const earRight = yaw < 0;
  const threeQuarter = directionalAsset(
    earRight ? assets.rightThreeQuarter : assets.leftThreeQuarter,
    earRight ? assets.leftThreeQuarter : assets.rightThreeQuarter
  );
  const side = directionalAsset(
    earRight ? assets.rightSide : assets.leftSide,
    earRight ? assets.leftSide : assets.rightSide
  );
  const direction = earRight ? "right" : "left";

  if (magnitude <= 7 || !threeQuarter) {
    return {
      layers: [{ src: assets.front, opacity: 1 }],
      direction: "front",
      intensity: 0,
    };
  }

  if (magnitude < 27 || !side) {
    const blend = rangeProgress(magnitude, 7, 27);
    return {
      layers: [
        { src: assets.front, opacity: 1 - blend },
        {
          src: threeQuarter.src,
          opacity: blend,
          mirror: threeQuarter.mirror,
        },
      ],
      direction,
      intensity: profileIntensity,
    };
  }

  const sideBlend = rangeProgress(magnitude, 27, maxYaw);
  return {
    layers: [
      {
        src: threeQuarter.src,
        opacity: 1 - sideBlend,
        mirror: threeQuarter.mirror,
      },
      {
        src: side.src,
        opacity: sideBlend,
        mirror: side.mirror,
      },
    ],
    direction,
    intensity: profileIntensity,
  };
}
