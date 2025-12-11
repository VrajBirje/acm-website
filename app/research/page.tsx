"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface Publication {
  id: number
  title: string
  authors: string[]
  year: number
  abstract: string
  institution: string
  pdfUrl: string
}

interface Institution {
  id: number
  name: string
  logo: string
}

export default function ResearchPage() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    import("@/data/publications.json").then((module) => {
      setPublications(module.publications)
      setInstitutions(module.institutions)
    })
  }, [])

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
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Research & Publications
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Explore cutting-edge research and publications from our community.
              </p>
            </motion.div>

            <div className="mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 flex items-center gap-3">
                <div className="h-1 w-12 bg-secondary rounded-full"></div>
                Publications
              </h2>
              <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
                {publications.map((pub) => (
                  <motion.div key={pub.id} variants={itemVariants}>
                    <Card className="p-8 hover:shadow-2xl hover:shadow-secondary/20 transition-all hover:border-secondary/50 border-2">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground mb-3">{pub.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2 font-medium">
                            {pub.authors.join(", ")} • {pub.year}
                          </p>
                          <p className="text-sm text-secondary font-semibold mb-3">{pub.institution}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{pub.abstract}</p>
                        </div>
                        <Button
                          className="w-full lg:w-auto bg-secondary hover:bg-secondary/90 text-white font-medium flex-shrink-0"
                          asChild
                        >
                          <a href={pub.pdfUrl}>
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </a>
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {institutions.length > 0 && (
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 flex items-center gap-3">
                  <div className="h-1 w-12 bg-secondary rounded-full"></div>
                  Partner Institutions
                </h2>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {institutions.map((inst) => (
                    <motion.div key={inst.id} variants={itemVariants}>
                      <Card className="p-8 text-center h-full hover:shadow-xl transition-all hover:border-secondary/50 border-2 group">
                        <div className="relative h-24 w-full mb-4 overflow-hidden rounded-lg bg-card">
                          <Image
                            src={inst.logo || "/placeholder.svg"}
                            alt={inst.name}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="font-bold text-foreground text-lg">{inst.name}</h3>
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
