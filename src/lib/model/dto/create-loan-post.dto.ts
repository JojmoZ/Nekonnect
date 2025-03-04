import { v4 } from "uuid";
import { z } from "zod";

export const loanPostSchema = z.object({
    // id: z.string().default(() => v4()),
    title: z.string().min(1, {message: 'Title cannot be empty'}),
    description: z.string().min(1, {message: 'Description cannot be empty'}),
    image: z.instanceof(File, {message: 'Image must be a file'})
    .refine(
        (file) => file.size <= 5 * 1024 * 1024, 
        { message: "File size must be less than 5MB" }
    )
    .refine(
        (file) => file.type.startsWith("image/"),
        { message: "Only image files are allowed" }
    ),
    goal: z.coerce.number().positive(),
    category: z.string().min(1, {message: 'Category cannot be empty'}),
    loanDuration: z.coerce.number().int().positive()
})

export type loanPostDto = z.infer<typeof loanPostSchema>;