import { LoanPost } from "@/lib/model/entity/loan-post";
import { BaseService, createLoanPostActor, loanPostCanisterId } from "./base.service";
import { ActorSubclass } from "@dfinity/agent";
import { _SERVICE as _LOANPOSTSERVICE } from "@/declarations/loan_post/loan_post.did";

export class LoanPostService extends BaseService {

    protected loanPost! : ActorSubclass<_LOANPOSTSERVICE>;

    constructor() {
        super()
        this.loanPost = createLoanPostActor(loanPostCanisterId, {agent : this.agent});
        this.initialized = this.initialization();
    }

    async createLoanPost(title: string, description: string, goal: number, category: string, loanDuration: bigint) {
        return await this.loanPost.createPost(title, description, goal, category, loanDuration);
    }

    async getLoanPosts(): Promise<LoanPost[]> {
        return await this.loanPost.getPosts();
    }
}