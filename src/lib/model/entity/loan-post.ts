import { Principal } from "@dfinity/principal";

export interface LoanPost {
  loanId: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  createdAt: bigint;        
  verifiedAt: bigint;  
  postDuration: bigint;   
  category: string;
  loanDuration: bigint;   
  status: string;
  debtor: Principal;        
  assuranceId: string;
}