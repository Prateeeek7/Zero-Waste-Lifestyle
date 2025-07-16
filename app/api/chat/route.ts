import { streamText } from "ai" // Removed StreamingTextResponse from import
import { createOpenAI } from "@ai-sdk/openai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // --- ENHANCED DEBUGGING LOGS ---
    console.log("--- Chat API Request Start ---")
    console.log("Received chat request at:", new Date().toISOString())
    console.log("Incoming messages count:", messages.length)
    console.log("Last user message:", messages[messages.length - 1]?.content || "[No user message]")

    const apiKey = process.env.LLAMA_API_KEY
    console.log(
      "LLAMA_API_KEY status:",
      apiKey ? "Loaded (first 5 chars: " + apiKey.substring(0, 5) + "...)" : "NOT LOADED",
    )

    if (!apiKey) {
      console.error(
        "ERROR: LLAMA_API_KEY is missing or undefined. Please ensure it's set in your .env.local file and your server is restarted.",
      )
      return NextResponse.json({ error: "Server configuration error: LLAMA_API_KEY is not set." }, { status: 500 })
    }

    const baseURL = "https://api.groq.com/openai/v1"
    const modelName = "llama3-70b-8192"
    console.log("Attempting to initialize AI model with:")
    console.log("  Base URL:", baseURL)
    console.log("  Model Name:", modelName)

    // --- TEMPORARY DIRECT FETCH TEST (Keep for debugging API key issues) ---
    console.log("--- Running direct Groq API test ---")
    try {
      const testResponse = await fetch(`${baseURL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: modelName,
          messages: [{ role: "user", content: "Hello, test message." }],
          max_tokens: 50, // Keep it short for a quick test
        }),
      })

      if (testResponse.ok) {
        const testData = await testResponse.json()
        console.log(
          "Direct Groq API test SUCCESS! Response snippet:",
          testData.choices[0]?.message?.content.substring(0, 50) + "...",
        )
      } else {
        const errorText = await testResponse.text()
        console.error(`Direct Groq API test FAILED! Status: ${testResponse.status}, Error: ${errorText}`)
      }
    } catch (testError) {
      console.error("Direct Groq API test encountered a network error:", testError)
    }
    console.log("--- Direct Groq API test finished ---")
    // --- END TEMPORARY DIRECT FETCH TEST ---

    let llama
    try {
      llama = createOpenAI({
        apiKey: apiKey,
        baseURL: baseURL,
      })
      console.log("AI model (llama) initialized successfully.")
    } catch (initError) {
      console.error("ERROR: Failed to initialize AI model (createOpenAI).", initError)
      return NextResponse.json({ error: "AI model initialization failed." }, { status: 500 })
    }

    console.log("Attempting to stream text via AI SDK...")
    const result = await streamText({
      model: llama(modelName),
      system: `You are a Zero Waste AI Assistant powered by Meta LLaMA 3, an expert in sustainable living, waste management, and environmental conservation. Your role is to help users:

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

Always prioritize environmental safety and provide practical solutions that users can actually implement in their daily lives.`,
      messages,
      maxTokens: 1000,
      temperature: 0.7,
    })
    console.log("streamText call initiated successfully.")

    // --- CORRECT WAY TO RETURN STREAMING RESPONSE FOR AI SDK v3+ ---
    return result.toDataStreamResponse() // This method directly creates and returns the streaming Response
    // --- END CORRECT WAY ---
  } catch (error) {
    console.error("--- Chat API Request FAILED ---")
    console.error("Caught an error in POST handler:", error)
    // Return a more informative error to the client
    return NextResponse.json(
      { error: "Failed to process request. Check your server terminal for detailed logs." },
      { status: 500 },
    )
  } finally {
    console.log("--- Chat API Request End ---")
  }
}
