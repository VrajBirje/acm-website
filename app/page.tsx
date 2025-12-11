"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Users, Zap, BookOpen } from "lucide-react"

export default function Home() {
  const [blogData, setBlogData] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    import("@/data/blogs.json").then((module) => {
      setBlogData(module.posts.filter((p) => p.featured).slice(0, 3))
    })
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-40">
          <div className="absolute inset-0 gradient-primary opacity-100"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white text-balance">Join the Tech Revolution</h1>
              <p className="text-xl md:text-2xl text-white/80 mb-10 text-balance">
                Where innovation meets community. Discover cutting-edge events, research, and mentorship.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-secondary hover:bg-white/90 font-semibold" asChild>
                  <Link href="/membership">
                    Join Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white/10 bg-transparent font-semibold"
                  asChild
                >
                  <Link href="/events">Explore Events</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">About ACM Chapter</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We are a community-driven organization dedicated to advancing computing and technology education through
                events, research, mentorship, and collaboration.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: Users,
                  title: "Community",
                  description: "Connect with like-minded tech enthusiasts and build lasting relationships.",
                },
                {
                  icon: Zap,
                  title: "Innovation",
                  description: "Participate in cutting-edge projects and explore emerging technologies.",
                },
                {
                  icon: BookOpen,
                  title: "Learning",
                  description: "Access workshops, mentorship, and knowledge from industry experts.",
                },
              ].map((item, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <Card className="p-8 text-center h-full border-2 hover:border-accent transition-colors hover:shadow-xl hover:shadow-accent/20 group">
                    <div className="mb-4 inline-flex p-3 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                      <item.icon className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-gradient-to-r from-secondary to-primary text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { label: "Members", value: "1100+" },
                { label: "Events", value: "48+" },
                { label: "Participants", value: "4100+" },
                { label: "Publications", value: "50+" },
              ].map((stat, idx) => (
                <motion.div key={idx} variants={itemVariants} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-white">{stat.value}</div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {blogData.length > 0 && (
          <section className="py-20 md:py-32 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                className="flex items-center justify-between mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">Latest from Our Blog</h2>
                </div>
                <Link
                  href="/blogs"
                  className="text-accent hover:text-accent/80 transition-colors flex items-center gap-2 font-semibold hidden md:flex"
                >
                  View All <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {blogData.map((post) => (
                  <motion.div key={post.id} variants={itemVariants}>
                    <Card className="overflow-hidden h-full flex flex-col hover:shadow-2xl transition-all hover:border-accent/50 group">
                      <div className="relative h-48 w-full bg-muted overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-semibold px-3 py-1 bg-secondary/10 text-secondary rounded-full">
                            {post.category}
                          </span>
                          <span className="text-xs text-muted-foreground">{post.date}</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-foreground line-clamp-2">{post.title}</h3>
                        <p className="text-muted-foreground text-sm mb-6 line-clamp-2 flex-1">{post.excerpt}</p>
                        <Link
                          href={`/blogs/${post.slug}`}
                          className="text-accent font-semibold text-sm hover:text-accent/80 transition-colors inline-flex items-center gap-1"
                        >
                          Read More <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              <div className="text-center mt-8 md:hidden">
                <Link
                  href="/blogs"
                  className="text-accent hover:text-accent/80 transition-colors font-semibold inline-flex items-center gap-2"
                >
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="py-20 md:py-32 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Join?</h2>
              <p className="text-xl text-white/80 mb-8">
                Become part of a thriving community of innovators and tech enthusiasts.
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold" asChild>
                <Link href="/membership">Get Started Today</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
