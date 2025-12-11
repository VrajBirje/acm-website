"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Team", href: "/team" },
    { label: "Events", href: "/events" },
    { label: "Blogs", href: "/blogs" },
    { label: "Projects", href: "/projects" },
    { label: "Research", href: "/research" },
    { label: "Alumni", href: "/alumni" },
    { label: "Sponsors", href: "/sponsors" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-primary text-white font-bold text-sm">
              ACM
            </div>
            <span className="hidden font-bold text-foreground sm:inline text-lg">ACM Chapter</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors rounded-md hover:bg-accent/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent/10 hover:text-accent" asChild>
              <a href="/membership">Join</a>
            </Button>
            <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-white" asChild>
              <a href="/donate">Donate</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6 text-secondary" /> : <Menu className="h-6 w-6 text-secondary" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors rounded-md hover:bg-accent/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-4 px-3">
              <Button variant="ghost" className="flex-1 text-foreground hover:bg-accent/10 hover:text-accent" asChild>
                <a href="/membership">Join</a>
              </Button>
              <Button size="sm" className="flex-1 bg-secondary hover:bg-secondary/90 text-white" asChild>
                <a href="/donate">Donate</a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
