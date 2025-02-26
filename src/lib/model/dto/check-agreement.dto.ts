import { z } from "zod";

export const loanAgreementSchema = z.object({
    terms: z.boolean().refine((value) => value === true, { message: "You must accept the terms and conditions" })
})

export type loanAgreementDto = z.infer<typeof loanAgreementSchema>;