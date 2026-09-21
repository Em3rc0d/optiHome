# MK1 — OptiHome comercial

Baseline: `8bf33df537248f6ebdcaaa76db8575e91e9222d9`. Rama: `feat/mk1-commercial-eyewear-final`.

## Tesis y arquitectura cerradas antes de implementar

Una óptica cercana con una expresión editorial: el rostro introduce la marca, las monturas permiten comparar y WhatsApp convierte el interés en una conversación. Sin tecnología como argumento de venta.

Home: cabecera → hero humano estático con dos acciones → franja de servicio → selección de monturas → composición editorial → atención a domicilio → Explora / Elige / Coordina → FAQ → contacto final → pie.

Catálogo: título compacto → aviso de referencias → filtros de estilo y color → grid de ocho referencias con consulta contextual → ayuda por WhatsApp. Los materiales no se publican como especificaciones verificadas. No hay checkout, precios, stock, calificaciones ni fichas comerciales inventadas.

Rutas: `/`, `/products`, `/privacy`, 404. Se preservan las redirecciones `/contact`, `/finalCTA`, `/services`, `/testimonials`, `/us`. No se crean rutas de prueba virtual. Las query strings nunca habilitan experiencias internas.

## Sistema visual propio (INSPIRED / decisión de diseño, no identidad oficial)

- Tinta / marca: `#183e3b`; fondo principal `#fbfaf7`; papel `#f0eee7`; acento `#ede5a3`; texto secundario `#53605a`; borde `#c8cec6`.
- Geist Sans existente para interfaz y titulares; Georgia italic como contraste editorial puntual. Se elimina la descarga de Geist Mono de la superficie pública.
- Titular desktop 88px máximo; mobile 44–72px según ancho. Texto 16–18px; secundarios 14px. Interlineado de titulares >= 1.02; cuerpo 1.65.
- Ancho de contenido 1440px; márgenes 20px en 360–430px, 40–64px desktop. Ritmo 64 / 96px por sección, interrumpido por composiciones a sangre.
- Superficies rectangulares; botones 2px de radio, altura mínima 48px. No tarjetas flotantes, sombras decorativas ni gradientes.
- Hero 52/48 desktop; texto y CTA antes de imagen en mobile. Imagen con proporción reservada. Monturas: 2 columnas móviles, 4 desktop; textos y CTA sin truncamiento.
- Interacciones de color/subrayado y desplazamiento de imagen <= 2%; sin autoplay, scroll hijacking ni contenido oculto por animación. Reduced motion desactiva transiciones.
- Menú móvil desplegable con estado anunciado, Escape, cierre al navegar y foco de vuelta al disparador. CTA WhatsApp móvil persistente con espacio inferior reservado.
- Focus visible de 3px, contraste AA, enlaces y controles de mínimo 44px, landmark principal y skip link.

## Componentes y límites

Server Components para home, tarjetas, FAQ, atención, footer, metadatos. Client Components solo para menú móvil y filtros. El catálogo recibe referencias serializables; no importa generadores de ángulos, tracking ni geometría. Se conserva íntegra la implementación interna de try-on y SpatialOptics sin importación desde rutas públicas.

`WhatsappLink` centraliza URL, target seguro y eventos existentes. `FrameCard` ofrece imagen, nombre, color visual y consulta; el modelo de contenido incluye slug para una futura PDP, que requiere primero ficha real del propietario.

## Autoridad y assets

OFFICIAL en código existente: nombre, WhatsApp `51933075200`, atención óptica a domicilio con cobertura y horario sujetos a coordinación (`src/content/site.ts`, MK0.1). No se interpreta como verificación independiente del negocio.

OBSERVED: ocho entradas `REFERENCE` y assets asociados (`src/content/frames.ts`). Los nombres son identificadores de referencias; no equivalen a SKU. Los materiales heredados no tienen certificación y se omiten públicamente. Colores describen la imagen referencial.

INHERITED, procedencia externa no documentada: `public/modelo.png`, `public/products-hero.png` y fotografías familiares. No se presentan como clientes, instalaciones ni personal de OptiHome. Se reutilizan únicamente como contenido editorial, sin logos ajenos ni testimonios; el propietario debe confirmar los derechos de uso. No se copia ningún asset de las referencias.

La referencia visual de una montura se indica explícitamente junto al catálogo y las tarjetas. No se añade Product/Offer schema a referencias. Organization se limita al nombre, URL y contacto existentes.

## Criterios de cierre

Lint, TypeScript, build, contratos internos heredados y pruebas comerciales; rutas y enlaces; imágenes; consola; WhatsApp correcto; ninguna activación por query; cero overflow 360/390/430/1440; inspección visual antes/después. Preservar hashes del try-on. No merge a master.
