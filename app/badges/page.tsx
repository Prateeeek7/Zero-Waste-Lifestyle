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
  const [userStats, setUserStats] = useState<any>(null)

  useEffect(() => {
    loadBadges()
  }, [])

  const checkBadgeEarned = (badgeId: string, stats: any, wasteLogs: any[]) => {
    if (!stats) return false

    switch (badgeId) {
      case "1": // First Step - 10 points
        return stats.total_points >= 10
      case "2": // Week Warrior - 50 points
        return stats.total_points >= 50
      case "3": // Recycling Champion - 100 points
        return stats.total_points >= 100
      case "4": // Zero Waste Hero - 200 points
        return stats.total_points >= 200
      case "5": // Eco Educator - 150 points
        return stats.total_points >= 150
      case "6": // Community Helper - 75 points
        return stats.total_points >= 75
      case "7": // Plastic Reducer - 80 points (25kg plastic = 250 points minimum)
        return stats.total_points >= 80
      case "8": // Compost King - 90 points (50kg compost = 500 points minimum)
        return stats.total_points >= 90
      case "9": // Green Streak - 120 points (30 days minimum)
        return stats.total_points >= 120
      case "10": // Planet Protector - 150 points (100kg CO2 = significant waste)
        return stats.total_co2_saved >= 100
      default:
        return false
    }
  }

  const loadBadges = async () => {
    if (!isSupabaseConfigured()) {
      // Load static badge data when database not connected
      setBadges([
        {
          id: "1",
          name: "First Step",
          description: "Log your first waste entry",
          icon: "🌱",
          requirement: "Earn 10 points",
          points: 10,
          tier: "bronze",
          earned: false,
        },
        {
          id: "2",
          name: "Week Warrior",
          description: "Keep up the great work!",
          icon: "📅",
          requirement: "Earn 50 points",
          points: 50,
          tier: "silver",
          earned: false,
        },
        {
          id: "3",
          name: "Recycling Champion",
          description: "You're making a real difference!",
          icon: "♻️",
          requirement: "Earn 100 points",
          points: 100,
          tier: "gold",
          earned: false,
        },
        {
          id: "4",
          name: "Zero Waste Hero",
          description: "Incredible dedication to the planet!",
          icon: "🏆",
          requirement: "Earn 200 points",
          points: 200,
          tier: "platinum",
          earned: false,
        },
        {
          id: "5",
          name: "Eco Educator",
          description: "Spreading environmental knowledge!",
          icon: "🎓",
          requirement: "Earn 150 points",
          points: 150,
          tier: "gold",
          earned: false,
        },
        {
          id: "6",
          name: "Community Helper",
          description: "Helping others go green!",
          icon: "🗺️",
          requirement: "Earn 75 points",
          points: 75,
          tier: "silver",
          earned: false,
        },
        {
          id: "7",
          name: "Plastic Reducer",
          description: "Fighting plastic pollution!",
          icon: "🚫",
          requirement: "Earn 80 points",
          points: 80,
          tier: "silver",
          earned: false,
        },
        {
          id: "8",
          name: "Compost King",
          description: "Master of organic recycling!",
          icon: "🌿",
          requirement: "Earn 90 points",
          points: 90,
          tier: "gold",
          earned: false,
        },
        {
          id: "9",
          name: "Green Streak",
          description: "Consistent eco warrior!",
          icon: "🔥",
          requirement: "Earn 120 points",
          points: 120,
          tier: "gold",
          earned: false,
        },
        {
          id: "10",
          name: "Planet Protector",
          description: "Saving the Earth one action at a time!",
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

    // Load user's profile stats
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    // Load user's waste logs
    const { data: wasteLogs } = await supabase
      .from("waste_logs")
      .select("*")
      .eq("user_id", user.id)

    setUserStats(profile)

    // Define all badges with point-based requirements
    const allBadges = [
      {
        id: "1",
        name: "First Step",
        description: "Log your first waste entry",
        icon: "🌱",
        requirement: "Earn 10 points",
        points: 10,
        tier: "bronze",
      },
      {
        id: "2",
        name: "Week Warrior",
        description: "Keep up the great work!",
        icon: "📅",
        requirement: "Earn 50 points",
        points: 50,
        tier: "silver",
      },
      {
        id: "3",
        name: "Recycling Champion",
        description: "You're making a real difference!",
        icon: "♻️",
        requirement: "Earn 100 points",
        points: 100,
        tier: "gold",
      },
      {
        id: "4",
        name: "Zero Waste Hero",
        description: "Incredible dedication to the planet!",
        icon: "🏆",
        requirement: "Earn 200 points",
        points: 200,
        tier: "platinum",
      },
      {
        id: "5",
        name: "Eco Educator",
        description: "Spreading environmental knowledge!",
        icon: "🎓",
        requirement: "Earn 150 points",
        points: 150,
        tier: "gold",
      },
      {
        id: "6",
        name: "Community Helper",
        description: "Helping others go green!",
        icon: "🗺️",
        requirement: "Earn 75 points",
        points: 75,
        tier: "silver",
      },
      {
        id: "7",
        name: "Plastic Reducer",
        description: "Fighting plastic pollution!",
        icon: "🚫",
        requirement: "Earn 80 points",
        points: 80,
        tier: "silver",
      },
      {
        id: "8",
        name: "Compost King",
        description: "Master of organic recycling!",
        icon: "🌿",
        requirement: "Earn 90 points",
        points: 90,
        tier: "gold",
      },
      {
        id: "9",
        name: "Green Streak",
        description: "Consistent eco warrior!",
        icon: "🔥",
        requirement: "Earn 120 points",
        points: 120,
        tier: "gold",
      },
      {
        id: "10",
        name: "Planet Protector",
        description: "Saving the Earth one action at a time!",
        icon: "🌍",
        requirement: "Save 100kg CO₂",
        points: 150,
        tier: "platinum",
      },
    ]

    // Check which badges are earned based on user stats
    const badgesWithStatus = allBadges.map((badge) => ({
      ...badge,
      earned: checkBadgeEarned(badge.id, profile, wasteLogs || []),
      progress: profile ? Math.min(100, (profile.total_points / badge.points) * 100) : 0,
    }))

    setBadges(badgesWithStatus)
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
                <p className="text-gray-600 dark:text-gray-400">
                  {userStats ? (
                    <>Your Points: <span className="font-bold text-green-600">{userStats.total_points}</span> • Badge Points Earned: {totalPoints}</>
                  ) : (
                    <>Total Points: {totalPoints}</>
                  )}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">{badges.length > 0 ? Math.round((earnedCount / badges.length) * 100) : 0}%</div>
                <p className="text-sm text-gray-500">Complete</p>
              </div>
            </div>
            <Progress value={badges.length > 0 ? (earnedCount / badges.length) * 100 : 0} className="h-2" />
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
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <span className="text-2xl font-bold text-green-600">+{badge.points}</span>
                    <span className="text-sm text-gray-500">points</span>
                  </div>
                  {badge.earned ? (
                    <div className="mt-3 flex items-center justify-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Unlocked!</span>
                    </div>
                  ) : userStats && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{userStats.total_points} / {badge.points}</span>
                      </div>
                      <Progress value={badge.progress} className="h-2" />
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
