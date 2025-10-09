"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Trophy, Medal, Award, TrendingUp, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"

interface LeaderboardEntry {
  id: string
  name: string
  total_points: number
  total_co2_saved: number
  eco_level: number
  avatar_url?: string
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"points" | "co2">("points")

  useEffect(() => {
    loadLeaderboard()
  }, [filter])

  const loadLeaderboard = async () => {
    setLoading(true)
    
    const orderBy = filter === "points" ? "total_points" : "total_co2_saved"
    
    const { data } = await supabase
      .from("profiles")
      .select("id, name, total_points, total_co2_saved, eco_level, avatar_url")
      .order(orderBy, { ascending: false })
      .limit(100)

    if (data) setLeaderboard(data)
    setLoading(false)
  }

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>
  }

  const getLevelColor = (level: number) => {
    if (level >= 10) return "from-purple-500 to-pink-500"
    if (level >= 7) return "from-blue-500 to-purple-500"
    if (level >= 4) return "from-green-500 to-blue-500"
    return "from-yellow-500 to-green-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Global Leaderboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            See how you rank among eco-warriors worldwide
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            variant={filter === "points" ? "default" : "outline"}
            onClick={() => setFilter("points")}
            className={filter === "points" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            By Points
          </Button>
          <Button
            variant={filter === "co2" ? "default" : "outline"}
            onClick={() => setFilter("co2")}
            className={filter === "co2" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            <Filter className="w-4 h-4 mr-2" />
            By CO₂ Saved
          </Button>
        </div>

        {/* Top 3 */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {leaderboard.slice(0, 3).map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-xl ${index === 0 ? "md:scale-105" : ""}`}>
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-4">
                    {getMedalIcon(index + 1)}
                  </div>
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-white">
                      {entry.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{entry.name}</h3>
                  <Badge className={`bg-gradient-to-r ${getLevelColor(entry.eco_level)} text-white border-0 mb-2`}>
                    Level {entry.eco_level}
                  </Badge>
                  <div className="mt-4 space-y-2">
                    <div className="text-2xl font-bold text-green-600">{entry.total_points}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">points</div>
                    <div className="text-lg font-semibold text-blue-600">{entry.total_co2_saved.toFixed(2)} kg</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">CO₂ saved</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.slice(3).map((entry, index) => {
                const rank = index + 4
                return (
                  <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <span className="text-lg font-bold text-gray-600 dark:text-gray-400">#{rank}</span>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-white">
                          {entry.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{entry.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Level {entry.eco_level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{entry.total_points}</div>
                      <div className="text-sm text-blue-600">{entry.total_co2_saved.toFixed(2)} kg CO₂</div>
                    </div>
                  </div>
                )
              })}

              {leaderboard.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No entries yet. Be the first!</p>
                </div>
              )}

              {loading && (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
