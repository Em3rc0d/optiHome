"use client";

import { motion } from "framer-motion";
import { CalendarCheck2, Glasses, House, MessageCircleMore } from "lucide-react";

const features = [
  {
    title: "Atención desde casa",
    description:
      "La experiencia está pensada para coordinar atención óptica sin convertir cada consulta en una visita inmediata o desordenada.",
    icon: House,
  },
  {
    title: "Monturas para explorar",
    description:
      "Revisa estilos y opciones antes de continuar la conversación sobre qué alternativa encaja mejor contigo.",
    icon: Glasses,
  },
  {
    title: "Disponibilidad controlada",
    description:
      "Cada solicitud debe revisarse contra la capacidad disponible antes de convertirla en una cita confirmada.",
    icon: CalendarCheck2,
  },
  {
    title: "Continuidad por WhatsApp",
    description:
      "WhatsApp sirve para coordinar y confirmar, mientras el sistema evoluciona hacia una agenda operativa como fuente de verdad.",
    icon: MessageCircleMore,
  },
];

export const FeaturesSection = () => {
  return (
    <section className="bg-white px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold uppercase tracking-[0.16em] text-brand"
          >
            Una experiencia más clara
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-3 text-3xl font-semibold text-ink md:text-5xl"
          >
            Menos fricción para la persona y más control para la operación.
          </motion.h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">
            OptiHome organiza el recorrido para que descubrir, solicitar y coordinar sean pasos distintos y comprensibles.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <div className="mb-5 grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-ink">{feature.title}</h3>
                <p className="mt-3 leading-7 text-ink-muted">{feature.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
