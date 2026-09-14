import type { Frame } from "@/types/frame";

export type AngleLayer = {
  src: string;
  opacity: number;
};

export type AngleResolution = {
  layers: AngleLayer[];
  direction: "front" | "left" | "right";
  intensity: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function rangeProgress(value: number, from: number, to: number) {
  return clamp((value - from) / Math.max(to - from, 0.001), 0, 1);
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
 * Resolves which transparent product views should be blended for the current
 * rendered yaw. Missing angle assets degrade safely to the best available
 * image instead of inventing geometry.
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
  const right = yaw > 0;
  const threeQuarter = right
    ? assets.rightThreeQuarter
    : assets.leftThreeQuarter;
  const side = right ? assets.rightSide : assets.leftSide;

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
        { src: threeQuarter, opacity: blend },
      ],
      direction: right ? "right" : "left",
      intensity: blend,
    };
  }

  const maxYaw = clamp(frame.geometry?.maxYaw ?? 42, 30, 50);
  const sideBlend = rangeProgress(magnitude, 27, maxYaw);
  return {
    layers: [
      { src: threeQuarter, opacity: 1 - sideBlend },
      { src: side, opacity: sideBlend },
    ],
    direction: right ? "right" : "left",
    intensity: sideBlend,
  };
}
