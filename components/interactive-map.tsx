"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import Leaflet map to avoid SSR issues
const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Loading OpenStreetMap...</p>
      </div>
    </div>
  ),
})

interface Location {
  id: string
  name: string
  type: string
  latitude: number
  longitude: number
  address: string
  phone?: string
  hours?: string
  accepted_items: string[]
  verified: boolean
}

interface InteractiveMapProps {
  locations: Location[]
  userLocation: [number, number]
}

const LOCATION_TYPES = [
  { value: "recycling_center", label: "Recycling Center", color: "bg-green-500" },
  { value: "compost_drop", label: "Compost Drop-off", color: "bg-amber-500" },
  { value: "hazardous_waste", label: "Hazardous Waste", color: "bg-red-500" },
  { value: "ewaste", label: "E-Waste Collection", color: "bg-blue-500" },
  { value: "donation", label: "Donation Center", color: "bg-purple-500" },
]

export default function InteractiveMap({ locations, userLocation }: InteractiveMapProps) {
  return <LeafletMap locations={locations} userLocation={userLocation} />
}
