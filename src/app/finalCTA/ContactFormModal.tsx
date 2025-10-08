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

  // Número de WhatsApp del negocio
  const businessNumber = "51933075200";

  const onSubmit = (data: FormData) => {
    const message = encodeURIComponent(
      `👋 Hola, soy ${data.name}.\n📱 Mi número es: ${data.phoneNumber}\n💬 ${data.message}`
    );

    // Detectar si el usuario está en móvil o escritorio
    const isMobile = /iPhone|Android|iPad/i.test(navigator.userAgent);
    const whatsappUrl = isMobile
      ? `https://api.whatsapp.com/send?phone=${businessNumber}&text=${message}`
      : `https://web.whatsapp.com/send?phone=${businessNumber}&text=${message}`;

    window.open(whatsappUrl, "_blank");

    onClose();
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl text-green-700 font-semibold">
            Contáctanos por WhatsApp
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Déjanos tus datos y te responderemos lo antes posible 🕓
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombre */}
          <div>
            <Input
              placeholder="Nombre completo"
              {...register("name", { required: "Este campo es obligatorio" })}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Número de WhatsApp */}
          <div>
            <Input
              type="tel"
              placeholder="Tu número de WhatsApp"
              {...register("phoneNumber", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[0-9]{9,15}$/,
                  message: "Número no válido",
                },
              })}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-600 mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Mensaje */}
          <div>
            <Textarea
              placeholder="Escribe tu mensaje aquí..."
              rows={4}
              {...register("message", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.message && (
              <p className="text-sm text-red-600 mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Botón */}
          <div className="text-right">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Enviar por WhatsApp
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
