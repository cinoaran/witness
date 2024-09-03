import { z } from "zod";

export const messageSchema = z.object({
  text: z.string().min(3, { message: "Message must be at least 3 characters" }),
});

export type MessageSchema = z.infer<typeof messageSchema>;
