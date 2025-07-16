"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Recycle, Trash2, Leaf, AlertTriangle, Package, Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const wasteCategories = [
  {
    id: "recyclable",
    name: "Recyclable",
    icon: Recycle,
    color: "from-green-500 to-emerald-500",
    description: "Materials that can be processed into new products",
    items: [
      {
        name: "Plastic Type 1 - PET",
        description: "Used in water bottles, soft drink bottles. Recyclable in most cities.",
        examples: ["Water bottles", "Soda bottles", "Food containers"],
        tips: "Remove caps and labels before recycling",
      },
      {
        name: "Paper & Cardboard",
        description: "Clean paper products and cardboard packaging.",
        examples: ["Newspapers", "Magazines", "Cardboard boxes", "Office paper"],
        tips: "Keep dry and remove any plastic coating",
      },
      {
        name: "Glass",
        description: "Glass bottles and jars can be recycled indefinitely.",
        examples: ["Wine bottles", "Jam jars", "Beer bottles"],
        tips: "Remove lids and rinse clean",
      },
      {
        name: "Aluminum Cans",
        description: "Highly recyclable metal containers.",
        examples: ["Soda cans", "Beer cans", "Food cans"],
        tips: "Rinse clean, crushing is optional",
      },
    ],
  },
  {
    id: "compostable",
    name: "Compostable",
    icon: Leaf,
    color: "from-amber-500 to-orange-500",
    description: "Organic materials that can decompose naturally",
    items: [
      {
        name: "Food Scraps",
        description: "Fruit and vegetable waste that can be composted.",
        examples: ["Fruit peels", "Vegetable scraps", "Coffee grounds", "Eggshells"],
        tips: "Avoid meat, dairy, and oily foods in home compost",
      },
      {
        name: "Yard Waste",
        description: "Natural garden and yard materials.",
        examples: ["Grass clippings", "Leaves", "Small branches", "Plant trimmings"],
        tips: "Mix green and brown materials for best results",
      },
      {
        name: "Paper Products",
        description: "Uncoated paper that can break down naturally.",
        examples: ["Paper towels", "Napkins", "Paper plates (uncoated)"],
        tips: "Tear into smaller pieces for faster decomposition",
      },
    ],
  },
  {
    id: "hazardous",
    name: "Hazardous",
    icon: AlertTriangle,
    color: "from-red-500 to-pink-500",
    description: "Materials requiring special disposal methods",
    items: [
      {
        name: "Electronics",
        description: "Electronic devices containing toxic materials.",
        examples: ["Phones", "Computers", "Batteries", "TVs"],
        tips: "Take to certified e-waste recycling centers",
      },
      {
        name: "Chemicals",
        description: "Household chemicals and cleaning products.",
        examples: ["Paint", "Pesticides", "Cleaning supplies", "Motor oil"],
        tips: "Never pour down drains, use hazardous waste facilities",
      },
      {
        name: "Medical Waste",
        description: "Pharmaceutical and medical supplies.",
        examples: ["Expired medications", "Syringes", "Medical devices"],
        tips: "Use pharmacy take-back programs for medications",
      },
    ],
  },
  {
    id: "landfill",
    name: "Landfill",
    icon: Trash2,
    color: "from-gray-500 to-slate-500",
    description: "Items that currently have no recycling options",
    items: [
      {
        name: "Mixed Materials",
        description: "Products made from multiple materials that are hard to separate.",
        examples: ["Chip bags", "Candy wrappers", "Laminated paper"],
        tips: "Look for alternative products with less packaging",
      },
      {
        name: "Contaminated Items",
        description: "Recyclable materials that are too dirty to process.",
        examples: ["Greasy pizza boxes", "Food-stained paper", "Broken glass"],
        tips: "Clean items when possible before disposal",
      },
    ],
  },
]

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("recyclable")

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Waste Categories Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn how to properly sort and dispose of different types of waste to maximize recycling and minimize
            environmental impact
          </p>
        </motion.div>

        {/* Category Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {wasteCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card
                className={`h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                  selectedCategory === category.id ? "ring-2 ring-green-500" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 mx-auto bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">{category.name}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">{category.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Category Information */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              {wasteCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                  <category.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {wasteCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div
                      className={`w-20 h-20 mx-auto bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-4`}
                    >
                      <category.icon className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{category.name} Waste</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">{category.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {category.items.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                          <CardHeader>
                            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                              <Package className="w-5 h-5 text-green-600" />
                              <span>{item.name}</span>
                            </CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-300 text-ellipsis overflow-hidden">
                              {item.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Examples:</h4>
                              <div className="flex flex-wrap gap-2">
                                {item.examples.map((example) => (
                                  <Badge key={example} variant="secondary">
                                    {example}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                              <div className="flex items-start space-x-2">
                                <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <div>
                                  <h5 className="font-medium text-blue-900 dark:text-blue-100 text-sm">Pro Tip:</h5>
                                  <p className="text-blue-800 dark:text-blue-200 text-sm">{item.tips}</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
