import Link from "next/link";
import { ArrowRight, Home, Sparkles } from "lucide-react";
import { HeroExperience } from "@/components/home/HeroExperience";
import { Reveal } from "@/components/motion/Reveal";
import { intentProps } from "@/lib/analytics-events";

export function Hero() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="content-shell grid min-h-[calc(100svh-4rem)] items-center gap-12 py-12 lg:grid-cols-[1.02fr_.98fr] lg:py-16">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-brand-strong">
            <Home className="size-4" aria-hidden="true" />
            Óptica a domicilio
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.04] text-ink sm:text-5xl lg:text-6xl">
            Cuida tu visión. Encuentra tus próximos lentes desde casa.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-muted">
            Explora monturas, pruébate estilos virtualmente y coordina una evaluación óptica a domicilio sin perder el control del proceso.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#solicitar-evaluacion"
              {...intentProps("cta_hero_request_evaluation")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-strong motion-safe:active:scale-[0.99]"
            >
              Coordinar evaluación
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
            href="/products?tryon=1#prueba-virtual"
            {...intentProps("cta_path_virtual_try_on")}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-semibold text-brand transition-colors hover:text-brand-strong"
          >
            <Sparkles className="size-4" aria-hidden="true" />
            Probar una montura virtualmente
          </Link>

          <p className="mt-5 max-w-xl text-sm leading-6 text-ink-muted">
            Explora → Pruébate → Coordina. La animación acompaña el recorrido; nunca bloquea tu navegación.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <HeroExperience />
        </Reveal>
      </div>
    </section>
  );
}
