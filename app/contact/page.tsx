"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Linkedin, Github, MessageSquare, ArrowRight } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong")
        return
      }

      setSuccess(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError("Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 md:py-32 bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Get in Touch</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Have questions or want to collaborate? We'd love to hear from you. Send us a message and we'll respond
                as soon as possible.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-8 md:p-10 border-2">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {success && (
                      <div className="p-4 bg-secondary/10 text-secondary rounded-lg text-sm font-medium flex items-center gap-2">
                        <span>✓</span> Message sent successfully! We'll get back to you soon.
                      </div>
                    )}
                    {error && (
                      <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm font-medium">
                        {error}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:border-secondary outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:border-secondary outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:border-secondary outline-none transition-colors"
                        placeholder="Collaboration inquiry"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:border-secondary outline-none transition-colors resize-none"
                        placeholder="Your message here..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-3"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"} {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
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
                <Card className="p-6 border-2 hover:shadow-lg hover:shadow-secondary/20 transition-all">
                  <div className="flex gap-4">
                    <Mail className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Email</h3>
                      <a
                        href="mailto:hello@acmchapter.org"
                        className="text-secondary hover:text-secondary/80 font-medium text-sm"
                      >
                        hello@acmchapter.org
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 hover:shadow-lg hover:shadow-secondary/20 transition-all">
                  <div className="flex gap-4">
                    <MessageSquare className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Discord Community</h3>
                      <a href="#" className="text-secondary hover:text-secondary/80 font-medium text-sm">
                        Join our server
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2">
                  <h3 className="font-bold text-foreground mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: Linkedin, label: "LinkedIn", href: "#" },
                      { icon: Github, label: "GitHub", href: "#" },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className="p-3 rounded-lg bg-secondary/10 border-2 border-secondary hover:bg-secondary hover:text-white transition-all"
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
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
