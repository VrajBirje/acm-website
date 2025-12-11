"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  date: string
  category: string
  featured: boolean
  image: string
}

export default function BlogDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    import("@/data/blogs.json").then((module) => {
      const found = module.posts.find((p: BlogPost) => p.slug === slug)
      // `found` can be `undefined` if no post matches — convert to `null`
      setPost(found ?? null)
    })
  }, [slug])

  if (!mounted) return null
  if (!post) return <div>Post not found</div>

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="py-20 md:py-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/blogs"
              className="flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors mb-10 font-semibold"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Blog
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-10 font-medium">
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold">
                  {post.category}
                </span>
                <span>By {post.author}</span>
                <span>{post.date}</span>
              </div>

              <div className="relative h-96 w-full mb-12 rounded-xl overflow-hidden border-2 border-border shadow-xl">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>

              <div className="prose prose-invert max-w-none text-foreground leading-relaxed space-y-6">
                <p className="text-xl text-muted-foreground font-medium">{post.excerpt}</p>
                <div className="text-lg whitespace-pre-wrap text-foreground/90">{post.content}</div>
              </div>

              <div className="mt-16 p-8 bg-card border-2 border-border rounded-xl">
                <h3 className="font-bold text-foreground mb-3 text-lg">About the Author</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {post.author} is a member of ACM Chapter contributing to our community with insightful articles and
                  research.
                </p>
              </div>
            </motion.div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
