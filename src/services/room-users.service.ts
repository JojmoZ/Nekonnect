import { Principal } from "@dfinity/principal";
import { BaseService, createRoomUsersActor, roomUsersCanisterId } from "./base.service";
import { ActorSubclass } from "@dfinity/agent";
import { _SERVICE as _ROOMUSERSERVICE } from "@/declarations/room_users/room_users.did";

export class RoomUserService extends BaseService {

    protected roomUsers! : ActorSubclass<_ROOMUSERSERVICE>;

    constructor() {
        super()
        this.roomUsers = createRoomUsersActor(roomUsersCanisterId, {agent : this.agent});
        this.initialized = this.initialization();
    }
    
    async userJoinRoom(roomId : string,userId : Principal) {
        return await this.roomUsers.addUserToRoom(roomId,userId);
    }

    async getByRoomIdAndUserId(roomId : string,userId : Principal) {
        return await this.roomUsers.getByRoomIdAndUserId(roomId,userId);
    }

    async getAllUsersByRoomId(roomId : string) {
        return await this.roomUsers.getAllUsersByRoomId(roomId);
    }

}