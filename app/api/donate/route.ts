import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, name, email } = body

    if (!amount || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const amountNum = Number.parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    // Mock payment processing
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your donation!",
        transactionId,
        amount: amountNum,
        receiptUrl: `/receipt/${transactionId}`,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
