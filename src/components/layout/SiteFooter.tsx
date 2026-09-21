import Link from "next/link";
import { siteConfig } from "@/content/site";
import { WhatsappLink } from "@/components/commerce/WhatsappLink";
export function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <div className="content-shell footer-main">
          <div>
            <Link className="wordmark" href="/">
              OptiHome<span className="brand-period">.</span>
            </Link>
            <p>Tu óptica, más cerca de ti.</p>
            <p className="footer-small">
              Atención a domicilio, previa coordinación.
              <br />
              Consulta la cobertura de tu zona.
            </p>
          </div>
          <nav aria-label="Enlaces del pie">
            <p className="eyebrow">Explora</p>
            <Link href="/products">Monturas</Link>
            <Link href="/#proceso">Cómo funciona</Link>
            <Link href="/#preguntas-frecuentes">Preguntas frecuentes</Link>
          </nav>
          <div className="footer-contact">
            <p className="eyebrow">Conversemos</p>
            <WhatsappLink className="contact-number">
              {siteConfig.contact.whatsappDisplay}{" "}
              <span aria-hidden="true">↗</span>
            </WhatsappLink>
            <p>WhatsApp de OptiHome</p>
          </div>
        </div>
        <div className="content-shell footer-bottom">
          <p>© {new Date().getFullYear()} OptiHome</p>
          <Link href="/privacy">Privacidad</Link>
        </div>
      </footer>
      <div className="mobile-contact-bar">
        <span>¿Te ayudamos a elegir?</span>
        <WhatsappLink>
          WhatsApp <span aria-hidden="true">↗</span>
        </WhatsappLink>
      </div>
    </>
  );
}
