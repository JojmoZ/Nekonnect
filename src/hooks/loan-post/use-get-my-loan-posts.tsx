import { useEffect, useState } from "react";
import useServiceContext from "../use-service-context";
import { LoanPost } from "@/lib/model/entity/loan-post";

export function useGetMyLoanPosts() {
    const { loanPostService } = useServiceContext();
    const [loanPosts, setLoanPosts] = useState<LoanPost[]>([]);
    const thereIsActiveLoan = loanPosts.some(post => post.status !== 'Repaid' && post.status !== 'Refunded');

    const getMyLoanPosts = async () => {
        const posts = await loanPostService.getMyLoanPosts();
        setLoanPosts(posts);
        console.log(posts);
    };

    const totalLoanAmount = loanPosts.reduce((acc, post) => acc + post.goal, 0);

    const latestActiveLoan = loanPosts.find(post => post.status !== 'Repaid' && post.status !== 'Refunded');

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