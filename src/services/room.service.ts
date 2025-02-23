import { roomDto } from "@/utils/model/dto/create-room.dto";
import { BaseService } from "./base.service";

export class RoomService extends BaseService {
    async getRooms () : Promise<Room[]> { 
        return await this.room.getAllRooms()
    }

    async createRoom(roomDto : roomDto) {
        return await this.room.createRoom(roomDto.room_id, roomDto.room_name, roomDto.room_type);
    }
}