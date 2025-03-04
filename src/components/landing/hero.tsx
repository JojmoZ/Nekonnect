import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(120,119,198,0.15),transparent)]"></div>
      <div className="absolute top-0 right-0 -z-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"></div>

      <div className="container">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm font-medium">
              <span className="text-primary">Decentralized Finance</span>
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">Beta</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Peer-to-Peer Lending <span className="text-primary">Reimagined</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Nekonnect connects borrowers and lenders directly, secured by real-world assets and blockchain technology
              for transparent, efficient, and accessible financial services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button size="lg" className="gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=32&width=32&text=${i}`}
                      alt="User avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p>
                Join <span className="font-medium text-foreground">2,000+</span> users already on the platform
              </p>
            </div>
          </div>
          <div className="relative mx-auto lg:mr-0 w-full max-w-md">
            <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg?height=400&width=500&text=Nekonnect"
                alt="Nekonnect platform preview"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-lg bg-primary/30 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

