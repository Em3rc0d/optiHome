import Link from "next/link";
import { siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-soft">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr] lg:px-8">
        <div className="max-w-xl">
          <p className="text-lg font-semibold text-ink">{siteConfig.name}</p>
          <p className="mt-2 text-sm leading-6 text-ink-muted">{siteConfig.description}</p>
          <p className="mt-4 text-sm font-medium text-ink">{siteConfig.appointment.availabilityNotice}</p>
        </div>

        <nav aria-label="Enlaces del pie" className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
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
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-ink-muted sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.</p>
          <p>La información operativa final se confirma al coordinar cada solicitud.</p>
        </div>
      </div>
    </footer>
  );
}
