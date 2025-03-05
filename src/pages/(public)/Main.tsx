"use client"

import { useState } from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Hero from "@/components/landing/hero"
import Features from "@/components/landing/features"
import HowItWorks from "@/components/landing/how-it-works"
import Benefits from "@/components/landing/benefits"
import Stats from "@/components/landing/stats"
import CTA from "@/components/landing/cta"
import Footer from "@/components/layout/footer"
import Header from "@/components/landing/header"

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        <div className="fixed top-4 right-4 z-50">
          <Button variant="outline" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            <span className="sr-only">Toggle dark mode</span>
          </Button>
        </div>
        <Header />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <Benefits />
          <Stats />
          <CTA />
        </main>
      </div>
    </div>
  )
}

export default App;

