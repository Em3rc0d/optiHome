"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const chapters = [
  {
    eyebrow: "01 · Explora",
    title: "Descubre una montura que se parezca a ti.",
    text: "Recorre estilos, materiales y proporciones sin entrar todavía en una decisión de compra.",
  },
  {
    eyebrow: "02 · Compara",
    title: "Mira el producto como protagonista.",
    text: "La montura gana escala y contexto para que comparar se sienta más cercano a un showroom que a una grilla de ecommerce.",
  },
  {
    eyebrow: "03 · Pruébate",
    title: "Pasa de mirar a verte con ella.",
    text: "Cuando quieras, la prueba virtual toma prioridad. La experiencia visual nunca compite con la cámara ni con el detector facial.",
  },
  {
    eyebrow: "04 · Coordina",
    title: "Cierra el recorrido hablando con una persona.",
    text: "WhatsApp sigue siendo el CTA principal para confirmar cobertura, disponibilidad y horario.",
  },
] as const;

export function OpticalStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 5]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1.04]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(Math.min(chapters.length - 1, Math.floor(value * chapters.length)));
  });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="optical-story-title"
      className="relative bg-ink text-white lg:min-h-[220vh]"
    >
      <div className="content-shell py-16 lg:sticky lg:top-16 lg:grid lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-16 lg:py-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            El recorrido OptiHome
          </p>
          <h2 id="optical-story-title" className="mt-3 max-w-2xl text-3xl font-semibold text-white md:text-5xl">
            Una experiencia conectada de principio a fin.
          </h2>

          <div className="mt-10 space-y-5 lg:space-y-3">
            {chapters.map((chapter, index) => (
              <article
                key={chapter.eyebrow}
                className={`rounded-2xl border p-5 transition-[opacity,border-color,background-color] ${
                  active === index
                    ? "border-white/25 bg-white/10 opacity-100"
                    : "border-white/10 bg-transparent opacity-60"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  {chapter.eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">{chapter.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">{chapter.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative mt-12 min-h-[21rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] lg:mt-0 lg:min-h-[34rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(91,195,165,.18),transparent_52%)]" />
          <motion.div
            className="absolute inset-[10%] transform-gpu"
            style={reduceMotion ? undefined : { rotateZ: rotate, scale }}
          >
            <Image
              src="/frames/urban-acetate.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 48vw, 90vw"
              className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,.28)]"
            />
          </motion.div>
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Story progress</span>
            <span className="text-sm font-semibold text-white">{String(active + 1).padStart(2, "0")} / 04</span>
          </div>
        </div>
      </div>
    </section>
  );
}
