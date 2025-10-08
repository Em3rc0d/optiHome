import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/util/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DaVision",
  description: "Lentes, exámenes de vista y más en DaVision.",
  authors: [{ name: "Eduardo Farid Merino Cordova" }],
  icons: "/favicon.ico",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-white text-gray-800">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <footer className="text-center text-sm py-6 text-gray-500">
          © {new Date().getFullYear()} Davision. Todos los derechos reservados.
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
