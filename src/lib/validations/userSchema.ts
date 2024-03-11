import { z } from "zod";

const phoneRegex = new RegExp(/^(\d{4}-\d{7})$/);

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
    first_name: z
      .string()
      .min(1, {
        message: "El nombre debe tener al menos un caracter",
      })
      .refine((e) => /^[A-Za-z]+$/.test(e), {
        message: "Tines un nombre curioso. Sin embargo, no es permitido colocar números",
      }),
    last_name: z
      .string()
      .min(1, {
        message: "El apellido debe tener al menos un caracter",
      })
      .refine((e) => /^[A-Za-z]+$/.test(e), {
        message: "Tines un apellido curioso. Sin embargo, no es permitido colocar números",
      }),
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

  const editInformationSchema = z
  .object({
    first_name: z
      .string()      
      .refine((e) => /^[A-Za-z ]*$/.test(e), {
        message: "Tienes un nombre curioso. Sin embargo, no es permitido colocar números",
      }),
    last_name: z
      .string()
      .refine((e) => /^[A-Za-z ]*$/.test(e), {
        message: "Tienes un apellido curioso. Sin embargo, no es permitido colocar números",
      })
  })

export { loginSchema, registerSchema, editInformationSchema };
