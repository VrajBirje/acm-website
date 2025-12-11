"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface Stat {
  year: number
  members: number
  events: number
  participants: number
}

export default function StatsPage() {
  const [stats, setStats] = useState<Stat[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    import("@/data/stats.json").then((module) => {
      setStats(module.stats)
    })
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Growth Statistics</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tracking our community growth and impact over the years.
              </p>
            </motion.div>

            {/* Latest Stats */}
            {stats.length > 0 && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, staggerChildren: 0.1 }}
              >
                {[
                  { label: "Current Members", value: stats[stats.length - 1].members },
                  { label: "Annual Events", value: stats[stats.length - 1].events },
                  { label: "Annual Participants", value: stats[stats.length - 1].participants },
                  { label: "Years Active", value: stats.length },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                  >
                    <Card className="p-6 text-center bg-accent/5">
                      <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
                      <div className="text-foreground font-medium">{stat.label}</div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Charts */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Members Chart */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Membership Growth</h2>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="year" stroke="var(--color-muted-foreground)" />
                      <YAxis stroke="var(--color-muted-foreground)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--color-card)",
                          border: "1px solid var(--color-border)",
                          color: "var(--color-foreground)",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="members"
                        stroke="var(--color-accent)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-accent)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Events Chart */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Events & Participants</h2>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="year" stroke="var(--color-muted-foreground)" />
                      <YAxis stroke="var(--color-muted-foreground)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--color-card)",
                          border: "1px solid var(--color-border)",
                          color: "var(--color-foreground)",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="events"
                        stroke="var(--color-chart-2)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-chart-2)" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="participants"
                        stroke="var(--color-chart-1)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-chart-1)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
