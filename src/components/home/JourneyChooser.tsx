import Link from "next/link";
import { Camera, Eye, Glasses, ArrowUpRight } from "lucide-react";
import { intentProps } from "@/lib/analytics-events";

export function JourneyChooser() {
  return (
    <section aria-labelledby="journey-title" className="border-y border-border bg-surface-soft">
      <div className="content-shell section-pad">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Elige por dónde empezar</p>
          <h2 id="journey-title" className="mt-3 text-3xl font-semibold md:text-5xl">
            Tu siguiente paso depende de lo que necesitas hoy.
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink-muted">
            Puedes coordinar una evaluación, explorar estilos o probarte una montura antes de escribirnos.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <article className="rounded-3xl border border-border bg-white p-7">
            <Eye className="size-7 text-brand" aria-hidden="true" />
            <h3 className="mt-6 text-xl font-semibold">Quiero revisar mi visión</h3>
            <p className="mt-3 leading-7 text-ink-muted">Conoce cómo coordinamos una evaluación óptica a domicilio.</p>
            <Link href="/#proceso" {...intentProps("cta_path_evaluation")} className="mt-6 inline-flex items-center gap-2 font-semibold text-brand">
              Ver cómo funciona <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </article>

          <article className="rounded-3xl border border-border bg-white p-7">
            <Glasses className="size-7 text-brand" aria-hidden="true" />
            <h3 className="mt-6 text-xl font-semibold">Quiero encontrar una montura</h3>
            <p className="mt-3 leading-7 text-ink-muted">Compara formas, materiales y estilos antes de consultar disponibilidad.</p>
            <Link href="/products" {...intentProps("cta_path_frames")} className="mt-6 inline-flex items-center gap-2 font-semibold text-brand">
              Explorar monturas <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </article>

          <article className="rounded-3xl border border-brand/20 bg-accent-soft p-7">
            <Camera className="size-7 text-accent" aria-hidden="true" />
            <h3 className="mt-6 text-xl font-semibold">Quiero ver cómo me queda</h3>
            <p className="mt-3 leading-7 text-ink-muted">Pruébate cualquiera de las monturas con cámara o con una foto.</p>
            <Link href="/products?tryon=1#prueba-virtual" {...intentProps("cta_path_virtual_try_on")} className="mt-6 inline-flex items-center gap-2 font-semibold text-brand">
              Abrir prueba virtual <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
