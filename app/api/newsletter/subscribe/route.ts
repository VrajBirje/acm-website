import { type NextRequest, NextResponse } from "next/server"

const subscribers: string[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    if (subscribers.includes(email)) {
      return NextResponse.json({ message: "Already subscribed" }, { status: 200 })
    }

    subscribers.push(email)

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to newsletter!",
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
