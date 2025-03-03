import { Principal } from "@dfinity/principal";
import { z } from "zod";

export const userSchema = z.object({
    username : z.string().trim().min(1, {message : 'Username cannot be empty'}),
    dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
    nationality: z.string().min(2, "Nationality required"),
    gender: z.enum(["Male", "Female", "Other"]),
    email: z.string().email("Invalid email"),
    faceEncoding: z.union([z.array(z.instanceof(Float64Array)), z.tuple([])]).optional(), 
})

export type userDto = z.infer<typeof userSchema>;