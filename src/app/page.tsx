"use client";
import { Calendar, Eye, Lightbulb, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import ContactFormModal from "./finalCTA/ContactFormModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import TestimonialsCarousel from "./testimonials/page";
import { HeroSection } from "./components/landing/HeroSection";

export default function Home() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  return (
    <main className="font-sans max-w-7xl mx-auto">
      {/* HERO */}
      <HeroSection />
      {/* CONSEJOS */}
      <section className="bg-white shadow-sm rounded-3xl py-16 px-6 md:px-12 mt-16 text-center border border-gray-100">
        <div className="flex flex-col items-center">
          <Lightbulb className="w-12 h-12 text-yellow-500 mb-3" />
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            Consejos para mantener tu salud visual
          </h2>

          <Carousel
            className="w-full max-w-2xl"
            plugins={[autoplay.current]}
            opts={{ loop: true }}
          >
            <CarouselContent>
              {[
                "👀 Descansa tus ojos cada 20 minutos al usar pantallas.",
                "🌿 Asegura buena iluminación al leer o estudiar.",
                "🥕 Consume alimentos ricos en vitamina A como zanahorias.",
                "🚶‍♂️ Enfoca objetos lejanos para relajar tus ojos.",
                "💧 Mantén tus ojos hidratados y evita la resequedad.",
                "🕶️ Usa lentes con filtro UV para protegerte del sol.",
              ].map((tip, i) => (
                <CarouselItem key={i}>
                  <p className="text-gray-700 text-lg font-medium">{tip}</p>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
      <TestimonialsCarousel />
      {/* MODAL DE CONTACTO */}
    </main>
  );
}
