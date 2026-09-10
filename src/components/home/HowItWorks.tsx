const steps = [
  {
    number: "01",
    title: "Cuéntanos qué necesitas",
    description: "Escríbenos por WhatsApp y dinos qué tipo de atención o montura estás buscando.",
  },
  {
    number: "02",
    title: "Revisamos disponibilidad",
    description: "Confirmamos contigo la cobertura de tu zona y las opciones de fecha y horario.",
  },
  {
    number: "03",
    title: "Coordinamos la visita",
    description: "Cuando acordamos fecha y horario, tu evaluación queda confirmada.",
  },
  {
    number: "04",
    title: "Recibe atención en casa",
    description: "Continuamos con la evaluación y la selección de monturas según lo coordinado.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="proceso" aria-labelledby="process-title" className="bg-white">
      <div className="content-shell section-pad">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Cómo funciona</p>
          <h2 id="process-title" className="mt-3 text-3xl font-semibold md:text-5xl">
            De tu mensaje a una visita coordinada.
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink-muted">
            Un proceso simple para que sepas qué sigue en cada momento.
          </p>
        </div>
        <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number} className="border-t border-border pt-6">
              <span className="text-sm font-semibold text-brand">{step.number}</span>
              <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 leading-7 text-ink-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
