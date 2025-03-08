"use client"

import { useState, useEffect } from "react"
import { Principal } from "@dfinity/principal"
import { LoanAssurance } from '@/components/assurance-card';
import { LoanPostService } from "@/services/loan-post.service";
import { UserService } from "@/services/user.service";
import { User } from "@/declarations/user/user.did";
import { useAuth } from "@/context/auth-context";

export function useGetAssurances(enabled = true) {
  const [assurances, setAssurances] = useState<LoanAssurance[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  let loanService = new LoanPostService();
  const {me} = useAuth();
  useEffect(() => {
    if (!enabled) return

    const fetchAssurances = async () => {
      setIsLoading(true)
      try {
        
        let assurances :LoanAssurance[] = await loanService.getAssurances();
        let filteredAssurances = assurances.filter((assurance)=> assurance.debtor.toString() == me?.internetIdentity.toString());
        setAssurances(filteredAssurances);
        await new Promise((resolve) => setTimeout(resolve, 500))
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch assurances"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchAssurances()
  }, [enabled])

  return { assurances, isLoading, error }
}
