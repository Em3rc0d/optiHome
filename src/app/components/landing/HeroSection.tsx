"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";
import ContactFormModal from "@/app/finalCTA/ContactFormModal";
import { intentProps } from "@/lib/analytics-events";

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

    const interval = window.setInterval(() => {
      setIndex((previous) => (previous + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [openModal]);

  return (
    <>
      <section className="relative overflow-hidden bg-white px-6 py-12 md:px-12 lg:py-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-12 md:flex-row md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full space-y-7 md:w-1/2"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-brand-strong">
              <Sparkles className="size-4" aria-hidden="true" />
              Óptica a domicilio
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
              Cuida tu visión y encuentra tus próximos lentes desde casa.
            </h1>

            <p className="max-w-xl text-lg leading-8 text-ink-muted">
              OptiHome reúne atención óptica a domicilio, exploración de monturas y herramientas digitales
              para ayudarte a continuar tu proceso con mayor claridad.
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="button"
                onClick={() => setOpenModal(true)}
                {...intentProps("cta_hero_request_evaluation")}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-brand px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                Solicitar evaluación
              </button>

              <Link
                href="/#productos"
                {...intentProps("cta_hero_explore_frames")}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-white px-6 py-3 font-semibold text-ink transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
              >
                Explorar monturas
              </Link>
            </div>

            <p className="max-w-xl text-sm leading-6 text-ink-muted">
              La solicitud no reserva un cupo automáticamente. La disponibilidad se confirma antes de agendar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square w-full max-w-xl md:w-[45%]"
          >
            <div className="absolute inset-3 rounded-[1.5rem] bg-accent-soft" aria-hidden="true" />
            <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] border border-border bg-surface shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={images[index]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[index]}
                    alt="Experiencia óptica y selección de monturas en casa"
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(min-width: 768px) 45vw, 100vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {openModal && (
        <ContactFormModal isOpen={openModal} onClose={() => setOpenModal(false)} />
      )}
    </>
  );
};
