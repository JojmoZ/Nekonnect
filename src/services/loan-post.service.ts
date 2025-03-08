import { LoanPost } from "@/lib/model/entity/loan-post";
import { BaseService, createLoanPostActor, loanPostCanisterId, transactionCanisterId } from "./base.service";
import { ActorSubclass } from "@dfinity/agent";
import { _SERVICE as _LOANPOSTSERVICE } from "@/declarations/loan_post/loan_post.did";
import { LoanAssurance } from "@/lib/model/entity/loan-assurance";

export class LoanPostService extends BaseService {

    protected loanPost! : ActorSubclass<_LOANPOSTSERVICE>;

    constructor() {
        super()
        this.loanPost = createLoanPostActor(loanPostCanisterId, {agent : BaseService.agent});
        this.initialized = this.initialization();
    }

    async createLoanPost(title: string, description: string, image: Uint8Array, goal: number, category: string, loanDuration: bigint, assuranceType: string, assuranceFile: Uint8Array) {
        return await this.loanPost.createPost(title, description, image, goal, category,await this.getCallerPrincipal(), loanDuration, assuranceType, assuranceFile);
    }

    async getLoanPosts(): Promise<LoanPost[]> {
        return await this.loanPost.getPosts();
    }

    async getLoanPost(loanId: string): Promise<LoanPost | undefined> {
        return await this.loanPost.getPost(loanId);
    }

    async getMyLoanPosts(): Promise<LoanPost[]> {
        const posts = await this.loanPost.getPosts();
        console.log(posts)
        const caller = await this.getCallerPrincipal();
        console.log(caller)
        const filteredPosts = posts.filter(post => post.debtor.toString() === caller.toString());
        console.log(filteredPosts)
        return filteredPosts;
    }

    async getActivePosts(): Promise<LoanPost[]> {
        const posts = await this.loanPost.getPosts();
        return posts.filter(post => post.status === 'Funding');
    }

    async getUnverifiedPosts(): Promise<LoanPost[]> {
        const posts = await this.loanPost.getPosts();
        return posts.filter(post => post.status === 'Verifying');
    }

    async acceptPost(loanId: string): Promise<String> {
        return await this.loanPost.acceptPost(loanId, transactionCanisterId);
    }

    async rejectPost(loanId: string): Promise<String> {
        return await this.loanPost.rejectPost(loanId);
    }

    async getAssurance(assuranceId: string): Promise<LoanAssurance | undefined> {
        return await this.loanPost.getAssurance(assuranceId);
    }
    async getAssurances(): Promise<LoanAssurance[]> {
        return  await this.loanPost.getAssurances();
    }
}