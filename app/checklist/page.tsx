"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, Plus, Trash2, Target, TrendingUp, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

interface ChecklistItem {
  id: string
  text: string
  completed: boolean
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  points: number
  completedAt?: Date
}

const defaultItems: ChecklistItem[] = [
  {
    id: "1",
    text: "Use a reusable water bottle for a week",
    completed: false,
    category: "Reduce",
    difficulty: "Easy",
    points: 10,
  },
  {
    id: "2",
    text: "Start composting food scraps",
    completed: false,
    category: "Compost",
    difficulty: "Medium",
    points: 25,
  },
  {
    id: "3",
    text: "Replace single-use bags with reusable ones",
    completed: false,
    category: "Reduce",
    difficulty: "Easy",
    points: 15,
  },
  {
    id: "4",
    text: "Set up a home recycling system",
    completed: false,
    category: "Recycle",
    difficulty: "Medium",
    points: 20,
  },
  {
    id: "5",
    text: "Go plastic-free for personal care items",
    completed: false,
    category: "Reduce",
    difficulty: "Hard",
    points: 40,
  },
  {
    id: "6",
    text: "Donate or sell items instead of throwing away",
    completed: false,
    category: "Reuse",
    difficulty: "Easy",
    points: 15,
  },
  {
    id: "7",
    text: "Make your own cleaning products",
    completed: false,
    category: "Reduce",
    difficulty: "Medium",
    points: 30,
  },
  {
    id: "8",
    text: "Organize a community cleanup event",
    completed: false,
    category: "Community",
    difficulty: "Hard",
    points: 50,
  },
]

const categories = ["All", "Reduce", "Reuse", "Recycle", "Compost", "Community"]
const difficulties = ["Easy", "Medium", "Hard"]

export default function ChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>([])
  const [newItem, setNewItem] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All")

  useEffect(() => {
    const savedItems = localStorage.getItem("zeroWasteChecklist")
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    } else {
      setItems(defaultItems)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("zeroWasteChecklist", JSON.stringify(items))
  }, [items])

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
              completedAt: !item.completed ? new Date() : undefined,
            }
          : item,
      ),
    )
  }

  const addItem = () => {
    if (newItem.trim()) {
      const item: ChecklistItem = {
        id: Date.now().toString(),
        text: newItem.trim(),
        completed: false,
        category: "Reduce",
        difficulty: "Medium",
        points: 20,
      }
      setItems([...items, item])
      setNewItem("")
    }
  }

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const filteredItems = items.filter((item) => {
    const categoryMatch = selectedCategory === "All" || item.category === selectedCategory
    const difficultyMatch = selectedDifficulty === "All" || item.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })

  const completedItems = items.filter((item) => item.completed)
  const totalPoints = completedItems.reduce((sum, item) => sum + item.points, 0)
  const completionRate = items.length > 0 ? (completedItems.length / items.length) * 100 : 0

  const getLevel = (points: number) => {
    if (points >= 200) return { name: "Zero Waste Champion", color: "from-purple-500 to-pink-500" }
    if (points >= 150) return { name: "Sustainability Expert", color: "from-blue-500 to-purple-500" }
    if (points >= 100) return { name: "Eco Warrior", color: "from-green-500 to-blue-500" }
    if (points >= 50) return { name: "Green Enthusiast", color: "from-yellow-500 to-green-500" }
    return { name: "Eco Beginner", color: "from-gray-400 to-gray-600" }
  }

  const currentLevel = getLevel(totalPoints)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Sustainability Checklist
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Track your progress, earn points, and build sustainable habits one step at a time
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
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
                  +{completedItems.length > 0 ? completedItems[completedItems.length - 1]?.points || 0 : 0} recent
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
                {currentLevel.name}
              </Badge>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {200 - totalPoints > 0 ? `${200 - totalPoints} points to Champion` : "Max level reached!"}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Tasks Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {completedItems.length}/{items.length}
              </div>
              <div className="flex items-center mt-2">
                <Target className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {items.length - completedItems.length} remaining
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checklist */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {["All", ...difficulties].map((difficulty) => (
                    <Button
                      key={difficulty}
                      variant={selectedDifficulty === difficulty ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={selectedDifficulty === difficulty ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      {difficulty}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Add New Item */}
              <div className="flex gap-2">
                <Input
                  placeholder="Add a new sustainability goal..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addItem()}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                />
                <Button onClick={addItem} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>

            {/* Checklist Items */}
            <div className="space-y-4">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card
                    className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 ${
                      item.completed ? "opacity-75" : "hover:shadow-xl"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          checked={item.completed}
                          onCheckedChange={() => toggleItem(item.id)}
                          className="w-5 h-5"
                        />
                        <div className="flex-1">
                          <div
                            className={`font-medium ${
                              item.completed
                                ? "line-through text-gray-500 dark:text-gray-400"
                                : "text-gray-900 dark:text-white"
                            }`}
                          >
                            {item.text}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {item.category}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                item.difficulty === "Easy"
                                  ? "border-green-500 text-green-600"
                                  : item.difficulty === "Medium"
                                    ? "border-yellow-500 text-yellow-600"
                                    : "border-red-500 text-red-600"
                              }`}
                            >
                              {item.difficulty}
                            </Badge>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{item.points} points</span>
                            {item.completedAt && (
                              <span className="text-xs text-green-600 dark:text-green-400">
                                ✓ {new Date(item.completedAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">No items match your current filters.</p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <span>Recent Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {completedItems
                    .slice(-5)
                    .reverse()
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-2 py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
                      >
                        <Check className="w-4 h-4 text-green-500" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">+{item.points} points</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {item.text.length > 30 ? item.text.substring(0, 30) + "..." : item.text}
                          </div>
                        </div>
                      </div>
                    ))}
                  {completedItems.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Complete tasks to see achievements here!</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Tips */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-gradient-to-br from-green-500 to-blue-500 text-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>💡 Pro Tip</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Start with easy tasks to build momentum, then gradually tackle harder challenges. Consistency is
                    more important than perfection!
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
