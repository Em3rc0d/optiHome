import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FrameCatalog } from "@/components/catalog/FrameCatalog";
import { frames } from "@/content/frames";

export const metadata: Metadata = {
  title: "Monturas y prueba virtual",
  description:
    "Explora referencias de monturas y abre la prueba virtual de OptiHome bajo tu propia intención.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-border bg-surface-soft">
        <div className="content-shell section-pad">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Volver al inicio
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-brand">Catálogo demostrativo</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Descubre estilos antes de continuar la conversación.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">
            Las referencias de este caso de estudio no se presentan como inventario, precio o disponibilidad comercial real.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="content-shell section-pad">
          <div id="prueba-virtual" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold">Monturas de referencia</h2>
            <p className="mt-2 max-w-2xl leading-7 text-ink-muted">
              Las monturas compatibles muestran una acción de prueba virtual. La cámara solo se solicita después de pulsarla.
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
