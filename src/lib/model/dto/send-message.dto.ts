import { Principal } from "@dfinity/principal";
import { z } from "zod";

export const messageSchema = z.object({
    message: z.string().trim().min(1, {message: 'Message cannot be empty'}),
    room_id: z.string().uuid(),
    created_at: z.bigint().default(() => BigInt(new Date().getTime())),
    user_id : z.custom<Principal>(value => value instanceof Principal, { message: 'Invalid principal' }),
    username : z.string().min(1, {message: 'Username cannot be empty'}),
    // canister_id : z.string().min(1, {message: 'User canister ID cannot be empty'})
})

export type messageDto = z.infer<typeof messageSchema>;