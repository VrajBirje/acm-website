"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-foreground mb-4">500</h1>
          <p className="text-2xl text-muted-foreground mb-8">Something went wrong</p>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            We encountered an unexpected error. Please try again or contact us for support.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-transparent" onClick={() => reset()}>
              Try Again
            </Button>
            <Button size="lg" asChild>
              <a href="/">Go Home</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
