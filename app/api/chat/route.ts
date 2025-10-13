import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not configured")
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      )
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    // Get the last user message
    const userMessage = messages[messages.length - 1]?.content || 'Hello'

    // Build conversation history for context
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }))

    // System instructions for Zero Waste Assistant
    const systemInstruction = `You are a Zero Waste AI Assistant, an expert in sustainable living, waste management, and environmental conservation. 

🌱 Provide specific waste disposal guidance
♻️ Explain recycling rules and variations
🌿 Offer practical sustainability tips
🔄 Suggest eco-friendly product alternatives
🍃 Help with composting questions

Guidelines:
- Be encouraging and positive
- Give specific, actionable advice
- Mention when disposal methods vary by location
- Follow the waste hierarchy: Refuse, Reduce, Reuse, Recycle, Rot
- Include safety considerations for hazardous materials
- Be concise but comprehensive`

    // Start chat
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemInstruction }],
        },
        {
          role: 'model',
          parts: [{ text: 'I understand. I am your Zero Waste AI Assistant, ready to help with sustainable living, waste management, and environmental questions. How can I assist you today?' }],
        },
        ...history,
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    })

    // Get streaming response
    const result = await chat.sendMessageStream(userMessage)

    // Create readable stream
    const encoder = new TextEncoder()
    const customStream = new ReadableStream({
      async start(controller) {
        try {
          let fullText = ''
          for await (const chunk of result.stream) {
            const text = chunk.text()
            fullText += text
            controller.enqueue(encoder.encode(text))
          }
          controller.close()
        } catch (error: any) {
          console.error('Streaming error:', error)
          controller.error(error)
        }
      },
    })

    return new Response(customStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })

  } catch (error: any) {
    console.error("Chat API error:", error?.message || error)
    return NextResponse.json(
      { error: error?.message || "Failed to process request" },
      { status: 500 }
    )
  }
}
