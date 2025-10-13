import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const refresh = searchParams.get('refresh')
  
  // Helper function to get cache headers
  const getCacheHeaders = (isRefresh: boolean) => ({
    'Cache-Control': isRefresh ? 'no-cache, no-store, must-revalidate' : 'public, max-age=300'
  })

  // Helper function to return fallback articles
  const returnFallbackArticles = (isRefresh: boolean) => {
    const fallbackArticles = [
      {
        title: "Smart Waste Management Systems Reduce Collection Costs by 40%",
        description: "IoT sensors in waste bins optimize collection routes, reducing fuel consumption and improving recycling rates in major cities.",
        url: "https://example.com/smart-waste-management",
        image_url: "/placeholder.jpg",
        published_at: new Date().toISOString(),
        source: "Waste Management Today",
      },
      {
        title: "Renewable Energy from Waste: New Plant Converts Trash to Electricity",
        description: "Innovative waste-to-energy facility generates clean power for 50,000 homes while reducing landfill waste by 80%.",
        url: "https://example.com/waste-to-energy",
        image_url: "/placeholder.jpg",
        published_at: new Date(Date.now() - 86400000).toISOString(),
        source: "Energy Management News",
      },
      {
        title: "Circular Economy: How Recycling Saves Energy and Resources",
        description: "Study reveals recycling aluminum saves 95% of energy compared to producing from raw materials, reducing carbon emissions significantly.",
        url: "https://example.com/circular-economy",
        image_url: "/placeholder.jpg",
        published_at: new Date(Date.now() - 172800000).toISOString(),
        source: "Sustainability Science",
      },
    ]
    return NextResponse.json({ articles: fallbackArticles }, { headers: getCacheHeaders(isRefresh) })
  }

  try {
    const newsApiKey = process.env.NEWS_API_KEY || "20d94ce043114cd68374776da96f8b69"

    console.log("News API called with key:", newsApiKey ? "present" : "missing", "refresh:", refresh)

    // Focused search query for specific categories only (shortened to avoid API limits)
    const searchQuery = '(waste+management)+OR+(pollution)+OR+(nature+conservation)+OR+(climate+change)+OR+(renewable+energy)+OR+(waste+reduction)+OR+(environmental+protection)'

    // Add cache-busting parameter to News API URL for fresh data
    const cacheBuster = refresh === 'true' ? `&refresh=${Date.now()}` : ''
    
    // Fetch real news from News API based on category
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${searchQuery}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${newsApiKey}${cacheBuster}`,
      {
        cache: refresh === 'true' ? 'no-store' : 'default',
        headers: {
          'Cache-Control': refresh === 'true' ? 'no-cache, no-store, must-revalidate' : 'public, max-age=300'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`News API request failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    if (data.status !== "ok") {
      throw new Error(`News API error: ${data.message || "Unknown error"}`)
    }

    const articles = data.articles
      .filter((article: any) => article.title && article.description) // Filter out incomplete articles
      .map((article: any) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        image_url: article.urlToImage || "/placeholder.jpg",
        published_at: article.publishedAt,
        source: article.source.name,
      }))
      .slice(0, 12) // Limit to 12 articles

    // If no articles found, return fallback data
    if (articles.length === 0) {
      console.log("No articles found, returning fallback data")
      return returnFallbackArticles(refresh === 'true')
    }

    console.log(`Returning ${articles.length} articles from News API`)
    
    return NextResponse.json({ articles }, { headers: getCacheHeaders(refresh === 'true') })
  } catch (error) {
    console.error("News API error:", error)
    return returnFallbackArticles(refresh === 'true')
  }
}