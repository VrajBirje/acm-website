import { type NextRequest, NextResponse } from "next/server"

// Fuzzy string matching for better search
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase()
  const s2 = str2.toLowerCase()

  if (s1 === s2) return 1
  if (s1.includes(s2) || s2.includes(s1)) return 0.8

  let matches = 0
  for (const char of s1) {
    if (s2.includes(char)) matches++
  }
  return matches / Math.max(s1.length, s2.length)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query } = body

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    // Import FAQ data
    const faqModule = await import("@/data/chatbot_faq.json")
    const faqs = faqModule.faqs

    // Find best matching FAQ
    let bestMatch = null
    let bestScore = 0

    for (const faq of faqs) {
      const score = calculateSimilarity(query, faq.question)
      if (score > bestScore) {
        bestScore = score
        bestMatch = faq
      }
    }

    if (bestScore > 0.3 && bestMatch) {
      return NextResponse.json(
        {
          success: true,
          answer: bestMatch.answer,
          question: bestMatch.question,
          confidence: Math.round(bestScore * 100),
        },
        { status: 200 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "I couldn't find an answer to that question. Please contact us directly.",
        contactUrl: "/contact",
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
