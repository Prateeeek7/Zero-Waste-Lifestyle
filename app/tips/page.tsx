"use client"

import { motion } from "framer-motion"
import { Lightbulb, Recycle, Leaf, ShoppingBag } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion" // Assuming Accordion is available

interface Tip {
  id: string
  title: string
  content: string
  category: string
}

const sustainabilityTips: Tip[] = [
  {
    id: "1",
    title: "The Power of Reusable Bags",
    content:
      "Always carry reusable shopping bags. Keep them in your car, by the door, or folded in your purse/backpack so you never forget them. This simple habit drastically reduces plastic bag waste.",
    category: "Shopping",
  },
  {
    id: "2",
    title: "Compost Your Food Scraps",
    content:
      "Start a home compost bin for fruit and vegetable peels, coffee grounds, and eggshells. Composting diverts organic waste from landfills, reducing methane emissions and creating nutrient-rich soil for your plants.",
    category: "Composting",
  },
  {
    id: "3",
    title: "Say No to Single-Use Plastics",
    content:
      "Refuse plastic straws, disposable coffee cups, and plastic cutlery. Carry your own reusable alternatives like a metal straw, a travel mug, and a spork. Small changes make a big difference!",
    category: "Reduce",
  },
  {
    id: "4",
    title: "Buy in Bulk (with your own containers)",
    content:
      "Visit bulk stores with your own reusable jars and bags to buy grains, nuts, spices, and even liquids like oils and soaps. This eliminates unnecessary packaging waste.",
    category: "Shopping",
  },
  {
    id: "5",
    title: "Repair Before Replacing",
    content:
      "Before buying new, consider if an item can be repaired. Learning basic repair skills or finding local repair shops can extend the life of your belongings and reduce consumption.",
    category: "Reuse",
  },
]

export default function TipsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Tips & Tricks
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover practical tips and clever tricks for sustainable living.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <span>Daily Sustainability Hacks</span>
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {sustainabilityTips.map((tip) => (
              <AccordionItem key={tip.id} value={tip.id}>
                <AccordionTrigger className="text-lg font-semibold text-gray-900 dark:text-white hover:no-underline">
                  <div className="flex items-center space-x-2">
                    {tip.category === "Shopping" && <ShoppingBag className="w-5 h-5 text-green-600" />}
                    {tip.category === "Composting" && <Leaf className="w-5 h-5 text-orange-500" />}
                    {tip.category === "Reduce" && <Recycle className="w-5 h-5 text-blue-500" />}
                    {tip.category === "Reuse" && <Lightbulb className="w-5 h-5 text-yellow-500" />}
                    <span>{tip.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {tip.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  )
}
