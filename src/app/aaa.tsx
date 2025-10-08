"use client";
import { Eye, CalendarCheck, Truck, Glasses } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const HomePage = () => {
  const { scrollY } = useScroll();

  // Rango: rotación completa en eje Y
  const rotateY = useTransform(scrollY, [0, 400], [0, 360]);

  // Escala ligera al hacer scroll
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]);

  const shadow = useTransform(
    scrollY,
    [0, 400],
    ["0px 10px 20px rgba(0,0,0,0.2)", "0px 25px 40px rgba(0,0,0,0.4)"]
  );

  return (
    <section className="px-6 text-center">
      <div className="flex flex-row items-center">
        {/* Texto */}
        <div className="w-2/3 mx-auto mb-12">
          <h1 className="text-5xl font-extrabold mb-6 text-blue-900">
            Bienvenido a <span className="text-blue-600">Davision</span>
          </h1>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-10">
            Tu salud visual es nuestra prioridad. Con <strong>Davision</strong>,
            accede a exámenes de vista profesionales, asesoría personalizada y
            una selección exclusiva de lentes, sin salir de casa.
          </p>
        </div>

        {/* Imagen interactiva */}
        <div className="w-1/3 mx-auto mb-12 flex justify-center">
          <motion.div
            style={{
              rotateY,
              scale,
              transformPerspective: 1000,
            }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="w-80 flex justify-center rounded-xl"
          >
            <Image
              src="/david.webp"
              alt="Optometrista de Davision"
              width={400}
              height={400}
              style={{
                boxShadow: "none",
              }}
              className="object-cover rounded-lg"
            />
          </motion.div>
        </div>
      </div>

      {/* Beneficios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <Eye className="w-10 h-10 text-blue-600 mb-2" />
          <h3 className="font-semibold text-lg mb-1">
            Exámenes de vista a domicilio
          </h3>
          <p className="text-sm text-gray-600">
            Evaluamos tu visión desde la comodidad de tu hogar.
          </p>
        </div>
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <CalendarCheck className="w-10 h-10 text-blue-600 mb-2" />
          <h3 className="font-semibold text-lg mb-1">Agenda fácil y rápida</h3>
          <p className="text-sm text-gray-600">
            Elige el día y la hora que más te convenga.
          </p>
        </div>
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <Truck className="w-10 h-10 text-blue-600 mb-2" />
          <h3 className="font-semibold text-lg mb-1">Servicio a todo Lima</h3>
          <p className="text-sm text-gray-600">
            Nos desplazamos hasta tu ubicación sin costo adicional.
          </p>
        </div>
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <Glasses className="w-10 h-10 text-blue-600 mb-2" />
          <h3 className="font-semibold text-lg mb-1">Lentes con estilo</h3>
          <p className="text-sm text-gray-600">
            Encuentra el modelo perfecto que combine salud y moda.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
