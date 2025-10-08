"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import ContactFormModal from "@/app/finalCTA/ContactFormModal";
export const HeroSection = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-16 px-6 md:px-12 bg-gradient-to-r from-blue-50 via-white to-green-50 rounded-b-3xl">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Tu visión, <br />
            <span className="text-green-600">sin salir de casa.</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Exámenes visuales a domicilio, lentes recetados y asesoría
            personalizada.
          </p>

          <button
            onClick={() => setOpenModal(true)}
            className="mt-8 flex items-center gap-2 mx-auto md:mx-0 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Agendar cita por WhatsApp
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <Image
            src="/modelo.png"
            alt="Mujer con lentes"
            width={360}
            height={360}
            className="rounded-2xl shadow-xl"
          />
          <div className="absolute -bottom-5 -left-5 bg-green-500 text-white px-4 py-2 rounded-xl shadow-md text-sm font-medium">
            Examen visual gratuito 👁️
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
