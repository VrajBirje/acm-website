"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Zap, Star, ArrowRight } from "lucide-react"

export default function NewsletterPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong")
        return
      }

      setSuccess(true)
      setEmail("")
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError("Failed to subscribe. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const featuredNews = [
    {
      icon: TrendingUp,
      title: "AI Trends 2025",
      description: "The latest developments in artificial intelligence and machine learning",
    },
    {
      icon: Zap,
      title: "Hot Topics",
      description: "What's buzzing in the tech community this week",
    },
    {
      icon: Star,
      title: "Fun Facts",
      description: "Interesting discoveries and quotes from our community",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-40">
          <div className="absolute inset-0 gradient-primary opacity-100"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white text-balance">ACM Newsletter</h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Stay updated with the latest news, events, and insights from ACM Chapter
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-10 border-2">
                  <h2 className="text-3xl font-bold text-foreground mb-8">Subscribe Now</h2>
                  <form onSubmit={handleSubscribe} className="space-y-6">
                    {success && (
                      <div className="p-4 bg-secondary/10 text-secondary rounded-lg text-sm font-medium flex items-center gap-2">
                        <span>✓</span> Successfully subscribed! Check your email for confirmation.
                      </div>
                    )}
                    {error && (
                      <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm font-medium">
                        {error}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:border-secondary outline-none transition-colors font-medium"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-3"
                      disabled={loading}
                    >
                      {loading ? "Subscribing..." : "Subscribe"} {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center leading-relaxed">
                      We respect your privacy. Unsubscribe anytime.
                    </p>
                  </form>
                </Card>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">What You'll Get</h2>
                  <div className="space-y-5">
                    {featuredNews.map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-lg hover:bg-card/50 transition-colors">
                        <div className="p-2 rounded-lg bg-secondary/10">
                          <item.icon className="h-6 w-6 text-secondary flex-shrink-0" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground">{item.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Card className="p-6 bg-secondary/10 border-2 border-secondary">
                  <p className="text-sm text-foreground leading-relaxed">
                    <span className="font-semibold">Pro tip:</span> Our newsletter is carefully curated to keep you
                    informed without overwhelming your inbox.
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
