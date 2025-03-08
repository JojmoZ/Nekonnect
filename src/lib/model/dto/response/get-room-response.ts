import { RoomUserResponse } from "@/declarations/room/room.did";
import { MessageResponse } from "./get-message-response";

export interface GetRoomsResponse {
    post_id: string;
    room_id: string;
    room_name: string;
    room_type: string;
    room_user: Array<RoomUserResponse>;
    message : MessageResponse[]
}