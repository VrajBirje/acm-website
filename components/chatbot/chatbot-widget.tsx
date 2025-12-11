"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Hi! I'm the ACM Chapter assistant. Ask me anything about events, membership, or joining our community!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chatbot/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      })

      const data = await res.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: data.answer || data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: "Sorry, I encountered an error. Please try again or contact us directly.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-secondary hover:bg-secondary/90 text-white shadow-xl hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-200 flex items-center justify-center"
        aria-label="Open chatbot"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-2rem)] md:max-w-none h-[550px] bg-card border-2 border-secondary rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="p-5 bg-gradient-to-r from-secondary to-primary text-white rounded-t-xl">
            <h3 className="font-bold text-lg">ACM Chapter Assistant</h3>
            <p className="text-sm text-white/80">Ask me anything about ACM</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg font-medium text-sm ${
                    msg.type === "user"
                      ? "bg-secondary text-white rounded-br-none"
                      : "bg-card border-2 border-border text-foreground rounded-bl-none"
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-card border-2 border-border text-foreground px-4 py-3 rounded-lg rounded-bl-none">
                  <p className="text-sm font-medium">Typing...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t-2 border-border bg-card">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground text-sm focus:outline-none focus:border-secondary transition-colors font-medium"
                disabled={loading}
              />
              <Button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-secondary hover:bg-secondary/90 text-white px-4 font-semibold rounded-lg"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
