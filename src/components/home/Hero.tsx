import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home, Sparkles } from "lucide-react";
import { intentProps } from "@/lib/analytics-events";

export function Hero() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="content-shell grid min-h-[calc(100svh-4rem)] items-center gap-12 py-12 lg:grid-cols-[1.05fr_.95fr] lg:py-16">
        <div className="hero-copy-enter">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-brand-strong">
            <Home className="size-4" aria-hidden="true" />
            Óptica a domicilio
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
            Cuida tu visión y encuentra tus próximos lentes desde casa.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-muted">
            OptiHome conecta evaluación visual, exploración de monturas y herramientas digitales en un recorrido claro, sin convertir una solicitud en una cita hasta confirmar capacidad.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#solicitar-evaluacion"
              {...intentProps("cta_hero_request_evaluation")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-strong motion-safe:active:scale-[0.99]"
            >
              Solicitar evaluación
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/products"
              {...intentProps("cta_hero_explore_frames")}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-white px-6 py-3 font-semibold text-ink transition-[border-color,color,transform] duration-200 hover:border-brand hover:text-brand motion-safe:active:scale-[0.99]"
            >
              Explorar monturas
            </Link>
          </div>

          <Link
            href="/products#prueba-virtual"
            {...intentProps("cta_path_virtual_try_on")}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-semibold text-brand transition-colors hover:text-brand-strong"
          >
            <Sparkles className="size-4" aria-hidden="true" />
            Probar una montura virtualmente
          </Link>

          <p className="mt-5 max-w-xl text-sm leading-6 text-ink-muted">
            La solicitud inicia la coordinación. La fecha y el horario se confirman después según disponibilidad.
          </p>
        </div>

        <div className="hero-visual-enter relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-surface-soft">
          <Image
            src="/exam-home.png"
            alt="Experiencia de atención óptica a domicilio"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/60 bg-white/90 p-4 backdrop-blur">
            <p className="font-semibold text-ink">Primero entendemos la necesidad.</p>
            <p className="mt-1 text-sm leading-6 text-ink-muted">
              Después coordinamos el siguiente paso sin sobrecargar la agenda.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
