"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Award } from "lucide-react"

interface ChecklistItem {
  id: string
  text: string
  completed: boolean
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  points: number
  completedAt?: Date
}

// Helper function to determine level based on points (copied from checklist/page.tsx for consistency)
const getLevel = (points: number) => {
  if (points >= 200) return { name: "Zero Waste Champion", color: "from-purple-500 to-pink-500" }
  if (points >= 150) return { name: "Sustainability Expert", color: "from-blue-500 to-purple-500" }
  if (points >= 100) return { name: "Eco Warrior", color: "from-green-500 to-blue-500" }
  if (points >= 50) return { name: "Green Enthusiast", color: "from-yellow-500 to-green-500" }
  return { name: "Eco Beginner", color: "from-gray-400 to-gray-600" }
}

export default function ProgressPage() {
  const [items, setItems] = useState<ChecklistItem[]>([])

  useEffect(() => {
    const savedItems = localStorage.getItem("zeroWasteChecklist")
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    }
  }, [])

  const completedItems = items.filter((item) => item.completed)
  const totalPoints = completedItems.reduce((sum, item) => sum + item.points, 0)
  const completionRate = items.length > 0 ? (completedItems.length / items.length) * 100 : 0
  const currentLevel = getLevel(totalPoints)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Your Sustainability Progress
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See how far you've come on your zero-waste journey!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{Math.round(completionRate)}%</div>
              <Progress value={completionRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalPoints}</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 dark:text-green-400">
                  Earn more points by completing checklist items!
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Level</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={`bg-gradient-to-r ${currentLevel.color} text-white border-0`}>
                <Award className="w-4 h-4 mr-2" />
                {currentLevel.name}
              </Badge>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {200 - totalPoints > 0 ? `${200 - totalPoints} points to Zero Waste Champion` : "Max level reached!"}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Completed Tasks Overview</h2>
          {completedItems.length > 0 ? (
            <ul className="space-y-3">
              {completedItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between text-gray-700 dark:text-gray-300">
                  <span className="font-medium">{item.text}</span>
                  <span className="text-sm text-green-600 dark:text-green-400">
                    +{item.points} points on{" "}
                    {item.completedAt ? new Date(item.completedAt).toLocaleDateString() : "N/A"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No tasks completed yet. Head over to the{" "}
              <a href="/checklist" className="text-green-600 hover:underline">
                Checklist
              </a>{" "}
              to start!
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
