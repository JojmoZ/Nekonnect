import { TransactionHistoryCard } from '@/components/custom/transaction-history/transaction-history-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetUserTransactions } from '@/hooks/transaction/use-get-user-transactions';
import { timeToDateString } from '@/lib/utils/DateString';

const status = ["Ongoing", "Not Fulfilled", "Repaying", "Refunded", "Repaid"]

function TransactionHistoryPage() {
  const { transactions } = useGetUserTransactions();

  return (
    <div className='container py-8 mx-auto'>
      <h1 className='text-3xl font-bold mb-8'>
        Transaction History
      </h1>
      <Tabs defaultValue={status[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mx-auto">
          {status.map((s) => (
            <TabsTrigger key={s} value={s}>
              {s}
            </TabsTrigger>
          ))}
        </TabsList>
        {status.map((s) => (
          <TabsContent key={s} value={s} className="w-full">
            <div className="grid grid-cols-1 gap-y-2">
              {transactions
                ?.filter((t) => t.status === s)
                .map((t) => (
                  <TransactionHistoryCard key={t.loanId} transaction={t} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default TransactionHistoryPage;
