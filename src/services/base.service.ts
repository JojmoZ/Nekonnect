import { canisterId as userCanisterId, createActor as createUserActor, idlFactory} from "@/declarations/user";
import { canisterId as messageCanisterId, createActor as createMessageActor} from "@/declarations/message";
import { canisterId as transactionCanisterId, createActor as createTransactionActor} from "@/declarations/transaction";
import { canisterId as roomCanisterId, createActor as createRoomActor} from "@/declarations/room";
import { canisterId as roomUsersCanisterId, createActor as createRoomUsersActor} from "@/declarations/room_users";
import { AnonymousIdentity, HttpAgent, SignIdentity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";
import { canisterId as loanPostCanisterId, createActor as createLoanPostActor} from "@/declarations/loan_post";
import exp from "constants";

export { userCanisterId, messageCanisterId, transactionCanisterId, roomCanisterId , roomUsersCanisterId, loanPostCanisterId};
export { createUserActor, createMessageActor, createTransactionActor, createRoomActor , createRoomUsersActor, createLoanPostActor};
export {idlFactory}

export class BaseService {
    private async getAgent() {
        const agent = new HttpAgent({  });
    }

    private authClient!: AuthClient;
    private agent!: HttpAgent;
    protected room = createRoomActor(roomCanisterId);
    protected user = createUserActor(userCanisterId);
    protected message = createMessageActor(messageCanisterId);
    protected transaction = createTransactionActor(transactionCanisterId);
    protected roomUsers = createRoomUsersActor(roomUsersCanisterId);
    protected loanPost = createLoanPostActor(loanPostCanisterId);

    constructor() {
        this.initialization();
    }

    private async initialization() {
        this.authClient = await AuthClient.create();
        this.agent = new HttpAgent({identity : this.authClient.getIdentity()});
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
    

}