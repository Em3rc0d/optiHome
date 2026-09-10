"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Envía tu solicitud",
    description: "Cuéntanos qué necesitas y comparte los datos mínimos para continuar la coordinación.",
  },
  {
    number: "02",
    title: "Revisamos disponibilidad",
    description: "La solicitud se contrasta con la capacidad operativa antes de ofrecer una fecha y horario.",
  },
  {
    number: "03",
    title: "Confirmamos la visita",
    description: "Cuando ambas partes acuerdan el horario, la solicitud pasa a ser una cita confirmada.",
  },
  {
    number: "04",
    title: "Continúa tu experiencia",
    description: "La atención y la selección de monturas continúan según la necesidad acordada en la coordinación.",
  },
];

export const ProcessSection = () => {
  return (
    <section id="proceso" className="overflow-hidden bg-surface-soft px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Cómo funciona</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-5xl">
            Solicitar no es lo mismo que confirmar.
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink-muted">
            El flujo separa intención, capacidad y confirmación para mantener una experiencia clara y una agenda controlable.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
              className="border-t border-border pt-6"
            >
              <span className="text-sm font-semibold text-brand">{step.number}</span>
              <h3 className="mt-3 text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-3 leading-7 text-ink-muted">{step.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
