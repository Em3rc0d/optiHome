import Image from "next/image";
import Link from "next/link";
import { FrameCard } from "@/components/catalog/FrameCard";
import { WhatsappLink } from "@/components/commerce/WhatsappLink";
import { catalogFrames, catalogNotice } from "@/content/catalog";

const faqs = [
  [
    "¿Atienden en mi zona?",
    "La cobertura se confirma por WhatsApp antes de acordar una visita. Cuéntanos en qué zona te encuentras para revisarla contigo.",
  ],
  [
    "¿Cómo coordino una atención?",
    "Escríbenos por WhatsApp y cuéntanos qué necesitas. Revisamos la cobertura y las opciones de fecha y horario. La cita queda confirmada cuando acordamos esos datos contigo.",
  ],
  [
    "¿Las monturas que veo están disponibles?",
    "Las imágenes son referencias para explorar estilos. Por WhatsApp puedes consultar los modelos disponibles, sus características, precios y alternativas similares.",
  ],
  [
    "¿Puedo consultar solo por una montura?",
    "Sí. Usa el botón Consultar del estilo que te gusta. El mensaje incluye el nombre de la referencia para que podamos conversar sobre esa opción.",
  ],
] as const;

export function CommercialHero() {
  return (
    <>
      <section className="commercial-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Óptica a domicilio</p>
          <h1 id="hero-title">
            Tu óptica,
            <br />
            más cerca <br className="hero-line" />
            <em>de ti.</em>
          </h1>
          <p className="hero-description">
            Monturas que van contigo. Atención óptica que empieza con una
            conversación y se coordina para tu hogar.
          </p>
          <div className="hero-actions">
            <WhatsappLink event="cta_hero_request_evaluation">
              Coordinar por WhatsApp <span aria-hidden="true">↗</span>
            </WhatsappLink>
            <Link
              className="text-link"
              href="/products"
              data-intent="cta_hero_explore_frames"
            >
              Explorar monturas <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="hero-portrait">
          <Image
            src="/modelo.png"
            alt="Retrato editorial de una mujer con lentes de montura aviador y lunas amarillas"
            fill
            sizes="(min-width: 800px) 48vw, 100vw"
            preload
            className="portrait-image"
          />
          <p className="portrait-note">
            Una mirada.
            <br />
            <em>Tu manera.</em>
          </p>
          <span className="portrait-credit">Inspiración de estilo</span>
        </div>
      </section>
      <div className="trust-strip" aria-label="La atención de OptiHome">
        <span>Atención a domicilio</span>
        <span>Selección de monturas</span>
        <span>Contacto directo por WhatsApp</span>
        <span>Visitas previa coordinación</span>
      </div>
    </>
  );
}

export function CommercialFrames() {
  return (
    <section
      className="content-shell section-pad"
      aria-labelledby="frames-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">Encuentra tu estilo</p>
          <h2 id="frames-title">
            Tu próxima
            <br />
            <em>forma de mirar.</em>
          </h2>
        </div>
        <div className="section-intro">
          <p>
            Un marco sutil. Una forma que destaca.
            <br />
            Empieza por lo que te gusta.
          </p>
          <Link href="/products" className="text-link">
            Ver todas las monturas <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
      <div className="frame-grid featured-grid">
        {catalogFrames.slice(0, 4).map((frame) => (
          <FrameCard key={frame.slug} frame={frame} />
        ))}
      </div>
      <p className="reference-note">{catalogNotice}</p>
    </section>
  );
}

export function EditorialStory() {
  return (
    <section className="editorial-story" aria-labelledby="editorial-title">
      <div className="editorial-image">
        <Image
          src="/products-hero.png"
          alt="Composición editorial de monturas en tonos carey y metálicos sobre una superficie clara"
          fill
          sizes="(min-width: 800px) 50vw, 100vw"
        />
        <span className="editorial-caption">
          Formas, detalles y personalidad.
        </span>
      </div>
      <div className="editorial-copy">
        <p className="eyebrow">Todos los días, muy tú</p>
        <h2 id="editorial-title">
          Hay detalles
          <br />
          que dicen
          <br />
          <em>mucho de ti.</em>
        </h2>
        <p>
          Los lentes acompañan tus días y también tu estilo. Encuentra una forma
          que te guste y conversemos sobre las opciones para ti.
        </p>
        <Link className="text-link" href="/products">
          Encuentra tu montura <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

export function OpticalCare() {
  return (
    <section
      className="optical-care"
      id="atencion"
      aria-labelledby="care-title"
    >
      <div className="content-shell care-layout">
        <div>
          <p className="eyebrow">Atención óptica a domicilio</p>
          <h2 id="care-title">
            Tu visión merece
            <br />
            <em>su momento.</em>
          </h2>
          <p className="care-intro">
            ¿Buscas nuevos lentes o quieres consultar por una evaluación?
            Cuéntanos qué necesitas y coordinamos el siguiente paso contigo.
          </p>
          <WhatsappLink className="button button-light">
            Consultar por una evaluación <span aria-hidden="true">↗</span>
          </WhatsappLink>
        </div>
        <div className="care-details">
          <div>
            <span className="step-label">Antes de la visita</span>
            <h3>Primero, conversemos.</h3>
            <p>
              Indica tu zona y qué atención buscas. Confirmaremos la cobertura,
              la fecha y el horario antes de una visita.
            </p>
          </div>
          <div>
            <span className="step-label">Para coordinar</span>
            <h3>Cuéntanos si ya usas lentes.</h3>
            <p>
              Si tienes una receta, coméntalo al escribirnos. Consulta qué debes
              tener preparado para la atención que acuerden.
            </p>
          </div>
          <div>
            <span className="step-label">Después del contacto</span>
            <h3>Un siguiente paso claro.</h3>
            <p>
              La atención y la selección de monturas continúan según lo
              coordinado. Un mensaje inicia la conversación; la cita se confirma
              contigo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CommercialProcess() {
  return (
    <section
      className="content-shell section-pad process-section"
      id="proceso"
      aria-labelledby="process-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">Cómo funciona</p>
          <h2 id="process-title">
            De aquí,
            <br />
            <em>a tu día a día.</em>
          </h2>
        </div>
        <p className="section-intro">
          Empieza por una montura
          <br />o por una pregunta.
        </p>
      </div>
      <ol className="process-list">
        {[
          [
            "Explora.",
            "Mira los estilos y encuentra las formas y colores que te gustan.",
          ],
          [
            "Elige.",
            "Guarda el nombre de tu referencia favorita o consulta directamente desde su imagen.",
          ],
          [
            "Coordina.",
            "Escríbenos por WhatsApp para consultar opciones o acordar tu atención a domicilio.",
          ],
        ].map(([title, description], index) => (
          <li key={title}>
            <span className="process-number">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CommercialFaq() {
  return (
    <section
      className="faq-section"
      id="preguntas-frecuentes"
      aria-labelledby="faq-title"
    >
      <div className="content-shell faq-layout">
        <div>
          <p className="eyebrow">Antes de elegir</p>
          <h2 id="faq-title">
            Hablemos
            <br />
            <em>con claridad.</em>
          </h2>
          <p>
            ¿Tienes otra pregunta?
            <br />
            Estamos a un mensaje.
          </p>
          <WhatsappLink
            className="text-link"
            message="Hola, tengo una consulta sobre la atención de OptiHome."
          >
            Preguntar por WhatsApp <span aria-hidden="true">↗</span>
          </WhatsappLink>
        </div>
        <div>
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
          <p className="faq-footnote">
            Para consultar por recetas, medios de pago, entrega o garantía,
            escríbenos antes de elegir.
          </p>
        </div>
      </div>
    </section>
  );
}

export function CommercialClosing() {
  return (
    <section
      className="closing-section"
      id="solicitar-evaluacion"
      aria-labelledby="closing-title"
    >
      <div className="content-shell closing-layout">
        <div>
          <p className="eyebrow">Empecemos por un hola</p>
          <h2 id="closing-title">
            Tus próximos lentes.
            <br />
            <em>Una conversación más cerca.</em>
          </h2>
        </div>
        <div>
          <WhatsappLink event="cta_final_request_evaluation">
            Conversemos por WhatsApp <span aria-hidden="true">↗</span>
          </WhatsappLink>
          <p>
            Revisamos tu zona y coordinamos contigo.
            <br />
            La cita se confirma al acordar fecha y horario.
          </p>
        </div>
      </div>
    </section>
  );
}
