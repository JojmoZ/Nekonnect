import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Users } from "lucide-react"
import { StartProjectOverlay } from "@/components/start-project-overlay"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isStartProjectOpen, setIsStartProjectOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="bg-secondary">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Users className="h-6 w-6" />
            <span className="text-xl font-bold">Crowdfunding Central</span>
          </Link>
          <div className="hidden md:flex space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="default" onClick={() => setIsStartProjectOpen(true)}>
              Start a Project
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link href="/" onClick={toggleMenu}>
                Home
              </Link>
            </Button>
            <Button
              variant="default"
              className="w-full"
              onClick={() => {
                setIsStartProjectOpen(true)
                setIsMenuOpen(false)
              }}
            >
              Start a Project
            </Button>
          </div>
        )}
      </div>
      <StartProjectOverlay isOpen={isStartProjectOpen} onClose={() => setIsStartProjectOpen(false)} />
    </nav>
  )
}

