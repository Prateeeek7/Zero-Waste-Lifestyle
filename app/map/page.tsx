"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Plus, Filter, Navigation } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import InteractiveMap from "@/components/interactive-map"

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

const LOCATION_TYPES = [
  { value: "recycling_center", label: "Recycling Center", color: "bg-green-500" },
  { value: "compost_drop", label: "Compost Drop-off", color: "bg-amber-500" },
  { value: "hazardous_waste", label: "Hazardous Waste", color: "bg-red-500" },
  { value: "ewaste", label: "E-Waste Collection", color: "bg-blue-500" },
  { value: "donation", label: "Donation Center", color: "bg-purple-500" },
]

// Vellore, Tamil Nadu locations
const MOCK_LOCATIONS: Location[] = [
  {
    id: "1",
    name: "Vellore Municipal Corporation Recycling Center",
    type: "recycling_center",
    latitude: 12.9202,
    longitude: 79.1500,
    address: "Near Vellore Fort, Vellore, Tamil Nadu 632001",
    phone: "(0416) 222-0100",
    hours: "Mon-Sat 8AM-6PM",
    accepted_items: ["Plastic", "Paper", "Glass", "Metal", "Cardboard"],
    verified: true,
  },
  {
    id: "2",
    name: "VIT University Compost Center",
    type: "compost_drop",
    latitude: 12.9698,
    longitude: 79.1559,
    address: "VIT University Campus, Katpadi, Vellore, Tamil Nadu 632014",
    phone: "(0416) 220-2000",
    hours: "Daily 7AM-7PM",
    accepted_items: ["Food Scraps", "Yard Waste", "Paper", "Organic Waste"],
    verified: true,
  },
  {
    id: "3",
    name: "Vellore E-Waste Collection Point",
    type: "ewaste",
    latitude: 12.9056,
    longitude: 79.1375,
    address: "Near CMC Hospital, Vellore, Tamil Nadu 632004",
    phone: "(0416) 228-3000",
    hours: "Tue-Sat 9AM-5PM",
    accepted_items: ["Electronics", "Batteries", "Cables", "Mobile Phones", "Laptops"],
    verified: true,
  },
  {
    id: "4",
    name: "Vellore Hazardous Waste Facility",
    type: "hazardous_waste",
    latitude: 12.9344,
    longitude: 79.1650,
    address: "Industrial Area, Vellore, Tamil Nadu 632002",
    phone: "(0416) 225-4000",
    hours: "Wed-Sat 8AM-4PM",
    accepted_items: ["Chemicals", "Paints", "Solvents", "Medical Waste"],
    verified: true,
  },
  {
    id: "5",
    name: "Christian Medical College Donation Center",
    type: "donation",
    latitude: 12.9202,
    longitude: 79.1500,
    address: "CMC Hospital Campus, Vellore, Tamil Nadu 632004",
    phone: "(0416) 228-2000",
    hours: "Mon-Fri 9AM-5PM",
    accepted_items: ["Clothes", "Books", "Toys", "Furniture"],
    verified: true,
  },
]

export default function MapPage() {
  const [locations, setLocations] = useState<Location[]>(MOCK_LOCATIONS)
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(MOCK_LOCATIONS)
  const [selectedType, setSelectedType] = useState<string>("all")
  const [userLocation, setUserLocation] = useState<[number, number]>([12.9202, 79.1500]) // Default: Vellore, Tamil Nadu
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "recycling_center",
    address: "",
    phone: "",
    hours: "",
  })

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude])
      })
    }

    // Load locations immediately
    loadLocations()
  }, [])

  // Debug: Log when locations change
  useEffect(() => {
    console.log("Locations updated:", locations.length, locations)
  }, [locations])

  useEffect(() => {
    if (selectedType === "all") {
      setFilteredLocations(locations)
    } else {
      setFilteredLocations(locations.filter((loc) => loc.type === selectedType))
    }
  }, [selectedType, locations])

  const loadLocations = async () => {
    console.log("Loading locations...")
    
    // Use the Vellore mock data that's already defined
    console.log("Setting Vellore mock data:", MOCK_LOCATIONS)
    setLocations(MOCK_LOCATIONS)
    setFilteredLocations(MOCK_LOCATIONS)
    
    // Try to load from Supabase if configured (but don't wait for it)
    if (isSupabaseConfigured()) {
      try {
        const { data } = await supabase
          .from("recycling_locations")
          .select("*")
          .order("verified", { ascending: false })

        if (data && data.length > 0) {
          console.log("Loaded from Supabase:", data)
          setLocations(data)
        }
      } catch (error) {
        console.log("Supabase error, using mock data:", error)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isSupabaseConfigured()) {
      alert("Supabase not configured. Set up database to add locations.")
      return
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert("Please sign in to add locations")
      return
    }

    const { error } = await supabase.from("recycling_locations").insert({
      name: formData.name,
      type: formData.type,
      latitude: userLocation[0],
      longitude: userLocation[1],
      address: formData.address,
      phone: formData.phone,
      hours: formData.hours,
      accepted_items: [],
      user_id: user.id,
      verified: false,
    })

    if (!error) {
      setDialogOpen(false)
      setFormData({
        name: "",
        type: "recycling_center",
        address: "",
        phone: "",
        hours: "",
      })
      loadLocations()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Vellore Waste Management Map</h1>
            <p className="text-gray-600 dark:text-gray-300">Find recycling centers and drop-off locations in Vellore, Tamil Nadu</p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Location
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Location</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    placeholder="City Recycling Center"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATION_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <Input
                    placeholder="123 Main St"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone (Optional)</label>
                  <Input
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Hours (Optional)</label>
                  <Input
                    placeholder="Mon-Fri 9AM-5PM"
                    value={formData.hours}
                    onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Submit Location
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("all")}
            className={selectedType === "all" ? "bg-green-600" : ""}
          >
            All Locations
          </Button>
          {LOCATION_TYPES.map((type) => (
            <Button
              key={type.value}
              variant={selectedType === type.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type.value)}
              className={selectedType === type.value ? `${type.color} text-white` : ""}
            >
              {type.label}
            </Button>
          ))}
        </div>

        {/* Interactive Map Display */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl mb-6">
          <CardContent className="p-0">
            <InteractiveMap locations={filteredLocations} userLocation={userLocation} />
            
            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs z-10">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                📍 {filteredLocations.length} Locations
              </h3>
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Your Location</span>
                </div>
                {LOCATION_TYPES.map((type) => {
                  const count = locations.filter((loc) => loc.type === type.value).length
                  if (count === 0) return null
                  return (
                    <div key={type.value} className="flex items-center space-x-2">
                      <div className={`w-3 h-3 ${type.color} rounded-full`}></div>
                      <span>{type.label} ({count})</span>
                    </div>
                  )
                })}
              </div>
              <p className="text-xs text-gray-500 mt-3 italic">
                Click markers to see details
              </p>
              <p className="text-xs text-green-600 mt-2 font-medium">
                🗺️ OpenStreetMap - Real interactive map
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Location List */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredLocations.map((location) => {
            const typeInfo = LOCATION_TYPES.find((t) => t.value === location.type)
            return (
              <Card key={location.id} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <MapPin className={`w-5 h-5 ${typeInfo?.color.replace("bg-", "text-")}`} />
                        <span>{location.name}</span>
                      </CardTitle>
                      <Badge className={`${typeInfo?.color} text-white mt-2`}>
                        {typeInfo?.label}
                      </Badge>
                    </div>
                    {location.verified && (
                      <Badge variant="outline" className="border-green-500 text-green-600">
                        Verified
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <p>📍 {location.address}</p>
                    {location.phone && <p>📞 {location.phone}</p>}
                    {location.hours && <p>🕒 {location.hours}</p>}
                    {location.accepted_items.length > 0 && (
                      <div>
                        <p className="font-semibold mt-3 mb-1">Accepts:</p>
                        <div className="flex flex-wrap gap-1">
                          {location.accepted_items.map((item) => (
                            <Badge key={item} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredLocations.length === 0 && (
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardContent className="py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No locations found for this category
              </p>
              <Button onClick={() => setDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add First Location
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
