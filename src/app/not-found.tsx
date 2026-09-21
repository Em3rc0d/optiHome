import Link from "next/link";
export default function NotFound() {
  return (
    <section className="content-shell section-pad not-found">
      <p className="eyebrow">Página no encontrada</p>
      <h1>
        Volvamos
        <br />
        <em>a lo que buscas.</em>
      </h1>
      <p>
        Esta página no existe. Puedes explorar las monturas o volver al inicio
        para coordinar tu atención.
      </p>
      <div className="hero-actions">
        <Link href="/products" className="button button-primary">
          Explorar monturas
        </Link>
        <Link href="/" className="text-link">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
