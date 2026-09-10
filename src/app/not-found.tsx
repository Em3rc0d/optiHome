import Link from "next/link";
import { ArrowLeft, Glasses } from "lucide-react";

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="content-shell grid min-h-[70svh] place-items-center py-20 text-center">
        <div className="max-w-xl">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-accent-soft text-brand">
            <Glasses className="size-7" aria-hidden="true" />
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-brand">404</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Esta página no está en nuestro recorrido.</h1>
          <p className="mt-5 text-lg leading-8 text-ink-muted">
            Vuelve al inicio para explorar monturas, probar estilos virtualmente o coordinar una evaluación.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-strong"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Volver a OptiHome
          </Link>
        </div>
      </div>
    </section>
  );
}
