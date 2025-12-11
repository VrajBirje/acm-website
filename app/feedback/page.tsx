"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState(5)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real app, this would save to a database
      console.log("Feedback submitted:", { feedback, rating })
      setSuccess(true)
      setFeedback("")
      setRating(5)
      setTimeout(() => setSuccess(false), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-background">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Share Your Feedback</h1>
              <p className="text-lg text-muted-foreground">Help us improve by sharing your thoughts and suggestions</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {success && (
                    <div className="p-4 bg-accent/10 text-accent rounded-lg">✓ Thank you for your feedback!</div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">How satisfied are you?</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRating(num)}
                          className={`w-10 h-10 rounded-lg border-2 transition-all ${
                            rating === num
                              ? "bg-accent border-accent text-accent-foreground"
                              : "border-border hover:border-accent"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Your Feedback</label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      required
                      rows={6}
                      placeholder="Tell us what you think..."
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
