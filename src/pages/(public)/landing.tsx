import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { ArrowRight, CreditCard, DollarSign, LineChart, Lock, PawPrint, Shield, Users } from "lucide-react"

export default function Landing() {
    return (
      <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center">
                  <div className="flex items-center gap-2 font-bold">
                      <PawPrint className="h-6 w-6 text-primary" />
                      <span className="text-xl">Nekonnect</span>
                  </div>
                  <nav className="ml-auto hidden gap-6 md:flex">
                      <a href="#features" className="text-sm font-medium transition-colors hover:text-primary">
                          Features
                      </a>
                      <a href="#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
                          How It Works
                      </a>
                      <a href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
                          Testimonials
                      </a>
                      <a href="#faq" className="text-sm font-medium transition-colors hover:text-primary">
                          FAQ
                      </a>
                  </nav>
                  <div className="ml-auto flex items-center gap-4 md:ml-4">
                      <Button variant="ghost" size="sm">
                          Log in
                      </Button>
                      <Button size="sm">Sign up</Button>
                  </div>
              </div>
          </header>

          <main className="flex-1">
              {/* Hero Section */}
              <section className="relative overflow-hidden py-20 md:py-32">
                  <div className="container flex flex-col items-center text-center">
                      <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
                      <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
                      <div className="relative">
                          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                              Peer-to-Peer Lending, Simplified
                          </div>
                          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                              Connect, Lend, <span className="text-primary">Grow</span>
                          </h1>
                          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                              Nekonnect brings borrowers and lenders together in a secure, transparent platform. Earn better returns
                              or get flexible loans with our community-driven approach.
                          </p>
                          <div className="mt-8 flex flex-wrap justify-center gap-4">
                              <Button size="lg" className="gap-2">
                                  Get Started <ArrowRight className="h-4 w-4" />
                              </Button>
                              <Button size="lg" variant="outline">
                                  Learn More
                              </Button>
                          </div>
                          <div className="mt-12 flex items-center justify-center">
                              <div className="relative rounded-xl border bg-background p-2 shadow-lg">
                                  <img
                                    src="/placeholder.svg?height=400&width=700"
                                    alt="Nekonnect dashboard preview"
                                    className="rounded-lg"
                                    width={700}
                                    height={400}
                                  />
                                  <div className="absolute -right-6 -top-6 rounded-full border bg-background p-3 shadow-lg">
                                      <PawPrint className="h-8 w-8 text-primary" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* Stats Section */}
              <section className="border-t border-b bg-muted/50 py-12">
                  <div className="container">
                      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                          <div className="flex flex-col items-center">
                              <span className="text-3xl font-bold">$24M+</span>
                              <span className="text-sm text-muted-foreground">Loans Funded</span>
                          </div>
                          <div className="flex flex-col items-center">
                              <span className="text-3xl font-bold">15K+</span>
                              <span className="text-sm text-muted-foreground">Active Users</span>
                          </div>
                          <div className="flex flex-col items-center">
                              <span className="text-3xl font-bold">8.5%</span>
                              <span className="text-sm text-muted-foreground">Avg. Return Rate</span>
                          </div>
                          <div className="flex flex-col items-center">
                              <span className="text-3xl font-bold">99.1%</span>
                              <span className="text-sm text-muted-foreground">Repayment Rate</span>
                          </div>
                      </div>
                  </div>
              </section>

              {/* Features Section */}
              <section id="features" className="py-20">
                  <div className="container">
                      <div className="mx-auto max-w-2xl text-center">
                          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Nekonnect?</h2>
                          <p className="mt-4 text-muted-foreground">
                              Our platform offers unique advantages for both lenders and borrowers.
                          </p>
                      </div>
                      <div className="mt-16 grid gap-8 md:grid-cols-3">
                          <Card>
                              <CardHeader>
                                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                      <LineChart className="h-6 w-6 text-primary" />
                                  </div>
                                  <CardTitle>Higher Returns</CardTitle>
                                  <CardDescription>
                                      Earn competitive interest rates by lending directly to borrowers without intermediaries.
                                  </CardDescription>
                              </CardHeader>
                          </Card>
                          <Card>
                              <CardHeader>
                                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                      <Shield className="h-6 w-6 text-primary" />
                                  </div>
                                  <CardTitle>Advanced Security</CardTitle>
                                  <CardDescription>
                                      Your investments and personal data are protected with bank-level encryption and security.
                                  </CardDescription>
                              </CardHeader>
                          </Card>
                          <Card>
                              <CardHeader>
                                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                      <CreditCard className="h-6 w-6 text-primary" />
                                  </div>
                                  <CardTitle>Flexible Loans</CardTitle>
                                  <CardDescription>
                                      Access competitive loan rates with flexible terms tailored to your needs.
                                  </CardDescription>
                              </CardHeader>
                          </Card>
                          <Card>
                              <CardHeader>
                                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                      <Users className="h-6 w-6 text-primary" />
                                  </div>
                                  <CardTitle>Community Driven</CardTitle>
                                  <CardDescription>
                                      Join a community that believes in financial empowerment and mutual growth.
                                  </CardDescription>
                              </CardHeader>
                          </Card>
                          <Card>
                              <CardHeader>
                                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                      <DollarSign className="h-6 w-6 text-primary" />
                                  </div>
                                  <CardTitle>Transparent Fees</CardTitle>
                                  <CardDescription>
                                      No hidden charges. We maintain complete transparency in all our operations.
                                  </CardDescription>
                              </CardHeader>
                          </Card>
                          <Card>
                              <CardHeader>
                                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                      <Lock className="h-6 w-6 text-primary" />
                                  </div>
                                  <CardTitle>Risk Management</CardTitle>
                                  <CardDescription>
                                      Advanced risk assessment tools to help you make informed lending decisions.
                                  </CardDescription>
                              </CardHeader>
                          </Card>
                      </div>
                  </div>
              </section>

              {/* How It Works Section */}
              <section id="how-it-works" className="border-t py-20 bg-muted/30">
                  <div className="container">
                      <div className="mx-auto max-w-2xl text-center">
                          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How Nekonnect Works</h2>
                          <p className="mt-4 text-muted-foreground">
                              Our simple process connects lenders and borrowers in just a few steps.
                          </p>
                      </div>
                      <div className="mt-16">
                          <div className="grid gap-12 md:grid-cols-3">
                              <div className="relative flex flex-col items-center text-center">
                                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                                      1
                                  </div>
                                  <h3 className="mt-6 text-xl font-semibold">Create an Account</h3>
                                  <p className="mt-2 text-muted-foreground">
                                      Sign up and complete our verification process to join our trusted community.
                                  </p>
                                  <div className="absolute right-0 top-8 hidden h-0.5 w-full -translate-y-1/2 bg-primary/30 md:block md:w-1/2" />
                              </div>
                              <div className="relative flex flex-col items-center text-center">
                                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                                      2
                                  </div>
                                  <h3 className="mt-6 text-xl font-semibold">Choose Your Role</h3>
                                  <p className="mt-2 text-muted-foreground">
                                      Decide whether you want to lend money or apply for a loan based on your financial goals.
                                  </p>
                                  <div className="absolute right-0 top-8 hidden h-0.5 w-1/2 -translate-y-1/2 bg-primary/30 md:block" />
                                  <div className="absolute left-0 top-8 hidden h-0.5 w-1/2 -translate-y-1/2 bg-primary/30 md:block" />
                              </div>
                              <div className="relative flex flex-col items-center text-center">
                                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                                      3
                                  </div>
                                  <h3 className="mt-6 text-xl font-semibold">Start Your Journey</h3>
                                  <p className="mt-2 text-muted-foreground">
                                      Begin lending or receive funding while tracking your progress on our intuitive dashboard.
                                  </p>
                                  <div className="absolute left-0 top-8 hidden h-0.5 w-1/2 -translate-y-1/2 bg-primary/30 md:block" />
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* Testimonials Section */}
              <section id="testimonials" className="border-t py-20">
                  <div className="container">
                      <div className="mx-auto max-w-2xl text-center">
                          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Users Say</h2>
                          <p className="mt-4 text-muted-foreground">
                              Don't just take our word for it. Here's what our community has to say.
                          </p>
                      </div>
                      <div className="mt-16 grid gap-8 md:grid-cols-3">
                          <Card>
                              <CardHeader>
                                  <div className="flex items-center gap-4">
                                      <Avatar>
                                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                                          <AvatarFallback>JD</AvatarFallback>
                                      </Avatar>
                                      <div>
                                          <CardTitle className="text-base">John Doe</CardTitle>
                                          <CardDescription>Lender since 2022</CardDescription>
                                      </div>
                                  </div>
                              </CardHeader>
                              <CardContent>
                                  <p className="text-muted-foreground">
                                      "I've been investing through Nekonnect for over a year now. The returns have been consistent and
                                      much better than my savings account."
                                  </p>
                              </CardContent>
                              <CardFooter>
                                  <div className="flex text-yellow-500">
                                      {[...Array(5)].map((_, i) => (
                                        <svg
                                          key={i}
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          fill="currentColor"
                                          className="h-4 w-4"
                                        >
                                            <path
                                              fillRule="evenodd"
                                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                              clipRule="evenodd"
                                            />
                                        </svg>
                                      ))}
                                  </div>
                              </CardFooter>
                          </Card>
                          <Card>
                              <CardHeader>
                                  <div className="flex items-center gap-4">
                                      <Avatar>
                                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                                          <AvatarFallback>JS</AvatarFallback>
                                      </Avatar>
                                      <div>
                                          <CardTitle className="text-base">Jane Smith</CardTitle>
                                          <CardDescription>Borrower</CardDescription>
                                      </div>
                                  </div>
                              </CardHeader>
                              <CardContent>
                                  <p className="text-muted-foreground">
                                      "When traditional banks turned me down for my small business loan, Nekonnect came through. The
                                      process was smooth and the interest rate was fair."
                                  </p>
                              </CardContent>
                              <CardFooter>
                                  <div className="flex text-yellow-500">
                                      {[...Array(5)].map((_, i) => (
                                        <svg
                                          key={i}
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          fill="currentColor"
                                          className="h-4 w-4"
                                        >
                                            <path
                                              fillRule="evenodd"
                                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                              clipRule="evenodd"
                                            />
                                        </svg>
                                      ))}
                                  </div>
                              </CardFooter>
                          </Card>
                          <Card>
                              <CardHeader>
                                  <div className="flex items-center gap-4">
                                      <Avatar>
                                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                                          <AvatarFallback>RJ</AvatarFallback>
                                      </Avatar>
                                      <div>
                                          <CardTitle className="text-base">Robert Johnson</CardTitle>
                                          <CardDescription>Lender & Borrower</CardDescription>
                                      </div>
                                  </div>
                              </CardHeader>
                              <CardContent>
                                  <p className="text-muted-foreground">
                                      "I've used Nekonnect as both a lender and a borrower. The platform is intuitive, and the community
                                      is supportive. Truly a game-changer."
                                  </p>
                              </CardContent>
                              <CardFooter>
                                  <div className="flex text-yellow-500">
                                      {[...Array(5)].map((_, i) => (
                                        <svg
                                          key={i}
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          fill="currentColor"
                                          className="h-4 w-4"
                                        >
                                            <path
                                              fillRule="evenodd"
                                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                              clipRule="evenodd"
                                            />
                                        </svg>
                                      ))}
                                  </div>
                              </CardFooter>
                          </Card>
                      </div>
                  </div>
              </section>

              {/* CTA Section */}
              <section className="border-t py-20 bg-primary text-primary-foreground">
                  <div className="container">
                      <div className="mx-auto max-w-3xl text-center">
                          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Get Started?</h2>
                          <p className="mt-4">
                              Join thousands of users who are already benefiting from our peer-to-peer lending platform.
                          </p>
                          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                                  Create Account
                              </Button>
                              <Button
                                size="lg"
                                variant="outline"
                                className="w-full sm:w-auto border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                              >
                                  Learn More
                              </Button>
                          </div>
                      </div>
                  </div>
              </section>

              {/* FAQ Section */}
              <section id="faq" className="border-t py-20">
                  <div className="container">
                      <div className="mx-auto max-w-2xl text-center">
                          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
                          <p className="mt-4 text-muted-foreground">Find answers to common questions about Nekonnect.</p>
                      </div>
                      <div className="mt-16 grid gap-8 md:grid-cols-2">
                          <Card>
                              <CardHeader>
                                  <CardTitle className="text-lg">How safe is my money on Nekonnect?</CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <p className="text-muted-foreground">
                                      We implement bank-level security measures and all transactions are encrypted. Additionally, we have
                                      a rigorous borrower verification process to minimize risk.
                                  </p>
                              </CardContent>
                          </Card>
                          <Card>
                              <CardHeader>
                                  <CardTitle className="text-lg">What are the minimum investment requirements?</CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <p className="text-muted-foreground">
                                      You can start lending with as little as $25, allowing you to diversify your investments across
                                      multiple borrowers.
                                  </p>
                              </CardContent>
                          </Card>
                          <Card>
                              <CardHeader>
                                  <CardTitle className="text-lg">How quickly can I get a loan?</CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <p className="text-muted-foreground">
                                      Once your application is approved, loans are typically funded within 1-3 business days, depending on
                                      lender interest.
                                  </p>
                              </CardContent>
                          </Card>
                          <Card>
                              <CardHeader>
                                  <CardTitle className="text-lg">Can I withdraw my investments early?</CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <p className="text-muted-foreground">
                                      We offer a secondary market where you can sell your loan notes to other investors, subject to
                                      availability and market conditions.
                                  </p>
                              </CardContent>
                          </Card>
                      </div>
                  </div>
              </section>

              {/* Newsletter Section */}
              <section className="border-t py-20 bg-muted/30">
                  <div className="container">
                      <div className="mx-auto max-w-2xl text-center">
                          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Stay Updated</h2>
                          <p className="mt-4 text-muted-foreground">
                              Subscribe to our newsletter for the latest updates, tips, and special offers.
                          </p>
                          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                              <Input type="email" placeholder="Enter your email" className="max-w-sm" />
                              <Button>Subscribe</Button>
                          </div>
                      </div>
                  </div>
              </section>
          </main>

          <footer className="border-t py-12 md:py-16">
              <div className="container">
                  <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                      <div className="flex flex-col items-center gap-2 md:items-start">
                          <div className="flex items-center gap-2 font-bold">
                              <PawPrint className="h-6 w-6 text-primary" />
                              <span className="text-xl">Nekonnect</span>
                          </div>
                          <p className="text-center text-sm text-muted-foreground md:text-left">
                              Connecting lenders and borrowers for a better financial future.
                          </p>
                      </div>
                      <div className="grid grid-cols-2 gap-12 sm:grid-cols-4">
                          <div className="flex flex-col gap-2">
                              <h3 className="font-semibold">Platform</h3>
                              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                  How it Works
                              </a>
                              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                  Pricing
                              </a>
                              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                  FAQ
                              </a>
                          </div>
                          <div className="flex flex-col gap-2">
                              <h3 className="font-semibold">Company</h3>
                              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                  About Us
                              </a>
                              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                  Careers
                              </a>
                              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                  Blog
                              </a>
                          </div>
                          <div className="flex flex-col gap-2">
                              <h3 className="font-semibold">Legal</h3>
                              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                  Privacy Policy
                              </a>
                              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                  Terms of Service
                              </a>
                              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                  Cookie Policy
                              </a>
                          </div>
                          <div className="flex flex-col gap-2">
                              <h3 className="font-semibold">Support</h3>
                              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                  Help Center
                              </a>
                              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                  Contact Us
                              </a>
                              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                  Community
                              </a>
                          </div>
                      </div>
                  </div>
                  <Separator className="my-8" />
                  <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                      <p className="text-center text-sm text-muted-foreground md:text-left">
                          © {new Date().getFullYear()} Nekonnect. All rights reserved.
                      </p>
                      <div className="flex gap-4">
                          <a href="#" className="text-muted-foreground hover:text-foreground">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                              >
                                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                              </svg>
                              <span className="sr-only">Facebook</span>
                          </a>
                          <a href="#" className="text-muted-foreground hover:text-foreground">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                              >
                                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                              </svg>
                              <span className="sr-only">Twitter</span>
                          </a>
                          <a href="#" className="text-muted-foreground hover:text-foreground">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                              >
                                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                              </svg>
                              <span className="sr-only">Instagram</span>
                          </a>
                          <a href="#" className="text-muted-foreground hover:text-foreground">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                              >
                                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                  <rect width="4" height="12" x="2" y="9"></rect>
                                  <circle cx="4" cy="4" r="2"></circle>
                              </svg>
                              <span className="sr-only">LinkedIn</span>
                          </a>
                      </div>
                  </div>
              </div>
          </footer>
      </div>
    )
}

