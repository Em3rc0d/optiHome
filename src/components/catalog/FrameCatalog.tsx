"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  SlidersHorizontal,
} from "lucide-react";
import { buildWhatsappUrl } from "@/content/site";
import { intentProps } from "@/lib/analytics-events";
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
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null);

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

  const changeFilter = (nextFilter: Filter) => {
    setFilter(nextFilter);
    setActiveIndex(0);
  };

  const previousFrame = () => setActiveIndex((index) => Math.max(0, index - 1));
  const nextFrame = () =>
    setActiveIndex((index) => Math.min(filtered.length - 1, index + 1));

  if (!activeFrame) {
    return (
      <p className="rounded-2xl border border-border bg-surface-soft p-6 text-ink-muted">
        No hay referencias disponibles para este filtro.
      </p>
    );
  }

  const whatsappHref = buildWhatsappUrl(
    `Hola, vi la referencia ${activeFrame.name} en OptiHome y quisiera consultar disponibilidad y alternativas similares.`
  );

  return (
    <>
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
          {filtered.length} referencias demo. Mostramos una montura a la vez para facilitar la comparación.
        </p>
        <p className="text-sm font-semibold text-ink" aria-live="polite">
          {safeIndex + 1} de {filtered.length}
        </p>
      </div>

      <div
        className="mt-8"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Monturas de referencia"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") previousFrame();
          if (event.key === "ArrowRight") nextFrame();
        }}
      >
        <article
          key={activeFrame.slug}
          className="frame-enter overflow-hidden rounded-3xl border border-border bg-white lg:grid lg:grid-cols-[1.1fr_.9fr]"
          aria-roledescription="diapositiva"
          aria-label={`${safeIndex + 1} de ${filtered.length}: ${activeFrame.name}`}
        >
          <div className="relative min-h-[19rem] bg-surface-soft sm:min-h-[25rem] lg:min-h-[34rem]">
            <Image
              src={activeFrame.image}
              alt={`Montura ${activeFrame.name}`}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-contain p-6 sm:p-10"
              priority={safeIndex === 0}
            />
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-semibold text-brand">{activeFrame.category}</p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">{activeFrame.name}</h2>
            <p className="mt-3 text-base text-ink-muted">
              {activeFrame.material} · {activeFrame.color}
            </p>
            <p className="mt-5 max-w-md text-sm leading-6 text-ink-muted">
              Referencia demostrativa; no representa inventario, precio ni disponibilidad confirmados.
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
        </article>

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
    </>
  );
}
