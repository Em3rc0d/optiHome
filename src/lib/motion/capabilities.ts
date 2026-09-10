"use client";

import { useSyncExternalStore } from "react";

export type MotionCapability = "high" | "medium" | "low";

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
  };
};

function getCapabilitySnapshot(): MotionCapability {
  if (typeof window === "undefined") return "medium";

  const navigatorHints = navigator as NavigatorWithHints;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const saveData = Boolean(navigatorHints.connection?.saveData);
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = navigatorHints.deviceMemory ?? 8;

  if (reduceMotion || saveData) return "low";
  if (coarsePointer || cores <= 4 || memory <= 4) return "medium";
  return "high";
}

function getServerCapabilitySnapshot(): MotionCapability {
  return "medium";
}

function subscribeToCapabilityChanges(onStoreChange: () => void) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarsePointer = window.matchMedia("(pointer: coarse)");

  reducedMotion.addEventListener("change", onStoreChange);
  coarsePointer.addEventListener("change", onStoreChange);

  return () => {
    reducedMotion.removeEventListener("change", onStoreChange);
    coarsePointer.removeEventListener("change", onStoreChange);
  };
}

export function useMotionCapability(): MotionCapability {
  return useSyncExternalStore(
    subscribeToCapabilityChanges,
    getCapabilitySnapshot,
    getServerCapabilitySnapshot
  );
}
