import { Users, TrendingUp, Globe, Shield } from "lucide-react"

export default function Stats() {
  const stats = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      value: "10,000+",
      label: "Active Users",
      description: "Growing community of lenders and borrowers",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      value: "$25M+",
      label: "Total Volume",
      description: "Successfully facilitated in peer-to-peer loans",
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      value: "50+",
      label: "Countries",
      description: "Global reach across continents",
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      value: "99.9%",
      label: "Security Rate",
      description: "Protecting your assets and transactions",
    },
  ]

  return (
    <section id="stats" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Nekonnect by the Numbers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform is growing rapidly as more people discover the benefits of decentralized finance
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-primary mb-2">{stat.label}</div>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

