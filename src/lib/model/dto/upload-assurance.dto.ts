import { z } from "zod";

export const assuranceSchema = z.object({
    assurance_type: z.string().min(1, {message: 'Assurance Type cannot be empty'}),
    assurance_file: z.instanceof(File, {message: 'Assurance File must be a file'})
            .refine(
                (file) => file.size <= 5 * 1024 * 1024, 
                { message: "File size must be less than 5MB" }
            )
            .refine(
                (file) => file.type.startsWith("image/"),
                { message: "Only image files are allowed" }
            )

})

export type assuranceDto = z.infer<typeof assuranceSchema>;