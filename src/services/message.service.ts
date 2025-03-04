import { _SERVICE as _MESSAGESERVICE, MessageResponse } from "@/declarations/message/message.did";
import { ActorSubclass } from "@dfinity/agent";
import { BaseService, createMessageActor, messageCanisterId, userCanisterId } from "./base.service";

export class MessageService extends BaseService {
    protected message! : ActorSubclass<_MESSAGESERVICE>

    constructor() {
        super()
        this.message = createMessageActor(messageCanisterId, {agent : BaseService.agent});
        this.initialized = this.initialization();
    }

    async getMessagesByRoomId(roomId : string): Promise<MessageResponse[]> {
        return await this.message.getMessagesByRoomId(roomId, userCanisterId);
    }

}