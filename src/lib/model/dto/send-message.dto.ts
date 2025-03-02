import { z } from "zod";

export const messageSchema = z.object({
    message: z.string().trim().min(1, {message: 'Message cannot be empty'}),
    room_id: z.string().uuid(),
})

export type messageDto = z.infer<typeof messageSchema>;