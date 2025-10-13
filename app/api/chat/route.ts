import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages, userId } = await req.json()
    console.log('Received messages:', messages?.length || 0)

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not configured")
      return NextResponse.json(
        { error: "Server configuration error: API key is not set." },
        { status: 500 }
      )
    }
    
    console.log('API Key configured, proceeding with Gemini...')

    // Get user context if userId provided
    let userContext = ""
    if (userId) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      if (supabaseUrl && supabaseKey) {
        const { createClient } = await import("@supabase/supabase-js")
        const supabase = createClient(supabaseUrl, supabaseKey)
        
        const { data: logs } = await supabase
          .from("waste_logs")
          .select("category, weight_kg, logged_at")
          .eq("user_id", userId)
          .order("logged_at", { ascending: false })
          .limit(10)

        if (logs && logs.length > 0) {
          const recentCategories = logs.map(l => l.category).join(", ")
          const totalWeight = logs.reduce((sum, l) => sum + l.weight_kg, 0)
          userContext = `\n\nUser Context: This user has recently logged ${logs.length} waste entries, totaling ${totalWeight.toFixed(2)}kg. Categories: ${recentCategories}. Provide personalized advice based on their activity.`
        }
      }
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    
    console.log('Creating Gemini chat...')

    // Format messages for Gemini
    const systemPrompt = `You are a Zero Waste AI Assistant powered by Google Gemini, an expert in sustainable living, waste management, and environmental conservation. Your role is to help users:

🌱 **Waste Disposal Guidance**: Provide specific instructions for disposing of various items safely and sustainably

♻️ **Recycling Information**: Explain what can and cannot be recycled, including local variations

🌿 **Sustainability Tips**: Offer practical advice for reducing waste and living more sustainably

🔄 **Product Alternatives**: Suggest eco-friendly alternatives to common products

🍃 **Composting Help**: Guide users through composting processes and troubleshooting

**Guidelines:**
- Be encouraging and positive about sustainable choices
- Provide specific, actionable advice
- Mention when disposal methods may vary by location
- Always suggest the waste hierarchy: Refuse, Reduce, Reuse, Recycle, Rot
- Include safety considerations for hazardous materials
- Be concise but comprehensive in your responses

**Example responses:**
- For electronics: "Take old phones/laptops to certified e-waste centers like Best Buy or Staples. Never throw in regular trash due to toxic materials like lead and mercury."
- For food waste: "Fruit peels and vegetable scraps can go in home compost. Avoid meat/dairy in home bins - use municipal composting if available."
- For plastics: "Check the recycling number: #1 (PET) and #2 (HDPE) are widely recyclable. Clean containers and remove labels first."

Always prioritize environmental safety and provide practical solutions that users can actually implement in their daily lives.${userContext}`

    // Get conversation history
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }))

    // Get the last user message
    const userMessage = messages[messages.length - 1]?.content || ''

    // Start chat with history
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'You are a helpful assistant. ' + systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: 'I understand. I am a Zero Waste AI Assistant ready to help with sustainable living, waste management, and environmental questions. How can I assist you today?' }],
        },
        ...history,
      ],
    })

    // Send message and get response
    console.log('Sending message to Gemini:', userMessage)
    const result = await chat.sendMessage(userMessage)
    const response = result.response
    const text = response.text()
    
    console.log('Got response from Gemini, length:', text.length)

    return NextResponse.json({
      role: 'assistant',
      content: text,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Failed to process chat request. Please try again." },
      { status: 500 }
    )
  }
}
