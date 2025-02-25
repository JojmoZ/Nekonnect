import { canisterId as userCanisterId, createActor as createUserActor, idlFactory} from "@/declarations/user";
import { canisterId as messageCanisterId, createActor as createMessageActor} from "@/declarations/message";
import { canisterId as transactionCanisterId, createActor as createTransactionActor} from "@/declarations/transaction";
import { canisterId as roomCanisterId, createActor as createRoomActor} from "@/declarations/room";
import { canisterId as roomUsersCanisterId, createActor as createRoomUsersActor} from "@/declarations/room_users";
import { ActorSubclass, AnonymousIdentity, HttpAgent, SignIdentity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";
import { canisterId as loanPostCanisterId, createActor as createLoanPostActor} from "@/declarations/loan_post";
import exp from "constants";
import { _SERVICE as _ROOMSERVICE } from "@/declarations/room/room.did";
import { _SERVICE as _USERSERVICE } from "@/declarations/user/user.did";
import { _SERVICE as _MESSAGESERVICE } from "@/declarations/message/message.did";
import { _SERVICE as _TRANSACTIONSERVICE } from "@/declarations/transaction/transaction.did";
import { _SERVICE as _ROOMUSERSERVICE } from "@/declarations/room_users/room_users.did";
import { _SERVICE as _LOANPOSTSERVICE } from "@/declarations/loan_post/loan_post.did";

export { userCanisterId, messageCanisterId, transactionCanisterId, roomCanisterId , roomUsersCanisterId, loanPostCanisterId};
export { createUserActor, createMessageActor, createTransactionActor, createRoomActor , createRoomUsersActor, createLoanPostActor};
export {idlFactory}

export class BaseService {

    private agent!: HttpAgent;
    private initialized: Promise<void>;
    protected authClient!: AuthClient;
    protected room! : ActorSubclass<_ROOMSERVICE>;
    protected user! : ActorSubclass<_USERSERVICE>;
    protected message! : ActorSubclass<_MESSAGESERVICE>;
    protected transaction! : ActorSubclass<_TRANSACTIONSERVICE>;
    protected roomUsers! : ActorSubclass<_ROOMUSERSERVICE>;
    protected loanPost! : ActorSubclass<_LOANPOSTSERVICE>;

    constructor() {
        this.initialized = this.initialization();
    }

    private async initialization() {
        this.authClient = await AuthClient.create();
        this.agent = new HttpAgent({host : "http://127.0.0.1:4943"});
        console.log(process.env.NODE_ENV)
        if (process.env.NODE_ENV === "development") {
            await this.agent.fetchRootKey();
        }
        this.room = createRoomActor(roomCanisterId, {agent : this.agent});
        this.user = createUserActor(userCanisterId, {agent : this.agent});
        this.message = createMessageActor(messageCanisterId, {agent : this.agent});
        this.transaction = createTransactionActor(transactionCanisterId, {agent : this.agent});
        this.roomUsers = createRoomUsersActor(roomUsersCanisterId, {agent : this.agent});
        this.loanPost = createLoanPostActor(loanPostCanisterId, {agent : this.agent});
    }

    async getCallerPrincipal () : Promise<Principal> { 
        return this.authClient.getIdentity().getPrincipal();
    }

    async getCallerIdentity () : Promise<SignIdentity> { 
        const identity = this.authClient.getIdentity();
        if (identity instanceof AnonymousIdentity) {
            throw new Error("User is not authenticated");
        }

        if ("getPublicKey" in identity && "sign" in identity) {
            return identity as SignIdentity;
        } else {
            throw new Error("Invalid identity type: Expected SignIdentity");
        }
    }

    async ensureInitialized() {
        await this.initialized;
    }
    

}