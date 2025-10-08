"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Ana G.",
    text: "El servicio fue excelente. Me realizaron una evaluación completa con equipos modernos y pude confirmar mis medidas sin complicaciones.",
  },
  {
    name: "Carlos M.",
    text: "Los optómetras fueron muy profesionales y claros en sus explicaciones. Sentí total confianza durante la medición.",
  },
  {
    name: "Lucía R.",
    text: "Solicité la atención a domicilio y llegaron puntuales con todo el equipo. Muy recomendable por la comodidad y el trato.",
  },
  {
    name: "Pedro L.",
    text: "Me trajeron varios modelos de monturas para probar en casa, y la medición fue precisa. Excelente atención personalizada.",
  },
  {
    name: "María P.",
    text: "Tenía molestias visuales y con la revisión de DaVision encontré mi medida correcta. Luego validé el resultado y coincidió perfectamente.",
  },
  {
    name: "Jorge C.",
    text: "Me ayudaron a ajustar mis lentes sin costo adicional. Se nota la dedicación y el compromiso del equipo.",
  },
  {
    name: "Sofía T.",
    text: "El optómetra explicó paso a paso todo el proceso y me dejó tranquila al saber que podía convalidar mi medida externamente si lo deseaba.",
  },
  {
    name: "Andrés F.",
    text: "Agendé mi cita por WhatsApp y en menos de 24 horas ya tenía la evaluación lista. Rápido y confiable.",
  },
  {
    name: "Elena M.",
    text: "Los precios son accesibles y los lentes que ofrecen son de muy buena calidad. 100% recomendados.",
  },
  {
    name: "Valeria H.",
    text: "Excelente atención a domicilio. Llegaron con equipos profesionales y la experiencia fue muy agradable.",
  },
];

export const TestimonialsCarousel = () => {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = () =>
    setIndex((prev) => (prev + 1) % testimonials.length);

  const prevTestimonial = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Control del autoplay
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextTestimonial, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Pausar el autoplay y reanudar después de unos segundos
  const pauseAutoplay = () => {
    setIsPaused(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsPaused(false), 5000);
  };

  // Detectar swipe táctil
  const handleTouchStart = (e: React.TouchEvent) => {
    pauseAutoplay();
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const distance = touchStart - touchEnd;
    const swipeThreshold = 75;
    if (distance > swipeThreshold) nextTestimonial(); // izquierda
    if (distance < -swipeThreshold) prevTestimonial(); // derecha
  };

  const handleManualSelect = (i: number) => {
    pauseAutoplay();
    setIndex(i);
  };

  const testimonial = testimonials[index];

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-green-50/40 to-blue-50/40 border-t border-gray-100"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Lo que opinan nuestros clientes
        </h2>
        <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
          En <span className="text-green-600 font-semibold">DaVision</span>{" "}
          trabajamos con optómetras certificados que realizan mediciones
          manuales o con equipos de precisión, siempre con el objetivo de cuidar
          tu visión sin que tengas que salir de casa.
        </p>

        <motion.blockquote
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-white p-10 rounded-2xl shadow-xl border border-blue-100 max-w-3xl mx-auto select-none"
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-green-400 to-blue-500 rounded-l-2xl"></div>

          <p className="text-gray-800 italic mb-6 text-xl leading-relaxed">
            “{testimonial.text}”
          </p>

          <div className="flex justify-center items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center text-blue-800 font-bold shadow-inner">
              {testimonial.name.charAt(0)}
            </div>
            <cite className="text-gray-800 font-semibold not-italic">
              {testimonial.name}
            </cite>
          </div>
        </motion.blockquote>

        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => handleManualSelect(i)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                i === index ? "bg-blue-600 w-4" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
