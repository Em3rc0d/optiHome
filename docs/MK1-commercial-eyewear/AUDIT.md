# Auditoría previa y fuentes

## Hallazgos de producto

- Home repite el recorrido en hero, OpticalStory, JourneyChooser y HowItWorks antes de mostrar producto. El peso editorial cae en explicar la interfaz.
- SpatialOptics monta un canvas y descarga Three.js desde jsDelivr. No existe dependencia npm `three`: medir solo package.json omitiría ese coste. No aporta información auténtica del producto.
- Catálogo de ocho referencias usa carrusel, miniaturas y animaciones de perspectiva; dos títulos grandes retrasan el acceso a las monturas. En móvil se impide comparar de un vistazo.
- Hero: carrusel de fotografías con overlays de pasos, tres mensajes de confianza y controles. Exceso de capas y duplicación de acciones.
- `/privacy` conserva un texto técnico sobre cámara y tracking; la página 404 invita a probar estilos virtualmente. Ambas son públicas aunque el try-on no aparezca en navegación.
- WhatsApp real configurado: `+51 933 075 200`. Cobertura no publicada. La cita solo se confirma tras acordar fecha y hora.
- Todas las monturas son `REFERENCE`; no hay inventario, precios, reseñas, credenciales ni garantías verificadas. El README antiguo sí hace afirmaciones que MK0 había desautorizado; no es fuente suficiente para publicar gratuidad o contactos alternativos.

## Rutas observadas

`/` y `/products`: renderizados, navegación funcional. `/privacy`: texto experimental público. `/contact` y `/finalCTA` → `/#solicitar-evaluacion`; `/services` → `/#proceso`; `/testimonials` y `/us` → `/`. 404 con mensaje experimental. `robots.txt`, `sitemap.xml`, OpenGraph existentes. Faltan canonical explícitos por página. No agregar páginas locales para zonas desconocidas.

## Referencias estudiadas (2026-09-20)

| Fuente | Aprendizaje aplicado, sin copiar |
|---|---|
| https://thefriendofpablo.pe/ | Composición de campaña, producto protagonista y catálogo familiar. Inspección visual desktop y contenido. |
| https://www.aceandtate.com/ | Fotografía a sangre, producto a gran escala y relación clara entre monturas y atención. Inspección visual desktop y contenido. |
| https://www.warbyparker.com/ | Contenido recuperado: gafas, atención y exploración. El navegador mostró mantenimiento; no se atribuye una auditoría visual completa. |
| https://www.visioncenter.com.pe/pages/examen-visual | Claridad de coordinación y preparación de cita. No se trasladan gratuidad, cobertura ni indicaciones clínicas. |
| https://econolentes.com.pe/collections/lentes-oftalmicos | Organización de catálogo por atributos y consulta rápida de producto. |
| https://gmo.com.pe/ | Separación comprensible entre categorías, servicio y contacto. |
| https://prismaoptica.pe/ | Lenguaje local y presentación comercial del producto. |
| https://cubitts.com/ | Monturas como objeto de diseño y fotografía editorial. |

## Performance y SEO: decisiones

Home estática sin Framer Motion, Three.js, TensorFlow ni MediaPipe en el árbol público. Dependencias internas se preservan para no destruir try-on. `next/image`, tamaños responsive, solo hero prioritario, dimensiones reservadas y carga diferida del resto. Medir recursos realmente cargados, no adjudicar mejoras de Core Web Vitals de campo a una prueba local.

SEO: títulos y descripciones específicos; canonical de producción; OG/Twitter coherentes; un H1 por ruta; sitemap limitado a rutas útiles; privacy sin indexación; sin Product/Offer/Review/LocalBusiness no sustentados. Copy orientado a óptica a domicilio y monturas, sin zonas inventadas ni repetición artificial de términos.
