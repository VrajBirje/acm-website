"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

interface Project {
  id: number
  title: string
  category: string
  description: string
  summary: string
  techStack: string[]
  image: string
  repoUrl: string
  demoUrl?: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState("All")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    import("@/data/projects.json").then((module) => {
      setProjects(module.projects)
    })
  }, [])

  const categories = ["All", ...new Set(projects.map((p) => p.category))]
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter)

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
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Projects</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Explore our technical projects, tools, and platforms built by the ACM community.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3 justify-center mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
                    filter === cat
                      ? "bg-secondary text-white shadow-lg"
                      : "bg-card text-foreground hover:bg-card/80 border-2 border-border hover:border-secondary/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <Card className="overflow-hidden h-full flex flex-col hover:shadow-2xl hover:shadow-secondary/20 transition-all hover:border-secondary/50 border-2 group">
                    <div className="relative h-48 w-full bg-muted overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold px-3 py-1 bg-secondary/10 text-secondary rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-5 flex-1 leading-relaxed">{project.description}</p>

                      <div className="mb-6">
                        <p className="text-xs text-muted-foreground font-semibold mb-2 uppercase tracking-wide">
                          Tech Stack
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-3 py-1 bg-secondary/10 text-secondary rounded-full font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button className="flex-1 bg-secondary hover:bg-secondary/90 text-white font-medium" asChild>
                          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Repo
                          </a>
                        </Button>
                        {project.demoUrl && (
                          <Button className="flex-1 bg-accent hover:bg-accent/90 text-white font-medium" asChild>
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
