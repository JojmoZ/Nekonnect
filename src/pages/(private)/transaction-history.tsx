import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUserTransactions } from "@/hooks/transaction/use-get-user-transactions";
import { timeToDateString } from "@/lib/utils/DateString";

const status = ["Ongoing", "Not Fulfilled", "Repaying", "Refunded", "Repaid"]

function TransactionHistoryPage() {

  const { transactions } = useGetUserTransactions();

  return (
    <Tabs defaultValue={status[0]} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-5">
        {
          status.map((s) => (
            <TabsTrigger key={s} value={s}>{s}</TabsTrigger>
          ))
        }
      </TabsList>
      {
        status.map((s) => (
          <TabsContent key={s} value={s}>
            <div className="grid grid-cols-4">
              <div>Loan ID</div>
              <div>Amount</div>
              <div>Date</div>
              <div>Method</div>
              {
                transactions?.map((t) => {
                  if (t.status === s) {
                    return (
                      <div key={t.transactionId} className="grid grid-cols-4">
                        <div>{t.loanId}</div>
                        <div>{t.amount}</div>
                        <div>{timeToDateString(t.date)}</div>
                        <div>{t.method}</div>
                      </div>
                    );
                  }
                })
              }
            </div>
          </TabsContent>
        ))
      }
    </Tabs>
  );
}

export default TransactionHistoryPage;