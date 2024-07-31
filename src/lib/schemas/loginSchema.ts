import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Must be a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must be less than 20 characters" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
