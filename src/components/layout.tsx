
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-4xl mx-auto">{children}</div>
          </main>
        </div>
      </ThemeProvider>
      </body>
    </html>
  )
}

