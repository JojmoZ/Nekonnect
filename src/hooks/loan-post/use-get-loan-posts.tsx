import { LoanPost } from "@/lib/model/entity/loan-post";
import { LoanPostService } from "@/services/loan-post.service";
import { useEffect, useState } from "react";

const loanPostService = new LoanPostService();

export function useGetLoanPosts(active?: Boolean) {
  const [loanPosts, setLoanPosts] = useState<LoanPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLoanPosts = async () => {
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

    fetchLoanPosts();
  }, [loanPosts]);

  return { loanPosts, getLoanPostsLoading: loading };
}