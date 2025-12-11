"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface Sponsor {
  id: number
  name: string
  tier: string
  logo: string
  url: string
}

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    import("@/data/sponsors.json").then((module) => {
      setSponsors(module.sponsors)
    })
  }, [])

  const tiers = ["Platinum", "Gold", "Silver"]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 md:py-32 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Our Sponsors</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Thank you to the amazing organizations supporting our mission to advance technology and innovation.
              </p>
            </motion.div>

            {tiers.map((tier) => {
              const tierSponsors = sponsors.filter((s) => s.tier === tier)
              if (tierSponsors.length === 0) return null

              return (
                <div key={tier} className="mb-20">
                  <h2 className="text-3xl font-bold text-foreground mb-10 text-center flex items-center justify-center gap-3">
                    <div className="h-1 w-8 bg-secondary rounded-full"></div>
                    {tier} Sponsors
                    <div className="h-1 w-8 bg-secondary rounded-full"></div>
                  </h2>
                  <motion.div
                    className={`grid gap-8 ${tier === "Platinum" ? "grid-cols-1 md:grid-cols-2" : tier === "Gold" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-2 md:grid-cols-4"}`}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {tierSponsors.map((sponsor) => (
                      <motion.div key={sponsor.id} variants={itemVariants}>
                        <Card className="p-8 h-full flex flex-col items-center text-center hover:shadow-2xl hover:shadow-secondary/20 transition-all hover:border-secondary/50 border-2 group">
                          <div className="relative h-24 w-full mb-6 overflow-hidden rounded-lg bg-card">
                            <Image
                              src={sponsor.logo || "/placeholder.svg"}
                              alt={sponsor.name}
                              fill
                              className="object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <h3 className="font-bold text-foreground mb-6 flex-1 flex items-center text-lg">
                            {sponsor.name}
                          </h3>
                          <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-medium" asChild>
                            <a href={sponsor.url} target="_blank" rel="noopener noreferrer">
                              Learn More <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )
            })}

            <motion.div
              className="mt-20 p-12 md:p-16 bg-gradient-to-r from-secondary to-primary text-white rounded-2xl text-center border-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Become a Sponsor</h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Interested in supporting ACM Chapter? We offer various sponsorship opportunities to align with your
                goals and values.
              </p>
              <Button size="lg" className="bg-white text-secondary hover:bg-white/90 font-semibold" asChild>
                <a href="/contact?subject=Sponsorship%20Inquiry">
                  Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
