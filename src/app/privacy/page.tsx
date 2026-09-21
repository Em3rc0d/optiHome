import type { Metadata } from "next";
import Link from "next/link";
import { WhatsappLink } from "@/components/commerce/WhatsappLink";
export const metadata: Metadata = {
  title: "Privacidad",
  description:
    "Información sobre el uso del sitio web y el contacto por WhatsApp de Lenteva.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};
export default function PrivacyPage() {
  return (
    <section className="content-shell section-pad prose-page">
      <Link className="text-link" href="/">
        Volver al inicio
      </Link>
      <p className="eyebrow">Información del sitio</p>
      <h1>Tu privacidad.</h1>
      <h2>Al explorar la web</h2>
      <p>
        Puedes revisar las monturas y la información de atención sin crear una
        cuenta. Los filtros del catálogo solo cambian lo que ves en esta página.
      </p>
      <h2>Al abrir WhatsApp</h2>
      <p>
        Los botones de contacto abren WhatsApp con un mensaje que puedes revisar
        y editar antes de enviarlo. La conversación y los datos que decidas
        compartir se gestionan en ese servicio.
      </p>
      <h2>Consultas sobre tu información</h2>
      <p>
        Si has compartido información con Lenteva por WhatsApp y tienes una
        consulta sobre su uso, comunícate por el mismo canal.
      </p>
      <WhatsappLink>
        Consultar por WhatsApp <span aria-hidden="true">↗</span>
      </WhatsappLink>
    </section>
  );
}
