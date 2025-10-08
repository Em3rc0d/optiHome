"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import ContactFormModal from "@/app/finalCTA/ContactFormModal";

export const HeroSection = () => {
  const [openModal, setOpenModal] = useState(false);

  // --- Imágenes en formato webp para optimizar ---
  const images = [
    "/family1.webp",
    "/family2.webp",
    "/family4.webp",
    "/family5.webp",
  ];
  const [index, setIndex] = useState(0);

  // --- Cambio automático cada 4 segundos ---
  useEffect(() => {
    if (openModal) return; // pausa el cambio automático
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [openModal, images.length]);

  // --- Precarga de imágenes siguientes ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const preloadNext = new window.Image();
      preloadNext.src = images[(index + 1) % images.length];
    }
  }, [index]);

  return (
    <>
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-12 px-4 sm:px-6 md:px-12 bg-gradient-to-r from-blue-50 via-white to-green-50 rounded-b-3xl overflow-hidden">
        {/* Texto a la izquierda */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Tu visión, <br />
            <span className="text-green-600">sin salir de casa.</span>
          </h1>
          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            Exámenes visuales a domicilio, lentes recetados y asesoría
            personalizada.
          </p>

          <button
            onClick={() => setOpenModal(true)}
            className="mt-8 flex items-center justify-center md:justify-start gap-2 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Agendar cita por WhatsApp
          </button>
        </motion.div>

        {/* Imagen a la derecha */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative w-full sm:w-[280px] md:w-[340px] lg:w-[380px] aspect-square flex-shrink-0"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={images[index]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={images[index]}
                alt="Familia feliz con lentes"
                fill
                className="rounded-2xl shadow-xl object-cover"
                sizes="(max-width: 768px) 100vw, 380px"
                priority={index === 0} // la primera imagen carga con prioridad
                loading={index === 0 ? "eager" : "lazy"} // resto carga en diferido
                quality={75} // reduce peso sin perder detalle
              />
            </motion.div>
          </AnimatePresence>

          {/* Cartel verde, siempre visible y responsive */}
          <motion.div
            className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-green-600/90 backdrop-blur-sm text-white px-2.5 py-1 sm:px-4 sm:py-2 rounded-lg shadow-lg text-[11px] sm:text-sm font-semibold tracking-tight"
            animate={{
              rotate: [0, 0.5, -0.5, 0.5, 0], // tambaleo más sutil
              y: [0, -1, 1, -1, 0], // leve movimiento vertical opcional
            }}
            transition={{
              duration: 2, // más suave y lento
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            👁️ Examen visual gratuito
          </motion.div>
        </motion.div>
      </section>

      {openModal && (
        <ContactFormModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
};
