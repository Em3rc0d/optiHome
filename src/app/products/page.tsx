import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FrameCatalog } from "@/components/catalog/FrameCatalog";
import { frames } from "@/content/frames";

export const metadata: Metadata = {
  title: "Monturas y prueba virtual",
  description:
    "Explora monturas, compara estilos y pruébatelas virtualmente con cámara o foto antes de consultar disponibilidad.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-border bg-surface-soft">
        <div className="content-shell section-pad">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Volver al inicio
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-brand">Monturas</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Encuentra una montura que vaya contigo.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">
            Explora estilos, compara formas y prueba cualquier montura virtualmente. La disponibilidad se confirma al contactarnos.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="content-shell section-pad">
          <div id="prueba-virtual" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold">Explora y pruébate monturas</h2>
            <p className="mt-2 max-w-2xl leading-7 text-ink-muted">
              Selecciona un modelo para verlo en detalle. Puedes probarlo con cámara o foto antes de consultar disponibilidad.
            </p>
          </div>
          <div className="mt-8">
            <FrameCatalog frames={frames} />
          </div>
        </div>
      </section>
    </>
  );
}
