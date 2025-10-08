"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const AboutUsSection = () => {
  const { scrollY } = useScroll();

  // Efectos sutiles al hacer scroll
  const rotateY = useTransform(scrollY, [0, 300], [0, 15]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.05]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.9]);

  return (
    <section
      id="nosotros"
      className="relative px-6 py-24 md:py-28 bg-gradient-to-b from-white via-green-50 to-blue-50 border-t border-gray-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-16">
        {/* Columna de texto */}
        <motion.div
          className="text-center md:text-left md:w-1/2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Cuidamos tu visión, estés donde estés
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            En <strong className="text-green-600">DaVision</strong> creemos que
            ver bien no debería requerir desplazamientos. Llevamos a tu hogar
            tecnología óptica avanzada y atención profesional con{" "}
            <span className="text-blue-700 font-semibold">
              precisión, confianza y cercanía.
            </span>
          </p>

          <p className="text-gray-700 text-lg leading-relaxed">
            Nuestro equipo está comprometido con brindar una experiencia cómoda
            y personalizada — desde la medición visual hasta la entrega de tus
            lentes — para que{" "}
            <span className="text-blue-700 font-semibold">
              disfrutes de una visión nítida sin complicaciones.
            </span>
          </p>
        </motion.div>

        {/* Columna de imagen con efecto 3D */}
        <motion.div
          className="md:w-1/2 w-full flex justify-center relative"
          style={{ rotateY, scale, opacity, transformPerspective: 1000 }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          <div className="relative">
            <Image
              src="/davision.webp"
              alt="Especialista óptico de DaVision realizando examen visual"
              width={340}
              height={340}
              className="rounded-3xl shadow-xl object-cover border-4 border-white bg-white z-20"
              priority
            />

            {/* Glow decorativo */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-400/40 rounded-full blur-2xl" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-300/30 rounded-full blur-2xl" />
          </div>
        </motion.div>
      </div>

      {/* Elementos de fondo decorativos */}
      <motion.div
        className="absolute -bottom-10 -right-10 w-64 h-64 bg-green-300/30 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="absolute top-0 left-0 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
    </section>
  );
};

export default AboutUsSection;
