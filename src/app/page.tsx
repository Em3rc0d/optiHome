import { MessageCircle } from "lucide-react";
import { FeaturesSection } from "./components/landing/FeaturesSection";
import { ProcessSection } from "./components/landing/ProcessSection";
import { ProductShowcase } from "./components/landing/ProductShowcase";
import Services from "./services/page";
import { HeroSection } from "./components/landing/HeroSection";
import { FaqSection } from "./components/landing/FaqSection";
import { buildWhatsappUrl, siteConfig } from "@/content/site";
import { intentProps } from "@/lib/analytics-events";

export default function Home() {
  const whatsappHref = buildWhatsappUrl(
    "Hola, quiero solicitar una evaluación con OptiHome. ¿Podemos revisar disponibilidad de fecha y horario?"
  );

  return (
    <div className="font-sans">
      <HeroSection />
      <FeaturesSection />
      <Services />
      <ProductShowcase />
      <ProcessSection />
      <FaqSection />

      <section
        id="solicitar-evaluacion"
        className="border-t border-border bg-surface-soft px-6 py-20 text-center md:px-12"
      >
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand">
            Siguiente paso
          </p>
          <h2 className="text-3xl font-semibold text-ink md:text-4xl">
            Cuéntanos qué necesitas y revisamos disponibilidad contigo.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-ink-muted md:text-lg">
            En esta etapa la coordinación continúa por WhatsApp. Enviar el mensaje inicia una solicitud;
            la fecha y el horario se confirman después según capacidad disponible.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            {...intentProps("cta_final_request_evaluation")}
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-brand px-7 py-3 font-semibold text-white transition-colors hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Continuar por WhatsApp
          </a>
          <p className="mt-4 text-sm text-ink-muted">{siteConfig.appointment.availabilityNotice}</p>
        </div>
      </section>
    </div>
  );
}
