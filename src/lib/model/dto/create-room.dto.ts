import { z } from 'zod'
import { v4 as uuidv4 } from "uuid";

export const roomSchema = z.object({
    room_id: z.string().default(() => uuidv4()),
    room_name : z.string().trim().min(1, {message : 'Room name cannot be empty'}),
    room_type : z.string().default("Private")
})

export type roomDto = z.infer<typeof roomSchema>;