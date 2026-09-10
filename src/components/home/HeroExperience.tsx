"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useMotionCapability } from "@/lib/motion/capabilities";
import { motionTokens } from "@/lib/motion/tokens";

export function HeroExperience() {
  const reduceMotion = useReducedMotion();
  const capability = useMotionCapability();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, motionTokens.spring.product);
  const smoothY = useSpring(pointerY, motionTokens.spring.product);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);

  const interactive = !reduceMotion && capability === "high";

  return (
    <div
      className="relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden rounded-[2rem] border border-border bg-[radial-gradient(circle_at_50%_32%,rgba(233,246,241,.95),rgba(244,248,249,.78)_42%,white_76%)] shadow-[0_30px_90px_rgba(16,33,43,.10)]"
      onPointerMove={(event) => {
        if (!interactive) return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <div className="absolute inset-x-[12%] top-[13%] h-[42%] rounded-full border border-brand/10 bg-white/45 blur-3xl" />
      <div className="absolute left-5 top-5 rounded-full border border-white/80 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand backdrop-blur">
        Urban Acetate · flagship
      </div>

      <div className="absolute inset-x-[10%] top-[23%] [perspective:1200px]">
        <motion.div
          className="relative aspect-[16/9] transform-gpu"
          style={interactive ? { rotateX, rotateY, x: translateX, transformPerspective: 1200 } : undefined}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -5, 0],
                  rotateZ: [0, 0.35, 0],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 6.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          <Image
            src="/frames/urban-acetate.webp"
            alt="Montura Urban Acetate en la experiencia inmersiva de OptiHome"
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 90vw"
            className="object-contain drop-shadow-[0_28px_28px_rgba(16,33,43,.18)]"
          />
        </motion.div>
      </div>

      <div className="absolute inset-x-5 bottom-5 grid gap-3 sm:grid-cols-3">
        {[
          ["01", "Explora"],
          ["02", "Pruébate"],
          ["03", "Coordina"],
        ].map(([number, label]) => (
          <div key={number} className="rounded-2xl border border-white/80 bg-white/82 p-3 backdrop-blur-md">
            <span className="text-[11px] font-semibold text-brand">{number}</span>
            <p className="mt-1 text-sm font-semibold text-ink">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
