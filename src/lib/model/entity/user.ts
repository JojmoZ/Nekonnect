import { Principal } from "@dfinity/principal"

export interface User {
    internetIdentity : Principal
    username : string
    dob: string
    nationality: string
    gender: string
    email: string
    balance: number
    faceEncoding?: [] | [Float64Array | number[]];
}