"use client";

import { useEffect, useState } from "react";

export type MotionCapability = "high" | "medium" | "low";

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
  };
};

export function useMotionCapability(): MotionCapability {
  const [capability, setCapability] = useState<MotionCapability>("medium");

  useEffect(() => {
    const navigatorHints = navigator as NavigatorWithHints;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const saveData = Boolean(navigatorHints.connection?.saveData);
    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = navigatorHints.deviceMemory ?? 8;

    if (reduceMotion || saveData) {
      setCapability("low");
      return;
    }

    if (coarsePointer || cores <= 4 || memory <= 4) {
      setCapability("medium");
      return;
    }

    setCapability("high");
  }, []);

  return capability;
}
