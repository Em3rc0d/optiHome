// Visual references, not inventory. Kept independent of internal try-on geometry.
export type CatalogFrame = {
  slug: string;
  name: string;
  image: string;
  style: "Esenciales" | "Con carácter" | "De sol";
  color: string;
  authority: "REFERENCE";
};
export const catalogFrames: CatalogFrame[] = [
  {
    slug: "urban-acetate",
    name: "Urban Acetate",
    image: "/frames/urban-acetate.webp",
    style: "Esenciales",
    color: "Negro",
    authority: "REFERENCE",
  },
  {
    slug: "titanium-air",
    name: "Titanium Air",
    image: "/frames/titanium-air.webp",
    style: "Esenciales",
    color: "Plata",
    authority: "REFERENCE",
  },
  {
    slug: "crystal-vision",
    name: "Crystal Vision",
    image: "/frames/crystal-vision.webp",
    style: "Esenciales",
    color: "Transparente",
    authority: "REFERENCE",
  },
  {
    slug: "vintage-tortoise",
    name: "Vintage Tortoise",
    image: "/frames/vintage-tortoise.webp",
    style: "Con carácter",
    color: "Carey",
    authority: "REFERENCE",
  },
  {
    slug: "solar-noir",
    name: "Solar Noir",
    image: "/frames/solar-noir.webp",
    style: "De sol",
    color: "Negro",
    authority: "REFERENCE",
  },
  {
    slug: "solar-aviator",
    name: "Solar Aviator",
    image: "/frames/solar-aviator.webp",
    style: "De sol",
    color: "Plata",
    authority: "REFERENCE",
  },
  {
    slug: "circle-brown",
    name: "Circle Brown",
    image: "/frames/circle-brown.webp",
    style: "Con carácter",
    color: "Marrón",
    authority: "REFERENCE",
  },
  {
    slug: "solar-color",
    name: "Solar Color",
    image: "/frames/solar-color.webp",
    style: "De sol",
    color: "Mixto",
    authority: "REFERENCE",
  },
];
export const catalogNotice =
  "Imágenes referenciales para ayudarte a elegir un estilo. Consulta los modelos, materiales y precios disponibles por WhatsApp.";
export function frameInquiry(frame: CatalogFrame) {
  return `Hola, me gusta el estilo de la referencia ${frame.name} (${frame.color}) que vi en OptiHome. ¿Qué modelos similares tienen y cuáles son sus materiales y precios?`;
}
