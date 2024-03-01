import { z } from "zod";

const phoneRegex = new RegExp(/^(\d{11})$/);

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Introduzca una dirección de correo válida" })
    .refine((e) => e.endsWith("@usb.ve"), {
      message: "El correo debe ser el institucional",
    }),
  password: z
    .string()
    .min(4, { message: "Ingresa una contraseña con al menos 4 caracteres" }),
});

const registerSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Introduzca una dirección de correo válida" })
      .refine((e) => e.endsWith("@usb.ve"), {
        message: "El correo debe ser el institucional",
      }),
    phoneNumber: z
      .string()
      .regex(phoneRegex, "Introduce un número telefónico válido"),
    password: z
      .string()
      .min(4, { message: "Ingresa una contraseña con al menos 4 caracteres" }),
    confirmPass: z
      .string()
      .min(4, { message: "Ingresa una contraseña con al menos 4 caracteres" }),
  })
  .refine(({ password, confirmPass }) => password === confirmPass, {
    message: "Debe ser igual a tu contraseña",
    path: ["confirmPass"],
  });

export { loginSchema, registerSchema };
