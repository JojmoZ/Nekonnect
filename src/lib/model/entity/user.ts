import { Principal } from "@dfinity/principal"

export interface User {
    internetIdentity : Principal
    username : string
    dob: string
    nationality: string
    gender: string
    email: string
     faceEncoding?: [] | [Float64Array | number[]];
}