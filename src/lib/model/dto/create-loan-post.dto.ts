import { v4 } from "uuid";
import { z } from "zod";

export const loanPostSchema = z.object({
    // id: z.string().default(() => v4()),
    title: z.string().min(1, {message: 'Title cannot be empty'}),
    description: z.string().min(1, {message: 'Description cannot be empty'}),
    amount: z.coerce.number().int().positive(),
    assurance: z.coerce.number().int().positive(),
    interest: z.coerce.number().int().positive(),
    postDuration: z.coerce.number().int().positive()
})

export type loanPostDto = z.infer<typeof loanPostSchema>;