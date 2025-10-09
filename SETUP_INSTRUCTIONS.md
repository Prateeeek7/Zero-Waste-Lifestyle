# 🎯 Quick Start - Get All Features Working

## Step 1: Get Your API Keys (15 minutes)

### 1. Supabase (Free - Required for database)
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Copy these two values:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon/Public Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Go to SQL Editor and paste entire `supabase-schema.sql` file
5. Click "Run" - all tables will be created!

### 2. Groq API (Free - Already have this)
- You already have `LLAMA_API_KEY` configured ✅

### 3. Replicate (Free tier - For AI waste classifier)
1. Go to https://replicate.com
2. Sign up (free)
3. Go to https://replicate.com/account/api-tokens
4. Copy token → `REPLICATE_API_TOKEN`

### 4. News API (Free - For news feed)
1. Go to https://newsapi.org/register
2. Get free API key (500 requests/day)
3. Copy key → `NEWS_API_KEY`

### 5. Google Maps (Free $200 credit/month)
1. Go to https://console.cloud.google.com
2. Enable Maps JavaScript API
3. Create API key → `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### 6. NextAuth Secret (Generate locally)
```bash
openssl rand -base64 32
```
Copy output → `NEXTAUTH_SECRET`

## Step 2: Update .env.local

Create `.env.local` in project root:

```env
# Already have this ✅
LLAMA_API_KEY=gsk_your_key_here

# Add these new ones:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXTAUTH_URL=http://localhost:4000
NEXTAUTH_SECRET=your_generated_secret_here
REPLICATE_API_TOKEN=your_replicate_token_here
NEWS_API_KEY=your_news_api_key_here
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key_here
```

## Step 3: Restart Server

```bash
# Stop current server (Ctrl+C in terminal)
npm run dev -- -p 4000
```

## Step 4: Test Features

Open http://localhost:4000 and test:

1. ✅ **Home Page** - Should load
2. ✅ **Sign Up** - Create account (go to /auth/signup)
3. ✅ **Log Waste** - Go to /dashboard and add waste entry
4. ✅ **View Analytics** - See charts and stats
5. ✅ **Upload Image** - Test AI waste classifier
6. ✅ **View Map** - See recycling locations near you
7. ✅ **Check Leaderboard** - See rankings
8. ✅ **Read News** - Browse sustainability news
9. ✅ **Earn Badges** - Complete achievements

## 🚨 Troubleshooting

### Database Connection Error
- Check Supabase URL and key are correct
- Make sure SQL schema was run in Supabase

### AI Classifier Not Working
- Check Replicate API token
- Verify you have free credits

### Map Not Loading
- Check Google Maps API key
- Enable Maps JavaScript API in Google Cloud Console

### News Not Showing
- Check News API key
- Free tier = 500 requests/day

---

**Once all API keys are added, ALL features will work - no placeholders!** 🎉

