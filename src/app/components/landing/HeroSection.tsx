"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";
import ContactFormModal from "@/app/finalCTA/ContactFormModal";

const images = [
  "/exam-home.png",
  "/family1.webp",
  "/products-hero.png",
  "/family2.webp",
  "/family5.webp",
];

export const HeroSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (openModal) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [openModal]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const preloadNext = new window.Image();
      preloadNext.src = images[(index + 1) % images.length];
    }
  }, [index]);

  return (
    <>
      <section className="relative min-h-[85vh] flex flex-col-reverse md:flex-row items-center justify-between gap-12 py-12 px-6 md:px-12 bg-white overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent -z-10"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50 -z-10"></div>

        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4" />
            La óptica que va hacia ti
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1]">
            Tu visión perfecta, <br />
            <span className="text-gradient">sin salir de casa.</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
            Llevamos la clínica a tu sala. Exámenes visuales gratuitos, 
            monturas de tendencia y asesoría experta a domicilio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-5 px-10 rounded-full shadow-2xl hover:shadow-green-200 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 text-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Agendar examen gratuito
            </button>
            <button className="flex items-center justify-center gap-3 bg-white border-2 border-gray-100 hover:border-blue-600 hover:text-blue-600 text-gray-700 font-bold py-5 px-10 rounded-full transition-all duration-300 text-lg">
              Ver colección
            </button>
          </div>

          <div className="flex items-center gap-6 pt-8 border-t border-gray-100">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-sm">
                  <Image src={`/family${i === 3 ? 1 : i === 4 ? 2 : i}.webp`} alt="User" width={48} height={48} className="object-cover" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">+500 familias</p>
              <p className="text-xs text-gray-500">confían en nuestra visión</p>
            </div>
          </div>
        </motion.div>

        {/* Imagen con composición visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full md:w-[45%] aspect-square"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-green-500 rounded-[3rem] rotate-3 opacity-10"></div>
          
          <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
            <AnimatePresence mode="wait">
              <motion.div
                key={images[index]}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[index]}
                  alt="Servicio Óptico"
                  fill
                  className="object-cover transition-transform duration-[5s] group-hover:scale-110"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Floatings */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 left-8 glass px-5 py-3 rounded-2xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                ✓
              </div>
              <p className="text-sm font-bold text-gray-900">Atención Hoy</p>
            </motion.div>
          </div>
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
