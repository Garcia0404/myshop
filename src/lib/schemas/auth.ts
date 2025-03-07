import { z } from "zod";
export const registerSchema = z.object({
  username: z.string().min(4, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: z.string().email("El email no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
});
export const checkUserSchema = z.object({
  username: z.string().min(4, "El nombre de usuario debe tener al menos 3 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
});