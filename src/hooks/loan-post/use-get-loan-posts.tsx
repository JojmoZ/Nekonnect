import { LoanPost } from "@/lib/model/entity/loan-post";
import { useEffect, useState } from "react";
import useServiceContext from "../use-service-context";

export function useGetLoanPosts(active?: Boolean) {
  const [loanPosts, setLoanPosts] = useState<LoanPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { loanPostService } = useServiceContext();

  const fetchLoanPosts = async () => {
    setLoading(true);
    let response;
    if (active === undefined) {
      response = await loanPostService.getLoanPosts();
    } else if (active) {
      response = await loanPostService.getActivePosts();
    } else {
      response = await loanPostService.getUnverifiedPosts();
    }

    setLoanPosts(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchLoanPosts();
    const interval = setInterval(fetchLoanPosts, 2000);

    return () => clearInterval(interval);
  }, [loanPostService]);

  return { loanPosts, getLoanPostsLoading: loading };
}