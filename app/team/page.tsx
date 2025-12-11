"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, ArrowRight } from "lucide-react"

interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  image: string
  category: string
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [filter, setFilter] = useState<string>("all")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    import("@/data/team.json").then((module) => {
      setTeam(module.coreTeam)
    })
  }, [])

  const filtered = filter === "all" ? team : team.filter((member) => member.category === filter)

  const categories = [
    { value: "all", label: "All Members" },
    { value: "core", label: "Core Team" },
    { value: "tech-lead", label: "Tech Leads" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
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
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Our Team</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Meet the passionate individuals driving ACM Chapter forward with dedication and innovation.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3 justify-center mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilter(cat.value)}
                  className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
                    filter === cat.value
                      ? "bg-secondary text-white shadow-lg"
                      : "bg-card text-foreground hover:bg-card/80 border-2 border-border hover:border-secondary/50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((member) => (
                <motion.div key={member.id} variants={itemVariants}>
                  <Card className="overflow-hidden h-full flex flex-col hover:shadow-2xl hover:shadow-secondary/20 transition-all hover:border-secondary/50 border-2 group">
                    <div className="relative h-64 w-full bg-muted overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                      <p className="text-secondary font-semibold text-sm mb-4">{member.role}</p>
                      <p className="text-muted-foreground text-sm mb-6 flex-1 leading-relaxed">{member.bio}</p>
                      <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-medium">
                        <Mail className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-20 p-10 md:p-16 bg-gradient-to-r from-secondary to-primary text-white rounded-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Want to Join the Team?</h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
                We're always looking for passionate individuals to contribute to our mission. Reach out and let's
                connect!
              </p>
              <Button size="lg" className="bg-white text-secondary hover:bg-white/90 font-semibold" asChild>
                <a href="/contact">
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
