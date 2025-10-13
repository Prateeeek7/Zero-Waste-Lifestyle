"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Leaf, Recycle, BookOpen, MessageCircle, CheckSquare, Play } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function HomePage() {
  const [stats, setStats] = useState([
    { value: "...", label: "Active Users" },
    { value: "...", label: "Waste Logs" },
    { value: "...", label: "CO₂ Saved (kg)" },
  ])

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      // Get total users
      const { count: userCount } = await supabase
        .from("profiles")
        .select("*", { count: 'exact', head: true })

      // Get total waste logs
      const { count: logsCount } = await supabase
        .from("waste_logs")
        .select("*", { count: 'exact', head: true })

      // Get total CO2 saved
      const { data: co2Data } = await supabase
        .from("profiles")
        .select("total_co2_saved")

      const totalCO2 = co2Data?.reduce((sum: number, profile: any) => sum + (profile.total_co2_saved || 0), 0) || 0

      setStats([
        { value: `${userCount || 0}+`, label: "Active Users" },
        { value: `${logsCount || 0}+`, label: "Waste Logs" },
        { value: `${Math.round(totalCO2)}kg`, label: "CO₂ Saved" },
      ])
    } catch (error) {
      console.error("Error loading stats:", error)
      // Keep default loading values on error
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/80 dark:bg-green-900/30 backdrop-blur-sm border border-green-200/50 dark:border-green-700/50 mb-8"
          >
            <Leaf className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Start Your Sustainable Journey Today
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
          >
            Zero Waste
            <br />
            Lifestyle
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Learn sustainable habits, master waste segregation, and embrace conscious living with our comprehensive
            educational platform powered by AI.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full">
              <Link href="/learn">
                <BookOpen className="w-5 h-5 mr-2" />
                Start Learning
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-3 rounded-full border-2 bg-transparent">
              <Link href="/quiz">
                <CheckSquare className="w-5 h-5 mr-2" />
                Take Quiz
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-20 h-20 bg-green-200/30 dark:bg-green-700/30 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              y: [0, 30, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200/30 dark:bg-blue-700/30 rounded-full blur-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need for Sustainable Living
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive tools and resources to help you reduce waste and live more consciously
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Card className="h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start p-0 h-auto font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                    >
                      <Link href={feature.href}>Explore {feature.title} →</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-white mb-12">
            Join the Movement
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={stat.label} variants={fadeInUp} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-green-100 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}

const features = [
  {
    title: "Interactive Learning",
    description: "Comprehensive articles and tutorials about sustainable living practices",
    icon: BookOpen,
    href: "/learn",
  },
  {
    title: "Waste Categories",
    description: "Learn proper waste segregation with interactive guides and examples",
    icon: Recycle,
    href: "/categories",
  },
  {
    title: "AI Assistant",
    description: "Get instant answers about waste disposal and sustainability questions",
    icon: MessageCircle,
    href: "/chat",
  },
  {
    title: "Progress Tracking",
    description: "Personal checklist to track your sustainability goals and achievements",
    icon: CheckSquare,
    href: "/checklist",
  },
  {
    title: "Knowledge Quiz",
    description: "Test your knowledge with gamified quizzes and earn sustainability badges",
    icon: Play,
    href: "/quiz",
  },
  {
    title: "Video Library",
    description: "Watch educational videos about zero waste practices and tips",
    icon: Play,
    href: "/videos",
  },
]
