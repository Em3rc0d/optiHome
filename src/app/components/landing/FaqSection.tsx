"use client";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "¿Tiene costo el examen visual a domicilio?",
    answer: "No, el examen visual es completamente gratuito como parte de nuestro servicio integral.",
  },
  {
    question: "¿Qué equipos utilizan?",
    answer: "Utilizamos equipos portátiles de alta precisión (autorefractómetros y lensómetros) iguales a los de una clínica tradicional.",
  },
  {
    question: "¿Puedo probarme los marcos?",
    answer: "¡Sí! Llevamos una maleta con más de 50 modelos de marcos para que elijas el que mejor te queda.",
  },
  {
    question: "¿Cuánto demoran en entregar los lentes?",
    answer: "El tiempo promedio de entrega es de 3 a 5 días hábiles, directamente en tu puerta.",
  },
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 md:px-12 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Preguntas <span className="text-blue-600">Frecuentes</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Resolvemos tus dudas para que agendes con total confianza.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-bold text-gray-900">{faq.question}</span>
                {openIndex === index ? <Minus className="text-blue-600" /> : <Plus className="text-gray-400" />}
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="px-6 pb-6 text-gray-600 leading-relaxed"
                >
                  {faq.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
