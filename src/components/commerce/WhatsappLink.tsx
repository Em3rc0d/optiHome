import type { ReactNode } from "react";
import { buildWhatsappUrl } from "@/content/site";
import { intentProps, type WebIntentEvent } from "@/lib/analytics-events";
export const appointmentMessage =
  "Hola, quiero coordinar una atención con Lenteva. ¿Podemos revisar cobertura, fecha y horario?";
export function WhatsappLink({
  children,
  message = appointmentMessage,
  className = "button button-primary",
  event = "cta_request_whatsapp",
  label,
}: {
  children: ReactNode;
  message?: string;
  className?: string;
  event?: WebIntentEvent;
  label?: string;
}) {
  return (
    <a
      href={buildWhatsappUrl(message)}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      {...intentProps(event)}
    >
      {children}
    </a>
  );
}
