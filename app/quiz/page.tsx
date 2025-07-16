"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, Trophy, RotateCcw, Star, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Which type of plastic is commonly used in water bottles and is widely recyclable?",
    options: ["PET (Type 1)", "HDPE (Type 2)", "PVC (Type 3)", "LDPE (Type 4)"],
    correctAnswer: 0,
    explanation:
      "PET (Polyethylene Terephthalate) is Type 1 plastic, commonly used in water bottles and is widely accepted in recycling programs.",
    category: "Recycling",
  },
  {
    id: 2,
    question: "What should you NOT put in your home compost bin?",
    options: ["Fruit peels", "Coffee grounds", "Meat scraps", "Eggshells"],
    correctAnswer: 2,
    explanation:
      "Meat scraps should not go in home compost as they can attract pests and create odors. They require industrial composting facilities.",
    category: "Composting",
  },
  {
    id: 3,
    question: "How long does it take for a plastic bag to decompose in a landfill?",
    options: ["1-5 years", "10-20 years", "100-500 years", "1000+ years"],
    correctAnswer: 2,
    explanation:
      "Plastic bags can take 100-500 years to decompose in landfills, which is why reducing their use is so important.",
    category: "Environmental Impact",
  },
  {
    id: 4,
    question: "Which of these is the best first step in the waste hierarchy?",
    options: ["Recycle", "Reuse", "Refuse", "Reduce"],
    correctAnswer: 2,
    explanation:
      "Refuse is the first and most effective step - avoiding unnecessary items prevents waste from being created in the first place.",
    category: "Zero Waste Principles",
  },
  {
    id: 5,
    question: "What percentage of food waste could be composted instead of going to landfills?",
    options: ["25%", "50%", "75%", "Nearly 100%"],
    correctAnswer: 3,
    explanation:
      "Nearly all food waste can be composted, either at home or through municipal programs, significantly reducing landfill waste.",
    category: "Food Waste",
  },
  {
    id: 6,
    question: "Which item should be taken to a special e-waste facility?",
    options: ["Glass bottles", "Paper magazines", "Old smartphones", "Aluminum cans"],
    correctAnswer: 2,
    explanation:
      "Smartphones contain toxic materials and valuable metals that require specialized recycling at e-waste facilities.",
    category: "Hazardous Waste",
  },
  {
    id: 7,
    question: "What's the most effective way to reduce packaging waste when shopping?",
    options: [
      "Choose recyclable packaging",
      "Buy in bulk with your own containers",
      "Select biodegradable packaging",
      "Opt for minimal packaging",
    ],
    correctAnswer: 1,
    explanation:
      "Buying in bulk with your own containers eliminates packaging waste entirely, making it the most effective approach.",
    category: "Shopping",
  },
  {
    id: 8,
    question: "How much water can you save by fixing a leaky faucet that drips once per second?",
    options: ["1 gallon per day", "5 gallons per day", "10 gallons per day", "20 gallons per day"],
    correctAnswer: 1,
    explanation:
      "A faucet that drips once per second wastes about 5 gallons of water per day, or 1,825 gallons per year.",
    category: "Water Conservation",
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [timerActive, setTimerActive] = useState(true)

  useEffect(() => {
    if (timerActive && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion()
    }
  }, [timeLeft, timerActive, showResult])

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
    setTimerActive(false)
    setShowResult(true)

    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setTimeLeft(30)
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
    setTimeLeft(30)
    setTimerActive(true)
  }

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100
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
              {score}/{quizQuestions.length}
            </div>

            <Badge className={`mb-6 text-lg px-4 py-2 bg-gradient-to-r ${scoreInfo.color} text-white border-0`}>
              <Award className="w-4 h-4 mr-2" />
              {scoreInfo.badge} Level
            </Badge>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{scoreInfo.message}</p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {Math.round((score / quizQuestions.length) * 100)}%
                </div>
                <div className="text-green-700 dark:text-green-300">Accuracy</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{quizQuestions.length}</div>
                <div className="text-blue-700 dark:text-blue-300">Questions</div>
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

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Zero Waste Knowledge Quiz
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Test your sustainability knowledge and earn badges!
          </p>
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
              Question {currentQuestion + 1} of {quizQuestions.length}
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
                <Badge variant="secondary">{question.category}</Badge>
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
                    {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "View Results"}
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
