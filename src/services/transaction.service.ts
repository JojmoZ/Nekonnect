import { _SERVICE as _TRANSACTIONSERVICE } from "@/declarations/transaction/transaction.did";
import { ActorSubclass } from "@dfinity/agent";
import { BaseService, createTransactionActor, transactionCanisterId, loanPostCanisterId } from "./base.service";
import { Transaction } from "@/lib/model/entity/transaction";
import { Principal } from "@dfinity/principal";

export class TransactionService extends BaseService {

    protected transaction! : ActorSubclass<_TRANSACTIONSERVICE>;
    
    constructor() {
        super()
        this.transaction = createTransactionActor(transactionCanisterId, {agent : BaseService.agent});
        this.initialized = this.initialization();
    }

    async createTransaction(loanId: string, amount: number, method: string, userId: Principal) {
        return await this.transaction.createTransaction(loanId, amount, method, loanPostCanisterId,userId, transactionCanisterId);
    }

    async getUserTransactions(): Promise<Transaction[]> {
        const transactions = await this.transaction.getTransactions()
        const caller = await this.getCallerPrincipal();
        const filtered_transactions = transactions.filter(transaction => transaction.lender.toString() === caller.toString());
        return filtered_transactions;
    }
}