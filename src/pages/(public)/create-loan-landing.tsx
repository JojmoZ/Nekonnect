"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { Link } from "react-router"
import { RouteEnum } from "@/lib/enum/router-enum"
import Logo from "@/components/logo"
import { ArrowRight, Shield, Clock, Percent, CreditCard, CheckCircle2, Calculator } from "lucide-react"

const faqData = [
  {
    id: "item-1",
    question: "What is the process for borrowing a loan on nekonnect?",
    answer:
      "To borrow a loan, simply create an account, complete your profile verification, and apply for a loan by selecting your desired amount and term. Once approved, funds will be disbursed directly to your account.",
  },
  {
    id: "item-2",
    question: "What types of loans do nekonnect offer?",
    answer:
      "We offer flexible loans backed by real-world assets. These loans are designed to provide competitive rates with terms that match your financial needs.",
  },
  {
    id: "item-3",
    question: "How is my loan backed by assets?",
    answer:
      "All loans are secured with tangible assets that act as collateral, providing safety for lenders and better rates for borrowers.",
  },
  {
    id: "item-4",
    question: "How quickly can I receive my loan?",
    answer:
      "Once your loan application is approved, funds are typically disbursed within 24-48 hours, depending on your banking institution.",
  },
  {
    id: "item-5",
    question: "What happens if I can't repay my loan on time?",
    answer:
      "We understand that financial situations can change. If you anticipate difficulty making a payment, please contact us immediately to discuss options for restructuring your repayment plan.",
  },
]

export function CreateLoanLanding() {
  const [loanAmount, setLoanAmount] = useState(5000)
  const [loanDays, setLoanDays] = useState(180)

  const calculateMultiplier = (monthlyRate: number = 0.5, days: number): number => {
    const months = days / 30;
    return Math.pow(1 + monthlyRate / 100, months);
  };

const repaymentAmount = loanAmount * calculateMultiplier(0.5, loanDays);
const interestAmount = repaymentAmount - loanAmount;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/100 to-primary/50 z-10"></div>
        <img src="./assets/borrower_landing.jpg" alt="Financial freedom" className="w-full h-[600px] object-cover" />
        <div className="absolute inset-0 z-20 container mx-auto flex flex-col justify-center px-8">
          <div className="max-w-2xl">
            <div className="mb-6">
              <Logo className="h-16 dark" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-shadow-lg">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Financial Freedom</span> Is Just A Click Away
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-xl">
              Access the funds you need with our secure, asset-backed loans at competitive rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={RouteEnum.CREATE_POST}>
                <Button size="lg" className="gap-2 px-8 w-full sm:w-auto">
                  Apply Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Calculator Section */}
      <section className="relative w-full bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                <Calculator className="h-4 w-4" />
                <span>Loan Calculator</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">See How Much You Could Save</h2>
              <p className="text-muted-foreground mb-6">
                Our transparent loan terms mean no hidden fees or surprises. Use our calculator to see exactly what
                you'll pay.
              </p>
              <ul className="space-y-3">
                {[
                  "Small monthly interest rate",
                  "No application or hidden fees",
                  "Early repayment with no penalties",
                  "Flexible terms from your chosen date",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6">Calculate Your Repayment</h3>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Loan Amount</label>
                      <span className="text-sm font-bold">${loanAmount.toLocaleString()}</span>
                    </div>
                    <Slider
                      value={[loanAmount]}
                      min={1000}
                      max={50000}
                      step={1000}
                      onValueChange={(value) => setLoanAmount(value[0])}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$1,000</span>
                      <span>$50,000</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Loan Term (Days)</label>
                      <span className="text-sm font-bold">{loanDays} days</span>
                    </div>
                    <Slider
                      value={[loanDays]}
                      min={30}
                      max={365}
                      step={30}
                      onValueChange={(value) => setLoanDays(value[0])}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>30 days</span>
                      <span>365 days</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Monthly Interest Rate:</span>
                      <span className="font-medium">0.5x</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Total Interest:</span>
                      <span className="font-medium">${interestAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold mt-4">
                      <span>Total Repayment:</span>
                      <span className="text-primary">${repaymentAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link to={RouteEnum.CREATE_POST} className="block w-full">
                    <Button className="w-full gap-2">
                      Apply for This Loan
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about borrowing with Nekonnect.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map(({ id, question, answer }) => (
              <AccordionItem key={id} value={id} className="border-b">
                <AccordionTrigger className="text-lg font-medium py-4">{question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-4">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}