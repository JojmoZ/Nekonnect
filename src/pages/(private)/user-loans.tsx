import { LoanHistoryCard } from "@/components/custom/my-loans/loan-history-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLayout } from "@/context/layout-context";
import { useGetMyLoanPosts } from "@/hooks/loan-post/use-get-my-loan-posts";
import { useEffect } from "react";

const status = ["Verifying", "Funding", "Repaying", "Repaid", "Refunded"]

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
                            {loanPosts
                                ?.filter((loan) => loan.status === s)
                                .map((loan) => (
                                    <LoanHistoryCard key={loan.loanId} loanPost={loan} />
                                ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}

export default UserLoansPage;