import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { siteConfig } from "@/content/site";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "OptiHome | Óptica a domicilio y monturas",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "OptiHome | Óptica a domicilio y monturas",
    description: siteConfig.description,
    locale: siteConfig.locale,
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "OptiHome | Óptica a domicilio y monturas",
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
};
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: `+${siteConfig.contact.whatsappNumber}`,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PE" className={geistSans.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
