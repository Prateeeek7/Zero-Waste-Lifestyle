"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon, DivIcon } from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
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

interface LeafletMapProps {
  locations: Location[]
  userLocation: [number, number]
}

const LOCATION_TYPES = [
  { value: "recycling_center", label: "Recycling Center", color: "#10B981" },
  { value: "compost_drop", label: "Compost Drop-off", color: "#F59E0B" },
  { value: "hazardous_waste", label: "Hazardous Waste", color: "#EF4444" },
  { value: "ewaste", label: "E-Waste Collection", color: "#3B82F6" },
  { value: "donation", label: "Donation Center", color: "#8B5CF6" },
]

// Create custom marker icon
const createCustomIcon = (color: string) => {
  return new DivIcon({
    className: 'custom-marker',
    html: `
      <div style="position: relative;">
        <svg width="32" height="45" viewBox="0 0 32 45" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.2 0 0 7.2 0 16c0 16 16 29 16 29s16-13 16-29c0-8.8-7.2-16-16-16z" fill="${color}"/>
          <circle cx="16" cy="16" r="8" fill="white"/>
        </svg>
      </div>
    `,
    iconSize: [32, 45],
    iconAnchor: [16, 45],
    popupAnchor: [0, -45],
  })
}

const userLocationIcon = new DivIcon({
  className: 'user-marker',
  html: `
    <div style="position: relative;">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#3B82F6" stroke="white" stroke-width="3"/>
        <circle cx="12" cy="12" r="4" fill="white"/>
      </svg>
      <div style="position: absolute; top: 100%; left: 50%; transform: translateX(-50%); white-space: nowrap; background: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; color: #3B82F6; box-shadow: 0 2px 4px rgba(0,0,0,0.2); margin-top: 4px;">
        You are here
      </div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
})

export default function LeafletMap({ locations, userLocation }: LeafletMapProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    console.log("LeafletMap: Client-side rendering, locations:", locations.length)
  }, [locations])

  if (!isClient) {
    return (
      <div className="h-[500px] bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading OpenStreetMap...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[500px] rounded-lg overflow-hidden relative z-0">
      <MapContainer
        center={[12.9202, 79.1500]} // Vellore coordinates
        zoom={13}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        scrollWheelZoom={true}
        zoomControl={true}
        key="vellore-map" // Force re-render
      >
        {/* OpenStreetMap Tile Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* User Location Marker */}
        <Marker position={[12.9202, 79.1500]} icon={userLocationIcon}>
          <Popup>
            <div className="text-center p-2">
              <strong className="text-blue-600">You are here</strong>
              <br />
              <span className="text-sm text-gray-600">Vellore, Tamil Nadu</span>
            </div>
          </Popup>
        </Marker>

        {/* Location Markers */}
        {locations.map((location) => {
          const typeInfo = LOCATION_TYPES.find((t) => t.value === location.type)
          const iconColor = typeInfo?.color || "#6B7280"
          
          console.log(`Rendering marker for ${location.name} at [${location.latitude}, ${location.longitude}]`)
          
          return (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude]}
              icon={createCustomIcon(iconColor)}
            >
              <Popup maxWidth={300}>
                <div className="p-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <div 
                      style={{ backgroundColor: iconColor }} 
                      className="w-3 h-3 rounded-full"
                    ></div>
                    <h3 className="font-bold text-sm">{location.name}</h3>
                    {location.verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-2">📍 {location.address}</p>
                  
                  {location.phone && (
                    <p className="text-xs text-gray-600 mb-1">📞 {location.phone}</p>
                  )}
                  
                  {location.hours && (
                    <p className="text-xs text-gray-600 mb-2">🕒 {location.hours}</p>
                  )}
                  
                  {location.accepted_items.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold mb-1">Accepts:</p>
                      <div className="flex flex-wrap gap-1">
                        {location.accepted_items.slice(0, 4).map((item) => (
                          <span
                            key={item}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {item}
                          </span>
                        ))}
                        {location.accepted_items.length > 4 && (
                          <span className="text-xs text-gray-500">
                            +{location.accepted_items.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-600 text-white text-xs px-3 py-2 rounded hover:bg-green-700 transition-colors w-full text-center"
                  >
                    🧭 Get Directions
                  </a>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
