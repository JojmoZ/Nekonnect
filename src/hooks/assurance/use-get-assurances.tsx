"use client"

import { useState, useEffect } from "react"
import { Principal } from "@dfinity/principal"
import { LoanAssurance } from '@/components/assurance-card';

export function useGetAssurances(enabled = true) {
  const [assurances, setAssurances] = useState<LoanAssurance[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!enabled) return

    const fetchAssurances = async () => {
      setIsLoading(true)
      try {
        // TODO: Add fixes
        await new Promise((resolve) => setTimeout(resolve, 500))
        // setAssurances(mockAssurances) // for mock data
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
