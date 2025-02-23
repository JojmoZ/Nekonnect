import { canisterId as userCanisterId, createActor as createUserActor} from "@/declarations/user";
import { canisterId as messageCanisterId, createActor as createMessageActor} from "@/declarations/message";
import { canisterId as frontendCanisterId, createActor as createFrontendActor} from "@/declarations/frontend";
import { canisterId as transactionCanisterId, createActor as createTransactionActor} from "@/declarations/transaction";
import { canisterId as roomCanisterId, createActor as createRoomActor} from "@/declarations/room";
import { canisterId as roomUsersCanisterId, createActor as createRoomUsersActor} from "@/declarations/room_users";

export { userCanisterId, messageCanisterId, frontendCanisterId, transactionCanisterId, roomCanisterId , roomUsersCanisterId};
export { createUserActor, createMessageActor, createFrontendActor, createTransactionActor, createRoomActor , createRoomUsersActor};

export class BaseService {
    protected room = createRoomActor(roomCanisterId);
    protected user = createUserActor(userCanisterId);
    protected message = createMessageActor(messageCanisterId);
    protected transaction = createTransactionActor(transactionCanisterId);
    protected frontend = createFrontendActor(frontendCanisterId);
    protected roomUsers = createRoomUsersActor(roomUsersCanisterId);
    

}