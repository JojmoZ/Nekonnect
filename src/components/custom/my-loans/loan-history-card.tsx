import { Card } from '@/components/ui/card';
import { useGetLoanPost } from '@/hooks/loan-post/use-get-loan-post';
import { LoanPost } from '@/lib/model/entity/loan-post';
import { Transaction } from '@/lib/model/entity/transaction';
import { formatCurrency } from '@/lib/utils/Currency';
import { timeLeft, timeToDateString } from '@/lib/utils/DateString';
import { useNavigate } from 'react-router';

export function LoanHistoryCard({
  loanPost,
}: {
  loanPost: LoanPost;
}) {

  const navigate = useNavigate();

  return (
    <Card className="p-4 w-full shadow-lg rounded-lg overflow-hidden flex justify-between items-center" onClick={() => navigate('/post/' + loanPost.loanId)}>
      <div className="flex flex-col gap-y-1">
        <p className="text-foreground text-sm">Loan #{loanPost.loanId}</p>
        <p className="text-foreground font-semibold text-lg">{loanPost?.title}</p>
        <p className="text-gray-500 text-sm">
          {loanPost.status != "Verifying" && timeToDateString(loanPost.verifiedAt)}
        </p>
      </div>
      <div className="flex flex-col items-end gap-y-1">
        <span className="font-bold text-xl">
          {formatCurrency(loanPost.goal)}
        </span>
        <span className="text-gray-500 text-sm">{loanPost.status == "Funding" && timeLeft(loanPost.verifiedAt, loanPost.postDuration)}</span>
        <span className="text-gray-500 text-sm">{loanPost.status == "Repaying" && timeLeft(loanPost.verifiedAt, loanPost.postDuration+loanPost.loanDuration)}</span>
      </div>
    </Card>
  );
}
