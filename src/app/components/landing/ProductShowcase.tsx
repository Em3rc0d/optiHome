"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const products = [
  {
    name: "Classic Acetate",
    price: "S/ 189",
    category: "Modern Style",
    image: "/products-hero.png",
  },
  {
    name: "Nordic Minimal",
    price: "S/ 249",
    category: "Premium Titan",
    image: "/products-hero.png",
  },
  {
    name: "Solar Elite",
    price: "S/ 159",
    category: "UV Protection",
    image: "/products-hero.png",
  },
  {
    name: "Solar Try On",
    price: "S/ 299",
    category: "UV Protection",
    image: "/glasses.png",
  },
];

export const ProductShowcase = () => {
  return (
    <section id="productos" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Nuestra <span className="text-blue-600">Colección</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-xl">
              Modelos seleccionados que combinan estilo, durabilidad y la mejor tecnología óptica.
            </p>
          </div>
          <Link href="/products" className="flex items-center gap-2 text-green-600 font-bold text-lg hover:gap-4 transition-all duration-300">
            Ver catálogo completo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100 mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-blue-900 uppercase tracking-widest">
                  {product.category}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  <p className="text-gray-500">Desde {product.price}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-green-600 group-hover:border-green-600 group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
