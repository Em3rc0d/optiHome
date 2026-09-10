import Image from "next/image";
import Link from "next/link";
import { Camera, ShieldCheck } from "lucide-react";
import { intentProps } from "@/lib/analytics-events";

export function TryOnFeature() {
  return (
    <section aria-labelledby="tryon-home-title" className="bg-white">
      <div className="content-shell section-pad grid items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-surface-soft">
          <Image src="/glasses-overlay.png" alt="Referencia visual de una montura para prueba virtual" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain p-10" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Prueba virtual</p>
          <h2 id="tryon-home-title" className="mt-3 text-3xl font-semibold md:text-5xl">
            Tecnología útil solo cuando mejora una decisión.
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink-muted">
            La prueba virtual sirve para orientar estilo y proporción. No reemplaza una evaluación profesional ni confirma disponibilidad de la montura.
          </p>
          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-accent-soft p-4">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
            <p className="text-sm leading-6 text-ink-muted">
              La cámara se solicita únicamente después de una acción explícita del usuario.
            </p>
          </div>
          <Link href="/products#prueba-virtual" {...intentProps("cta_path_virtual_try_on")} className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-strong">
            <Camera className="size-5" aria-hidden="true" />
            Abrir prueba virtual
          </Link>
        </div>
      </div>
    </section>
  );
}
