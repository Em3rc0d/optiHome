import Image from "next/image";
import Link from "next/link";
import { Camera, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { intentProps } from "@/lib/analytics-events";

export function TryOnFeature() {
  return (
    <section aria-labelledby="tryon-home-title" className="bg-white">
      <div className="content-shell section-pad grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-[radial-gradient(circle_at_50%_46%,rgba(233,246,241,.96),white_70%)]">
            <Image
              src="/frames/urban-acetate.webp"
              alt="Montura Urban Acetate preparada para prueba virtual"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-8 drop-shadow-[0_24px_24px_rgba(16,33,43,.14)] sm:p-12"
            />
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Prueba virtual</p>
          <h2 id="tryon-home-title" className="mt-3 text-3xl font-semibold md:text-5xl">
            Pruébate monturas antes de elegir.
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink-muted">
            Usa la cámara o una foto para comparar formas y proporciones. Es una ayuda visual y no reemplaza una evaluación profesional.
          </p>
          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-accent-soft p-4">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-ink">Tu imagen permanece bajo tu control.</p>
              <p className="mt-1 text-sm leading-6 text-ink-muted">
                El try-on procesa la cámara o foto en tu navegador y solo se activa cuando tú lo decides.
              </p>
            </div>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/products?tryon=1#prueba-virtual"
              {...intentProps("cta_path_virtual_try_on")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-strong"
            >
              <Camera className="size-5" aria-hidden="true" />
              Abrir prueba virtual
            </Link>
            <Link href="/privacy" className="inline-flex min-h-11 items-center justify-center px-2 text-sm font-semibold text-brand hover:text-brand-strong">
              Ver privacidad
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
