import { _SERVICE as _MESSAGESERVICE } from "@/declarations/message/message.did";
import { ActorSubclass } from "@dfinity/agent";
import { BaseService, createMessageActor, messageCanisterId } from "./base.service";

export class MessageService extends BaseService {
    protected message! : ActorSubclass<_MESSAGESERVICE>

    constructor() {
        super()
        this.message = createMessageActor(messageCanisterId, {agent : BaseService.agent});
        this.initialized = this.initialization();
    }

}