import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredFrames } from "@/content/frames";

export function FeaturedFrames() {
  const frame = featuredFrames[0];

  return (
    <section aria-labelledby="featured-title" className="border-y border-border bg-surface-soft">
      <div className="content-shell section-pad">
        <div className="grid items-center gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Monturas</p>
            <h2 id="featured-title" className="mt-3 text-3xl font-semibold md:text-5xl">
              Una montura a la vez. Menos ruido para decidir mejor.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">
              Mostramos una referencia protagonista y dejamos la comparación progresiva para el catálogo. Las referencias son demostrativas y no representan inventario ni precio confirmado.
            </p>
            <Link
              href="/products"
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand px-5 py-3 font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-strong motion-safe:active:scale-[0.99]"
            >
              Explorar catálogo
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <article className="overflow-hidden rounded-3xl border border-border bg-white">
            <div className="relative aspect-[4/3] min-h-[19rem] bg-white sm:min-h-[24rem]">
              <Image
                src={frame.image}
                alt={`Montura ${frame.name}`}
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-contain p-8 sm:p-12"
              />
            </div>
            <div className="border-t border-border p-5 sm:p-6">
              <p className="text-sm font-semibold text-brand">{frame.category}</p>
              <h3 className="mt-1 text-2xl font-semibold">{frame.name}</h3>
              <p className="mt-2 text-sm text-ink-muted">{frame.material} · {frame.color}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
