"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Cuéntanos qué necesitas",
    description: "Escríbenos por WhatsApp y dinos qué tipo de atención o montura estás buscando.",
  },
  {
    number: "02",
    title: "Revisamos disponibilidad",
    description: "Confirmamos contigo la cobertura de tu zona y las opciones de fecha y horario.",
  },
  {
    number: "03",
    title: "Coordinamos la visita",
    description: "Cuando acordamos fecha y horario, tu evaluación queda confirmada.",
  },
  {
    number: "04",
    title: "Recibe atención en casa",
    description: "Continuamos con la evaluación y la selección de monturas según lo coordinado.",
  },
] as const;

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 35%"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} id="proceso" aria-labelledby="process-title" className="bg-white">
      <div className="content-shell section-pad">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Cómo funciona</p>
          <h2 id="process-title" className="mt-3 text-3xl font-semibold md:text-5xl">
            De tu mensaje a una visita coordinada.
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink-muted">
            Un proceso simple para que sepas qué sigue en cada momento.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border md:hidden" aria-hidden="true">
            <motion.div
              className="h-full w-full origin-top bg-brand"
              style={reduceMotion ? { scaleY: 1 } : { scaleY: progress }}
            />
          </div>

          <div className="absolute left-[12.5%] right-[12.5%] top-[15px] hidden h-px bg-border md:block" aria-hidden="true">
            <motion.div
              className="h-full w-full origin-left bg-brand"
              style={reduceMotion ? { scaleX: 1 } : { scaleX: progress }}
            />
          </div>

          <ol className="grid gap-8 md:grid-cols-4 md:gap-5">
            {steps.map((step, index) => (
              <motion.li
                key={step.number}
                initial={reduceMotion ? false : { opacity: 0.45, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.65 }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className="relative pl-12 md:pl-0 md:pt-12"
              >
                <span className="absolute left-0 top-0 z-10 grid size-[30px] place-items-center rounded-full border border-brand/30 bg-white text-[10px] font-bold text-brand md:left-1/2 md:-translate-x-1/2">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold md:text-center">{step.title}</h3>
                <p className="mt-3 leading-7 text-ink-muted md:text-center">{step.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
