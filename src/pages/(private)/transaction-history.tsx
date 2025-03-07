"use client"

import { TransactionHistoryCard } from "@/components/custom/transaction-history/transaction-history-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useLayout } from "@/context/layout-context"
import { useGetUserTransactions } from "@/hooks/transaction/use-get-user-transactions"
import { useEffect } from "react"
import { CreditCard, PlusCircle, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { RouteEnum } from '@/lib/enum/router-enum';

const status = ["Ongoing", "Not Fulfilled", "Repaying", "Refunded", "Repaid"]

function TransactionHistoryPage() {
  const { transactions } = useGetUserTransactions()
  const { setHeader, setFooter } = useLayout()
  const navigate = useNavigate()

  useEffect(() => {
    setHeader(true)
    setFooter(true)
  }, [])

  const getStatusMessage = (statusType: string) => {
    switch (statusType) {
      case 'Ongoing':
        return "You don't have any ongoing transactions.";
      case 'Not Fulfilled':
        return "You don't have any unfulfilled transactions.";
      case 'Repaying':
        return "You don't have any transactions in repayment.";
      case 'Refunded':
        return "You don't have any refunded transactions.";
      case 'Repaid':
        return "You don't have any fully repaid transactions.";
      default:
        return 'No transactions found for this status.';
    }
  };

  const getActionText = (statusType: string) => {
    switch (statusType) {
      case 'Ongoing':
      case 'Not Fulfilled':
        return 'Create New Transaction';
      default:
        return 'Explore Lending Options';
    }
  };

  const getActionRoute = (statusType: string) => {
    switch (statusType) {
      case 'Ongoing':
      case 'Not Fulfilled':
        return RouteEnum.CREATE_POST;
      default:
        return RouteEnum.HOME;
    }
  };

  return (
    <div className="container py-8 mx-auto">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => navigate(RouteEnum.HOME)}>
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to Home</span>
        </Button>
        <h1 className="text-3xl font-bold">Transaction History</h1>
      </div>

      <Tabs defaultValue={status[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mx-auto">
          {status.map((s) => (
            <TabsTrigger key={s} value={s}>
              {s}
            </TabsTrigger>
          ))}
        </TabsList>

        {status.map((s) => {
          const filteredTransactions = transactions?.filter((t) => t.status === s) || []
          const isEmpty = filteredTransactions.length === 0

          return (
            <TabsContent key={s} value={s} className="w-full">
              {isEmpty ? (
                // Empty state for this status tab
                <div className="flex flex-col items-center justify-center py-16 text-center bg-card rounded-lg border mt-4">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <CreditCard className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No {s} Transactions</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">{getStatusMessage(s)}</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex items-center gap-2" onClick={() => navigate(getActionRoute(s))}>
                      <PlusCircle className="h-4 w-4" />
                      {getActionText(s)}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => navigate(RouteEnum.HOME)}
                    >
                      Back to Home
                    </Button>
                  </div>
                </div>
              ) : (
                // Display transactions if they exist
                <div className="grid grid-cols-1 gap-y-2 mt-4">
                  {filteredTransactions.map((t) => (
                    <TransactionHistoryCard key={t.loanId} transaction={t} />
                  ))}
                </div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}

export default TransactionHistoryPage;