import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Ready to Transform Your Financial Future?
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/80">
            Join thousands of users already benefiting from decentralized peer-to-peer lending. Get early access to our
            platform and be part of the financial revolution.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
            />
            <Button variant="secondary" className="gap-2">
              Get Early Access
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-4 text-sm text-primary-foreground/70">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  )
}

