export type ContentAuthority = "AUTHORITATIVE" | "REFERENCE" | "DERIVED";

type NavigationItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "OptiHome",
  url: "https://optihome-v1.vercel.app",
  description:
    "Atención óptica a domicilio, exploración de monturas y prueba virtual para ayudarte a elegir desde casa.",
  locale: "es_PE",
  navigation: [
    { label: "Inicio", href: "/" },
    { label: "Monturas", href: "/products" },
    { label: "Cómo funciona", href: "/#proceso" },
    { label: "Prueba virtual", href: "/products?tryon=1#prueba-virtual" },
    { label: "Preguntas frecuentes", href: "/#preguntas-frecuentes" },
  ] satisfies NavigationItem[],
  contact: {
    whatsappNumber: "51933075200",
    whatsappDisplay: "+51 933 075 200",
    authority: "AUTHORITATIVE" as ContentAuthority,
  },
  appointment: {
    requestHref: "/#solicitar-evaluacion",
    availabilityNotice:
      "La cita queda confirmada cuando acordamos fecha y horario contigo.",
    coverageNotice:
      "La cobertura por zona se confirma al coordinar tu solicitud.",
  },
  privacy: {
    href: "/privacy",
  },
} as const;

export function buildWhatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
