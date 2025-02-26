import { ActorSubclass } from "@dfinity/agent";
import { BaseService, createLoanPostActor, loanPostCanisterId } from "./base.service";
import { _SERVICE as _LOANPOSTSERVICE } from "@/declarations/loan_post/loan_post.did";


export class LoanPostService extends BaseService {

    protected loanPost! : ActorSubclass<_LOANPOSTSERVICE>;

    constructor() {
        super()
        this.loanPost = createLoanPostActor(loanPostCanisterId, {agent : this.agent});
        this.initialized = this.initialization();
    }

    async createLoanPost(title: string, description: string, amount: number, assurance: number, interest: number, postDuration: bigint) {
        return await this.loanPost.createPost(title, description, amount, assurance, interest, postDuration);

    }
}