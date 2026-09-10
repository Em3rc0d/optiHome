import Link from "next/link";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { buildWhatsappUrl, siteConfig } from "@/content/site";

export function SiteFooter() {
  const whatsappHref = buildWhatsappUrl("Hola, quisiera información sobre la atención de OptiHome.");

  return (
    <footer className="border-t border-border bg-surface-soft">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.25fr_.75fr_1fr] lg:px-8">
        <div className="max-w-xl">
          <p className="text-lg font-semibold text-ink">{siteConfig.name}</p>
          <p className="mt-2 text-sm leading-6 text-ink-muted">{siteConfig.description}</p>
          <p className="mt-4 text-sm font-medium text-ink">{siteConfig.appointment.coverageNotice}</p>
        </div>

        <nav aria-label="Enlaces del pie" className="grid content-start gap-3 text-sm">
          {siteConfig.navigation.slice(1).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-sm text-ink-muted transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="content-start text-sm">
          <p className="font-semibold text-ink">Contacto</p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-brand hover:text-brand-strong"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp {siteConfig.contact.whatsappDisplay}
          </a>
          <Link href={siteConfig.privacy.href} className="mt-2 flex min-h-11 items-center gap-2 font-semibold text-brand hover:text-brand-strong">
            <ShieldCheck className="size-4" aria-hidden="true" />
            Privacidad del try-on
          </Link>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-ink-muted sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.</p>
          <p>{siteConfig.appointment.availabilityNotice}</p>
        </div>
      </div>
    </footer>
  );
}
