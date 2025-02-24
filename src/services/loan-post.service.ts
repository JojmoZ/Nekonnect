import { BaseService } from "./base.service";

export class LoanPostService extends BaseService {
    async createLoanPost(title: string, description: string, amount: number, assurance: number, interest: number, postDuration: bigint) {
        return await this.loanPost.createPost(title, description, amount, assurance, interest, postDuration);
    }
}