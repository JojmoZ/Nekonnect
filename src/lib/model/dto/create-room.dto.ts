import { z } from 'zod'
export const roomSchema = z.object({
    room_name : z.string().trim().min(1, {message : 'Room name cannot be empty'}),
    room_type : z.string().default("Private"),
    post_id : z.string().min(1, {message : 'Post id cannot be empty'})
})

export type roomDto = z.infer<typeof roomSchema>;