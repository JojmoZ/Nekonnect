import { Shield, Link, BarChart3, Coins, FileCheck, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Features() {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Real-World Asset Backing",
      description: "Loans secured by tangible assets providing safety and confidence for lenders.",
    },
    {
      icon: <Link className="h-10 w-10 text-primary" />,
      title: "Blockchain Technology",
      description: "Transparent, immutable records of all transactions ensuring trust and security.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Smart Risk Assessment",
      description: "Advanced algorithms to evaluate creditworthiness beyond traditional metrics.",
    },
    {
      icon: <Coins className="h-10 w-10 text-primary" />,
      title: "Competitive Returns",
      description: "Higher interest rates for lenders and lower fees for borrowers than traditional banks.",
    },
    {
      icon: <FileCheck className="h-10 w-10 text-primary" />,
      title: "Automated Compliance",
      description: "Built-in regulatory compliance to ensure legal and secure transactions.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Global Accessibility",
      description: "Connect with lenders and borrowers worldwide, expanding financial opportunities.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Powerful DeFi Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nekonnect combines the security of real-world assets with the efficiency of blockchain technology
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border bg-card hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                {feature.icon}
                <CardTitle className="text-xl mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

