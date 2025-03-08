import { LoanHistoryCard } from "@/components/custom/my-loans/loan-history-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLayout } from "@/context/layout-context";
import { useGetMyLoanPosts } from "@/hooks/loan-post/use-get-my-loan-posts";
import { useEffect } from "react";
import { ArrowLeft, CreditCard, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RouteEnum } from "@/lib/enum/router-enum";
import { useNavigate } from "react-router";

const status = ["Verifying", "Rejected", "Funding", "Not Fulfilled", "Repaying", "Repaid", "Refunded"]

function UserLoansPage() {
    const { setHeader, setFooter } = useLayout();
    const { loanPosts } = useGetMyLoanPosts();
    const navigate = useNavigate();

    useEffect(() => {
        setHeader(true)
        setFooter(true)
    }, [])

    const getStatusMessage = (statusType: string) => {
        switch (statusType) {
            case 'Verifying':
                return "You don't have any verifying loans.";
            case 'Rejected':
                return "You don't have any rejected loans.";
            case 'Funding':
                return "You don't have any funding loans.";
            case 'Not Fulfilled':
                return "You don't have any unfulfilled loans.";
            case 'Repaying':
                return "You don't have any loans in repayment.";
            case 'Refunded':
                return "You don't have any refunded loans.";
            case 'Repaid':
                return "You don't have any fully repaid loans.";
            default:
                return 'No loans found for this status.';
        }
    };

    const getActionRoute = (statusType: string) => {
        switch (statusType) {
            // case 'Ongoing':
            // case 'Not Fulfilled':
            //     return RouteEnum.CREATE_POST;
            default:
                return RouteEnum.BORROWER;
        }
    };

    return (
        <div className='container py-8 mx-auto'>
            <div className="flex items-center mb-8">
                <Button variant="ghost" size="icon" className="mr-2" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back to Home</span>
                </Button>
                <h1 className="text-3xl font-bold">My Loans</h1>
            </div>
            <Tabs defaultValue={status[0]} className="w-full">
                <TabsList className="grid w-full grid-cols-7 mx-auto">
                    {status.map((s) => (
                        <TabsTrigger key={s} value={s}>
                            {s}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {status.map((s) => (
                    <TabsContent key={s} value={s} className="w-full">
                        <div className="mt-4">
                            {loanPosts.filter((loan) => loan.status === s).length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 text-center bg-card rounded-lg border">
                                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                                        <CreditCard className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-medium mb-2">No {s} Loans</h3>
                                    <p className="text-muted-foreground mb-6 max-w-md">{getStatusMessage(s)}</p>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Button className="flex items-center gap-2" onClick={() => navigate(getActionRoute(s))}>
                                            <PlusCircle className="h-4 w-4" />
                                            Create Loan
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