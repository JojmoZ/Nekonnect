import { useEffect, useState } from "react";
import { Transaction } from "@/lib/model/entity/transaction";
import { TransactionService } from "@/services/transaction.service";

const transactionService = new TransactionService();
export function useGetUserTransactions() {
  

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserTransactions = async () => {
    try {
      const response = await transactionService.getUserTransactions();
      setTransactions(response);
    } catch (error) {
      console.error("Error fetching user transactions:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserTransactions();
  }, [transactionService]);

  return { transactions, loading };
}
