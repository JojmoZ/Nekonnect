import { Card } from '@/components/ui/card';
import { useGetLoanPost } from '@/hooks/loan-post/use-get-loan-post';
import { Transaction } from '@/lib/model/entity/transaction';
import { timeToDateString } from '@/lib/utils/DateString';

export function TransactionHistoryCard({
  transaction,
}: {
  transaction: Transaction;
}) {

  const { loanPost } = useGetLoanPost(transaction.loanId);

  return (
    <Card className="p-4 w-full shadow-lg rounded-lg overflow-hidden flex justify-between items-center">
      <div className="flex flex-col gap-y-1">
        <p className="text-foreground text-sm">Loan #{transaction.loanId}</p>
        <p className="text-foreground font-semibold text-lg">{loanPost?.title}</p>
        <p className="text-gray-500 text-sm">
          {timeToDateString(transaction.date)}
        </p>
      </div>
      <div className="flex flex-col items-end gap-y-1">
        <span className="font-bold text-xl">
          ${transaction.amount.toFixed(2)}
        </span>
        <span className="text-gray-500 text-sm">{transaction.method}</span>
      </div>
    </Card>
  );
}
