import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const image = formData.get("image") as File

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString("base64")

    const geminiApiKey = process.env.GEMINI_API_KEY

    if (!geminiApiKey) {
      console.warn("GEMINI_API_KEY not configured, using fallback classification")
      // Fallback to mock classification when API not configured
      return NextResponse.json({
        category: "Plastic",
        confidence: 0.85,
        disposal: "This appears to be plastic waste. Rinse clean and place in recycling bin if marked as Type 1 (PET) or Type 2 (HDPE).",
        tips: [
          "Check the recycling symbol on the bottom",
          "Remove caps and labels before recycling",
          "Make sure the item is clean and dry",
          "Some plastics may not be recyclable - check local guidelines"
        ],
      })
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(geminiApiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    const prompt = `Analyze this image and identify the type of waste. 
    
Classify it into ONE of these categories:
- Plastic (bottles, bags, containers, packaging)
- Paper (newspapers, cardboard, documents, magazines)
- Glass (bottles, jars, broken glass)
- Metal (cans, foils, containers)
- Organic (food waste, peels, leaves, compostable items)
- E-Waste (electronics, batteries, cables, gadgets)
- Hazardous (chemicals, paints, batteries, medical waste)
- Textile (clothes, fabrics, shoes)
- Mixed (multiple materials or unclear)

Respond in JSON format with:
{
  "category": "the waste category",
  "confidence": 0.0-1.0 confidence score,
  "subcategory": "specific item type",
  "material": "primary material composition",
  "description": "brief description of the item"
}

Be specific and accurate. If uncertain, use "Mixed" category with lower confidence.`

    const imagePart = {
      inlineData: {
        data: base64,
        mimeType: image.type,
      },
    }

    const result = await model.generateContent([prompt, imagePart])
    const response = await result.response
    const text = response.text()

    console.log("Gemini raw response:", text)

    // Parse JSON from response
    let aiResult
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/)
      const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text
      aiResult = JSON.parse(jsonText)
    } catch (parseError) {
      console.error("Failed to parse AI response:", text)
      throw new Error("AI response parsing failed")
    }

    // Map AI output to our disposal guidelines
    const categoryMapping: Record<string, any> = {
      "Plastic": {
        disposal: "Rinse clean and place in recycling bin. Check recycling number (1-7) for acceptance in your area.",
        tips: [
          "Remove caps and labels before recycling",
          "Ensure item is clean and dry",
          "Type 1 (PET) and Type 2 (HDPE) are most commonly accepted",
          "Check local guidelines - not all plastics are recyclable everywhere"
        ],
      },
      "Paper": {
        disposal: "Place in paper recycling bin. Must be clean and dry - no food contamination.",
        tips: [
          "Remove any plastic coating or tape",
          "Wet or greasy paper cannot be recycled",
          "Shred sensitive documents before recycling",
          "Flatten cardboard boxes to save space"
        ],
      },
      "Glass": {
        disposal: "Remove lids and rinse clean. Place in glass recycling bin or return for deposit.",
        tips: [
          "Glass is infinitely recyclable without quality loss",
          "Separate by color if required by your facility",
          "Remove metal lids and caps",
          "Broken glass should be wrapped safely before disposal"
        ],
      },
      "Metal": {
        disposal: "Rinse and place in metal recycling. Aluminum cans are highly valuable for recycling.",
        tips: [
          "Crushing cans saves collection space",
          "Remove labels if possible",
          "Aluminum can be recycled endlessly",
          "Recycling saves 95% energy compared to new production"
        ],
      },
      "Organic": {
        disposal: "Compost at home or use municipal organic waste collection program (green bin).",
        tips: [
          "Avoid meat/dairy in home compost bins",
          "Chop large pieces for faster decomposition",
          "Mix green (wet) and brown (dry) materials",
          "Keep compost moist but not waterlogged"
        ],
      },
      "E-Waste": {
        disposal: "Take to certified e-waste recycling facility. Never throw in regular trash!",
        tips: [
          "Contains toxic materials and valuable metals",
          "Check for manufacturer take-back programs",
          "Look for local e-waste collection events",
          "Erase personal data before disposing"
        ],
      },
      "Hazardous": {
        disposal: "Take to hazardous waste collection facility. DO NOT put in regular trash or recycling.",
        tips: [
          "Keep in original containers when possible",
          "Never mix different chemicals",
          "Check for local hazardous waste collection days",
          "Batteries require separate disposal"
        ],
      },
      "Textile": {
        disposal: "Donate wearable items. Use textile recycling bins for damaged clothing.",
        tips: [
          "Clean and dry items before donating",
          "Even damaged textiles can be recycled",
          "Shoes can often be donated or recycled",
          "Consider upcycling into cleaning rags"
        ],
      },
      "Mixed": {
        disposal: "Separate components by material type before disposal. Check local guidelines.",
        tips: [
          "Try to separate different materials",
          "When in doubt, check with local waste authority",
          "Mixed materials often cannot be recycled",
          "Consider if item can be disassembled"
        ],
      },
    }

    const category = aiResult.category || "Mixed"
    const categoryKey = Object.keys(categoryMapping).find(key => 
      key.toLowerCase() === category.toLowerCase()
    ) || "Mixed"
    
    const disposalInfo = categoryMapping[categoryKey] || categoryMapping["Mixed"]

    return NextResponse.json({
      category: category,
      confidence: aiResult.confidence || 0.8,
      subcategory: aiResult.subcategory,
      material: aiResult.material,
      description: aiResult.description,
      disposal: disposalInfo.disposal,
      tips: disposalInfo.tips,
    })
  } catch (error: any) {
    console.error("Classification error:", error)
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      geminiApiKey: process.env.GOOGLE_GEMINI_API_KEY ? "present" : "missing"
    })
    return NextResponse.json(
      { error: `Failed to classify image: ${error.message}` },
      { status: 500 }
    )
  }
}
