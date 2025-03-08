import { LoanHistoryCard } from "@/components/custom/my-loans/loan-history-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLayout } from "@/context/layout-context";
import { useGetMyLoanPosts } from "@/hooks/loan-post/use-get-my-loan-posts";
import { useEffect } from "react";
import { CreditCard, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const status = ["Verifying", "Funding", "Not Fulfilled", "Repaying", "Repaid", "Refunded"]

function UserLoansPage() {
    const { setHeader, setFooter } = useLayout();
    const { loanPosts } = useGetMyLoanPosts();

    useEffect(() => {
        setHeader(true)
        setFooter(true)
    }, [])

    return (
        <div className='container py-8 mx-auto'>
            <h1 className='text-3xl font-bold mb-8'>
                My Loans
            </h1>
            <Tabs defaultValue={status[0]} className="w-full">
                <TabsList className="grid w-full grid-cols-6 mx-auto">
                    {status.map((s) => (
                        <TabsTrigger key={s} value={s}>
                            {s}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {status.map((s) => (
                    <TabsContent key={s} value={s} className="w-full">
                        <div className="grid grid-cols-1 gap-y-2">
                            {loanPosts.filter((loan) => loan.status === s).length === 0 ? (
                              <div className="flex flex-col items-center justify-center py-16 text-center bg-card rounded-lg border mt-4">
                                <div className="bg-primary/10 p-4 rounded-full mb-4">
                                  <CreditCard className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-lg font-medium mb-2">No {s} Transactions</h3>
                                <p className="text-muted-foreground mb-6 max-w-md">{getStatusMessage(s)}</p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                  <Button className="flex items-center gap-2" onClick={() => navigate(getActionRoute(s))}>
                                    <PlusCircle className="h-4 w-4" />
                                    Explore Lending Options
                                  </Button>
                                </div>
                              </div>
                            ) : (
                                loanPosts.filter((loan) => loan.status === s)
                                    .map((loan) => (
                                        <LoanHistoryCard key={loan.loanId} loanPost={loan} />
                                    ))
                            )}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}

export default UserLoansPage;