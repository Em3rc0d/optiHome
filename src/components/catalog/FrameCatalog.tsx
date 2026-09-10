"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Camera, MessageCircle, SlidersHorizontal } from "lucide-react";
import { buildWhatsappUrl } from "@/content/site";
import { intentProps } from "@/lib/analytics-events";
import type { Frame, FrameCategory } from "@/types/frame";

const VirtualTryOn = dynamic(
  () => import("@/components/try-on/VirtualTryOn").then((module) => module.VirtualTryOn),
  { ssr: false }
);

type Filter = "Todas" | FrameCategory;

export function FrameCatalog({ frames }: { frames: Frame[] }) {
  const [filter, setFilter] = useState<Filter>("Todas");
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null);

  const categories = useMemo(
    () => ["Todas", ...Array.from(new Set(frames.map((frame) => frame.category)))] as Filter[],
    [frames]
  );

  const filtered = filter === "Todas" ? frames : frames.filter((frame) => frame.category === filter);
  const tryOnFrames = frames.filter((frame) => Boolean(frame.tryOnImage));

  return (
    <>
      <div className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-ink-muted">
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Filtrar por estilo
        </div>
        <div className="flex max-w-full gap-2 overflow-x-auto pb-1" aria-label="Filtros de monturas">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
              className={`min-h-10 shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
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

      <p className="mt-6 text-sm text-ink-muted">
        {filtered.length} referencias demo. Disponibilidad y condiciones comerciales se confirman por separado.
      </p>

      <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((frame) => {
          const whatsappHref = buildWhatsappUrl(
            `Hola, vi la referencia ${frame.name} en OptiHome y quisiera consultar disponibilidad y alternativas similares.`
          );

          return (
            <article key={frame.id} className="overflow-hidden rounded-3xl border border-border bg-white">
              <div className="relative aspect-[4/3] bg-surface-soft">
                <Image
                  src={frame.image}
                  alt={`Montura ${frame.name}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-5"
                />
              </div>
              <div className="p-6">
                <p className="text-sm font-medium text-brand">{frame.category}</p>
                <h2 className="mt-1 text-2xl font-semibold">{frame.name}</h2>
                <p className="mt-2 text-sm text-ink-muted">{frame.material} · {frame.color}</p>
                <p className="mt-4 text-xs leading-5 text-ink-muted">
                  Referencia demostrativa; no representa inventario ni precio confirmado.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  {frame.tryOnImage && (
                    <button
                      type="button"
                      onClick={() => setSelectedFrame(frame)}
                      {...intentProps("cta_catalog_try_on")}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 font-semibold text-white hover:bg-brand-strong"
                    >
                      <Camera className="size-4" aria-hidden="true" />
                      Probar virtualmente
                    </button>
                  )}
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    {...intentProps("cta_request_whatsapp")}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 font-semibold text-ink hover:border-brand hover:text-brand"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    Consultar disponibilidad
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {selectedFrame && (
        <VirtualTryOn
          open={Boolean(selectedFrame)}
          onOpenChange={(open) => !open && setSelectedFrame(null)}
          initialFrame={selectedFrame}
          frames={tryOnFrames}
        />
      )}
    </>
  );
}
