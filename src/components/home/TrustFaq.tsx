import { CheckCircle2, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "¿Enviar una solicitud confirma mi cita?",
    answer: "No. La solicitud inicia la coordinación. La fecha y el horario se confirman después de revisar la capacidad disponible.",
  },
  {
    question: "¿Puedo explorar monturas antes de coordinar una visita?",
    answer: "Sí. El catálogo sirve como referencia para descubrir estilos y preparar mejor la conversación posterior.",
  },
  {
    question: "¿La prueba virtual reemplaza una evaluación visual?",
    answer: "No. Es una herramienta de orientación estética y no realiza diagnósticos ni reemplaza una evaluación profesional.",
  },
  {
    question: "¿Los precios y la disponibilidad del catálogo son definitivos?",
    answer: "No en este caso de estudio. Las referencias visuales están marcadas como contenido demo y no se presentan como inventario comercial real.",
  },
] as const;

export function TrustFaq() {
  return (
    <section id="preguntas-frecuentes" aria-labelledby="faq-title" className="border-y border-border bg-surface-soft">
      <div className="content-shell section-pad grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Confianza antes que promesas</p>
          <h2 id="faq-title" className="mt-3 text-3xl font-semibold md:text-5xl">Lo que la web dice debe poder sostenerse.</h2>
          <div className="mt-7 space-y-4">
            {[
              "Sin testimonios inventados.",
              "Sin disponibilidad o SLA ficticios.",
              "Sin convertir una solicitud en una cita.",
              "Sin presentar datos demo como inventario real.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                <p className="leading-7 text-ink-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-border bg-white p-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 font-semibold text-ink">
                {faq.question}
                <ChevronDown className="size-5 shrink-0 text-ink-muted transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="px-6 pb-6 leading-7 text-ink-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
