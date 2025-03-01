import { z } from "zod";

export const transactionSchema = z.object({
    loanId: z.string().uuid(),
    amount: z.coerce.number().positive(),
    type: z.string(),
})