import { Check } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Register & Verify",
      description: "Create an account and complete our streamlined KYC process to get started.",
      checks: ["Secure identity verification", "Quick approval process", "One-time setup"],
    },
    {
      number: "02",
      title: "Connect Assets",
      description: "Link your real-world assets that will serve as collateral for loans.",
      checks: ["Multiple asset types supported", "Automated valuation", "Secure asset verification"],
    },
    {
      number: "03",
      title: "Borrow or Lend",
      description: "Choose to provide funds as a lender or request a loan as a borrower.",
      checks: ["Customizable loan terms", "Transparent fee structure", "Smart contract automation"],
    },
    {
      number: "04",
      title: "Manage & Grow",
      description: "Track your investments or loans and watch your financial growth.",
      checks: ["Real-time performance tracking", "Automated repayments", "Reinvestment opportunities"],
    },
  ]

  return (
    <section id="how-it-works" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">How Nekonnect Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our simple four-step process makes peer-to-peer lending accessible to everyone
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <span className="text-xl font-bold text-primary">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground mb-4">{step.description}</p>
              <ul className="space-y-2">
                {step.checks.map((check, checkIndex) => (
                  <li key={checkIndex} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{check}</span>
                  </li>
                ))}
              </ul>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-[calc(100%-0.5rem)] w-[calc(100%-2rem)] h-0.5 bg-primary/20"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

