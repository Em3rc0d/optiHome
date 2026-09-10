import Link from "next/link";
import { CheckCircle2, ChevronDown, ShieldCheck } from "lucide-react";

const faqs = [
  {
    question: "¿Enviar un mensaje confirma mi cita?",
    answer: "No. Primero revisamos contigo cobertura, fecha y horario. La cita queda confirmada cuando acordamos esos datos.",
  },
  {
    question: "¿En qué zonas atiende OptiHome?",
    answer: "La cobertura se confirma al coordinar tu solicitud por WhatsApp, antes de acordar una visita.",
  },
  {
    question: "¿La prueba virtual reemplaza una evaluación visual?",
    answer: "No. Sirve para orientarte sobre estilo y proporción; no realiza diagnósticos ni reemplaza una evaluación profesional.",
  },
  {
    question: "¿La disponibilidad de una montura está garantizada?",
    answer: "No. Los modelos te ayudan a explorar estilos; la disponibilidad y las alternativas similares se confirman por WhatsApp.",
  },
] as const;

export function TrustFaq() {
  return (
    <section id="preguntas-frecuentes" aria-labelledby="faq-title" className="border-y border-border bg-surface-soft">
      <div className="content-shell section-pad grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Antes de coordinar</p>
          <h2 id="faq-title" className="mt-3 text-3xl font-semibold md:text-5xl">Atención clara desde el primer contacto.</h2>
          <div className="mt-7 space-y-4">
            {[
              "La cita se confirma contigo antes de la visita.",
              "La cobertura por zona se revisa antes de coordinar.",
              "La prueba virtual es orientativa, no diagnóstica.",
              "La cámara solo se activa cuando tú la autorizas.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                <p className="leading-7 text-ink-muted">{item}</p>
              </div>
            ))}
          </div>
          <Link href="/privacy" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-lg font-semibold text-brand hover:text-brand-strong">
            <ShieldCheck className="size-5" aria-hidden="true" />
            Cómo cuidamos tu privacidad en el try-on
          </Link>
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
