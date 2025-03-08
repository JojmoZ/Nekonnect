import { useEffect, useState } from "react";
import useServiceContext from "../use-service-context";
import { LoanPost } from "@/lib/model/entity/loan-post";

export function useGetMyLoanPosts() {
    const { loanPostService } = useServiceContext();
    const [loanPosts, setLoanPosts] = useState<LoanPost[]>([]);
    const thereIsActiveLoan = loanPosts.some(post => post.status !== 'Repaid' && post.status !== 'Refunded' && post.status !== 'Not Fulfilled' && post.status !== 'Rejected');

    const getMyLoanPosts = async () => {
        const posts = await loanPostService.getMyLoanPosts();
        setLoanPosts(posts);
    };

    // Only sum active loans
    const totalLoanAmount = loanPosts.reduce((acc, post) => {
        if (post.status !== 'Repaid' && post.status !== 'Refunded' && post.status !== 'Not Fulfilled' && post.status !== 'Rejected') {
            return acc + post.goal;
        }
        return acc;
    }, 0);

    const latestActiveLoan = loanPosts.find(post => post.status !== 'Repaid' && post.status !== 'Refunded' && post.status !== 'Not Fulfilled' && post.status !== 'Rejected');

    useEffect(() => {
        getMyLoanPosts();
    }, []);

    return {
        loanPosts,
        getMyLoanPosts,
        thereIsActiveLoan,
        latestActiveLoan,
        totalLoanAmount
    }
}