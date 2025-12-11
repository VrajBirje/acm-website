"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, ArrowRight } from "lucide-react"

export default function DonatePage() {
  const [amount, setAmount] = useState("50")
  const [customAmount, setCustomAmount] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const presets = [10, 25, 50, 100, 250]

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const donateAmount = customAmount || amount

    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: donateAmount,
          name,
          email,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong")
        return
      }

      setSuccess(true)
      setAmount("50")
      setCustomAmount("")
      setName("")
      setEmail("")
    } catch (err) {
      setError("Failed to process donation. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-40">
          <div className="absolute inset-0 gradient-primary opacity-100"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white text-balance">Support ACM Chapter</h1>
              <p className="text-xl text-white/80">Help us continue building an amazing tech community</p>
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
                  <form onSubmit={handleDonate} className="space-y-8">
                    {success && (
                      <div className="p-4 bg-secondary/10 text-secondary rounded-lg text-sm font-medium flex items-center gap-2">
                        <span>✓</span> Thank you for your donation! You'll receive a receipt shortly.
                      </div>
                    )}
                    {error && (
                      <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm font-medium">
                        {error}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-4">Select Amount</label>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {presets.map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => {
                              setAmount(preset.toString())
                              setCustomAmount("")
                            }}
                            className={`py-3 px-4 rounded-lg border-2 transition-all font-semibold ${
                              amount === preset.toString() && !customAmount
                                ? "bg-secondary text-white border-secondary"
                                : "border-border hover:border-secondary/50 text-foreground hover:bg-card"
                            }`}
                          >
                            ${preset}
                          </button>
                        ))}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Custom Amount ($)</label>
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value)
                            if (e.target.value) setAmount("")
                          }}
                          placeholder="Enter your amount"
                          className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:border-secondary outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:border-secondary outline-none transition-colors"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:border-secondary outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-3"
                      disabled={loading || !name || !email}
                    >
                      <Heart className="h-5 w-5 mr-2" />
                      {loading ? "Processing..." : `Donate $${customAmount || amount}`}
                    </Button>
                  </form>
                </Card>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-8 bg-secondary/10 border-2 border-secondary">
                  <h3 className="font-bold text-foreground text-lg mb-4">Your Impact</h3>
                  <ul className="space-y-4 text-sm text-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-secondary font-bold text-lg leading-none">✓</span>
                      <span className="font-medium">Supports workshops and training events</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-secondary font-bold text-lg leading-none">✓</span>
                      <span className="font-medium">Funds research and innovation projects</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-secondary font-bold text-lg leading-none">✓</span>
                      <span className="font-medium">Enables mentorship programs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-secondary font-bold text-lg leading-none">✓</span>
                      <span className="font-medium">Builds community infrastructure</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-8 border-2">
                  <h3 className="font-bold text-foreground text-lg mb-3">Corporate Sponsorship?</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    For corporate partnerships or large donations, please get in touch with our team.
                  </p>
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold" asChild>
                    <a href="/contact">
                      Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
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
