import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ACM Chapter - Innovation & Technology Community",
  description: "Join ACM Chapter for events, research, mentorship, and cutting-edge tech collaboration.",
  generator: "v0.app",
  openGraph: {
    title: "ACM Chapter - Innovation & Technology Community",
    description: "Join ACM Chapter for events, research, mentorship, and cutting-edge tech collaboration.",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        {children}
        <ChatbotWidget />
        <Analytics />
      </body>
    </html>
  )
}
