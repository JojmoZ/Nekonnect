import { TransactionHistoryCard } from '@/components/custom/transaction-history/transaction-history-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetUserTransactions } from '@/hooks/transaction/use-get-user-transactions';
import { timeToDateString } from '@/lib/utils/DateString';

const status = ["Ongoing", "Not Fulfilled", "Repaying", "Refunded", "Repaid"]

function TransactionHistoryPage() {
  const { transactions } = useGetUserTransactions();

  return (
    <Tabs defaultValue={status[0]} className="w-full">
      <TabsList className="grid w-[400px] grid-cols-4 ">
        {status.map((s) => (
          <TabsTrigger key={s} value={s}>
            {s}
          </TabsTrigger>
        ))}
      </TabsList>
      {status.map((s) => (
        <TabsContent key={s} value={s} className="w-full">
          <div className="grid grid-cols-1 gap-y-4 mx-5">
            {transactions
              ?.filter((t) => t.status === s)
              .map((t) => (
                <TransactionHistoryCard key={t.loanId} transaction={t} />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default TransactionHistoryPage;
