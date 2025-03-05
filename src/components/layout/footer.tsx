import { Cat, Github, Twitter, Linkedin, Instagram } from "lucide-react"
import { Separator } from '@/components/ui/separator';

function Footer() {
  return (
    <footer className="border-t py-12 md:py-16">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <Cat className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Nekonnect</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs text-center md:text-left">
              Revolutionizing peer-to-peer lending with blockchain technology and real-world asset backing.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 sm:grid-cols-4">
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold mb-4">Platform</h3>
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
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold mb-4">Company</h3>
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
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold mb-4">Legal</h3>
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
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold mb-4">Support</h3>
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
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Nekonnect. Crafted for Hackathon 11 using Motoko, React, and TypeScript.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;