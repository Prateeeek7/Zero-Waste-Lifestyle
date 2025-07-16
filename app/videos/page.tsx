"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Clock, Eye, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Video {
  id: string
  title: string
  description: string
  duration: string
  views: string
  category: string
  difficulty: string
  thumbnail: string
  embedId: string
  tags: string[]
}

const videos: Video[] = [
  {
    id: "1",
    title: "Zero Waste Kitchen Makeover",
    description: "Transform your kitchen into a zero waste zone with simple swaps and sustainable alternatives.",
    duration: "12:34",
    views: "45K",
    category: "Kitchen",
    difficulty: "Beginner",
    thumbnail: "/placeholder.svg?height=200&width=350",
    embedId: "dQw4w9WgXcQ",
    tags: ["kitchen", "plastic-free", "containers"],
  },
  {
    id: "2",
    title: "Composting 101: Complete Guide",
    description: "Learn everything about home composting, from setup to troubleshooting common problems.",
    duration: "18:45",
    views: "32K",
    category: "Composting",
    difficulty: "Beginner",
    thumbnail: "/placeholder.svg?height=200&width=350",
    embedId: "dQw4w9WgXcQ",
    tags: ["composting", "organic-waste", "gardening"],
  },
  {
    id: "3",
    title: "DIY Natural Cleaning Products",
    description: "Make effective, non-toxic cleaning products using simple ingredients you already have.",
    duration: "15:22",
    views: "28K",
    category: "DIY",
    difficulty: "Easy",
    thumbnail: "/placeholder.svg?height=200&width=350",
    embedId: "dQw4w9WgXcQ",
    tags: ["cleaning", "diy", "natural", "non-toxic"],
  },
  {
    id: "4",
    title: "Plastic-Free Bathroom Essentials",
    description: "Discover sustainable alternatives for all your bathroom needs, from toothbrushes to shampoo.",
    duration: "10:15",
    views: "52K",
    category: "Personal Care",
    difficulty: "Beginner",
    thumbnail: "/placeholder.svg?height=200&width=350",
    embedId: "dQw4w9WgXcQ",
    tags: ["bathroom", "plastic-free", "personal-care"],
  },
  {
    id: "5",
    title: "Advanced Waste Segregation Techniques",
    description: "Master the art of waste sorting with advanced techniques for maximum recycling efficiency.",
    duration: "22:18",
    views: "19K",
    category: "Recycling",
    difficulty: "Advanced",
    thumbnail: "/placeholder.svg?height=200&width=350",
    embedId: "dQw4w9WgXcQ",
    tags: ["recycling", "sorting", "waste-management"],
  },
  {
    id: "6",
    title: "Sustainable Fashion on a Budget",
    description: "Build an eco-friendly wardrobe without breaking the bank using thrift stores and upcycling.",
    duration: "16:42",
    views: "38K",
    category: "Fashion",
    difficulty: "Intermediate",
    thumbnail: "/placeholder.svg?height=200&width=350",
    embedId: "dQw4w9WgXcQ",
    tags: ["fashion", "thrifting", "upcycling", "budget"],
  },
]

const categories = ["All", "Kitchen", "Composting", "DIY", "Personal Care", "Recycling", "Fashion"]
const difficulties = ["All", "Beginner", "Easy", "Intermediate", "Advanced"]

export default function VideosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "All" || video.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  if (selectedVideo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Button onClick={() => setSelectedVideo(null)} variant="outline" className="mb-6">
            ← Back to Videos
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="aspect-video bg-gray-900 flex items-center justify-center">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedVideo.embedId}`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-t-2xl"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge>{selectedVideo.category}</Badge>
                    <Badge variant="outline">{selectedVideo.difficulty}</Badge>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{selectedVideo.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedVideo.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{selectedVideo.views} views</span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedVideo.description}</p>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {selectedVideo.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="space-y-6">
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Related Videos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {videos
                    .filter((v) => v.id !== selectedVideo.id && v.category === selectedVideo.category)
                    .slice(0, 3)
                    .map((video) => (
                      <div
                        key={video.id}
                        onClick={() => setSelectedVideo(video)}
                        className="flex space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors"
                      >
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-20 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate">{video.title}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {video.duration} • {video.views} views
                          </p>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Video Library
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Watch expert tutorials, tips, and guides to master sustainable living practices
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search videos, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
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
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
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
        </motion.div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card
                className="h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 text-gray-900 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge>{video.category}</Badge>
                    <div className="flex items-center space-x-1 text-gray-500 text-sm">
                      <Eye className="w-3 h-3" />
                      <span>{video.views}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors truncate">
                    {video.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-ellipsis overflow-hidden">
                    {video.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {video.difficulty}
                    </Badge>
                    <div className="flex items-center space-x-1 text-green-600 dark:text-green-400 font-medium">
                      <Play className="w-4 h-4" />
                      <span>Watch Now</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {video.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No videos found matching your search criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
