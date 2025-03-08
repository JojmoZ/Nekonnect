import { Card } from '@/components/ui/card';
import { useGetLoanPost } from '@/hooks/loan-post/use-get-loan-post';
import { Transaction } from '@/lib/model/entity/transaction';
import { formatCurrency } from '@/lib/utils/Currency';
import { timeToDateString } from '@/lib/utils/DateString';
import { useNavigate } from 'react-router';

export function TransactionHistoryCard({
  transaction,
}: {
  transaction: Transaction;
}) {

  const { loanPost } = useGetLoanPost(transaction.loanId);
  const navigate = useNavigate();

  return (
    <Card className="p-4 w-full shadow-lg rounded-lg overflow-hidden flex justify-between items-center" onClick={() => navigate('/post/' + transaction.loanId)}>
      <div className="flex flex-col gap-y-1">
        <p className="text-foreground text-sm">Loan #{transaction.loanId}</p>
        <p className="text-foreground font-semibold text-lg">{loanPost?.title}</p>
        <p className="text-gray-500 text-sm">
          {timeToDateString(transaction.date)}
        </p>
      </div>
      <div className="flex flex-col items-end gap-y-1">
        <span className="font-bold text-xl">
          {formatCurrency(transaction.amount)}
        </span>
        <span className="text-gray-500 text-sm">{transaction.method}</span>
      </div>
    </Card>
  );
}
