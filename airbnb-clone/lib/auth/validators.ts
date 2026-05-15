import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(80, "El nombre es demasiado largo."),
  email: z.string().trim().email("Ingresa un correo válido."),
  password: z
    .string()
    .min(8, "La contraseña debe tener mínimo 8 caracteres.")
    .regex(/[A-Z]/, "Incluye al menos una mayúscula.")
    .regex(/[a-z]/, "Incluye al menos una minúscula.")
    .regex(/[0-9]/, "Incluye al menos un número."),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Ingresa un correo válido."),
  password: z.string().min(8, "La contraseña debe tener mínimo 8 caracteres."),
});

export const checkoutSchema = z
  .object({
    paymentMethod: z.enum(["card", "googlePay"]),
    guestName: z
      .string()
      .trim()
      .min(2, "Escribe el nombre del titular.")
      .max(120, "Nombre demasiado largo."),
    cardNumber: z.string().trim().optional(),
    expiryDate: z.string().trim().optional(),
    cvc: z.string().trim().optional(),
  })
  .superRefine((value, context) => {
    if (value.paymentMethod === "googlePay") {
      return;
    }

    if (!value.cardNumber || !/^\d{16}$/.test(value.cardNumber.replace(/\s+/g, ""))) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cardNumber"],
        message: "La tarjeta debe tener 16 dígitos.",
      });
    }

    if (!value.expiryDate || !/^(0[1-9]|1[0-2])\/(\d{2})$/.test(value.expiryDate)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["expiryDate"],
        message: "Formato inválido. Usa MM/AA.",
      });
    }

    if (!value.cvc || !/^\d{3,4}$/.test(value.cvc)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cvc"],
        message: "CVC inválido.",
      });
    }
  });

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
