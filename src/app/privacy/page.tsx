import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Camera, ExternalLink, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacidad de la prueba virtual",
  description: "Cómo utiliza OptiHome la cámara y las fotos dentro de la prueba virtual.",
};

export default function PrivacyPage() {
  return (
    <section className="bg-white">
      <div className="content-shell section-pad">
        <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver al inicio
        </Link>

        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Privacidad del try-on</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            Tu cámara y tus fotos permanecen bajo tu control.
          </h1>
          <p className="mt-5 text-lg leading-8 text-ink-muted">
            La prueba virtual está diseñada para procesar la imagen dentro de tu navegador. Esta versión del sitio no incluye un flujo para subir o almacenar tu foto o video en servidores de OptiHome.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <article className="rounded-3xl border border-border bg-surface-soft p-7">
            <Camera className="size-6 text-brand" aria-hidden="true" />
            <h2 className="mt-5 text-xl font-semibold">Cámara y fotos</h2>
            <p className="mt-3 leading-7 text-ink-muted">
              La cámara se solicita solo cuando pulsas la opción correspondiente. También puedes usar una foto desde tu dispositivo.
            </p>
          </article>

          <article className="rounded-3xl border border-border bg-surface-soft p-7">
            <ShieldCheck className="size-6 text-brand" aria-hidden="true" />
            <h2 className="mt-5 text-xl font-semibold">Procesamiento en el navegador</h2>
            <p className="mt-3 leading-7 text-ink-muted">
              El seguimiento facial se ejecuta en tu navegador. El sitio descarga las librerías necesarias para realizar esa detección localmente.
            </p>
          </article>

          <article className="rounded-3xl border border-border bg-surface-soft p-7">
            <ExternalLink className="size-6 text-brand" aria-hidden="true" />
            <h2 className="mt-5 text-xl font-semibold">Cuando abres WhatsApp</h2>
            <p className="mt-3 leading-7 text-ink-muted">
              Al continuar por WhatsApp sales de este sitio. La conversación y la información que compartas allí se gestionan dentro de ese servicio.
            </p>
          </article>
        </div>

        <div className="mt-10 max-w-3xl rounded-2xl border border-border bg-white p-6">
          <p className="leading-7 text-ink-muted">
            Esta página describe el comportamiento de la experiencia web actual de OptiHome. No sustituye las condiciones o políticas aplicables a otros canales de atención.
          </p>
        </div>
      </div>
    </section>
  );
}
