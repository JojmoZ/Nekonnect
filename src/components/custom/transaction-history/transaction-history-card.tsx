import { Card } from '@/components/ui/card';
import { Transaction } from '@/lib/model/entity/transaction';
import { timeToDateString } from '@/lib/utils/DateString';

export function TransactionHistoryCard({
  transaction,
}: {
  transaction: Transaction;
}) {
  return (
    <Card className="p-4 w-full shadow-lg rounded-lg overflow-hidden flex justify-between items-center">
      <div className="flex flex-col gap-y-1">
        {/* <p className="text-gray-900 font-semibold">Loan {transaction.loanId}</p> */}
        <p className="text-gray-900 font-semibold text-lg">Loan Ganti Woe</p>
        <p className="text-gray-500 text-sm">
          {timeToDateString(transaction.date)}
        </p>
      </div>
      <div className="flex flex-col items-end gap-y-1">
        <span className="text-red-500 font-bold text-xl">
          - ${transaction.amount}
        </span>
        <span className="text-gray-500 text-sm">{transaction.method}</span>
      </div>
    </Card>
  );
}
