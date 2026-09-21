import Image from "next/image";
import { WhatsappLink } from "@/components/commerce/WhatsappLink";
import { frameInquiry, type CatalogFrame } from "@/content/catalog";
export function FrameCard({ frame }: { frame: CatalogFrame }) {
  return (
    <article className="frame-card" id={frame.slug}>
      <WhatsappLink
        message={frameInquiry(frame)}
        className="frame-image"
        label={`Consultar el estilo ${frame.name} por WhatsApp`}
      >
        <Image
          src={frame.image}
          alt={`Referencia ${frame.name}, color ${frame.color.toLowerCase()}`}
          fill
          sizes="(min-width: 1100px) 23vw, (min-width: 700px) 31vw, 46vw"
        />
        <span className="image-caption">Referencia visual</span>
      </WhatsappLink>
      <div className="frame-information">
        <p className="frame-style">{frame.style}</p>
        <h3>{frame.name}</h3>
        <p className="frame-color">{frame.color}</p>
        <WhatsappLink
          message={frameInquiry(frame)}
          className="frame-consult"
          label={`Consultar ${frame.name} por WhatsApp`}
        >
          Consultar <span aria-hidden="true">↗</span>
        </WhatsappLink>
      </div>
    </article>
  );
}
