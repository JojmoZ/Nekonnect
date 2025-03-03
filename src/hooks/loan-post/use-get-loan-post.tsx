import { LoanPost } from '@/lib/model/entity/loan-post';
import { useEffect, useState } from 'react';
import useServiceContext from '../use-service-context';

export function useGetLoanPost(loanId: string) {
  console.log('useGetLoanPost initialized'); // Log initialization

  const [loanPost, setLoanPost] = useState<LoanPost>();
  const [loading, setLoading] = useState<boolean>(true);
  const { loanPostService } = useServiceContext();

  const fetchLoanPost = async () => {
    try {
      const response = await loanPostService.getLoanPost(loanId);
      setLoanPost(response);
    } catch (error) {
      console.error('Error fetching loan post:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchLoanPost();
  }, [loanId, loanPostService]);

  return { loanPost, getLoanPostLoading: loading, refetch: fetchLoanPost };
}
