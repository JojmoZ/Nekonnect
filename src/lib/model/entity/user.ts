import { Principal } from "@dfinity/principal"

export interface User {
    internetIdentity : Principal
    username : string
}