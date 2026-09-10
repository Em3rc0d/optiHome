"use client";

import Link from "next/link";
import { useState } from "react";
import { Camera, Eye, Glasses, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { intentProps } from "@/lib/analytics-events";
import { motionTokens } from "@/lib/motion/tokens";

const paths = [
  {
    title: "Quiero revisar mi visión",
    description: "Conoce cómo coordinamos una evaluación óptica a domicilio.",
    href: "/#proceso",
    intent: "cta_path_evaluation",
    label: "Ver cómo funciona",
    Icon: Eye,
    accent: false,
  },
  {
    title: "Quiero encontrar una montura",
    description: "Compara formas, materiales y estilos antes de consultar disponibilidad.",
    href: "/products",
    intent: "cta_path_frames",
    label: "Explorar monturas",
    Icon: Glasses,
    accent: false,
  },
  {
    title: "Quiero ver cómo me queda",
    description: "Pruébate cualquiera de las monturas con cámara o con una foto.",
    href: "/products?tryon=1#prueba-virtual",
    intent: "cta_path_virtual_try_on",
    label: "Abrir prueba virtual",
    Icon: Camera,
    accent: true,
  },
] as const;

export function JourneyChooser() {
  const [hovered, setHovered] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="journey-title" className="border-y border-border bg-surface-soft">
      <div className="content-shell section-pad">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Elige por dónde empezar</p>
          <h2 id="journey-title" className="mt-3 text-3xl font-semibold md:text-5xl">
            Tu siguiente paso depende de lo que necesitas hoy.
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink-muted">
            Puedes coordinar una evaluación, explorar estilos o probarte una montura antes de escribirnos.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {paths.map(({ title, description, href, intent, label, Icon, accent }, index) => (
            <motion.article
              key={title}
              onHoverStart={() => setHovered(index)}
              onHoverEnd={() => setHovered(null)}
              animate={{ opacity: hovered === null || hovered === index ? 1 : 0.72 }}
              whileHover={reduceMotion ? undefined : { y: -6, scale: 1.015 }}
              transition={motionTokens.spring.ui}
              className={`rounded-3xl border p-7 ${
                accent ? "border-brand/20 bg-accent-soft" : "border-border bg-white"
              }`}
            >
              <Icon className={`size-7 ${accent ? "text-accent" : "text-brand"}`} aria-hidden="true" />
              <h3 className="mt-6 text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-ink-muted">{description}</p>
              <Link
                href={href}
                {...intentProps(intent)}
                className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-brand"
              >
                {label} <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
