"use client";

import { useEffect, type CSSProperties } from "react";
import type { Frame } from "@/types/frame";
import {
  availableAngleSources,
  resolveFrameAngle,
} from "@/lib/try-on/multi-angle";

const PROFILE_MAX_VISUAL_SHIFT_PERCENT = 18;
const PROFILE_SCALE_GAIN = 0.26;
const PROFILE_MAX_COMPRESSION = 0.05;

export function MultiAngleFrameOverlay({
  frame,
  yaw,
  style,
}: {
  frame: Frame;
  yaw: number;
  style: CSSProperties;
}) {
  const resolved = resolveFrameAngle(frame, yaw);
  const profile = frame.tryOnAngles ? resolved.intensity : 0;
  const shiftDirection =
    resolved.direction === "right" ? 1 : resolved.direction === "left" ? -1 : 0;
  const visualShift =
    shiftDirection * profile * PROFILE_MAX_VISUAL_SHIFT_PERCENT;
  const profileScale = 1 + profile * PROFILE_SCALE_GAIN;
  const perspectiveCompression = 1 - profile * PROFILE_MAX_COMPRESSION;
  const baseTransform = typeof style.transform === "string" ? style.transform : "";

  useEffect(() => {
    for (const source of availableAngleSources(frame)) {
      const image = new window.Image();
      image.decoding = "async";
      image.src = source;
    }
  }, [frame]);

  return (
    <div
      aria-hidden="true"
      className="absolute max-w-[82vw] transform-gpu"
      data-angle-authority={frame.tryOnAnglesAuthority ?? "REFERENCE"}
      data-profile-direction={resolved.direction}
      style={{
        ...style,
        transform: baseTransform,
      }}
    >
      <div
        className="relative w-full transform-gpu"
        style={{
          transform: `translateX(${visualShift}%) scale(${profileScale}) scaleX(${perspectiveCompression})`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        {resolved.layers.map((layer, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${layer.src}-${layer.mirror ? "mirrored" : "native"}`}
            src={layer.src}
            alt=""
            draggable={false}
            className={
              index === 0
                ? "block h-auto w-full select-none object-contain drop-shadow-md"
                : "absolute inset-0 h-auto w-full select-none object-contain drop-shadow-md"
            }
            style={{
              opacity: layer.opacity,
              transform: layer.mirror ? "scaleX(-1)" : undefined,
              transition: "opacity 70ms linear",
              willChange: "opacity, transform",
            }}
          />
        ))}
      </div>
    </div>
  );
}
