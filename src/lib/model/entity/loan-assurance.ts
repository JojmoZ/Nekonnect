import { Principal } from "@dfinity/principal";

export interface LoanAssurance {
    assuranceId: string;
    assuranceType: string;
    assuranceFile: Uint8Array | number[];
    debtor: Principal;
}