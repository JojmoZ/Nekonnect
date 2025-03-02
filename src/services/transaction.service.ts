import { _SERVICE as _TRANSACTIONSERVICE } from "@/declarations/transaction/transaction.did";
import { ActorSubclass } from "@dfinity/agent";
import { BaseService, createTransactionActor, transactionCanisterId } from "./base.service";

export class TransactionService extends BaseService {

    protected transaction! : ActorSubclass<_TRANSACTIONSERVICE>;
    
    constructor() {
        super()
        this.transaction = createTransactionActor(transactionCanisterId, {agent : this.agent});
        this.initialized = this.initialization();
    }
}