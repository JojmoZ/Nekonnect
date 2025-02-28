export interface LoanAssurance {
    assuranceId: string;
    assuranceType: string;
    assuranceFile: Uint8Array<ArrayBufferLike> | number[];
}