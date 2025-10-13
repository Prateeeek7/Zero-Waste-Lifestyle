"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, TrendingUp, Leaf, Calendar, Upload, X, IndianRupee, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

interface WasteLog {
  id: string
  user_id: string
  category: string
  weight_kg: number
  description: string
  co2_saved: number
  money_saved: number
  logged_at: string
}

interface Profile {
  id: string
  email: string
  name: string
  avatar_url?: string
  eco_level: number
  total_points: number
  total_co2_saved: number
  total_money_saved: number
}

const CATEGORIES = [
  { value: "plastic", label: "Plastic" },
  { value: "paper", label: "Paper" },
  { value: "food", label: "Food" },
  { value: "glass", label: "Glass" },
  { value: "metal", label: "Metal" },
  { value: "ewaste", label: "E-Waste" },
  { value: "other", label: "Other" },
]

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#6B7280"]

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [wasteLogs, setWasteLogs] = useState<WasteLog[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    category: "plastic",
    weight_kg: "",
    description: "",
  })

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error) {
        console.error("Error getting user:", error)
        router.push("/auth/signin")
        return
      }
      
      if (!user) {
        router.push("/auth/signin")
        return
      }

      setUser(user)
      await loadData(user.id)
    } catch (error) {
      console.error("Error in checkUser:", error)
      router.push("/auth/signin")
    }
  }

  const loadData = async (userId: string) => {
    setLoading(true)
    
    try {
      // Load profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single()

      if (profileError && profileError.code === 'PGRST116') {
        // Profile doesn't exist, create it automatically
        await createUserProfile(userId)
        
        // Try loading again
        const { data: newProfileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single()
        
        if (newProfileData) {
          setProfile(newProfileData)
        }
      } else if (profileData) {
        setProfile(profileData)
      }

      // Load waste logs
      const { data: logsData, error: logsError } = await supabase
        .from("waste_logs")
        .select("*")
        .eq("user_id", userId)
        .order("logged_at", { ascending: false })
        .limit(50)

      if (logsData) {
        setWasteLogs(logsData)
      } else if (logsError) {
        console.error("Error loading waste logs:", logsError)
        setWasteLogs([]) // Set empty array as fallback
      }
      
    } catch (error) {
      console.error("Error in loadData:", error)
      // Set fallback data to prevent crashes
      if (!profile) {
        setProfile({
          id: userId,
          email: user?.email || '',
          name: user?.user_metadata?.name || user?.email || 'User',
          eco_level: 1,
          total_points: 0,
          total_co2_saved: 0,
          total_money_saved: 0,
        })
      }
      setWasteLogs([])
    } finally {
      setLoading(false)
    }
  }

  const createUserProfile = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .insert({
          id: userId,
          email: user?.email || '',
          name: user?.user_metadata?.name || user?.email || 'User',
          eco_level: 1,
          total_points: 0,
          total_co2_saved: 0,
          total_money_saved: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      
      if (error) {
        console.error("Error creating profile:", error)
        throw error
      }
    } catch (error) {
      console.error("Failed to create profile:", error)
      throw error
    }
  }

  const calculateCO2Savings = (category: string, weight: number) => {
    const rates: Record<string, number> = {
      plastic: 2.5,
      paper: 0.9,
      glass: 0.3,
      metal: 1.5,
      ewaste: 4.0,
      food: 0.5,
      other: 0.5,
    }
    return weight * (rates[category] || 0.5)
  }

  const calculateMoneySavings = (category: string, weight: number) => {
    const rates: Record<string, number> = {
      plastic: 0.50,
      paper: 0.10,
      glass: 0.05,
      metal: 0.75,
      ewaste: 2.00,
      food: 0.20,
      other: 0.20,
    }
    return weight * (rates[category] || 0.20)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      alert("Please sign in to log waste entries")
      return
    }

    try {
      const weight = parseFloat(formData.weight_kg)
      
      if (isNaN(weight) || weight <= 0) {
        alert("Please enter a valid weight greater than 0")
        return
      }

      const co2_saved = calculateCO2Savings(formData.category, weight)
      const money_saved = calculateMoneySavings(formData.category, weight)

      const { error } = await supabase.from("waste_logs").insert({
        user_id: user.id,
        category: formData.category,
        weight_kg: weight,
        description: formData.description,
        co2_saved: co2_saved,
        money_saved: money_saved,
      })

      if (!error) {
        // Update profile stats immediately
        await updateProfileStats(user.id, co2_saved, money_saved, weight)
        
        setDialogOpen(false)
        setFormData({ category: "plastic", weight_kg: "", description: "" })
        await loadData(user.id)
        
        alert("Waste entry logged successfully! 🎉")
      } else {
        console.error("Error saving waste log:", error)
        alert(`Failed to save waste log: ${error.message || 'Unknown error'}. Please try again.`)
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error)
      alert("An unexpected error occurred. Please try again.")
    }
  }

  const updateProfileStats = async (userId: string, co2_saved: number, money_saved: number, weight: number) => {
    try {
      const pointsToAdd = Math.ceil(weight * 10)
      
      // Get current profile
      const { data: currentProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single()

      if (fetchError) {
        console.error("Error fetching profile for update:", fetchError)
        return
      }

      // Update profile with new stats
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          total_co2_saved: (currentProfile?.total_co2_saved ?? 0) + co2_saved,
          total_money_saved: (currentProfile?.total_money_saved ?? 0) + money_saved,
          total_points: (currentProfile?.total_points ?? 0) + pointsToAdd,
          updated_at: new Date().toISOString()
        })
        .eq("id", userId)

      if (updateError) {
        console.error("Error updating profile stats:", updateError)
      }
    } catch (error) {
      console.error("Error in updateProfileStats:", error)
    }
  }

  const getCategoryData = () => {
    const categoryTotals: Record<string, number> = {}
    wasteLogs.forEach((log) => {
      categoryTotals[log.category] = (categoryTotals[log.category] || 0) + log.weight_kg
    })
    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }))
  }

  const getWeeklyData = () => {
    const weeklyTotals: Record<string, number> = {}
    const today = new Date()
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
      weeklyTotals[dayName] = 0
    }

    wasteLogs.forEach((log) => {
      const logDate = new Date(log.logged_at)
      const dayName = logDate.toLocaleDateString('en-US', { weekday: 'short' })
      if (weeklyTotals[dayName] !== undefined) {
        weeklyTotals[dayName] += log.weight_kg
      }
    })

    return Object.entries(weeklyTotals).map(([day, weight]) => ({ day, weight }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome, {profile?.name || user?.email || 'User'}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300">Track your sustainability journey</p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={() => user && loadData(user.id)} 
              variant="outline"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </Button>
            
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Log Waste
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log Waste Entry</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0.5"
                      value={formData.weight_kg}
                      onChange={(e) => setFormData({ ...formData, weight_kg: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description (Optional)</label>
                    <Input
                      placeholder="e.g., plastic bottles"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Save Entry
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {profile?.total_points ?? 0}
              </div>
              <div className="flex items-center text-green-600 text-sm mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                Eco Level {profile?.eco_level ?? 1}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">CO₂ Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {(profile?.total_co2_saved ?? 0).toFixed(2)} kg
              </div>
              <div className="flex items-center text-blue-600 text-sm mt-1">
                <Leaf className="w-3 h-3 mr-1" />
                Environmental impact
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Money Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                ₹{(profile?.total_money_saved ?? 0).toLocaleString('en-IN')}
              </div>
              <div className="flex items-center text-green-600 text-sm mt-1">
                <IndianRupee className="w-3 h-3 mr-1" />
                Financial benefit
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {wasteLogs.length}
              </div>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <Calendar className="w-3 h-3 mr-1" />
                Entries tracked
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Weekly Waste Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getWeeklyData()}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="day" className="text-sm text-gray-600 dark:text-gray-400" />
                  <YAxis className="text-sm text-gray-600 dark:text-gray-400" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#333' }}
                    itemStyle={{ color: '#333' }}
                  />
                  <Bar dataKey="weight" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Waste by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={getCategoryData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {getCategoryData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#333' }}
                    itemStyle={{ color: '#333' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Logs */}
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Waste Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wasteLogs.slice(0, 10).map((log) => (
                <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{log.category.substring(0, 2).toUpperCase()}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white capitalize">{log.category}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{log.description || "No description"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{log.weight_kg} kg</div>
                    <div className="text-xs text-green-600">+{log.co2_saved.toFixed(2)} kg CO₂</div>
                    <div className="text-xs text-gray-500">{new Date(log.logged_at).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
              
              {wasteLogs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">No waste logs yet. Start tracking your impact!</p>
                  <Button onClick={() => setDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Log Your First Entry
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
