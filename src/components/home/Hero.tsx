import Link from "next/link";
import { ArrowRight, Heart, Home, ShieldCheck, Sparkles } from "lucide-react";
import { HeroExperience } from "@/components/home/HeroExperience";
import { Reveal } from "@/components/motion/Reveal";
import { intentProps } from "@/lib/analytics-events";

const benefits = [
  {
    label: "En la comodidad de tu hogar",
    Icon: Home,
  },
  {
    label: "Atención coordinada contigo",
    Icon: ShieldCheck,
  },
  {
    label: "Visión para lo que importa",
    Icon: Heart,
  },
] as const;

export function Hero() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="content-shell grid items-center gap-8 py-8 sm:py-10 lg:min-h-[680px] lg:grid-cols-[.86fr_1.14fr] lg:gap-10 lg:py-10 xl:min-h-[720px]">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-brand-strong">
            <Home className="size-4" aria-hidden="true" />
            Óptica a domicilio
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.03] text-ink sm:text-5xl lg:text-[3.65rem] xl:text-[4rem]">
            Cuida tu visión. Encuentra tus próximos lentes desde casa.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">
            Explora monturas, pruébate estilos virtualmente y coordina una evaluación óptica a domicilio sin perder el control del proceso.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-semibold text-brand transition-colors hover:text-brand-strong"
          >
            <Sparkles className="size-4" aria-hidden="true" />
            Probar una montura virtualmente
          </Link>

          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-5 sm:gap-4">
            {benefits.map(({ label, Icon }) => (
              <div key={label} className="flex min-w-0 items-start gap-2 sm:gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-soft text-brand sm:size-10">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <p className="text-xs font-medium leading-5 text-ink-muted sm:text-sm">{label}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs leading-5 text-ink-muted sm:text-sm">
            Explora → Pruébate → Coordina. Tú decides cuándo avanzar.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <HeroExperience />
        </Reveal>
      </div>
    </section>
  );
}
