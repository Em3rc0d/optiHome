const steps = [
  {
    number: "01",
    title: "Envía tu solicitud",
    description: "Comparte qué necesitas y los datos mínimos para poder continuar la coordinación.",
  },
  {
    number: "02",
    title: "Revisamos capacidad",
    description: "Antes de ofrecer una fecha, la solicitud se contrasta con horarios, zona y capacidad operativa.",
  },
  {
    number: "03",
    title: "Confirmamos la cita",
    description: "Solo cuando existe un horario acordado, la solicitud pasa a ser una cita confirmada.",
  },
  {
    number: "04",
    title: "Continúa la atención",
    description: "La evaluación, selección de monturas y siguientes pasos se realizan según lo coordinado.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="proceso" aria-labelledby="process-title" className="bg-white">
      <div className="content-shell section-pad">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Cómo funciona</p>
          <h2 id="process-title" className="mt-3 text-3xl font-semibold md:text-5xl">
            Solicitar no es lo mismo que confirmar.
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink-muted">
            El flujo protege tanto la experiencia del visitante como la capacidad real del negocio.
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
