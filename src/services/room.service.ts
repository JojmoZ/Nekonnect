import { roomDto } from "@/lib/model/dto/create-room.dto";
import { BaseService, createRoomActor, roomCanisterId } from "./base.service";
import { Room } from "@/lib/model/entity/room";
import { Principal } from "@dfinity/principal";
import { _SERVICE as _ROOMSERVICE } from "@/declarations/room/room.did";
import { ActorSubclass } from "@dfinity/agent";

export class RoomService extends BaseService {

    protected room! : ActorSubclass<_ROOMSERVICE>;

    constructor() {
        super()
        this.room = createRoomActor(roomCanisterId, {agent : BaseService.agent});
        this.initialized = this.initialization();
    }
    
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