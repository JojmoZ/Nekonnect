import { Principal } from "@dfinity/principal";

export interface LoanPost {
  loanId: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  createdAt: string;        
  verifiedAt: string;  
  postDuration: bigint;   // Nat64 can map to bigint in TS
  category: string;
  loanDuration: bigint;   // Nat64 to bigint
  isFulfilled: boolean;
  isVerified: boolean;
  debtor: Principal;         // Principal as string (Principal.toText())
  assuranceId: string;
}