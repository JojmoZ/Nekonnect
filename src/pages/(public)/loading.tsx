"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import Logo from "@/components/logo"

interface LoadingScreenProps {
  style?: React.CSSProperties;
}

export default function LoadingScreen({ style }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing")

  useEffect(() => {
    const loadingTexts = ["Initializing", "Loading resources", "Preparing data", "Almost there"]

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 15
        return newProgress > 100 ? 100 : newProgress
      })
    }, 500)

    const textInterval = setInterval(() => {
      setLoadingText((prevText) => {
        const currentIndex = loadingTexts.indexOf(prevText)
        const nextIndex = (currentIndex + 1) % loadingTexts.length
        return loadingTexts[nextIndex]
      })
    }, 2000)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 dark:from-background dark:to-background/80" style={style}>
      <div className="flex flex-col items-center space-y-8 px-4 text-center">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-primary/10 blur-xl animate-pulse"></div>
          <Logo className="relative h-16 w-auto animate-bounce" />
        </div>

        <div className="space-y-6 max-w-md">
          <div className="space-y-2">
            <p className="text-xl font-medium text-foreground">
              {loadingText}
              <span className="animate-pulse">...</span>
            </p>
            <p className="text-sm text-muted-foreground">
              We're preparing everything for you. This will only take a moment.
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-xs mx-auto space-y-2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground">{Math.round(progress)}%</p>
          </div>
        </div>

        {/* Spinner */}
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>

      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl animate-blob"></div>
        <div className="absolute top-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl animate-blob animation-delay-4000"></div>
      </div>
    </div>
  )
}