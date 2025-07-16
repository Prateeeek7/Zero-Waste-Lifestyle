"use client"

import { motion } from "framer-motion"
import { BookOpen, CalendarDays } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link" // Import Link for navigation

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  tags: string[]
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Sustainable Packaging",
    excerpt: "Exploring innovations in eco-friendly packaging materials and their impact on waste reduction.",
    category: "Innovation",
    date: "2024-07-01",
    tags: ["packaging", "innovation", "future"],
  },
  {
    id: "2",
    title: "Composting in Small Spaces: A Beginner's Guide",
    excerpt: "Don't have a big yard? Learn how to compost effectively even in an apartment.",
    category: "Composting",
    date: "2024-06-25",
    tags: ["composting", "urban", "beginner"],
  },
  {
    id: "3",
    title: "The Hidden Environmental Cost of Fast Fashion",
    excerpt: "Uncover the impact of disposable clothing and how to build a sustainable wardrobe.",
    category: "Fashion",
    date: "2024-06-18",
    tags: ["fashion", "textile", "ethical"],
  },
  {
    id: "4",
    title: "DIY Zero Waste Cleaning: Recipes and Tips",
    excerpt: "Create your own effective and non-toxic cleaning products with common household ingredients.",
    category: "DIY",
    date: "2024-06-10",
    tags: ["cleaning", "diy", "home"],
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Our Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest in sustainable living and zero-waste news.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge>{post.category}</Badge>
                    <div className="flex items-center space-x-1 text-gray-500 text-sm">
                      <CalendarDays className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="mt-4 inline-flex items-center text-green-600 dark:text-green-400 hover:underline text-sm font-medium"
                  >
                    <BookOpen className="w-4 h-4 mr-1" /> Read Article
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
