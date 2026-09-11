"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, Glasses, Home } from "lucide-react";
import { motionTokens } from "@/lib/motion/tokens";

const scenes = [
  {
    src: "/family1.webp",
    alt: "Familia compartiendo un momento cotidiano en casa",
    eyebrow: "Visión para lo que importa",
    title: "Ver bien también es vivir mejor juntos.",
  },
  {
    src: "/family2.webp",
    alt: "Familia disfrutando de tiempo juntos en casa",
    eyebrow: "Cerca de ti",
    title: "Una experiencia óptica que empieza donde estás.",
  },
  {
    src: "/family4.webp",
    alt: "Familia sonriendo durante un momento en casa",
    eyebrow: "A tu ritmo",
    title: "Explora, pruébate y coordina sin apuros.",
  },
] as const;

const steps = [
  {
    number: "01",
    label: "Explora",
    description: "Descubre monturas",
    Icon: Eye,
  },
  {
    number: "02",
    label: "Pruébate",
    description: "Mírate antes de elegir",
    Icon: Glasses,
  },
  {
    number: "03",
    label: "Coordina",
    description: "Atención en tu hogar",
    Icon: Home,
  },
] as const;

export function HeroExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const activeScene = scenes[activeIndex];

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % scenes.length);
    }, 6200);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  const move = (nextDirection: number) => {
    setDirection(nextDirection);
    setActiveIndex((current) =>
      (current + nextDirection + scenes.length) % scenes.length
    );
  };

  const select = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <div
      className="group relative isolate mx-auto min-h-[31rem] w-full overflow-hidden rounded-[2rem] border border-border bg-surface-soft shadow-[0_30px_90px_rgba(16,33,43,.14)] sm:min-h-[36rem] lg:min-h-[620px] xl:min-h-[650px]"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Historias de OptiHome"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
      }}
    >
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={activeScene.src}
          custom={direction}
          initial={reduceMotion ? false : { opacity: 0, scale: 1.035, x: direction > 0 ? 16 : -16 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 1.01, x: direction > 0 ? -12 : 12 }}
          transition={{ duration: reduceMotion ? 0 : motionTokens.duration.slow, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0"
            animate={reduceMotion ? undefined : { scale: [1, 1.035] }}
            transition={reduceMotion ? undefined : { duration: 6.2, ease: "linear" }}
          >
            <Image
              src={activeScene.src}
              alt={activeScene.alt}
              fill
              priority={activeIndex === 0}
              sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 55vw, 100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/10 via-transparent to-transparent" />

      <div className="absolute left-5 top-5 max-w-[80%] rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-sm backdrop-blur-md sm:left-6 sm:top-6 sm:max-w-md">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">{activeScene.eyebrow}</p>
        <p className="mt-1 text-sm font-semibold leading-5 text-ink sm:text-base">{activeScene.title}</p>
      </div>

      <button
        type="button"
        onClick={() => move(-1)}
        className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/85 text-brand shadow-sm backdrop-blur-md transition-[background-color,transform] hover:bg-white motion-safe:active:scale-95 sm:left-4"
        aria-label="Ver historia anterior"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => move(1)}
        className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/85 text-brand shadow-sm backdrop-blur-md transition-[background-color,transform] hover:bg-white motion-safe:active:scale-95 sm:right-4"
        aria-label="Ver siguiente historia"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>

      <div className="absolute inset-x-4 bottom-4 z-10 sm:inset-x-6 sm:bottom-6">
        <div className="grid grid-cols-3 divide-x divide-border/70 overflow-hidden rounded-2xl border border-white/70 bg-white/90 shadow-lg backdrop-blur-xl">
          {steps.map(({ number, label, description, Icon }) => (
            <div key={number} className="min-w-0 p-3 sm:p-4">
              <div className="flex items-center gap-2">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-brand sm:size-9">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="text-[10px] font-bold text-brand sm:text-xs">{number}</span>
              </div>
              <p className="mt-2 truncate text-xs font-semibold text-ink sm:text-sm">{label}</p>
              <p className="mt-1 hidden text-xs leading-5 text-ink-muted sm:block">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 flex justify-center gap-2" role="group" aria-label="Seleccionar historia">
          {scenes.map((scene, index) => (
            <button
              key={scene.src}
              type="button"
              onClick={() => select(index)}
              aria-label={`Ver historia ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={`h-2 rounded-full border border-white/80 shadow-sm transition-[width,background-color] duration-300 ${
                index === activeIndex ? "w-8 bg-white" : "w-2 bg-white/55 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
