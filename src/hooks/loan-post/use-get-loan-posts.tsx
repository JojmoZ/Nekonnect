import { LoanPost } from "@/lib/model/entity/loan-post";
import { LoanPostService } from "@/services/loan-post.service";
import { useEffect, useState } from "react";

const loanPostService = new LoanPostService();

export function useGetLoanPosts() {
  const [loanPosts, setLoanPosts] = useState<LoanPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLoanPosts = async () => {
      const response = await loanPostService.getLoanPosts();
      setLoanPosts(response);
      setLoading(false);
    };

    fetchLoanPosts();
  }, []);

  return { loanPosts, getLoanPostsLoading: loading };
}