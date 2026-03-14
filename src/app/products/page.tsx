"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ShoppingCart, Filter, X, ArrowLeft, Plus, Minus } from "lucide-react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  material: string;
  color: string;
  image: string;
}

const productList: Product[] = [
  { id: 1, name: "Urban Acetate", price: 189, category: "Modern", material: "Acetate", color: "Black", image: "/products-hero.png" },
  { id: 2, name: "Titanium Air", price: 299, category: "Premium", material: "Titanium", color: "Silver", image: "/full-catalog.png" },
  { id: 3, name: "Crystal Vision", price: 219, category: "Modern", material: "Acetate", color: "Transparent", image: "/products-hero.png" },
  { id: 4, name: "Vintage Tortoise", price: 199, category: "Classic", material: "Acetate", color: "Tortoise", image: "/full-catalog.png" },
  { id: 5, name: "Nordic Gold", price: 259, category: "Premium", material: "Metal", color: "Gold", image: "/products-hero.png" },
  { id: 6, name: "Eco Wood", price: 239, category: "Special", material: "Wood", color: "Brown", image: "/full-catalog.png" },
  { id: 7, name: "Solar Try On", price: 299, category: "UV Protection", material: "Acetate", color: "Black", image: "/glasses.png" },
  { id: 8, name: "Sunglasses", price: 299, category: "UV Protection", material: "Titanium", color: "Black", image: "/sunglasses.png" },
  { id: 9, name: "Circle Glasses", price: 299, category: "Special", material: "Titanium", color: "Brown", image: "/img1.png" },
];

export default function ProductsPage() {
  const [filter, setFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = filter === "All"
    ? productList
    : productList.filter(p => p.category === filter);

  return (
    <div className="bg-white min-h-screen">
      {/* Header Catalogo */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 py-20 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/pattern-light.svg')] bg-repeat"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Volver al Inicio
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            Colección <span className="text-green-400">2026</span>
          </motion.h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Explora nuestra selección curada de monturas diseñadas para la máxima comodidad y estilo.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {["All", "Modern", "Classic", "Premium", "Special"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap ${filter === cat
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-gray-500 font-medium">
            <Filter className="w-4 h-4" />
            <span>{filteredProducts.length} productos encontrados</span>
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="group bg-white rounded-[2rem] border border-gray-100 p-6 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 mb-6">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:bg-blue-600 hover:text-white transition-all transform group-hover:translate-x-0 translate-x-12 opacity-0 group-hover:opacity-100"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">{product.category}</p>
                    <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  </div>
                  <p className="text-xl font-black text-gray-900">S/ {product.price}</p>
                </div>
                <p className="text-gray-500 text-sm">Material: {product.material} • Color: {product.color}</p>
                <div className="pt-4 flex gap-3">
                  <button className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" /> Comprar
                  </button>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="flex-1 bg-green-50 text-green-700 border border-green-100 py-3 rounded-xl font-bold hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <Camera className="w-4 h-4" /> Probar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal de Prueba Virtual (Simulado por ahora) */}
      <AnimatePresence>
        {selectedProduct && (
          <VirtualTryOnModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-componente para la prueba virtual
// Sub-componente para la prueba virtual (REDISEÑO PREMIUM PARA MÓVIL Y DESKTOP)
function VirtualTryOnModal({ product, onClose }: { product: Product, onClose: () => void }) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [transparentImage, setTransparentImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [currentProduct, setCurrentProduct] = useState(product);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Lógica de transparencia mejorada
  React.useEffect(() => {
    let isMounted = true;
    const img = new window.Image();
    img.src = currentProduct.image;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (!isMounted) return;
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        if (avg > 230) data[i + 3] = 0;
      }

      ctx.putImageData(imageData, 0, 0);
      setTransparentImage(canvas.toDataURL());
    };
    return () => { isMounted = false; };
  }, [currentProduct.image]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserPhoto(event.target?.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  React.useEffect(() => {
    // Check for secure context and mediaDevices support
    if (typeof window !== "undefined") {
      if (!window.isSecureContext && window.location.hostname !== "localhost") {
        setError("⚠️ La cámara requiere HTTPS. Pero puedes subir una foto para probarte los lentes.");
        return;
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Acceso a cámara no disponible. ¡Prueba subiendo una foto!");
        return;
      }
    }

    let activeStream: MediaStream | null = null;
    const constraints = {
      video: {
        facingMode: "user",
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(s => {
        activeStream = s;
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      })
      .catch(err => {
        console.error("Error camara:", err);
        setError("No se pudo acceder a la cámara. Prueba subiendo una foto.");
      });

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black text-white flex items-center justify-center overflow-hidden"
    >
      {/* Video de fondo o Foto de usuario */}
      <div className="absolute inset-0 z-0">
        {userPhoto ? (
          <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Pantalla de Error / Fallback */}
      <AnimatePresence>
        {error && !userPhoto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-[60] flex items-center justify-center p-6"
          >
            <div className="glass-dark p-10 rounded-[3rem] border border-white/10 backdrop-blur-3xl max-w-md text-center">
              <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400">
                <Camera className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black mb-4 pb-2 border-b border-white/10 italic">MODO ASISTIDO</h3>
              <p className="text-gray-400 leading-relaxed mb-8 text-sm">
                {error}
              </p>

              <div className="space-y-3">
                <label className="block w-full bg-blue-600 text-white py-4 rounded-2xl font-black cursor-pointer hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
                  Subir mi foto
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
                <button
                  onClick={onClose}
                  className="w-full text-gray-400 py-2 text-sm font-bold uppercase tracking-widest"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INFO SUPERIOR IZQUIERDA (Badge minimalista) */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-2 pointer-events-none">
        <motion.div
          initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          className="glass-dark px-4 py-2 rounded-full border border-white/10 backdrop-blur-md flex items-center gap-3 w-fit"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <p className="text-[10px] font-black uppercase text-white tracking-widest">AR ACTIVE</p>
        </motion.div>
        <motion.div
          initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          className="glass-dark px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-md flex flex-col w-fit"
        >
          <h3 className="text-sm font-black text-blue-400 leading-none mb-1">{currentProduct.name}</h3>
          <p className="text-[11px] font-black text-white">S/ {currentProduct.price}</p>
        </motion.div>
      </div>

      {/* CONTROLES DE ESCALA (UX Mejorada con Botones Tactiles) */}
      <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-6">
        <button 
          onClick={() => setScale(s => Math.min(1.4, s + 0.05))}
          className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl active:scale-90 transition-all shadow-2xl hover:bg-blue-600 group"
          aria-label="Aumentar tamaño"
        >
          <Plus className="w-6 h-6 text-white group-hover:scale-125 transition-transform" />
        </button>
        
        <div className="flex flex-col items-center gap-3">
          <div className="w-1.5 h-32 bg-white/10 rounded-full border border-white/5 overflow-hidden relative">
            <motion.div 
              className="absolute bottom-0 w-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" 
              style={{ height: `${((scale - 0.6) / (1.4 - 0.6)) * 100}%` }}
            />
          </div>
          <div className="glass-dark px-2 py-1 rounded-lg border border-white/10">
            <span className="text-[10px] font-black text-blue-400 tabular-nums">{Math.round(scale * 100)}%</span>
          </div>
        </div>

        <button 
          onClick={() => setScale(s => Math.max(0.6, s - 0.05))}
          className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl active:scale-90 transition-all shadow-2xl hover:bg-blue-600 group"
          aria-label="Disminuir tamaño"
        >
          <Minus className="w-6 h-6 text-white group-hover:scale-125 transition-transform" />
        </button>
      </div>

      {/* CONTROLES INFERIORES (Minimalistas y Flotantes) */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col gap-5 items-center">

        {/* Carrusel de modelos flotante */}
        <div className="glass-dark p-2 rounded-[2rem] border border-white/10 backdrop-blur-xl w-fit max-w-full overflow-hidden">
          <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide snap-x px-1">
            {productList.map(p => (
              <button
                key={p.id}
                onClick={() => setCurrentProduct(p)}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex-shrink-0 border-2 transition-all snap-center ${currentProduct.id === p.id ? "border-blue-500 bg-blue-500/20 scale-110" : "border-white/5 bg-white/5"}`}
              >
                <img src={p.image} alt={p.name} className="w-full h-full object-contain p-1.5" />
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full max-w-sm flex gap-3">
          <button className="flex-1 bg-white text-black hover:bg-blue-600 hover:text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all">
            Agregar Carrito
          </button>
          <button onClick={onClose} className="w-14 h-14 bg-white/10 hover:bg-red-500/20 text-white rounded-2xl transition-all backdrop-blur-md border border-white/10 flex items-center justify-center">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Montura (AR Overlay) - CENTRO TOTALMENTE DESPEJADO */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        <motion.div
          drag
          dragConstraints={{ top: -250, bottom: 250, left: -200, right: 200 }}
          style={{ scale }}
          className="w-64 h-24 relative cursor-move pointer-events-auto group"
        >
          {transparentImage && (
            <>
              <motion.img
                src={transparentImage}
                alt="Glasses"
                className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              />
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-blue-600/90 backdrop-blur-sm px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl border border-white/20">
                Arrastra para ajustar
              </div>
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
