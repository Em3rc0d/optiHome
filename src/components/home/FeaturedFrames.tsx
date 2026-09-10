"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { featuredFrames } from "@/content/frames";
import { motionTokens } from "@/lib/motion/tokens";

const variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 40 : -40,
    rotateY: direction > 0 ? 10 : -10,
  }),
  center: { opacity: 1, x: 0, rotateY: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -40 : 40,
    rotateY: direction > 0 ? -10 : 10,
  }),
};

export function FeaturedFrames() {
  const [[index, direction], setIndex] = useState([0, 1]);
  const reduceMotion = useReducedMotion();
  const frame = featuredFrames[index];

  const move = (nextDirection: number) => {
    setIndex(([current]) => {
      const next = (current + nextDirection + featuredFrames.length) % featuredFrames.length;
      return [next, nextDirection];
    });
  };

  return (
    <section aria-labelledby="featured-title" className="border-y border-border bg-surface-soft">
      <div className="content-shell section-pad">
        <div className="grid items-center gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Digital showroom</p>
            <h2 id="featured-title" className="mt-3 text-3xl font-semibold md:text-5xl">
              Encuentra un estilo que se sienta tuyo.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">
              Una montura a la vez, con espacio suficiente para mirar proporciones, material y personalidad antes de pasar al catálogo completo.
            </p>
            <Link
              href="/products"
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand px-5 py-3 font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-strong motion-safe:active:scale-[0.99]"
            >
              Explorar las 8 monturas
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div
            className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_24px_70px_rgba(16,33,43,.08)]"
            role="region"
            aria-roledescription="carrusel"
            aria-label="Monturas destacadas"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") move(-1);
              if (event.key === "ArrowRight") move(1);
            }}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                {String(index + 1).padStart(2, "0")} / {String(featuredFrames.length).padStart(2, "0")}
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">{frame.category}</p>
            </div>

            <div className="relative min-h-[24rem] overflow-hidden bg-[radial-gradient(circle_at_50%_44%,rgba(233,246,241,.95),white_67%)] sm:min-h-[31rem]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={frame.slug}
                  custom={direction}
                  variants={reduceMotion ? undefined : variants}
                  initial={reduceMotion ? false : "enter"}
                  animate={reduceMotion ? undefined : "center"}
                  exit={reduceMotion ? undefined : "exit"}
                  transition={{ duration: motionTokens.duration.normal, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-[11%]">
                    <Image
                      src={frame.image}
                      alt={`Montura ${frame.name}`}
                      fill
                      sizes="(min-width: 1024px) 56vw, 100vw"
                      className="object-contain drop-shadow-[0_28px_26px_rgba(16,33,43,.17)]"
                    />
                  </div>
                  <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/90 bg-white/90 p-5 backdrop-blur sm:inset-x-8 sm:bottom-8">
                    <h3 className="text-2xl font-semibold sm:text-3xl">{frame.name}</h3>
                    <p className="mt-2 text-sm text-ink-muted">{frame.material} · {frame.color}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border p-4 sm:p-5">
              <button
                type="button"
                onClick={() => move(-1)}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-4 font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
                aria-label="Ver montura anterior"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">Anterior</span>
              </button>

              <div className="flex flex-1 justify-center gap-2" aria-hidden="true">
                {featuredFrames.map((item, itemIndex) => (
                  <span
                    key={item.id}
                    className={`h-1.5 max-w-10 flex-1 rounded-full ${itemIndex === index ? "bg-brand" : "bg-border"}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => move(1)}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-4 font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
                aria-label="Ver siguiente montura"
              >
                <span className="hidden sm:inline">Siguiente</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
