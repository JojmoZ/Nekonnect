import { v4 } from "uuid";
import { z } from "zod";

export const loanPostSchema = z.object({
    // id: z.string().default(() => v4()),
    title: z.string().min(1, {message: 'Title cannot be empty'}),
    description: z.string().min(1, {message: 'Description cannot be empty'}),
    goal: z.coerce.number().int().positive(),
    category: z.string().min(1, {message: 'Category cannot be empty'}),
    loanDuration: z.coerce.number().int().positive()
})

export type loanPostDto = z.infer<typeof loanPostSchema>;