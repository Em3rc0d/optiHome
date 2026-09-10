"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { buildWhatsappUrl, siteConfig } from "@/content/site";
import { intentProps } from "@/lib/analytics-events";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  name: string;
  phoneNumber: string;
  message: string;
};

const ContactFormModal = ({ isOpen, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const message = [
      `Hola, soy ${data.name}.`,
      `Mi número es ${data.phoneNumber}.`,
      data.message,
      "Quiero revisar disponibilidad para una evaluación con OptiHome.",
    ].join("\n");

    window.open(buildWhatsappUrl(message), "_blank", "noopener,noreferrer");
    onClose();
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-2xl font-semibold text-ink">
            Solicitar coordinación por WhatsApp
          </DialogTitle>
          <DialogDescription className="leading-6 text-ink-muted">
            Completa tus datos para preparar el mensaje. Enviarlo inicia una solicitud; no reserva una cita automáticamente.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="request-name" className="text-sm font-medium text-ink">
              Nombre completo
            </label>
            <Input
              id="request-name"
              autoComplete="name"
              {...register("name", { required: "Este campo es obligatorio" })}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="request-phone" className="text-sm font-medium text-ink">
              Número de WhatsApp
            </label>
            <Input
              id="request-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              {...register("phoneNumber", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[0-9+()\s-]{9,20}$/,
                  message: "Ingresa un número válido",
                },
              })}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="request-message" className="text-sm font-medium text-ink">
              ¿Qué necesitas?
            </label>
            <Textarea
              id="request-message"
              rows={4}
              placeholder="Por ejemplo: quiero revisar mi medida y ver monturas."
              {...register("message", { required: "Este campo es obligatorio" })}
            />
            {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
          </div>

          <p className="rounded-xl bg-surface-soft p-3 text-sm leading-6 text-ink-muted">
            {siteConfig.appointment.availabilityNotice}
          </p>

          <Button
            type="submit"
            {...intentProps("cta_request_whatsapp")}
            className="min-h-11 w-full bg-brand text-white hover:bg-brand-strong"
          >
            Continuar en WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
