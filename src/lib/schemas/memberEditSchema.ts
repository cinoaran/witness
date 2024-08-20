import { z } from "zod";

export const memberEditSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters" }),
});

export type MemberEditSchema = z.infer<typeof memberEditSchema>;
