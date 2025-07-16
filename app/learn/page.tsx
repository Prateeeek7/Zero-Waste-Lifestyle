"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Clock, User, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ReactMarkdown from "react-markdown"

const articles = [
  {
    id: 1,
    title: "Getting Started with Zero Waste Living",
    excerpt: "Learn the fundamental principles of zero waste lifestyle and how to begin your sustainable journey.",
    content: `# Getting Started with Zero Waste Living

Zero waste living is about reducing the amount of waste we send to landfills and incinerators. It's a lifestyle that encourages us to be more mindful of our consumption and disposal habits.

## The 5 R's of Zero Waste

1. **Refuse** - Say no to things you don't need
2. **Reduce** - Minimize what you do need
3. **Reuse** - Find new purposes for items
4. **Recycle** - Process materials into new products
5. **Rot** - Compost organic waste

## Starting Your Journey

Begin with small changes:
- Carry a reusable water bottle
- Use cloth bags for shopping
- Choose products with minimal packaging
- Start composting food scraps

Remember, zero waste is a journey, not a destination. Every small step counts!`,
    author: "Sarah Green",
    readTime: "5 min read",
    category: "Beginner",
    tags: ["basics", "lifestyle", "getting-started"],
    publishedAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Complete Guide to Composting at Home",
    excerpt: "Everything you need to know about turning your kitchen scraps into nutrient-rich soil.",
    content: `# Complete Guide to Composting at Home

Composting is one of the most effective ways to reduce household waste while creating valuable fertilizer for your garden.

## What Can You Compost?

### Green Materials (Nitrogen-rich)
- Fruit and vegetable scraps
- Coffee grounds and tea bags
- Fresh grass clippings
- Plant trimmings

### Brown Materials (Carbon-rich)
- Dry leaves
- Paper and cardboard
- Wood chips
- Straw

## Setting Up Your Compost

1. Choose a location with good drainage
2. Start with a layer of brown materials
3. Add green materials
4. Turn regularly for aeration
5. Keep moist but not soggy

## Troubleshooting Common Issues

- **Smelly compost**: Add more brown materials
- **Slow decomposition**: Turn more frequently
- **Pests**: Avoid meat and dairy scraps`,
    author: "Mike Earth",
    readTime: "8 min read",
    category: "Intermediate",
    tags: ["composting", "gardening", "organic-waste"],
    publishedAt: "2024-01-10",
  },
  {
    id: 3,
    title: "Plastic-Free Kitchen Essentials",
    excerpt: "Transform your kitchen into a plastic-free zone with these sustainable alternatives.",
    content: `# Plastic-Free Kitchen Essentials

The kitchen is often where we use the most single-use plastics. Here's how to create a more sustainable cooking space.

## Essential Swaps

### Food Storage
- Glass containers instead of plastic tupperware
- Beeswax wraps for food covering
- Silicone bags for freezing
- Mason jars for bulk storage

### Cooking Tools
- Wooden utensils
- Cast iron or stainless steel cookware
- Bamboo cutting boards
- Natural fiber dish brushes

### Cleaning Supplies
- Refillable soap dispensers
- Compostable sponges
- Vinegar-based cleaners
- Reusable cleaning cloths

## Shopping Tips

- Bring your own containers to bulk stores
- Choose products in glass or paper packaging
- Buy fresh produce without plastic bags
- Support local farmers markets

Making these changes gradually will help you build sustainable habits that last.`,
    author: "Emma Sustainable",
    readTime: "6 min read",
    category: "Practical",
    tags: ["plastic-free", "kitchen", "alternatives"],
    publishedAt: "2024-01-08",
  },
]

const categories = ["All", "Beginner", "Intermediate", "Advanced", "Practical"]

export default function LearnPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedArticle, setSelectedArticle] = useState<(typeof articles)[0] | null>(null)

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Button onClick={() => setSelectedArticle(null)} variant="outline" className="mb-6">
            ← Back to Articles
          </Button>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
          >
            <div className="mb-6">
              <Badge className="mb-4">{selectedArticle.category}</Badge>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{selectedArticle.title}</h1>
              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{selectedArticle.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown>{selectedArticle.content}</ReactMarkdown>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {selectedArticle.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.article>
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
            Learn & Grow
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover comprehensive guides, tutorials, and expert insights to master sustainable living
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
                placeholder="Search articles, topics, or tags..."
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
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card
                className="h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedArticle(article)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge>{article.category}</Badge>
                    <div className="flex items-center space-x-1 text-gray-500 text-sm">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-gray-500 text-sm">
                      <User className="w-3 h-3" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600 dark:text-green-400 font-medium">
                      <BookOpen className="w-4 h-4" />
                      <span>Read More</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {article.tags.slice(0, 3).map((tag) => (
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

        {filteredArticles.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No articles found matching your search criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
