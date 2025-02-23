import { BaseService } from "./base.service";

export class RoomUserService extends BaseService {
    async userJoinRoom(roomId : string) {
        return await this.roomUsers.addUserToRoom(roomId,await this.user.getCallerPrincipal());
    }

}