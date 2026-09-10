"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motionTokens, revealViewport } from "@/lib/motion/tokens";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { y: motionTokens.distance.sm }}
      whileInView={reduceMotion ? undefined : { y: 0 }}
      viewport={revealViewport}
      transition={{
        duration: motionTokens.duration.normal,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
