import { transactionSchema } from "@/lib/model/dto/create-transaction.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useServiceContext from "../use-service-context";

export function useCreateTransaction(loanId: string) {
    const transactionForm = useForm<z.infer<typeof transactionSchema>>({
      resolver: zodResolver(transactionSchema),
      defaultValues: {
        loanId: loanId,
        amount: 0,
        type: "",
      },
    });
    
    const { transactionService } = useServiceContext();
    
    const validateResponse = (response: string): { success: boolean; message: string } => {
      if (response === "Transaction created successfully!") {
        return { success: true, message: response };
      } else {
        return { success: false, message: response };
      }
    };  
    
    const handleCreate = async () => {
      const { amount, type } = transactionForm.getValues();

      try {
        const response = await transactionService.createTransaction(loanId, Number(amount), type);
        const validation = validateResponse(response);
  
        if (validation.success) {
          return validation.message;
        } else {
          console.error(validation.message);
          throw new Error(validation.message);
        }
      }
      catch (error) {
        throw new Error(error as string);
      }
    };
    
    return { transactionForm, handleCreate };
}