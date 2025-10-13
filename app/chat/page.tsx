"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Bot, User, ImageIcon, Trash2 } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useChat } from "ai/react"

export default function ChatPage() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, error } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          'Hello! I\'m your Zero Waste AI Assistant. I\'m here to help you with:\n\n🗂️ **Waste disposal questions** - "How do I dispose of old electronics?"\n♻️ **Recycling guidance** - "Is this pizza box recyclable?"\n🌱 **Sustainability tips** - "How can I reduce plastic in my kitchen?"\n📸 **Image analysis** - Upload photos of items for disposal advice\n\nWhat would you like to know about sustainable living?',
      },
    ],
    onError: (error) => {
      console.error('Chat error:', error)
    },
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (imageFile) {
      handleSubmit(e, {
        data: {
          imageUploaded: true,
          imageName: imageFile.name,
        },
      })
      setImageFile(null)
    } else {
      handleSubmit(e)
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content:
          'Hello! I\'m your Zero Waste AI Assistant. I\'m here to help you with:\n\n🗂️ **Waste disposal questions** - "How do I dispose of old electronics?"\n♻️ **Recycling guidance** - "Is this pizza box recyclable?"\n🌱 **Sustainability tips** - "How can I reduce plastic in my kitchen?"\n📸 **Image analysis** - Upload photos of items for disposal advice\n\nWhat would you like to know about sustainable living?',
      },
    ])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-5rem)] flex flex-col">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Zero Waste AI Assistant
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Get instant answers about waste disposal and sustainability
              </p>
            </div>
          </div>
          <Button onClick={clearChat} variant="outline" size="sm" className="mb-4 bg-transparent">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Chat
          </Button>
        </motion.div>

        {/* Chat Messages */}
        <Card className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg flex flex-col">
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-start space-x-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "user" ? "bg-blue-500" : "bg-gradient-to-r from-green-500 to-blue-500"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    }`}
                  >
                    {message.role === "user" ? (
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                    ) : (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown
                          components={{
                            p: ({node, ...props}) => <p className="mb-2" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                            li: ({node, ...props}) => <li className="mb-1" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                            em: ({node, ...props}) => <em className="italic" {...props} />,
                            code: ({node, ...props}) => <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded" {...props} />,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input Area */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            {error && (
              <div className="mb-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <span className="text-sm text-red-700 dark:text-red-300">
                  ⚠️ Error: {error.message || 'Failed to send message. Please try again.'}
                </span>
              </div>
            )}
            {imageFile && (
              <div className="mb-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-between">
                <span className="text-sm text-green-700 dark:text-green-300 flex items-center">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  {imageFile.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setImageFile(null)}
                  className="h-6 w-6 p-0 text-green-700 dark:text-green-300"
                >
                  ×
                </Button>
              </div>
            )}
            <form onSubmit={onSubmit} className="flex space-x-3">
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 flex-shrink-0"
              >
                <ImageIcon className="w-4 h-4" />
              </Button>
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about waste disposal, recycling, or sustainability..."
                className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || (!input.trim() && !imageFile)}
                className="bg-green-600 hover:bg-green-700 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
              💡 Try asking: "How do I dispose of batteries?" or "Is this container recyclable?"
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
