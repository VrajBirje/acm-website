import { type NextRequest, NextResponse } from "next/server"

// Simple in-memory storage for demo (in production, use a database)
const submissions: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Store submission
    submissions.push({
      id: submissions.length + 1,
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received. We will get back to you soon!",
        id: submissions.length,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ submissions })
}
