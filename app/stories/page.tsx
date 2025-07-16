"use client"

import { motion } from "framer-motion"
import { User, Quote, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Story {
  id: string
  title: string
  author: string
  excerpt: string
  image: string
}

const successStories: Story[] = [
  {
    id: "1",
    title: "From Clutter to Compost: Sarah's Journey",
    author: "Sarah M.",
    excerpt:
      "Sarah transformed her kitchen, reducing waste by 80% in just 3 months with composting and smart shopping.",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "2",
    title: "Mark's Plastic-Free Challenge",
    author: "Mark T.",
    excerpt: "Mark shares how he eliminated single-use plastics from his daily life, inspiring his whole neighborhood.",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "3",
    title: "Building a Community Garden: The Eco-Warriors",
    author: "Community Group",
    excerpt:
      "A local group turned an abandoned lot into a thriving community garden, promoting local food and composting.",
    image: "/placeholder.svg?height=150&width=150",
  },
]

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Success Stories
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Be inspired by real-life journeys of individuals embracing zero-waste.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="flex flex-col items-center text-center">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.author}
                    className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-green-500 group-hover:scale-105 transition-transform duration-300"
                  />
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">{story.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{story.author}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <Quote className="inline-block w-4 h-4 mr-1 text-green-500" />
                    {story.excerpt}
                    <Quote className="inline-block w-4 h-4 ml-1 text-green-500 transform rotate-180" />
                  </p>
                  <Button variant="outline" className="bg-transparent">
                    Read Full Story
                    <Heart className="w-4 h-4 ml-2 text-red-500 fill-current" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
