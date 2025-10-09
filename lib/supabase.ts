import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any

export const isSupabaseConfigured = () => !!supabaseUrl && !!supabaseAnonKey

// Database types
export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  eco_level: number
  total_points: number
  created_at: string
  updated_at: string
}

export interface WasteLog {
  id: string
  user_id: string
  category: 'plastic' | 'paper' | 'food' | 'glass' | 'metal' | 'other'
  weight_kg: number
  description?: string
  image_url?: string
  co2_saved: number
  money_saved: number
  logged_at: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  requirement: string
  points: number
}

export interface UserBadge {
  id: string
  user_id: string
  badge_id: string
  earned_at: string
}

export interface Achievement {
  id: string
  user_id: string
  type: string
  value: number
  achieved_at: string
}

export interface RecyclingLocation {
  id: string
  name: string
  type: 'recycling_center' | 'compost_drop' | 'hazardous_waste' | 'ewaste'
  latitude: number
  longitude: number
  address: string
  phone?: string
  hours?: string
  accepted_items: string[]
  user_id?: string
  verified: boolean
}

