"use client";
import React, { useRef } from "react";
import { Lightbulb, MessageCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import { FeaturesSection } from "./components/landing/FeaturesSection";
import { ProcessSection } from "./components/landing/ProcessSection";
import { ProductShowcase } from "./components/landing/ProductShowcase";
import Services from "./services/page";
import { HeroSection } from "./components/landing/HeroSection";
import TestimonialsCarousel from "./testimonials/page";
import AboutUsSection from "./us/page";
import { FaqSection } from "./components/landing/FaqSection";

export default function Home() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  return (
    <main className="font-sans">
      {/* HERO */}
      <HeroSection />
      
      {/* BENEFICIOS / POR QUE NOSOTROS */}
      <FeaturesSection />

      {/* SERVICIOS INTEGRADOS */}
      <Services />

      {/* PRODUCTOS DESTACADOS */}
      <ProductShowcase />

      {/* PROCESO */}
      <ProcessSection />

      {/* CONSEJOS */}
      <section className="bg-white py-24 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center p-12 rounded-[4rem] bg-gradient-to-br from-green-50 to-blue-50 border border-white shadow-2xl">
          <Lightbulb className="w-16 h-16 text-yellow-500 mb-6" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">
            Consejos para tu <br /> <span className="text-green-600">salud visual</span>
          </h2>

          <Carousel
            className="w-full"
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
                  <p className="text-gray-800 text-xl font-medium leading-relaxed italic">
                    &ldquo;{tip}&rdquo;
                  </p>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* NOSOTROS */}
      <AboutUsSection />

      {/* TESTIMONIOS */}
      <TestimonialsCarousel />

      {/* FAQ */}
      <FaqSection />

      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">¿Listo para ver mejor?</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-full text-xl font-bold transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto">
          <MessageCircle className="w-6 h-6" />
          Agendar mi examen gratuito
        </button>
      </div>
    </main>
  );
}
