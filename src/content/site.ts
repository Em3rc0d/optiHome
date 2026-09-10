export type ContentAuthority = "AUTHORITATIVE" | "DEMO" | "DERIVED";

type NavigationItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "OptiHome",
  description:
    "Atención óptica a domicilio, exploración de monturas y una experiencia digital pensada para continuar tu cuidado visual desde casa.",
  locale: "es_PE",
  navigation: [
    { label: "Inicio", href: "/" },
    { label: "Monturas", href: "/products" },
    { label: "Cómo funciona", href: "/#proceso" },
    { label: "Prueba virtual", href: "/products#prueba-virtual" },
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
      "La disponibilidad de fecha y horario se confirma antes de agendar una visita.",
  },
} as const;

export function buildWhatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
