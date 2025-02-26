import { BaseService } from "./base.service";

export class LoanPostService extends BaseService {
    async createLoanPost(title: string, description: string, goal: number, category: string, loanDuration: bigint) {
        return await this.loanPost.createPost(title, description, goal, category, loanDuration);
    }
}