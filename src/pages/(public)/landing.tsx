import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  ArrowRight, BarChart3,
  Cat,
  Check, Coins,
  CreditCard,
  DollarSign, FileCheck,
  Link,
  Lock,
  PawPrint,
  Shield,
  Users,
} from 'lucide-react';
import { Globe } from '@/components/magicui/globe';
import { useAuth } from '@/context/auth-context';

const steps = [
  {
    number: '01',
    title: 'Register & Verify',
    description:
      'Create an account and complete our streamlined KYC process to get started.',
    checks: [
      'Secure identity verification',
      'Quick approval process',
      'One-time setup',
    ],
  },
  {
    number: '02',
    title: 'Connect Assets',
    description:
      'Link your real-world assets that will serve as collateral for loans.',
    checks: [
      'Multiple asset types supported',
      'Accurate valuation',
      'Secure asset verification',
    ],
  },
  {
    number: '03',
    title: 'Borrow or Lend',
    description:
      'Choose to provide funds as a lender or request a loan as a borrower.',
    checks: [
      'Customizable loan terms',
      'Transparent fee structure',
      'Smart contract automation',
    ],
  },
  {
    number: '04',
    title: 'Manage & Grow',
    description:
      'Track your investments or loans and watch your financial growth.',
    checks: [
      'Real-time performance tracking',
      'Automated repayments',
      'Reinvestment opportunities',
    ],
  },
];

const features = [
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Real-World Asset Backing",
    description: "Loans secured by tangible assets providing safety and confidence for lenders.",
  },
  {
    icon: <Link className="h-6 w-6 text-primary" />,
    title: "Blockchain Technology",
    description: "Transparent, immutable records of all transactions ensuring trust and security.",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
    title: "Flexible Loans",
    description: "Access competitive loan rates with flexible terms tailored to your needs.",
  },
  {
    icon: <Coins className="h-6 w-6 text-primary" />,
    title: "Competitive Returns",
    description: "Higher interest rates for lenders and lower fees for borrowers than traditional banks.",
  },
  {
    icon: <FileCheck className="h-6 w-6 text-primary" />,
    title: "Transparent Fees",
    description: "No hidden charges. We maintain complete transparency in all our operations.",
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Global Accessibility",
    description: "Connect with lenders and borrowers worldwide, expanding financial opportunities.",
  },
];

export default function Landing() {
  const { me, login } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 h-[80dvh]">
          <div className="container flex flex-col items-center text-center">
            <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Peer-to-Peer Lending, Decentralized
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Connecting People, Empowering Finance
                With <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Blockchain</span> & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">RWA</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-muted-foreground mx-auto">
                Nekonnect isn't just about transactions—it's about meaningful financial connections. By integrating blockchain and real-world assets, we create a decentralized platform where security, transparency, and opportunity come together.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 z-10">
                {
                  me ? null : (
                    <Button size="lg" className="gap-2" onClick={login}>
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>)
                }
                
                <Button size="lg" variant="outline" onClick={() => window.scrollBy({ top: 850, behavior: "smooth" })}>
                  Learn More
                </Button>
              </div>
              <Globe className="top-[100%]" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/50 border-t border-b">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why Choose <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Nekonnect</span>?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Nekonnect changes this by leveraging blockchain technology and real-world asset backing to create a more inclusive, efficient, and secure lending ecosystem.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-md transition-all">
                  <CardHeader>
                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                How <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Nekonnect</span> Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our simple four-step process makes peer-to-peer lending
                accessible to everyone.
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary z-10 relative">
                    <span className="text-xl font-bold text-primary-foreground">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.checks.map((check, checkIndex) => (
                      <li key={checkIndex} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{check}</span>
                      </li>
                    ))}
                  </ul>

                  {index < steps.length - 1 ? (
                    <div className="hidden lg:block absolute top-7 left-[0%] w-[calc(100%+2.5rem)] h-0.5 bg-primary/20 z-0"></div>
                  ) : (
                    <div className="hidden lg:block absolute top-7 left-[0%] w-[calc(90%)] h-0.5 bg-primary/20 z-0"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="border-t py-20 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                What Our Users Say
              </h2>
              <p className="mt-4 text-muted-foreground">
                Don't just take our word for it. Here's what our community has
                to say.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="User"
                      />
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
                    "I've been investing through Nekonnect for over a year now.
                    The returns have been consistent and much better than my
                    savings account."
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
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="User"
                      />
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
                    "When traditional banks turned me down for my small business
                    loan, Nekonnect came through. The process was smooth and the
                    interest rate was fair."
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
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="User"
                      />
                      <AvatarFallback>RJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">
                        Robert Johnson
                      </CardTitle>
                      <CardDescription>Lender & Borrower</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "I've used Nekonnect as both a lender and a borrower. The
                    platform is intuitive, and the community is supportive.
                    Truly a game-changer."
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

        {/* FAQ Section */}
        <section id="faq" className="border-t py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-muted-foreground">
                Find answers to common questions about Nekonnect.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    How safe is my money on Nekonnect?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We implement bank-level security measures and all
                    transactions are encrypted. Additionally, we have a rigorous
                    borrower verification process to minimize risk.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    What are the minimum investment requirements?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    You can start lending with as little as $25, allowing you to
                    diversify your investments across multiple borrowers.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    How quickly can I get a loan?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Once your application is approved, loans are typically
                    funded within 1-3 business days, depending on lender
                    interest.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Can I withdraw my investments early?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We offer a secondary market where you can sell your loan
                    notes to other investors, subject to availability and market
                    conditions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
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
      </main>
    </div>
  );
}
