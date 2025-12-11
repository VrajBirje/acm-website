import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          <p className="text-2xl text-muted-foreground mb-8">Page not found</p>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          <Button size="lg" asChild>
            <Link href="/">Go Back Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
