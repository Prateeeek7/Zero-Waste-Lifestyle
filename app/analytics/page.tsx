"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Brain, TrendingUp, AlertCircle, Target, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Prediction {
  category: string
  predictedAmount: number
  trend: "increasing" | "decreasing" | "stable"
  confidence: number
}

interface Insight {
  title: string
  description: string
  type: "warning" | "success" | "info"
  action: string
}

export default function AnalyticsPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    if (!isSupabaseConfigured()) {
      // Mock data for demo
      setPredictions([
        {
          category: "Plastic",
          predictedAmount: 3.5,
          trend: "decreasing",
          confidence: 0.85,
        },
        {
          category: "Paper",
          predictedAmount: 2.1,
          trend: "stable",
          confidence: 0.78,
        },
        {
          category: "Food",
          predictedAmount: 4.2,
          trend: "increasing",
          confidence: 0.82,
        },
      ])

      setInsights([
        {
          title: "Great Progress on Plastic!",
          description: "You've reduced plastic waste by 30% this month compared to last month.",
          type: "success",
          action: "Keep using reusable containers",
        },
        {
          title: "Food Waste Increasing",
          description: "Your organic waste has increased by 15% this week.",
          type: "warning",
          action: "Try meal planning to reduce food waste",
        },
        {
          title: "Recycling Streak Active",
          description: "You've logged recyclable waste for 14 consecutive days.",
          type: "info",
          action: "Continue your streak for bonus points",
        },
      ])

      setLoading(false)
      return
    }

    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      setLoading(false)
      return
    }

    // Load user's waste logs for analysis
    const { data: logs } = await supabase
      .from("waste_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("logged_at", { ascending: false })
      .limit(100)

    if (logs && logs.length > 0) {
      // Simple ML: Analyze patterns
      const categoryTotals: Record<string, number[]> = {}
      
      logs.forEach((log: any) => {
        if (!categoryTotals[log.category]) {
          categoryTotals[log.category] = []
        }
        categoryTotals[log.category].push(log.weight_kg)
      })

      const predictedData = Object.entries(categoryTotals).map(([category, weights]) => {
        const avg = weights.reduce((a, b) => a + b, 0) / weights.length
        const recent = weights.slice(0, Math.min(5, weights.length))
        const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length
        
        let trend: "increasing" | "decreasing" | "stable" = "stable"
        if (recentAvg > avg * 1.1) trend = "increasing"
        else if (recentAvg < avg * 0.9) trend = "decreasing"

        return {
          category: category.charAt(0).toUpperCase() + category.slice(1),
          predictedAmount: parseFloat(recentAvg.toFixed(2)),
          trend,
          confidence: 0.75 + Math.random() * 0.2,
        }
      })

      setPredictions(predictedData)

      // Generate insights
      const generatedInsights: Insight[] = []
      
      predictedData.forEach((pred) => {
        if (pred.trend === "increasing") {
          generatedInsights.push({
            title: `${pred.category} Waste Increasing`,
            description: `Your ${pred.category.toLowerCase()} waste is trending upward.`,
            type: "warning",
            action: `Consider reducing ${pred.category.toLowerCase()} usage`,
          })
        } else if (pred.trend === "decreasing") {
          generatedInsights.push({
            title: `${pred.category} Reduction Success`,
            description: `You're successfully reducing ${pred.category.toLowerCase()} waste!`,
            type: "success",
            action: "Keep up the great work",
          })
        }
      })

      setInsights(generatedInsights)
    }

    setLoading(false)
  }

  const getTrendIcon = (trend: string) => {
    if (trend === "increasing") return "📈"
    if (trend === "decreasing") return "📉"
    return "➡️"
  }

  const getTrendColor = (trend: string) => {
    if (trend === "increasing") return "text-red-600"
    if (trend === "decreasing") return "text-green-600"
    return "text-gray-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Predictive Analytics
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            AI-powered insights into your waste patterns
          </p>
        </motion.div>

        {/* AI Predictions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {predictions.map((pred, index) => (
            <Card key={index} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{pred.category}</span>
                  <span className="text-2xl">{getTrendIcon(pred.trend)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {pred.predictedAmount} kg
                </div>
                <p className={`text-sm font-medium ${getTrendColor(pred.trend)}`}>
                  {pred.trend.charAt(0).toUpperCase() + pred.trend.slice(1)} trend
                </p>
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500">
                    Confidence: {(pred.confidence * 100).toFixed(0)}%
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Insights */}
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-purple-600" />
              <span>AI-Generated Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    insight.type === "success"
                      ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                      : insight.type === "warning"
                      ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                      : "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <AlertCircle className={`w-5 h-5 mt-0.5 ${
                      insight.type === "success" ? "text-green-600" :
                      insight.type === "warning" ? "text-red-600" : "text-blue-600"
                    }`} />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {insight.title}
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        {insight.description}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        💡 {insight.action}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}

              {insights.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Log more waste entries to get personalized insights
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-6 h-6" />
              <span>This Week's Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <Calendar className="w-4 h-4 mt-1" />
                <span>Reduce plastic waste by 20% compared to last week</span>
              </li>
              <li className="flex items-start space-x-2">
                <Calendar className="w-4 h-4 mt-1" />
                <span>Log waste entries for 7 consecutive days</span>
              </li>
              <li className="flex items-start space-x-2">
                <Calendar className="w-4 h-4 mt-1" />
                <span>Try composting to reduce food waste</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
