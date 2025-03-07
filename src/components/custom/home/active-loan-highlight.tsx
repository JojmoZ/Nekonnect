"use client"

import { Button } from "@/components/ui/button"
import { useGetMyLoanPosts } from "@/hooks/loan-post/use-get-my-loan-posts";
import { RouteEnum } from "@/lib/enum/router-enum";
import { CheckCircle } from "lucide-react"
import { useNavigate } from "react-router"

export function ActiveLoanHighlight() {

  const navigate = useNavigate();
  const { latestActiveLoan, totalLoanAmount } = useGetMyLoanPosts();

  // if (!latestActiveLoan) return null;

  return (
    <div className="bg-primary-to-accent p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-white space-x-4">
          <CheckCircle className="h-8 w-8 text-white" />
          <div>
            <h2 className="text-xl font-bold">You Have Active Loan</h2>
            <p className="text-sm">
              You have active loan of <span className="font-semibold">${totalLoanAmount.toFixed(2)}</span>.
            </p>
            <p className="text-sm">
              Latest Repayment Status: <span className="font-semibold">{latestActiveLoan?.status}</span>
            </p>
          </div>
        </div>
        <Button
          variant="secondary"
        //   className="bg-transparent border-black text-black hover:bg-black hover:text-primary"
          onClick={() => navigate(RouteEnum.MY_LOANS)}
        >
          View
        </Button>
      </div>
    </div>
  )
}