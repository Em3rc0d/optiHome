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

// Campos del formulario
type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactFormModal = ({ isOpen, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // Número de WhatsApp del dueño
  const phoneNumber = "51933075200"; // <-- cámbialo al real

  const onSubmit = (data: FormData) => {
    // Mensaje personalizado
    const message = encodeURIComponent(
      `Hola, soy ${data.name}.\nMi correo: ${data.email}\nMensaje: ${data.message}`
    );

    // Opción 1️⃣: enviar por WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");

    // Opción 2️⃣: enviar por correo (descomenta si prefieres)
    // const mailto = `mailto:contacto@davision.com?subject=Consulta desde la web&body=${message}`;
    // window.location.href = mailto;

    onClose();
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl text-blue-700">
            Contáctanos
          </DialogTitle>
          <DialogDescription>
            Completa el formulario y te responderemos por WhatsApp o correo.
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

          {/* Correo */}
          <div>
            <Input
              type="email"
              placeholder="Correo electrónico"
              {...register("email", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Correo no válido",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
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

          {/* Botón de envío */}
          <div className="text-right">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Enviar mensaje
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
