"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BoxIcon as Bottle, ShoppingBag, Coffee, RefreshCcw } from "lucide-react"

interface CalculationResult {
  totalItemsSaved: number
  totalMoneySaved: number
  totalCo2SavedKg: number
}

export default function CalculatorPage() {
  const [plasticBottlesPerWeek, setPlasticBottlesPerWeek] = useState<number | string>("")
  const [plasticBagsPerWeek, setPlasticBagsPerWeek] = useState<number | string>("")
  const [disposableCupsPerDay, setDisposableCupsPerDay] = useState<number | string>("")
  const [result, setResult] = useState<CalculationResult | null>(null)

  // Environmental and financial assumptions (per unit)
  const ASSUMPTIONS = {
    plasticBottle: {
      cost: 20, // INR (Indian Rupees)
      co2_g: 80, // grams of CO2
    },
    plasticBag: {
      cost: 5, // INR (if charged)
      co2_g: 10, // grams of CO2
    },
    disposableCup: {
      cost: 15, // INR (coffee cup)
      co2_g: 50, // grams of CO2
    },
  }

  const calculateImpact = () => {
    let totalItems = 0
    let totalMoney = 0
    let totalCo2 = 0 // in grams

    const numBottles =
      typeof plasticBottlesPerWeek === "string" ? Number.parseInt(plasticBottlesPerWeek, 10) : plasticBottlesPerWeek
    if (!isNaN(numBottles) && numBottles > 0) {
      const annualBottles = numBottles * 52
      totalItems += annualBottles
      totalMoney += annualBottles * ASSUMPTIONS.plasticBottle.cost
      totalCo2 += annualBottles * ASSUMPTIONS.plasticBottle.co2_g
    }

    const numBags =
      typeof plasticBagsPerWeek === "string" ? Number.parseInt(plasticBagsPerWeek, 10) : plasticBagsPerWeek
    if (!isNaN(numBags) && numBags > 0) {
      const annualBags = numBags * 52
      totalItems += annualBags
      totalMoney += annualBags * ASSUMPTIONS.plasticBag.cost
      totalCo2 += annualBags * ASSUMPTIONS.plasticBag.co2_g
    }

    const numCups =
      typeof disposableCupsPerDay === "string" ? Number.parseInt(disposableCupsPerDay, 10) : disposableCupsPerDay
    if (!isNaN(numCups) && numCups > 0) {
      const annualCups = numCups * 365
      totalItems += annualCups
      totalMoney += annualCups * ASSUMPTIONS.disposableCup.cost
      totalCo2 += annualCups * ASSUMPTIONS.disposableCup.co2_g
    }

    if (totalItems === 0) {
      setResult(null)
      return
    }

    setResult({
      totalItemsSaved: totalItems,
      totalMoneySaved: Number.parseFloat(totalMoney.toFixed(2)),
      totalCo2SavedKg: Number.parseFloat((totalCo2 / 1000).toFixed(2)), // Convert grams to kg
    })
  }

  const resetCalculator = () => {
    setPlasticBottlesPerWeek("")
    setPlasticBagsPerWeek("")
    setDisposableCupsPerDay("")
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Sustainability Impact Calculator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Estimate your positive environmental and financial impact by choosing reusable alternatives.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Current Habits</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* Plastic Bottles */}
              <div>
                <label
                  htmlFor="bottles"
                  className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
                >
                  <Bottle className="w-5 h-5 mr-2 text-blue-500" />
                  Plastic Water Bottles (per week)
                </label>
                <Input
                  id="bottles"
                  type="number"
                  placeholder="e.g., 7"
                  value={plasticBottlesPerWeek}
                  onChange={(e) => setPlasticBottlesPerWeek(e.target.value)}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                />
              </div>

              {/* Plastic Bags */}
              <div>
                <label
                  htmlFor="bags"
                  className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
                >
                  <ShoppingBag className="w-5 h-5 mr-2 text-green-500" />
                  Single-Use Plastic Bags (per week)
                </label>
                <Input
                  id="bags"
                  type="number"
                  placeholder="e.g., 10"
                  value={plasticBagsPerWeek}
                  onChange={(e) => setPlasticBagsPerWeek(e.target.value)}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                />
              </div>

              {/* Disposable Coffee Cups */}
              <div>
                <label
                  htmlFor="cups"
                  className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
                >
                  <Coffee className="w-5 h-5 mr-2 text-amber-500" />
                  Disposable Coffee Cups (per day)
                </label>
                <Input
                  id="cups"
                  type="number"
                  placeholder="e.g., 1"
                  value={disposableCupsPerDay}
                  onChange={(e) => setDisposableCupsPerDay(e.target.value)}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                />
              </div>
            </div>
            <div className="flex flex-col justify-end gap-4">
              <Button onClick={calculateImpact} className="bg-green-600 hover:bg-green-700 text-lg py-3">
                Calculate Your Annual Impact
              </Button>
              <Button onClick={resetCalculator} variant="outline" className="bg-transparent text-lg py-3">
                <RefreshCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 space-y-4"
            >
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
                Your Potential Annual Savings:
              </h3>
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Items Saved</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {result.totalItemsSaved.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">single-use items</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Money Saved</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      ₹{result.totalMoneySaved.toLocaleString('en-IN')}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">in your pocket</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      CO2 Emissions Avoided
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {result.totalCo2SavedKg.toLocaleString()} kg
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">of CO2</p>
                  </CardContent>
                </Card>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-4">
                *Calculations are based on average estimates and may vary. Your actual impact could be even greater!
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
