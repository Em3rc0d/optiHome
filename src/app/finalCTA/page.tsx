"use client";

export const FinalCTA = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <section className="relative py-24 px-6 bg-blue-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 leading-snug mb-4">
          ¿Listo para ver el mundo con otros ojos?
        </h2>
        <p className="text-lg text-blue-800 max-w-2xl mx-auto mb-8">
          Agenda tu examen visual desde casa. Atención profesional, lentes a tu
          medida y asesoría personalizada. Estamos listos para ayudarte a ver
          mejor.
        </p>
        <button
          onClick={onOpen}
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold text-lg px-8 py-3 rounded-lg shadow-lg transition duration-200"
        >
          Solicitar asesoría gratuita
        </button>
      </div>

      {/* Decoración sutil */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-100 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10" />
    </section>
  );
};

export default FinalCTA;
