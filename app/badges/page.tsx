"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Award, Lock, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

interface BadgeData {
  id: string
  name: string
  description: string
  icon: string
  requirement: string
  points: number
  tier: string
  earned: boolean
  progress?: number
}

export default function BadgesPage() {
  const [badges, setBadges] = useState<BadgeData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBadges()
  }, [])

  const loadBadges = async () => {
    if (!isSupabaseConfigured()) {
      // Load static badge data when database not connected
      setBadges([
        {
          id: "1",
          name: "First Step",
          description: "Log your first waste entry",
          icon: "🌱",
          requirement: "Log 1 waste entry",
          points: 10,
          tier: "bronze",
          earned: false,
        },
        {
          id: "2",
          name: "Week Warrior",
          description: "Log waste for 7 consecutive days",
          icon: "📅",
          requirement: "Log waste for 7 days",
          points: 50,
          tier: "silver",
          earned: false,
        },
        {
          id: "3",
          name: "Recycling Champion",
          description: "Recycle 100kg of waste",
          icon: "♻️",
          requirement: "Recycle 100kg total",
          points: 100,
          tier: "gold",
          earned: false,
        },
        {
          id: "4",
          name: "Zero Waste Hero",
          description: "Achieve 50% waste reduction",
          icon: "🏆",
          requirement: "Reduce waste by 50%",
          points: 200,
          tier: "platinum",
          earned: false,
        },
        {
          id: "5",
          name: "Eco Educator",
          description: "Complete all quizzes with perfect score",
          icon: "🎓",
          requirement: "100% on all quizzes",
          points: 150,
          tier: "gold",
          earned: false,
        },
        {
          id: "6",
          name: "Community Helper",
          description: "Add 5 recycling locations to map",
          icon: "🗺️",
          requirement: "Add 5 locations",
          points: 75,
          tier: "silver",
          earned: false,
        },
        {
          id: "7",
          name: "Plastic Reducer",
          description: "Reduce plastic waste by 25kg",
          icon: "🚫",
          requirement: "Reduce 25kg plastic",
          points: 80,
          tier: "silver",
          earned: false,
        },
        {
          id: "8",
          name: "Compost King",
          description: "Compost 50kg of organic waste",
          icon: "🌿",
          requirement: "Compost 50kg",
          points: 90,
          tier: "gold",
          earned: false,
        },
        {
          id: "9",
          name: "Green Streak",
          description: "Maintain 30-day eco activity streak",
          icon: "🔥",
          requirement: "30-day streak",
          points: 120,
          tier: "gold",
          earned: false,
        },
        {
          id: "10",
          name: "Planet Protector",
          description: "Save 100kg CO₂ emissions",
          icon: "🌍",
          requirement: "Save 100kg CO₂",
          points: 150,
          tier: "platinum",
          earned: false,
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

    // Load all badges
    const { data: allBadges } = await supabase
      .from("badges")
      .select("*")
      .order("points", { ascending: true })

    // Load user's earned badges
    const { data: earnedBadges } = await supabase
      .from("user_badges")
      .select("badge_id")
      .eq("user_id", user.id)

    const earnedIds = new Set(earnedBadges?.map((b) => b.badge_id) || [])

    if (allBadges) {
      setBadges(
        allBadges.map((badge) => ({
          ...badge,
          earned: earnedIds.has(badge.id),
        }))
      )
    }

    setLoading(false)
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum":
        return "from-purple-500 to-pink-500"
      case "gold":
        return "from-yellow-400 to-orange-500"
      case "silver":
        return "from-gray-300 to-gray-500"
      default:
        return "from-amber-600 to-amber-800"
    }
  }

  const earnedCount = badges.filter((b) => b.earned).length
  const totalPoints = badges.filter((b) => b.earned).reduce((sum, b) => sum + b.points, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Achievement Badges
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Earn badges by completing sustainability milestones
          </p>
        </motion.div>

        {/* Progress Overview */}
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {earnedCount} / {badges.length} Badges Earned
                </h3>
                <p className="text-gray-600 dark:text-gray-400">Total Points: {totalPoints}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">{Math.round((earnedCount / badges.length) * 100)}%</div>
                <p className="text-sm text-gray-500">Complete</p>
              </div>
            </div>
            <Progress value={(earnedCount / badges.length) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* Badges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`h-full backdrop-blur-sm border-0 shadow-lg ${
                badge.earned
                  ? "bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20"
                  : "bg-white/50 dark:bg-gray-800/50 opacity-75"
              }`}>
                <CardHeader className="text-center">
                  <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
                    badge.earned
                      ? `bg-gradient-to-r ${getTierColor(badge.tier)}`
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}>
                    {badge.earned ? (
                      <span className="text-4xl">{badge.icon}</span>
                    ) : (
                      <Lock className="w-8 h-8 text-gray-500" />
                    )}
                  </div>
                  <Badge className={`mb-2 ${
                    badge.earned
                      ? `bg-gradient-to-r ${getTierColor(badge.tier)} text-white border-0`
                      : "bg-gray-400"
                  }`}>
                    {badge.tier.toUpperCase()}
                  </Badge>
                  <CardTitle className={`text-xl ${
                    badge.earned ? "text-gray-900 dark:text-white" : "text-gray-500"
                  }`}>
                    {badge.name}
                  </CardTitle>
                  <CardDescription className={badge.earned ? "" : "text-gray-400"}>
                    {badge.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {badge.requirement}
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">+{badge.points}</span>
                    <span className="text-sm text-gray-500">points</span>
                  </div>
                  {badge.earned && (
                    <div className="mt-3 flex items-center justify-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Unlocked!</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
