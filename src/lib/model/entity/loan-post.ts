import { Principal } from "@dfinity/principal";

export interface LoanPost {
  loanId: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  createdAt: bigint;        // Time.Time in Motoko corresponds to Date in JS/TS
  postDuration: bigint;   // Nat64 can map to bigint in TS
  category: string;
  loanDuration: bigint;   // Nat64 to bigint
  isFulfilled: boolean;
  isVerified: boolean;
  debtor: Principal;         // Principal as string (Principal.toText())
}