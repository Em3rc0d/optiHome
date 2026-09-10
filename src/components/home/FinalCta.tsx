import { MessageCircle } from "lucide-react";
import { buildWhatsappUrl, siteConfig } from "@/content/site";
import { intentProps } from "@/lib/analytics-events";

export function FinalCta() {
  const whatsappHref = buildWhatsappUrl(
    "Hola, quiero solicitar una evaluación con OptiHome. ¿Podemos revisar disponibilidad de fecha y horario?"
  );

  return (
    <section id="solicitar-evaluacion" className="scroll-mt-24 bg-white">
      <div className="content-shell section-pad">
        <div className="rounded-3xl bg-ink px-6 py-12 text-center sm:px-10 lg:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-soft">
            Siguiente paso
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-semibold text-white md:text-5xl">
            Cuéntanos qué necesitas y revisamos disponibilidad contigo.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
            WhatsApp continúa la conversación. El mensaje inicia una solicitud; la cita existe solo después de confirmar fecha y horario.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            {...intentProps("cta_final_request_evaluation")}
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-white px-7 py-3 font-semibold text-ink transition-[background-color,transform] duration-200 hover:bg-accent-soft motion-safe:active:scale-[0.99]"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Continuar por WhatsApp
          </a>
          <p className="mt-4 text-sm text-white/70">{siteConfig.appointment.availabilityNotice}</p>
        </div>
      </div>
    </section>
  );
}
