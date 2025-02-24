import { canisterId as userCanisterId, createActor as createUserActor} from "@/declarations/user";
import { canisterId as messageCanisterId, createActor as createMessageActor} from "@/declarations/message";
import { canisterId as transactionCanisterId, createActor as createTransactionActor} from "@/declarations/transaction";
import { canisterId as roomCanisterId, createActor as createRoomActor} from "@/declarations/room";
import { canisterId as roomUsersCanisterId, createActor as createRoomUsersActor} from "@/declarations/room_users";
import { canisterId as loanPostCanisterId, createActor as createLoanPostActor} from "@/declarations/loan_post";

export { userCanisterId, messageCanisterId, transactionCanisterId, roomCanisterId , roomUsersCanisterId, loanPostCanisterId};
export { createUserActor, createMessageActor, createTransactionActor, createRoomActor , createRoomUsersActor, createLoanPostActor};

export class BaseService {
    protected room = createRoomActor(roomCanisterId);
    protected user = createUserActor(userCanisterId);
    protected message = createMessageActor(messageCanisterId);
    protected transaction = createTransactionActor(transactionCanisterId);
    protected roomUsers = createRoomUsersActor(roomUsersCanisterId);
    protected loanPost = createLoanPostActor(loanPostCanisterId);

}