import type { Metadata } from "next";
import Link from "next/link";
import { FrameCatalog } from "@/components/catalog/FrameCatalog";
import { WhatsappLink } from "@/components/commerce/WhatsappLink";
import { catalogFrames, catalogNotice } from "@/content/catalog";
const description =
  "Explora estilos de monturas, compara colores y consulta modelos, materiales y precios directamente con Lenteva por WhatsApp.";
export const metadata: Metadata = {
  title: "Monturas para tu día a día",
  description,
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Monturas para tu día a día | Lenteva",
    description,
    url: "/products",
    type: "website",
    locale: "es_PE",
    siteName: "Lenteva",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Monturas para tu día a día | Lenteva",
    description,
    images: ["/opengraph-image"],
  },
};
export default function ProductsPage() {
  return (
    <>
      <section className="content-shell catalog-heading">
        <nav aria-label="Ruta de navegación" className="breadcrumbs">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span>Monturas</span>
        </nav>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Monturas</p>
            <h1>
              Encuentra
              <br />
              <em>tu forma.</em>
            </h1>
          </div>
          <div className="section-intro">
            <p>
              Sutiles, con carácter o de sol.
              <br />
              Un estilo para empezar a elegir.
            </p>
            <p className="reference-note">{catalogNotice}</p>
          </div>
        </div>
      </section>
      <section
        className="content-shell catalog-body"
        aria-label="Catálogo de estilos"
      >
        <FrameCatalog frames={catalogFrames} />
      </section>
      <section className="catalog-help">
        <div className="content-shell">
          <div>
            <p className="eyebrow">Podemos empezar juntos</p>
            <h2>
              ¿Todavía no sabes
              <br />
              <em>cuál elegir?</em>
            </h2>
          </div>
          <WhatsappLink>
            Cuéntanos qué buscas <span aria-hidden="true">↗</span>
          </WhatsappLink>
        </div>
      </section>
    </>
  );
}
