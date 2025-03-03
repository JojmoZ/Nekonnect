import { roomDto } from "@/lib/model/dto/create-room.dto";
import { BaseService, createRoomActor, roomCanisterId } from "./base.service";
import { Room } from "@/lib/model/entity/room";
import { Principal } from "@dfinity/principal";
import { _SERVICE as _ROOMSERVICE, GetRoomsResponse } from "@/declarations/room/room.did";
import { ActorSubclass } from "@dfinity/agent";
import { GetRoomByPostIdResponse } from "@/lib/model/dto/response/get-room-by-post-id-response";

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
        return await this.room.createRoom( roomDto.room_name, roomDto.room_type, roomDto.post_id);
    }

    async getRoomByPostId(postId : string) : Promise<GetRoomsResponse[]>  {
        return await this.room.getRoomByPostId(postId);
    }

    // async joinRoom(roomId : string,userId : Principal) {
    //     return await this.room.join_room(roomId,userId);
    // }

    async createPrivateRoom(receiverId: Principal, post_id: string): Promise<string> {
        console.log(post_id)
        const result = await this.room.createPrivateRoom(await this.getCallerPrincipal(), receiverId,post_id);

        if ("ok" in result) {
            return result.ok; 
        } else {
            throw new Error(result.err); 
        }
    }

}