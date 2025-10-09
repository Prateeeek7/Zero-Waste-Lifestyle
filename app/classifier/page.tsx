"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Camera, Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDropzone } from "react-dropzone"

interface ClassificationResult {
  category: string
  confidence: number
  subcategory?: string
  material?: string
  description?: string
  disposal: string
  tips: string[]
}

export default function ClassifierPage() {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ClassificationResult | null>(null)
  const [error, setError] = useState("")

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setError("")
    setResult(null)
    
    // Create preview
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result as string)
    reader.readAsDataURL(file)

    // Classify image
    setLoading(true)
    
    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await fetch("/api/classify", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Classification failed")

      const data = await response.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message || "Failed to classify image")
    } finally {
      setLoading(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            AI Waste Classifier
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Upload a photo and let AI identify the waste type and disposal method
          </p>
        </motion.div>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-8">
            {!image ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                  isDragActive
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-300 dark:border-gray-600 hover:border-green-400"
                }`}
              >
                <input {...getInputProps()} />
                <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {isDragActive ? "Drop image here" : "Upload or drag waste image"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  PNG, JPG, JPEG, WebP up to 10MB
                </p>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative">
                  <img
                    src={image}
                    alt="Waste item"
                    className="w-full h-96 object-contain bg-gray-100 dark:bg-gray-900 rounded-xl"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setImage(null)
                      setResult(null)
                      setError("")
                    }}
                    className="absolute top-4 right-4 bg-white/90"
                  >
                    Change Image
                  </Button>
                </div>

                {loading && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-green-600 mr-3" />
                    <span className="text-lg text-gray-700 dark:text-gray-300">
                      Analyzing image with AI...
                    </span>
                  </div>
                )}

                {error && (
                  <div className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                {result && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-xl text-white mb-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <CheckCircle className="w-6 h-6" />
                        <h3 className="text-2xl font-bold">Classification Complete!</h3>
                      </div>
                      <p className="text-green-50">
                        Confidence: {(result.confidence * 100).toFixed(1)}%
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                          Category: <span className="text-green-600">{result.category}</span>
                        </h4>
                        {result.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 italic">
                            {result.description}
                          </p>
                        )}
                        {result.subcategory && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <span className="font-medium">Type:</span> {result.subcategory}
                          </p>
                        )}
                        {result.material && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            <span className="font-medium">Material:</span> {result.material}
                          </p>
                        )}
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          🗑️ Disposal Instructions:
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">{result.disposal}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">💡 Pro Tips:</h4>
                        <ul className="space-y-2">
                          {result.tips.map((tip, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2 text-gray-700 dark:text-gray-300"
                            >
                              <span className="text-green-600">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        onClick={() => {
                          setImage(null)
                          setResult(null)
                        }}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Classify Another Item
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
