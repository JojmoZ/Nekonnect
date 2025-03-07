import { canisterId as userCanisterId, createActor as createUserActor, idlFactory} from "@/declarations/user";
import { canisterId as messageCanisterId, createActor as createMessageActor} from "@/declarations/message";
import { canisterId as transactionCanisterId, createActor as createTransactionActor} from "@/declarations/transaction";
import { canisterId as roomCanisterId, createActor as createRoomActor} from "@/declarations/room";
import { canisterId as roomUsersCanisterId, createActor as createRoomUsersActor} from "@/declarations/room_users";
import { ActorSubclass, AnonymousIdentity, HttpAgent, SignIdentity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";
import { canisterId as loanPostCanisterId, createActor as createLoanPostActor} from "@/declarations/loan_post";

export { userCanisterId, messageCanisterId, transactionCanisterId, roomCanisterId , roomUsersCanisterId, loanPostCanisterId};
export { createUserActor, createMessageActor, createTransactionActor, createRoomActor , createRoomUsersActor, createLoanPostActor};
export {idlFactory}

export class BaseService {

    protected static agent: HttpAgent;
    protected initialized: Promise<void>;
    protected static authClient: AuthClient;

    constructor() {
        this.initialized = this.initialization();
    }

    protected async initialization() {
        if (!BaseService.authClient) {
            BaseService.authClient = await AuthClient.create({
                idleOptions : {
                    disableIdle: true
                }
            });
        }

        if (!BaseService.agent) {
            // if (await BaseService.authClient.isAuthenticated()) {
                // BaseService.agent = new HttpAgent({host: "http://127.0.0.1:4943",identity : await BaseService.authClient.getIdentity()});
            // } else {
            // console.log(await BaseService.authClient.getIdentity())
                BaseService.agent = new HttpAgent({host : "http://127.0.0.1:4943"});
            // }
            // if (process.env.NODE_ENV === "development") {
                await BaseService.agent.fetchRootKey();
            // }
        }
        
    }

    async getCallerPrincipal () : Promise<Principal> { 
        await BaseService.agent.fetchRootKey();
        return BaseService.authClient.getIdentity().getPrincipal();
    }

    async getCallerIdentity () : Promise<SignIdentity> { 
        await BaseService.agent.fetchRootKey();

        const identity = BaseService.authClient.getIdentity();
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