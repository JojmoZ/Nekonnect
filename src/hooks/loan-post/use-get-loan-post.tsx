import { LoanPost } from "@/lib/model/entity/loan-post";
import { useEffect, useState } from "react";
import useServiceContext from "../use-service-context";

export function useGetLoanPost(loanId: string) {
    const [loanPost, setLoanPost] = useState<LoanPost>();
    const [loading, setLoading] = useState<boolean>(true);
    const { loanPostService } = useServiceContext();

    useEffect(() => {
        const fetchLoanPost = async () => {
            const response = await loanPostService.getLoanPost(loanId);

            setLoanPost(response);
            setLoading(false);
        };

        fetchLoanPost();
    }, [loanId]);

    return { loanPost, getLoanPostLoading: loading };
}