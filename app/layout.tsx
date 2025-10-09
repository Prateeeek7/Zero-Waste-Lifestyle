import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "leaflet/dist/leaflet.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import WasteBot from "@/components/waste-bot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zero Waste Lifestyle - Sustainable Living Education Platform",
  description:
    "Learn sustainable habits, master waste segregation, and embrace conscious living with our comprehensive educational platform powered by AI. Join thousands in creating a zero-waste future.",
  keywords:
    "zero waste, sustainability, recycling, composting, eco-friendly, green living, waste reduction, environmental education",
  authors: [{ name: "Zero Waste Lifestyle Team" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "Zero Waste Lifestyle - Sustainable Living Education",
    description:
      "Master sustainable living with interactive guides, AI assistance, and comprehensive waste management education.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zero Waste Lifestyle - Sustainable Living Education",
    description: "Learn sustainable habits and reduce waste with our comprehensive educational platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WasteBot />
        </ThemeProvider>
      </body>
    </html>
  )
}
