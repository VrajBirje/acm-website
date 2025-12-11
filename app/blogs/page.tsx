"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Clock, User } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  author: string
  date: string
  category: string
  featured: boolean
  image: string
}

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    import("@/data/blogs.json").then((module) => {
      setPosts(module.posts)
    })
  }, [])

  const categories = ["All", ...new Set(posts.map((p) => p.category))]
  const filtered = selectedCategory === "All" ? posts : posts.filter((p) => p.category === selectedCategory)

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
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Blog</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Insights, tutorials, and stories from our vibrant community
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
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-secondary text-white shadow-lg"
                      : "bg-card text-foreground hover:bg-card/80 border-2 border-border hover:border-secondary/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Link href={`/blogs/${post.slug}`}>
                    <Card className="overflow-hidden h-full hover:shadow-2xl hover:shadow-secondary/20 transition-all hover:border-secondary/50 border-2 cursor-pointer group">
                      <div className="grid grid-cols-3 gap-0 h-full">
                        <div className="col-span-1 relative bg-muted overflow-hidden">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="col-span-2 p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xs font-semibold px-3 py-1 bg-secondary/10 text-secondary rounded-full">
                                {post.category}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{post.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                              {post.excerpt}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4 text-secondary" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-secondary" />
                              {post.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
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
