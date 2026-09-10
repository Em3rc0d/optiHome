"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/content/site";
import { intentProps } from "@/lib/analytics-events";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-3 rounded-md font-semibold text-ink"
          aria-label="OptiHome, ir al inicio"
        >
          <span aria-hidden="true" className="grid size-9 place-items-center rounded-xl bg-brand text-sm font-bold text-white">
            O
          </span>
          <span className="text-lg tracking-tight">{siteConfig.name}</span>
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-6 lg:flex">
          {siteConfig.navigation.slice(1).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-sm px-1 text-sm font-medium text-ink-muted transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href={siteConfig.appointment.requestHref}
            {...intentProps("cta_header_request_evaluation")}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-strong motion-safe:active:scale-[0.99]"
          >
            Solicitar evaluación
          </Link>
        </div>

        <button
          type="button"
          className="inline-grid size-11 place-items-center rounded-xl border border-border text-ink transition-colors hover:bg-surface-soft lg:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      {isMenuOpen && (
        <div id="mobile-navigation" className="menu-enter border-t border-border bg-background lg:hidden">
          <nav aria-label="Navegación móvil" className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-surface-soft"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={siteConfig.appointment.requestHref}
              {...intentProps("cta_header_request_evaluation")}
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-strong"
            >
              Solicitar evaluación
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
