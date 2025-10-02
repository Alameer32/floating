"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, X, Send, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! 👋 I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Thanks for your message! I'm here to help you with any questions you might have. This is a demo response - in a real implementation, this would connect to your AI service.",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-[calc(100vw-2rem)]">
      {/* Chat Window */}
      {isOpen && (
        <Card className="mb-4 w-full max-w-sm sm:w-96 h-[min(500px,calc(100vh-6rem))] flex flex-col shadow-2xl border-0 bg-card/95 backdrop-blur-xl slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-[oklch(0.75_0.15_15)] to-[oklch(0.75_0.15_300)] text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8 bg-white/20">
                <AvatarFallback className="text-white">
                  <Sparkles className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm">AI Assistant</h3>
                <p className="text-xs opacity-90">Online now</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0 shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex gap-3 message-appear", message.isUser ? "justify-end" : "justify-start")}
              >
                {!message.isUser && (
                  <Avatar className="w-8 h-8 bg-gradient-to-br from-[oklch(0.75_0.15_15)] to-[oklch(0.75_0.15_300)]">
                    <AvatarFallback className="text-white">
                      <Sparkles className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                    message.isUser
                      ? "bg-[oklch(0.75_0.15_15)] text-white ml-auto" /* Light red for user */
                      : "bg-[oklch(0.96_0.02_300)] text-card-foreground" /* Very light purple for bot */,
                  )}
                >
                  <p className="text-pretty leading-relaxed">{message.content}</p>
                  <p
                    className={cn(
                      "text-xs mt-1 opacity-70",
                      message.isUser ? "text-white/70" : "text-muted-foreground",
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {message.isUser && (
                  <Avatar className="w-8 h-8 bg-secondary">
                    <AvatarFallback className="text-secondary-foreground font-semibold">U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start message-appear">
                <Avatar className="w-8 h-8 bg-gradient-to-br from-[oklch(0.75_0.15_15)] to-[oklch(0.75_0.15_300)]">
                  <AvatarFallback className="text-white">
                    <Sparkles className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-[oklch(0.96_0.02_300)] text-card-foreground rounded-2xl px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-muted/30">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border-0 bg-background/50 focus-visible:ring-1 focus-visible:ring-ring"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-[oklch(0.75_0.15_15)] to-[oklch(0.75_0.15_300)] hover:opacity-90 transition-opacity text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-[oklch(0.75_0.15_15)] to-[oklch(0.75_0.15_300)] hover:opacity-90 transition-all duration-300 border-0",
          !isOpen && "float-animation pulse-glow",
        )}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
    </div>
  )
}
