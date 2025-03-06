import { Principal } from "@dfinity/principal";
import { User } from "../../entity/user";

export interface MessageResponse {
    message: string;
    room_id: string;
    created_at: bigint;
    user_id : Principal;
    username : string;
}