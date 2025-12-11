"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react"

interface Event {
  id: number
  title: string
  date: string
  time?: string
  location?: string
  description?: string
  image: string
  registrationUrl?: string
}

export default function EventsPage() {
  const [upcoming, setUpcoming] = useState<Event[]>([])
  const [past, setPast] = useState<Event[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    import("@/data/events.json").then((module) => {
      setUpcoming(module.upcomingEvents)
      setPast(module.pastEvents)
    })
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
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
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Events</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Join us for workshops, talks, hackathons, and community events that inspire and connect.
              </p>
            </motion.div>

            <div className="mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 flex items-center gap-3">
                <div className="h-1 w-12 bg-secondary rounded-full"></div>
                Upcoming Events
              </h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {upcoming.map((event) => (
                  <motion.div key={event.id} variants={itemVariants}>
                    <Card className="overflow-hidden h-full flex flex-col hover:shadow-2xl hover:shadow-secondary/20 transition-all hover:border-secondary/50 border-2 group">
                      <div className="relative h-48 w-full bg-muted overflow-hidden">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-4">{event.title}</h3>
                        <div className="space-y-3 text-sm text-muted-foreground mb-6 flex-1">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-secondary flex-shrink-0" />
                            <span className="font-medium">{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-secondary flex-shrink-0" />
                            <span className="font-medium">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-secondary flex-shrink-0" />
                            <span className="font-medium">{event.location}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{event.description}</p>
                        <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-medium" asChild>
                          <a href={event.registrationUrl}>
                            Register Now <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {past.length > 0 && (
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 flex items-center gap-3">
                  <div className="h-1 w-12 bg-muted-foreground rounded-full"></div>
                  Past Events
                </h2>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {past.map((event) => (
                    <motion.div key={event.id} variants={itemVariants}>
                      <Card className="overflow-hidden opacity-75 hover:opacity-100 transition-opacity border-2 border-border">
                        <div className="relative h-40 w-full bg-muted">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-foreground mb-2">{event.title}</h3>
                          <p className="text-sm text-muted-foreground font-medium">
                            {new Date(event.date).toLocaleDateString()}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
