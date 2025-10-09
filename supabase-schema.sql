-- Zero Waste Lifestyle Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    avatar_url TEXT,
    eco_level INTEGER DEFAULT 1,
    total_points INTEGER DEFAULT 0,
    total_co2_saved DECIMAL(10,2) DEFAULT 0,
    total_money_saved DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Waste logs table
CREATE TABLE public.waste_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN ('plastic', 'paper', 'food', 'glass', 'metal', 'ewaste', 'other')),
    weight_kg DECIMAL(10,3) NOT NULL,
    description TEXT,
    image_url TEXT,
    co2_saved DECIMAL(10,2) DEFAULT 0,
    money_saved DECIMAL(10,2) DEFAULT 0,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Badges table
CREATE TABLE public.badges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    requirement TEXT NOT NULL,
    points INTEGER DEFAULT 0,
    tier TEXT CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')) DEFAULT 'bronze',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User badges table
CREATE TABLE public.user_badges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, badge_id)
);

-- Achievements table
CREATE TABLE public.achievements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    achieved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recycling locations table
CREATE TABLE public.recycling_locations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('recycling_center', 'compost_drop', 'hazardous_waste', 'ewaste', 'donation')),
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    address TEXT NOT NULL,
    phone TEXT,
    hours TEXT,
    accepted_items TEXT[] DEFAULT '{}',
    user_id UUID REFERENCES public.profiles(id),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User goals table
CREATE TABLE public.user_goals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    goal_type TEXT NOT NULL,
    target_value DECIMAL(10,2) NOT NULL,
    current_value DECIMAL(10,2) DEFAULT 0,
    deadline DATE,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News articles cache table
CREATE TABLE public.news_articles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    url TEXT NOT NULL UNIQUE,
    image_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    source TEXT,
    cached_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_waste_logs_user_id ON public.waste_logs(user_id);
CREATE INDEX idx_waste_logs_logged_at ON public.waste_logs(logged_at);
CREATE INDEX idx_user_badges_user_id ON public.user_badges(user_id);
CREATE INDEX idx_achievements_user_id ON public.achievements(user_id);
CREATE INDEX idx_recycling_locations_type ON public.recycling_locations(type);
CREATE INDEX idx_user_goals_user_id ON public.user_goals(user_id);

-- Insert default badges
INSERT INTO public.badges (name, description, icon, requirement, points, tier) VALUES
('First Step', 'Log your first waste entry', '🌱', 'Log 1 waste entry', 10, 'bronze'),
('Week Warrior', 'Log waste for 7 consecutive days', '📅', 'Log waste for 7 days', 50, 'silver'),
('Recycling Champion', 'Recycle 100kg of waste', '♻️', 'Recycle 100kg total', 100, 'gold'),
('Zero Waste Hero', 'Achieve 50% waste reduction', '🏆', 'Reduce waste by 50%', 200, 'platinum'),
('Eco Educator', 'Complete all quizzes with 100% score', '🎓', 'Complete all quizzes', 150, 'gold'),
('Community Helper', 'Add 5 recycling locations', '🗺️', 'Add 5 locations', 75, 'silver'),
('Plastic Reducer', 'Reduce plastic waste by 25kg', '🚫', 'Reduce 25kg plastic', 80, 'silver'),
('Compost King', 'Compost 50kg of organic waste', '🌿', 'Compost 50kg', 90, 'gold'),
('Green Streak', 'Maintain 30-day eco activity streak', '🔥', '30-day streak', 120, 'gold'),
('Planet Protector', 'Save 100kg CO2 emissions', '🌍', 'Save 100kg CO2', 150, 'platinum');

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waste_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_goals ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Waste logs policies
CREATE POLICY "Users can view own waste logs" ON public.waste_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own waste logs" ON public.waste_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own waste logs" ON public.waste_logs
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own waste logs" ON public.waste_logs
    FOR DELETE USING (auth.uid() = user_id);

-- User badges policies
CREATE POLICY "Users can view own badges" ON public.user_badges
    FOR SELECT USING (auth.uid() = user_id);

-- Achievements policies
CREATE POLICY "Users can view own achievements" ON public.achievements
    FOR SELECT USING (auth.uid() = user_id);

-- User goals policies
CREATE POLICY "Users can manage own goals" ON public.user_goals
    FOR ALL USING (auth.uid() = user_id);

-- Recycling locations policies (public read, authenticated write)
CREATE POLICY "Anyone can view recycling locations" ON public.recycling_locations
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can add locations" ON public.recycling_locations
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Functions for automatic calculations
CREATE OR REPLACE FUNCTION calculate_co2_savings(category TEXT, weight_kg DECIMAL)
RETURNS DECIMAL AS $$
BEGIN
    RETURN CASE category
        WHEN 'plastic' THEN weight_kg * 2.5
        WHEN 'paper' THEN weight_kg * 0.9
        WHEN 'glass' THEN weight_kg * 0.3
        WHEN 'metal' THEN weight_kg * 1.5
        WHEN 'ewaste' THEN weight_kg * 4.0
        ELSE weight_kg * 0.5
    END;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION calculate_money_savings(category TEXT, weight_kg DECIMAL)
RETURNS DECIMAL AS $$
BEGIN
    RETURN CASE category
        WHEN 'plastic' THEN weight_kg * 0.50
        WHEN 'paper' THEN weight_kg * 0.10
        WHEN 'glass' THEN weight_kg * 0.05
        WHEN 'metal' THEN weight_kg * 0.75
        WHEN 'ewaste' THEN weight_kg * 2.00
        ELSE weight_kg * 0.20
    END;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update profile stats
CREATE OR REPLACE FUNCTION update_profile_stats()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.profiles
    SET 
        total_co2_saved = total_co2_saved + NEW.co2_saved,
        total_money_saved = total_money_saved + NEW.money_saved,
        total_points = total_points + CEIL(NEW.weight_kg * 10),
        updated_at = NOW()
    WHERE id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_waste_log_insert
AFTER INSERT ON public.waste_logs
FOR EACH ROW
EXECUTE FUNCTION update_profile_stats();

-- Trigger to auto-calculate savings on waste log insert
CREATE OR REPLACE FUNCTION auto_calculate_savings()
RETURNS TRIGGER AS $$
BEGIN
    NEW.co2_saved := calculate_co2_savings(NEW.category, NEW.weight_kg);
    NEW.money_saved := calculate_money_savings(NEW.category, NEW.weight_kg);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_waste_log_insert
BEFORE INSERT ON public.waste_logs
FOR EACH ROW
EXECUTE FUNCTION auto_calculate_savings();

