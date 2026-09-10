"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/content/site";

const faqs = [
  {
    question: "¿Enviar una solicitud confirma mi cita?",
    answer:
      "No. La solicitud inicia la coordinación. La fecha y el horario quedan confirmados solo después de revisar disponibilidad.",
  },
  {
    question: "¿Puedo explorar monturas antes de coordinar una visita?",
    answer:
      "Sí. Puedes revisar la colección disponible en la experiencia web y usarla como referencia para conversar sobre tus preferencias.",
  },
  {
    question: "¿Cómo funciona la prueba virtual?",
    answer:
      "La prueba virtual utiliza la cámara o una foto para ayudarte a visualizar una montura. Es una herramienta de exploración y no sustituye una evaluación profesional ni confirma medidas ópticas.",
  },
  {
    question: "¿Cómo se coordina la atención a domicilio?",
    answer:
      "Primero envías tu solicitud. Luego OptiHome revisa capacidad y continúa la coordinación por WhatsApp antes de confirmar una visita.",
  },
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="preguntas-frecuentes" className="bg-surface-soft px-6 py-24 md:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-semibold text-ink md:text-5xl">Preguntas frecuentes</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-ink-muted">
            Información clara sobre el flujo actual de OptiHome, sin asumir una cita antes de confirmar capacidad.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-button-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div key={faq.question} className="overflow-hidden rounded-2xl border border-border bg-white">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 p-6 text-left text-ink transition-colors hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-inset"
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  {isOpen ? (
                    <Minus className="size-5 shrink-0 text-brand" aria-hidden="true" />
                  ) : (
                    <Plus className="size-5 shrink-0 text-ink-muted" aria-hidden="true" />
                  )}
                </button>

                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-6 pb-6 leading-7 text-ink-muted"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-sm text-ink-muted">
          {siteConfig.appointment.availabilityNotice}
        </p>
      </div>
    </section>
  );
};
