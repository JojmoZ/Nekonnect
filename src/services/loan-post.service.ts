import { LoanPost } from "@/lib/model/entity/loan-post";
import { BaseService, createLoanPostActor, loanPostCanisterId } from "./base.service";
import { ActorSubclass } from "@dfinity/agent";
import { _SERVICE as _LOANPOSTSERVICE } from "@/declarations/loan_post/loan_post.did";
import { LoanAssurance } from "@/lib/model/entity/loan-assurance";

export class LoanPostService extends BaseService {

    protected loanPost! : ActorSubclass<_LOANPOSTSERVICE>;

    constructor() {
        super()
        this.loanPost = createLoanPostActor(loanPostCanisterId, {agent : this.agent});
        this.initialized = this.initialization();
    }

    async createLoanPost(title: string, description: string, goal: number, category: string, loanDuration: bigint, assuranceType: string, assuranceFile: Uint8Array) {
        return await this.loanPost.createPost(title, description, goal, category, loanDuration, assuranceType, assuranceFile);
    }

    async getLoanPosts(): Promise<LoanPost[]> {
        return await this.loanPost.getPosts();
    }

    async getLoanPost(loanId: string): Promise<LoanPost | undefined> {
        return await this.loanPost.getPost(loanId);
    }

    async getActivePosts(): Promise<LoanPost[]> {
        return await this.loanPost.getActivePosts();
    }

    async getUnverifiedPosts(): Promise<LoanPost[]> {
        return await this.loanPost.getUnverifiedPosts();
    }

    async acceptPost(loanId: string): Promise<String> {
        return await this.loanPost.acceptPost(loanId);
    }

    async rejectPost(loanId: string): Promise<String> {
        return await this.loanPost.rejectPost(loanId);
    }

    async getAssurance(assuranceId: string): Promise<LoanAssurance | undefined> {
        return await this.loanPost.getAssurance(assuranceId);
    }

}