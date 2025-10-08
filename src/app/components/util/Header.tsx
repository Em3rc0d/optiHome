"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  { name: "Inicio", url: "/" },
  { name: "¿Quiénes Somos?", url: "/us" },
  { name: "Servicios", url: "/services" },
];

export const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-blue-900 font-extrabold text-xl"
        >
          <Image
            src="/optihome.png"
            alt="OptiHome logo"
            width={36}
            height={36}
            className="rounded-md object-contain"
            priority
          />
          <span className="tracking-tight">OptiHome</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className={cn(
                "text-gray-700 hover:text-blue-600 transition font-medium",
                pathname === item.url && "text-blue-600 font-semibold"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Botón menú móvil */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <div className="flex flex-col items-start px-4 py-4 gap-4">
            {navItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "text-gray-700 hover:text-blue-600 text-base font-medium",
                  pathname === item.url && "text-blue-600 font-semibold"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
