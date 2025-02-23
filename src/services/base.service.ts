import { canisterId as userCanisterId, createActor as createUserActor} from "@/declarations/user";
import { canisterId as chatCanisterId, createActor as createChatActor} from "@/declarations/chat";
import { canisterId as frontendCanisterId, createActor as createFrontendActor} from "@/declarations/frontend";
import { canisterId as transactionCanisterId, createActor as createTransactionActor} from "@/declarations/transaction";
import { canisterId as roomCanisterId, createActor as createRoomActor} from "@/declarations/room";

export class BaseService {
    protected room = createRoomActor(roomCanisterId);
    protected user = createUserActor(userCanisterId);
    protected chat = createChatActor(chatCanisterId);
    protected transaction = createTransactionActor(transactionCanisterId);
    protected frontend = createFrontendActor(frontendCanisterId);

}