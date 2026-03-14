"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Heart, MapPin } from "lucide-react";

const features = [
  {
    title: "100% a Domicilio",
    description: "Olvídate del tráfico. Vamos a tu casa u oficina con todo el equipo profesional.",
    icon: MapPin,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Calidad Garantizada",
    description: "Lentes de alta gama y exámenes precisos con tecnología de última generación.",
    icon: ShieldCheck,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Rapidez",
    description: "Agendas hoy y te visitamos en menos de 48 horas. Sin esperas largas.",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Atención Humana",
    description: "Especialistas que te escuchan y te asesoran según tus necesidades reales.",
    icon: Heart,
    color: "bg-red-100 text-red-600",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4"
          >
            La nueva forma de cuidar <br />
            <span className="text-green-600">tu salud visual</span>
          </motion.h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Combinamos la precisión de una clínica tradicional con la comodidad de tu hogar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-8 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
