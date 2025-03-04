import { Cat } from "lucide-react"

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 bg-muted/50">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Cat className="h-4 w-4" />
              <span>Why Choose Nekonnect</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              The Future of Lending is Decentralized
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Traditional financial systems are filled with inefficiencies, high costs, and limited access. Nekonnect
              changes this by leveraging blockchain technology and real-world asset backing to create a more inclusive,
              efficient, and secure lending ecosystem.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1 rounded-lg border bg-card p-4">
                <div className="text-2xl font-bold text-primary">30%</div>
                <p className="text-sm text-muted-foreground">
                  Higher returns for lenders compared to traditional savings
                </p>
              </div>
              <div className="flex flex-col gap-1 rounded-lg border bg-card p-4">
                <div className="text-2xl font-bold text-primary">50%</div>
                <p className="text-sm text-muted-foreground">Lower fees than traditional financial institutions</p>
              </div>
              <div className="flex flex-col gap-1 rounded-lg border bg-card p-4">
                <div className="text-2xl font-bold text-primary">100%</div>
                <p className="text-sm text-muted-foreground">Transparent transactions recorded on blockchain</p>
              </div>
              <div className="flex flex-col gap-1 rounded-lg border bg-card p-4">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <p className="text-sm text-muted-foreground">Access to global lending and borrowing opportunities</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto lg:ml-0 w-full max-w-md">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/30 via-primary/20 to-background border overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg?height=500&width=500&text=RWA+Blockchain"
                alt="Real World Assets and Blockchain"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

