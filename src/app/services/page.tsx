"use client";
import { Eye, Glasses, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Exámenes Visuales a Domicilio",
    description:
      "Realizamos evaluaciones visuales completas con equipos portátiles de alta precisión. Cuida tu salud visual sin salir de casa.",
    icon: Eye,
    gradient: "from-blue-500 to-green-400",
    color: "text-white",
  },
  {
    title: "Lentes Recetados a Medida",
    description:
      "Encuentra lentes diseñados para ti. Adaptamos cada detalle según tu receta, estilo y necesidades ópticas.",
    icon: Glasses,
    gradient: "from-green-500 to-blue-400",
    color: "text-white",
  },
  {
    title: "Asesoría Visual Personalizada",
    description:
      "Nuestros especialistas te ayudan a elegir el marco ideal según la forma de tu rostro y tus preferencias estéticas.",
    icon: UserCheck,
    gradient: "from-blue-400 to-cyan-400",
    color: "text-white",
  },
];

export default function Services() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-white via-blue-50 to-green-50 overflow-hidden">
      {/* Fondo decorativo suave */}
      <div className="absolute inset-0 opacity-10 bg-[url('/pattern-light.svg')] bg-cover bg-center"></div>

      <div className="relative max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
        >
          Nuestros <span className="text-green-600">Servicios</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-700 max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          <p className="text-gray-700 text-lg leading-relaxed">
            En <strong className="text-green-600">DaVision</strong> creemos que
            la salud visual no debe ser complicada. Por eso llevamos nuestros
            equipos y experiencia directamente a tu hogar, combinando atención
            humana con tecnología moderna.
          </p>
        </motion.div>

        {/* Tarjetas de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map(
            ({ title, description, icon: Icon, gradient, color }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="group relative bg-white border border-gray-200 rounded-3xl p-10 shadow-md hover:shadow-2xl hover:border-blue-300 transition-all duration-300"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${gradient} rounded-t-3xl`}
                ></div>

                <div className="flex justify-center mb-6">
                  <div
                    className={`p-5 rounded-full bg-gradient-to-br ${gradient} bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      className={`w-10 h-10 ${color} group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
