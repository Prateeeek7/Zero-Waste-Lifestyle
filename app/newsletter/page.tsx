"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle, XCircle } from "lucide-react"

export default function NewsletterPage() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setMessage("")

    if (!email || !email.includes("@")) {
      setStatus("error")
      setMessage("Please enter a valid email address.")
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (email === "test@example.com") {
      setStatus("error")
      setMessage("This email is already subscribed.")
    } else {
      setStatus("success")
      setMessage("Thank you for subscribing! Check your inbox for a confirmation.")
      setEmail("") // Clear email on success
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
      <div className="max-w-xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Join Our Newsletter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get exclusive tips, updates, and offers on sustainable living directly in your inbox.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
        >
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Never Miss a Sustainable Tip!
            </CardTitle>
            <CardContent className="text-gray-600 dark:text-gray-300">
              Sign up today and start your journey towards a greener lifestyle.
            </CardContent>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "submitting"}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Subscribing..." : "Subscribe Now"}
              </Button>
            </form>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 rounded-lg flex items-center space-x-2 ${
                  status === "success"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                }`}
              >
                {status === "success" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                <p className="text-sm">{message}</p>
              </motion.div>
            )}
          </CardContent>
        </motion.div>
      </div>
    </div>
  )
}
