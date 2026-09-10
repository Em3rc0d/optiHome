"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  SlidersHorizontal,
} from "lucide-react";
import { buildWhatsappUrl } from "@/content/site";
import { intentProps } from "@/lib/analytics-events";
import { motionTokens } from "@/lib/motion/tokens";
import type { Frame, FrameCategory } from "@/types/frame";

const VirtualTryOn = dynamic(
  () =>
    import("@/components/try-on/VirtualTryOn").then(
      (module) => module.VirtualTryOn
    ),
  { ssr: false }
);

type Filter = "Todas" | FrameCategory;

export function FrameCatalog({ frames }: { frames: Frame[] }) {
  const [filter, setFilter] = useState<Filter>("Todas");
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null);
  const intentHandledRef = useRef(false);
  const reduceMotion = useReducedMotion();

  const categories = useMemo(
    () =>
      ["Todas", ...Array.from(new Set(frames.map((frame) => frame.category)))] as Filter[],
    [frames]
  );

  const filtered = useMemo(
    () =>
      filter === "Todas"
        ? frames
        : frames.filter((frame) => frame.category === filter),
    [filter, frames]
  );

  const tryOnFrames = useMemo(
    () => frames.filter((frame) => Boolean(frame.tryOnImage)),
    [frames]
  );

  const safeIndex = Math.min(activeIndex, Math.max(filtered.length - 1, 0));
  const activeFrame = filtered[safeIndex];

  useEffect(() => {
    if (intentHandledRef.current) return;
    intentHandledRef.current = true;

    const params = new URLSearchParams(window.location.search);
    if (params.get("tryon") !== "1") return;

    const firstTryOnIndex = frames.findIndex((frame) => Boolean(frame.tryOnImage));
    if (firstTryOnIndex < 0) return;

    const initialTryOnFrame = frames[firstTryOnIndex];
    const animationFrame = window.requestAnimationFrame(() => {
      setFilter("Todas");
      setActiveIndex(firstTryOnIndex);
      setSelectedFrame(initialTryOnFrame);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [frames]);

  const changeFilter = (nextFilter: Filter) => {
    setFilter(nextFilter);
    setActiveIndex(0);
    setDirection(1);
  };

  const selectFrame = (index: number) => {
    setDirection(index >= safeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const previousFrame = () => {
    setDirection(-1);
    setActiveIndex((index) => Math.max(0, index - 1));
  };

  const nextFrame = () => {
    setDirection(1);
    setActiveIndex((index) => Math.min(filtered.length - 1, index + 1));
  };

  if (!activeFrame) {
    return (
      <p className="rounded-2xl border border-border bg-surface-soft p-6 text-ink-muted">
        No hay monturas disponibles para este filtro.
      </p>
    );
  }

  const whatsappHref = buildWhatsappUrl(
    `Hola, vi la montura ${activeFrame.name} en OptiHome y quisiera consultar disponibilidad y alternativas similares.`
  );

  return (
    <LayoutGroup id="frame-catalog">
      <div className="flex flex-col gap-5 border-b border-border pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-ink-muted">
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Filtrar por estilo
        </div>
        <div
          className="flex max-w-full gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]"
          role="group"
          aria-label="Filtros de monturas"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filter === category}
              onClick={() => changeFilter(category)}
              className={`min-h-11 shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-[background-color,border-color,color,transform] duration-200 motion-safe:active:scale-[0.98] ${
                filter === category
                  ? "border-brand bg-brand text-white"
                  : "border-border bg-white text-ink-muted hover:border-brand hover:text-brand"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">
          {filtered.length} estilos para explorar. Selecciona uno para verlo en detalle o probarlo virtualmente.
        </p>
        <p className="text-sm font-semibold text-ink" aria-live="polite">
          {safeIndex + 1} de {filtered.length}
        </p>
      </div>

      <div className="mt-7 hidden grid-cols-4 gap-3 lg:grid" aria-label="Vista rápida de monturas">
        {filtered.map((frame, index) => (
          <motion.button
            key={frame.id}
            type="button"
            aria-pressed={index === safeIndex}
            onClick={() => selectFrame(index)}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            transition={motionTokens.spring.ui}
            className={`rounded-2xl border bg-white p-3 text-left transition-[border-color,box-shadow,transform] duration-200 motion-safe:active:scale-[0.99] ${
              index === safeIndex
                ? "border-brand shadow-sm"
                : "border-border hover:border-brand/60"
            }`}
          >
            {index === safeIndex ? (
              <span className="relative block aspect-[16/7] overflow-hidden rounded-xl bg-surface-soft">
                <Image
                  src={frame.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 20vw, 0px"
                  className="object-contain p-3"
                />
              </span>
            ) : (
              <motion.span
                layoutId={`frame-${frame.slug}`}
                className="relative block aspect-[16/7] overflow-hidden rounded-xl bg-surface-soft"
              >
                <Image
                  src={frame.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 20vw, 0px"
                  className="object-contain p-3"
                />
              </motion.span>
            )}
            <span className="mt-3 block truncate text-sm font-semibold text-ink">{frame.name}</span>
            <span className="mt-1 block text-xs text-ink-muted">{frame.category}</span>
          </motion.button>
        ))}
      </div>

      <div
        className="mt-8"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Montura seleccionada"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") previousFrame();
          if (event.key === "ArrowRight") nextFrame();
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.article
            key={activeFrame.slug}
            custom={direction}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: direction > 0 ? 34 : -34, rotateY: direction > 0 ? 4 : -4 }
            }
            animate={reduceMotion ? undefined : { opacity: 1, x: 0, rotateY: 0 }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, x: direction > 0 ? -24 : 24, rotateY: direction > 0 ? -3 : 3 }
            }
            transition={{ duration: motionTokens.duration.normal, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-3xl border border-border bg-white lg:grid lg:grid-cols-[1.1fr_.9fr]"
            aria-roledescription="diapositiva"
            aria-label={`${safeIndex + 1} de ${filtered.length}: ${activeFrame.name}`}
          >
            <div className="relative min-h-[19rem] overflow-hidden bg-[radial-gradient(circle_at_50%_45%,rgba(233,246,241,.82),rgba(244,248,249,.72)_56%,white_100%)] sm:min-h-[25rem] lg:min-h-[34rem]">
              <motion.div
                layoutId={`frame-${activeFrame.slug}`}
                className="absolute inset-0 transform-gpu"
                whileHover={reduceMotion ? undefined : { scale: 1.012, rotateY: 2 }}
                transition={motionTokens.spring.product}
              >
                <Image
                  src={activeFrame.image}
                  alt={`Montura ${activeFrame.name}`}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-contain p-6 drop-shadow-[0_28px_26px_rgba(16,33,43,.15)] sm:p-10 lg:p-14"
                  priority={safeIndex === 0}
                />
              </motion.div>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-semibold text-brand">{activeFrame.category}</p>
              <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">{activeFrame.name}</h2>
              <p className="mt-3 text-base text-ink-muted">
                {activeFrame.material} · {activeFrame.color}
              </p>
              <p className="mt-5 max-w-md text-sm leading-6 text-ink-muted">
                La disponibilidad del modelo, colores y alternativas similares se confirma por WhatsApp.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                {activeFrame.tryOnImage && (
                  <button
                    type="button"
                    onClick={() => setSelectedFrame(activeFrame)}
                    {...intentProps("cta_catalog_try_on")}
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-strong motion-safe:active:scale-[0.99]"
                  >
                    <Camera className="size-5" aria-hidden="true" />
                    Probar virtualmente
                  </button>
                )}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  {...intentProps("cta_request_whatsapp")}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-center font-semibold text-ink transition-[border-color,color,transform] duration-200 hover:border-brand hover:text-brand motion-safe:active:scale-[0.99]"
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                  Consultar disponibilidad
                </a>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>

        <div className="mt-5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={previousFrame}
            disabled={safeIndex === 0}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 py-3 font-semibold text-ink transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Ver montura anterior"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          <div className="flex min-w-0 flex-1 justify-center gap-2" aria-hidden="true">
            {filtered.map((frame, index) => (
              <span
                key={frame.id}
                className={`h-1.5 max-w-12 flex-1 rounded-full transition-colors ${
                  index === safeIndex ? "bg-brand" : "bg-border"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextFrame}
            disabled={safeIndex === filtered.length - 1}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 py-3 font-semibold text-ink transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Ver siguiente montura"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {selectedFrame && (
        <VirtualTryOn
          open={Boolean(selectedFrame)}
          onOpenChange={(nextOpen) => !nextOpen && setSelectedFrame(null)}
          initialFrame={selectedFrame}
          frames={tryOnFrames}
        />
      )}
    </LayoutGroup>
  );
}
