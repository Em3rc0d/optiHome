"use client";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Agenda tu cita",
    description: "Escríbenos por WhatsApp y elige el horario que mejor te convenga.",
  },
  {
    number: "02",
    title: "Te visitamos",
    description: "Llegamos a tu domicilio con equipos portátiles de última generación.",
  },
  {
    number: "03",
    title: "Elige tus marcos",
    description: "Prueba más de 50 modelos diferentes en la comodidad de tu sala.",
  },
  {
    number: "04",
    title: "Recibe tus lentes",
    description: "En pocos días llevamos tus lentes listos y ajustados a tu medida.",
  },
];

export const ProcessSection = () => {
  return (
    <section id="proceso" className="py-24 px-6 md:px-12 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-4">
              ¿Cómo funciona <br /> <span className="text-green-600">DaVision</span>?
            </h2>
            <p className="text-gray-700 text-lg">
              Un proceso simple, transparente y diseñado para tu comodidad.
            </p>
          </div>
          <div className="hidden md:block h-px flex-1 bg-gray-200 mb-6 mx-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Línea decorativa para desktop */}
          <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-full bg-white border-4 border-blue-50 flex items-center justify-center text-3xl font-black text-green-600 mb-6 shadow-lg z-10">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
