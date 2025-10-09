"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, Trophy, RotateCcw, Star, Award, RefreshCw, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizSettings {
  questionsPerQuiz: number
  timeLimit: number
  passingScore: number
  maxAttempts: number
  categories: string[]
}

const QUIZ_CATEGORIES = [
  { id: "all", name: "All Categories", description: "Mixed questions from all topics" },
  { id: "basics", name: "Basics of Waste", description: "Fundamental waste management concepts" },
  { id: "segregation", name: "Segregation & Types", description: "Understanding different waste types" },
  { id: "recycling", name: "Recycling & Reuse", description: "Recycling processes and reuse strategies" },
  { id: "environmental", name: "Environmental Impact", description: "Environmental effects of waste" },
  { id: "india", name: "Waste Management in India", description: "Indian policies and practices" },
  { id: "composting", name: "Composting & Zero Waste", description: "Composting and sustainable lifestyle" },
  { id: "ewaste", name: "E-Waste & Hazardous", description: "Electronic and hazardous waste" },
  { id: "circular", name: "Circular Economy", description: "Circular economy principles" },
  { id: "awareness", name: "Public Awareness", description: "Public awareness and policies" },
  { id: "general", name: "General Knowledge", description: "Mixed practical scenarios" }
]

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [timerActive, setTimerActive] = useState(true)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [quizSettings, setQuizSettings] = useState<QuizSettings>({
    questionsPerQuiz: 10,
    timeLimit: 30,
    passingScore: 70,
    maxAttempts: 3,
    categories: []
  })
  const [showSettings, setShowSettings] = useState(false)

  // Load questions from API
  const loadQuestions = async (category: string = "all") => {
    setLoading(true)
    try {
      const response = await fetch(`/api/quiz?category=${category}&count=${quizSettings.questionsPerQuiz}`)
      const data = await response.json()
      
      if (data.success) {
        setQuestions(data.questions)
        setQuizSettings(prev => ({ ...prev, ...data.settings }))
        setTimeLeft(data.settings.timeLimit || 30)
      } else {
        console.error('Failed to load questions:', data.error)
      }
    } catch (error) {
      console.error('Error loading questions:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadQuestions(selectedCategory)
  }, [selectedCategory])

  useEffect(() => {
    if (timerActive && timeLeft > 0 && !showResult && questions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult && questions.length > 0) {
      handleNextQuestion()
    }
  }, [timeLeft, timerActive, showResult, questions])

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult || questions.length === 0) return
    setSelectedAnswer(answerIndex)
    setTimerActive(false)
    setShowResult(true)

    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setTimeLeft(quizSettings.timeLimit || 30)
      setTimerActive(true)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
    setQuizCompleted(false)
    setTimeLeft(quizSettings.timeLimit || 30)
    setTimerActive(true)
    loadQuestions(selectedCategory)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    resetQuiz()
  }

  const getScoreMessage = () => {
    if (questions.length === 0) return { message: "", badge: "", color: "" }
    const percentage = (score / questions.length) * 100
    if (percentage >= 90)
      return {
        message: "Outstanding! You're a zero waste expert!",
        badge: "Expert",
        color: "from-yellow-400 to-orange-500",
      }
    if (percentage >= 70)
      return {
        message: "Great job! You have solid knowledge of sustainable practices.",
        badge: "Advanced",
        color: "from-green-400 to-blue-500",
      }
    if (percentage >= 50)
      return {
        message: "Good start! Keep learning about zero waste living.",
        badge: "Intermediate",
        color: "from-blue-400 to-purple-500",
      }
    return {
      message: "Keep exploring! There's so much to learn about sustainability.",
      badge: "Beginner",
      color: "from-gray-400 to-gray-600",
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
          >
            <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Loading Quiz...</h2>
            <p className="text-gray-600 dark:text-gray-300">Preparing random questions for you!</p>
          </motion.div>
        </div>
      </div>
    )
  }

  if (quizCompleted) {
    const scoreInfo = getScoreMessage()
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
          >
            <div
              className={`w-24 h-24 mx-auto bg-gradient-to-r ${scoreInfo.color} rounded-full flex items-center justify-center mb-6`}
            >
              <Trophy className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Quiz Complete!</h1>

            <div className="text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              {score}/{questions.length}
            </div>

            <Badge className={`mb-6 text-lg px-4 py-2 bg-gradient-to-r ${scoreInfo.color} text-white border-0`}>
              <Award className="w-4 h-4 mr-2" />
              {scoreInfo.badge} Level
            </Badge>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{scoreInfo.message}</p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {Math.round((score / questions.length) * 100)}%
                </div>
                <div className="text-green-700 dark:text-green-300">Accuracy</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{questions.length}</div>
                <div className="text-blue-700 dark:text-blue-300">Questions</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {QUIZ_CATEGORIES.find(cat => cat.id === selectedCategory)?.name || "Mixed"}
                </div>
                <div className="text-purple-700 dark:text-purple-300">Category</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={resetQuiz} size="lg" className="bg-green-600 hover:bg-green-700">
                <RotateCcw className="w-5 h-5 mr-2" />
                Take Quiz Again
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/learn">Continue Learning</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Questions Available</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Unable to load quiz questions. Please try again.</p>
            <Button onClick={() => loadQuestions(selectedCategory)} className="bg-green-600 hover:bg-green-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Zero Waste Knowledge Quiz
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Test your sustainability knowledge with random questions!
          </p>
          
          {/* Category Selection */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {QUIZ_CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-gray-500">{category.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={() => setShowSettings(!showSettings)} 
              variant="outline" 
              size="sm"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
              </span>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  timeLeft <= 10
                    ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                }`}
              >
                {timeLeft}s
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">
                  {QUIZ_CATEGORIES.find(cat => cat.id === selectedCategory)?.name || "Mixed"}
                </Badge>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.ceil((currentQuestion + 1) / 2) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  whileHover={{ scale: showResult ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    showResult
                      ? index === question.correctAnswer
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                        : index === selectedAnswer && index !== question.correctAnswer
                          ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                          : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                      : "border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">{option}</span>
                    {showResult && (
                      <div>
                        {index === question.correctAnswer ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : index === selectedAnswer ? (
                          <XCircle className="w-6 h-6 text-red-500" />
                        ) : null}
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}

              {/* Explanation */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                  >
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Explanation:</h4>
                    <p className="text-blue-800 dark:text-blue-200">{question.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Button */}
              {showResult && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-4">
                  <Button onClick={handleNextQuestion} className="w-full bg-green-600 hover:bg-green-700">
                    {currentQuestion < questions.length - 1 ? "Next Question" : "View Results"}
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
