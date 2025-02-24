import { roomDto } from "@/lib/model/dto/create-room.dto";
import { BaseService } from "./base.service";
import { Room } from "@/lib/model/entity/room";
import { Principal } from "@dfinity/principal";

export class RoomService extends BaseService {
    async getRooms () : Promise<Room[]> { 
        return await this.room.getAllRooms()
    }

    async createRoom(roomDto : roomDto) {
        return await this.room.createRoom(roomDto.room_id, roomDto.room_name, roomDto.room_type);
    }

    async joinRoom(roomId : string,userId : Principal) {
        return await this.room.join_room(roomId,userId);
    }

}