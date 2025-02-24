import { Principal } from "@dfinity/principal";
import { z } from "zod";

export const userSchema = z.object({
    username : z.string().trim().min(1, {message : 'Username cannot be empty'}),
})

export type userDto = z.infer<typeof userSchema>;