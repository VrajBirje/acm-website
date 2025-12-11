"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Linkedin } from "lucide-react"

export default function AlumniPage() {
  const alumni = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      role: "AI Research Lead at TechCorp",
      bio: "Led groundbreaking research in deep learning during their time at ACM Chapter",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Founding Engineer at StartupXYZ",
      bio: "Built the first version of our Research Portal. Now leading engineering at a funded startup",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Marcus Johnson",
      role: "Senior Software Engineer at Google",
      bio: "Active contributor to our hackathon platform and open source projects",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

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
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">ACM Alumni</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Meet our successful alumni making a significant impact in the tech industry
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {alumni.map((person) => (
                <motion.div key={person.id} variants={itemVariants}>
                  <Card className="overflow-hidden h-full flex flex-col hover:shadow-2xl hover:shadow-secondary/20 transition-all hover:border-secondary/50 border-2 group">
                    <div className="relative h-56 w-full bg-muted overflow-hidden">
                      <Image
                        src={person.image || "/placeholder.svg"}
                        alt={person.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">{person.name}</h3>
                      <p className="text-secondary font-semibold text-sm mb-4">{person.role}</p>
                      <p className="text-muted-foreground text-sm mb-6 flex-1 leading-relaxed">{person.bio}</p>
                      <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-medium inline-flex items-center justify-center gap-2">
                        <Linkedin className="h-4 w-4" />
                        Connect
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="p-12 md:p-16 bg-gradient-to-r from-secondary to-primary text-white rounded-2xl text-center border-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Get Mentored by Our Alumni</h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Connect with successful alumni who can guide your career and help you navigate the tech industry.
              </p>
              <Button size="lg" className="bg-white text-secondary hover:bg-white/90 font-semibold" asChild>
                <a href="/contact">
                  Request a Mentor <ArrowRight className="ml-2 h-5 w-5" />
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
