"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { siteConfig } from "@/content/site";
import { WhatsappLink } from "@/components/commerce/WhatsappLink";
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  function close() {
    setOpen(false);
  }
  return (
    <>
      <div className="service-note">
        Tu óptica a domicilio. Atención coordinada por WhatsApp.
      </div>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            close();
            toggle.current?.focus();
          }
        }}
      >
        <div className="header-inner">
          <Link
            href="/"
            className="wordmark"
            aria-label="OptiHome, inicio"
            onClick={close}
          >
            OptiHome<span className="brand-period">.</span>
          </Link>
          <nav className="desktop-navigation" aria-label="Navegación principal">
            {siteConfig.navigation
              .filter((item) => item.href !== "/")
              .map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
          </nav>
          <WhatsappLink
            className="button button-primary header-contact"
            event="cta_header_request_evaluation"
          >
            Coordinar atención <span aria-hidden="true">↗</span>
          </WhatsappLink>
          <button
            className="menu-toggle"
            ref={toggle}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen(!open)}
          >
            <span>{open ? "Cerrar" : "Menú"}</span>
            <span aria-hidden="true">{open ? "×" : "+"}</span>
          </button>
        </div>
        <nav
          className="mobile-navigation"
          id="mobile-navigation"
          aria-label="Navegación móvil"
          hidden={!open}
        >
          {siteConfig.navigation
            .filter((item) => item.href !== "/")
            .map((item) => (
              <Link key={item.href} href={item.href} onClick={close}>
                {item.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          <WhatsappLink>Coordinar por WhatsApp</WhatsappLink>
        </nav>
      </header>
    </>
  );
}
