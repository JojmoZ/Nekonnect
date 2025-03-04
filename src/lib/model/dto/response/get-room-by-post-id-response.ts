import { RoomUser } from "@/declarations/room_users/room_users.did";

export interface GetRoomByPostIdResponse {
    room_id : string,
    room_name : string,
    room_type : string,
    room_users : RoomUser[]
}