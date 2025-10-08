const ProductsPage = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4">
          Nuestros Productos
        </h1>
        <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
          Encuentra la montura perfecta para tu estilo y necesidad visual.
          Contamos con <strong>lentes recetados</strong>,{" "}
          <strong>monturas modernas</strong>,<strong> gafas de sol</strong> y
          mucho más. Calidad garantizada y entrega directa en tu domicilio.
        </p>

        {/* Placeholder para productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="w-full h-48 bg-gray-200 rounded mb-4 animate-pulse" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Nombre del producto
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                Descripción corta del producto que destaca su calidad, comodidad
                o estilo.
              </p>
              <span className="text-blue-600 font-bold">S/ ---.--</span>
            </div>
          ))}
        </div>

        {/* CTA opcional */}
        <div className="mt-12">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Ver catálogo completo
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
