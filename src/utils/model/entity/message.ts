import { Principal } from "@dfinity/principal"

export interface Message {
    message: string
    user_id: Principal
    room_id : string
    created_at : BigInt
}