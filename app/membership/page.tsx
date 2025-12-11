"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"

export default function MembershipPage() {
  const benefits = [
    "Access to exclusive events and workshops",
    "Mentorship from industry professionals",
    "Networking with tech leaders and innovators",
    "Early access to research publications",
    "Member-only discounts on events",
    "Community support and resources",
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white text-balance">Join ACM Chapter</h1>
              <p className="text-xl text-white/80 mb-10 leading-relaxed">
                Membership is free and open to everyone passionate about technology, innovation, and community.
              </p>
              <Button size="lg" className="bg-white text-secondary hover:bg-white/90 font-semibold" asChild>
                <a href={process.env.NEXT_PUBLIC_ACM_MEMBERSHIP_URL || "#"}>
                  Become a Member <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-background">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Membership Benefits</h2>
              <p className="text-lg text-muted-foreground">Everything you get as an ACM member</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  className="flex gap-4 p-6 rounded-lg bg-card border-2 border-border hover:border-secondary/50 hover:shadow-lg hover:shadow-secondary/20 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Check className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5 font-bold" />
                  <span className="text-foreground font-medium">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            <Card className="p-10 md:p-14 text-center bg-gradient-to-r from-secondary to-primary text-white border-2">
              <h3 className="text-3xl font-bold mb-4">Why Join?</h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                ACM Chapter is more than just an organization—it's a vibrant community of innovators, creators, and
                leaders dedicated to advancing technology and supporting each other's growth. Join us in shaping the
                future of tech.
              </p>
              <Button size="lg" className="bg-white text-secondary hover:bg-white/90 font-semibold" asChild>
                <a href={process.env.NEXT_PUBLIC_ACM_MEMBERSHIP_URL || "#"}>
                  Join Now <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
