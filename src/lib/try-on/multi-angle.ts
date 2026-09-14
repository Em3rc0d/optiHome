import type { Frame } from "@/types/frame";

export type AngleLayer = {
  src: string;
  opacity: number;
  mirror?: boolean;
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
 * Resolves which transparent product views should be blended for the current
 * rendered yaw. Missing directional views may mirror the opposite generated
 * reference asset; missing angle coverage otherwise degrades to the frontal
 * image without breaking the try-on.
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
  const threeQuarter = directionalAsset(
    right ? assets.rightThreeQuarter : assets.leftThreeQuarter,
    right ? assets.leftThreeQuarter : assets.rightThreeQuarter
  );
  const side = directionalAsset(
    right ? assets.rightSide : assets.leftSide,
    right ? assets.leftSide : assets.rightSide
  );

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
      direction: right ? "right" : "left",
      intensity: blend,
    };
  }

  const maxYaw = clamp(frame.geometry?.maxYaw ?? 42, 30, 50);
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
    direction: right ? "right" : "left",
    intensity: sideBlend,
  };
}
