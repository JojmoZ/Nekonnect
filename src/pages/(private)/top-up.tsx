"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { CreditCard, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useLayout } from "@/context/layout-context"
import useServiceContext from "@/hooks/use-service-context"
import { useAuth } from "@/context/auth-context"
import { METHODS } from "http"
import { toast } from "sonner"

export default function TopUpPage() {
  const [amount, setAmount] = useState<string>("")
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const { setHeader, setFooter, startLoading, stopLoading } = useLayout();
  const { userService  } = useServiceContext();
  const { me, fetchUser } = useAuth()

  useEffect(() => {
    setHeader(true)
    setFooter(true)
  }, [])

  const predefinedAmounts = ["5", "10", "20", "50", "100"]

  const handleAmountSelect = (value: string) => {
    setAmount(value)
  }

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setAmount(value)
    }
  }

  const topUpBalance = async () => {
    if (!me?.internetIdentity) {
      alert("You must be logged in to top up your balance")
      return
    }
    const response = await userService.topUpBalance(me.internetIdentity, parseFloat(amount))
    await fetchUser()
    return response
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startLoading()
    toast.promise(topUpBalance(), {
      loading: 'Processing...', 
      success: () => {
        return `Balance toped up successfully!`;
      },
      error: 'Failed to top up balance',
    })
    stopLoading()
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br p-8">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-center">Top Up Balance</CardTitle>
          <CardDescription className="text-center text-lg">Add funds to your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="grid grid-cols-3 gap-3">
                {predefinedAmounts.map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant={amount === value ? "default" : "outline"}
                    onClick={() => handleAmountSelect(value)}
                    className="h-12 text-lg"
                  >
                    ${value}
                  </Button>
                ))}
              </div>
              <div className="mt-3">
                <Input
                  id="amount"
                  type="text"
                  placeholder="Custom amount"
                  value={amount}
                  onChange={handleCustomAmount}
                  className="mt-1 h-12 text-lg"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-lg">Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-4">
                <div>
                  <RadioGroupItem value="card" id="card" className="peer sr-only" />
                  <Label
                    htmlFor="card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-6 hover:bg-foreground/5 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <CreditCard className="mb-3 h-8 w-8" />
                    <span className="text-lg">Card</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="wallet" id="wallet" className="peer sr-only" />
                  <Label
                    htmlFor="wallet"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-6 hover:bg-foreground/5 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Wallet className="mb-3 h-8 w-8" />
                    <span className="text-lg">Wallet</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full h-12 text-lg" disabled={!amount || Number.parseFloat(amount) <= 0}>
              Top Up ${amount ? Number.parseFloat(amount).toFixed(2) : "0.00"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

