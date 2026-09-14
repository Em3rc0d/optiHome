"use client";

import { useEffect, type CSSProperties } from "react";
import type { Frame } from "@/types/frame";
import {
  availableAngleSources,
  resolveFrameAngle,
} from "@/lib/try-on/multi-angle";

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
  const perspectiveCompression = frame.tryOnAngles
    ? 1 - Math.min(Math.abs(yaw) / 42, 1) * 0.07
    : 1;
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
      style={{
        ...style,
        transform: `${baseTransform} scaleX(${perspectiveCompression})`,
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
  );
}
