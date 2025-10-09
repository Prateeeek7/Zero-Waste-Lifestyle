import { NextRequest, NextResponse } from 'next/server'
import quizDatabase from '@/data/quiz-database.json'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || 'all'
    const count = parseInt(searchParams.get('count') || '10')
    const difficulty = searchParams.get('difficulty') || 'mixed'

    let questions = []

    if (category === 'all') {
      // Get questions from all categories
      questions = quizDatabase.quizCategories.flatMap(cat => cat.questions)
    } else {
      // Get questions from specific category
      const selectedCategory = quizDatabase.quizCategories.find(cat => cat.id === category)
      if (selectedCategory) {
        questions = selectedCategory.questions
      } else {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 })
      }
    }

    // Shuffle questions and select random ones
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    const selectedQuestions = shuffledQuestions.slice(0, Math.min(count, questions.length))

    // Shuffle options for each question to randomize answer positions
    const questionsWithShuffledOptions = selectedQuestions.map(question => {
      const options = [...question.options]
      const correctAnswer = options[question.correctAnswer]
      
      // Shuffle options
      const shuffledOptions = options.sort(() => Math.random() - 0.5)
      const newCorrectAnswerIndex = shuffledOptions.indexOf(correctAnswer)
      
      return {
        ...question,
        options: shuffledOptions,
        correctAnswer: newCorrectAnswerIndex
      }
    })

    return NextResponse.json({
      success: true,
      questions: questionsWithShuffledOptions,
      totalQuestions: questionsWithShuffledOptions.length,
      category: category,
      settings: quizDatabase.quizSettings
    })

  } catch (error) {
    console.error('Quiz API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quiz questions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers, questions } = body

    if (!answers || !questions) {
      return NextResponse.json(
        { error: 'Answers and questions are required' },
        { status: 400 }
      )
    }

    let correctAnswers = 0
    const results = []

    questions.forEach((question: any, index: number) => {
      const userAnswer = answers[index]
      const isCorrect = userAnswer === question.correctAnswer
      
      if (isCorrect) {
        correctAnswers++
      }

      results.push({
        questionId: question.id,
        question: question.question,
        userAnswer: userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect: isCorrect,
        explanation: question.explanation,
        options: question.options
      })
    })

    const score = Math.round((correctAnswers / questions.length) * 100)
    const passed = score >= quizDatabase.quizSettings.passingScore

    return NextResponse.json({
      success: true,
      score: score,
      correctAnswers: correctAnswers,
      totalQuestions: questions.length,
      passed: passed,
      results: results,
      feedback: getFeedback(score)
    })

  } catch (error) {
    console.error('Quiz Submission Error:', error)
    return NextResponse.json(
      { error: 'Failed to process quiz submission' },
      { status: 500 }
    )
  }
}

function getFeedback(score: number): string {
  if (score >= 90) {
    return "Excellent! You have excellent knowledge of waste management practices."
  } else if (score >= 80) {
    return "Great job! You have good understanding of waste management concepts."
  } else if (score >= 70) {
    return "Good work! You have a solid foundation in waste management knowledge."
  } else if (score >= 60) {
    return "Not bad! Consider reviewing some waste management concepts to improve."
  } else {
    return "Keep learning! There's room for improvement in your waste management knowledge."
  }
}
