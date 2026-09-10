import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredFrames } from "@/content/frames";

export function FeaturedFrames() {
  return (
    <section aria-labelledby="featured-title" className="border-y border-border bg-surface-soft">
      <div className="content-shell section-pad">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Monturas</p>
            <h2 id="featured-title" className="mt-3 text-3xl font-semibold md:text-5xl">
              Explora estilos antes de continuar tu elección.
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink-muted">
              Estas referencias son demostrativas. La disponibilidad, condiciones y precio final se confirman fuera del catálogo demo.
            </p>
          </div>
          <Link href="/products" className="inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-border bg-white px-4 py-2.5 font-semibold text-brand md:self-auto">
            Ver catálogo
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {featuredFrames.map((frame) => (
            <article key={frame.id}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-white">
                <Image src={frame.image} alt={`Montura ${frame.name}`} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
              <p className="mt-4 text-sm font-medium text-brand">{frame.category}</p>
              <h3 className="mt-1 text-xl font-semibold">{frame.name}</h3>
              <p className="mt-1 text-sm text-ink-muted">{frame.material} · {frame.color}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
