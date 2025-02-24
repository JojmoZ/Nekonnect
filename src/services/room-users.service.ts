import { Principal } from "@dfinity/principal";
import { BaseService } from "./base.service";

export class RoomUserService extends BaseService {
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