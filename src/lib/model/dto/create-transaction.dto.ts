import { z } from "zod";

export const transactionSchema = z.object({
    loanId: z.string().uuid(),
    amount: z.coerce.number().int().positive(),
    type: z.string(),
})