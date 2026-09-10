"use client";

import { Eye, Glasses, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Evaluación visual coordinada",
    description:
      "La persona puede iniciar una solicitud desde la web y continuar la coordinación de una evaluación a domicilio según disponibilidad.",
    icon: Eye,
  },
  {
    title: "Exploración de monturas",
    description:
      "La colección sirve para descubrir estilos y llegar a la conversación con preferencias más claras sobre forma, material y apariencia.",
    icon: Glasses,
  },
  {
    title: "Acompañamiento en la elección",
    description:
      "OptiHome busca conectar la evaluación, la selección de monturas y la continuidad de la atención en un mismo recorrido comprensible.",
    icon: UserCheck,
  },
];

export default function Services() {
  return (
    <section id="servicios" className="border-y border-border bg-surface-soft px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Qué reúne OptiHome</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-5xl">
            Un recorrido digital alrededor de una necesidad real.
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink-muted">
            La web no promete resolver todo por sí sola: organiza los pasos para que la persona entienda qué puede hacer y cómo continuar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map(({ title, description, icon: Icon }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
              className="rounded-2xl border border-border bg-white p-7"
            >
              <div className="mb-5 grid size-12 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon className="size-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-3 leading-7 text-ink-muted">{description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
