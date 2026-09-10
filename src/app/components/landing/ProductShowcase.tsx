"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const products = [
  {
    name: "Classic Acetate",
    category: "Estilo moderno",
    image: "/products-hero.png",
  },
  {
    name: "Nordic Minimal",
    category: "Perfil ligero",
    image: "/products-hero.png",
  },
  {
    name: "Solar Elite",
    category: "Estilo solar",
    image: "/products-hero.png",
  },
  {
    name: "Solar Try On",
    category: "Compatible con prueba virtual",
    image: "/glasses.png",
  },
];

export const ProductShowcase = () => {
  return (
    <section id="productos" className="bg-white px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Monturas</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink md:text-5xl">
              Explora estilos antes de continuar tu elección.
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink-muted">
              Estas referencias ayudan a orientar la exploración. La disponibilidad, condiciones y precio final deben confirmarse antes de una compra.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-border px-4 py-2.5 font-semibold text-brand transition-colors hover:border-brand hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 md:self-auto"
          >
            Ver experiencia de catálogo
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
              className="group"
            >
              <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-surface-soft">
                <Image
                  src={product.image}
                  alt={`Montura ${product.name}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <p className="text-sm font-medium text-brand">{product.category}</p>
              <h3 className="mt-1 text-xl font-semibold text-ink">{product.name}</h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
