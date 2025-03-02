import { Principal } from "@dfinity/principal";

export interface Transaction {
  transactionId: string;
  loanId: string;
  amount: number;
  date: string;
  method: string;
  status: string;
  lender: Principal;
}