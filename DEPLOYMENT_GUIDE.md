# 🚀 Vercel Deployment Guide

## Quick Deploy to Vercel

### Step 1: Prepare Your Repository
✅ **DONE!** Your code is already pushed to GitHub: `https://github.com/Prateeeek7/Zero-Waste-Lifestyle.git`

### Step 2: Deploy to Vercel

#### Option A: One-Click Deploy (Recommended)
1. Go to [Vercel](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository: `Prateeeek7/Zero-Waste-Lifestyle`
4. Vercel will auto-detect Next.js settings

#### Option B: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (run from project root)
vercel

# For production deployment
vercel --prod
```

### Step 3: Configure Environment Variables

In your Vercel project dashboard, go to **Settings → Environment Variables** and add:

#### Required Variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://your-project-name.vercel.app

LLAMA_API_KEY=your_groq_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

#### Optional Variables (for full features):
```
REPLICATE_API_TOKEN=your_replicate_token_here
NEWS_API_KEY=your_news_api_key_here
```

**Note:** Copy these values from your local `.env.local` file.

**Important:** Update `NEXTAUTH_URL` with your actual Vercel deployment URL after first deployment!

### Step 4: Update Supabase Settings

1. Go to your Supabase project: https://vwzfkpkzmfeuongqlhaw.supabase.co
2. Navigate to **Authentication → URL Configuration**
3. Add your Vercel URL to **Site URL** and **Redirect URLs**:
   ```
   https://your-project-name.vercel.app
   https://your-project-name.vercel.app/api/auth/callback
   ```

### Step 5: Deploy!

Click **Deploy** in Vercel dashboard or run:
```bash
vercel --prod
```

---

## 🎯 Post-Deployment Checklist

### After First Deployment:
- [ ] Update `NEXTAUTH_URL` environment variable with your Vercel URL
- [ ] Add Vercel URL to Supabase allowed URLs
- [ ] Test authentication (sign up/sign in)
- [ ] Test all features:
  - [ ] Dashboard
  - [ ] Waste logging
  - [ ] Badges system
  - [ ] AI Classifier
  - [ ] News feed
  - [ ] Map
  - [ ] Calculator
  - [ ] Chat bot

### Domain Setup (Optional):
1. Go to Vercel project **Settings → Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` and Supabase URLs with your custom domain

---

## 🔧 Build Configuration

Your project is already configured correctly:

**Framework:** Next.js  
**Build Command:** `next build`  
**Output Directory:** `.next`  
**Install Command:** `npm install`  
**Development Command:** `next dev`  

---

## 🐛 Troubleshooting

### Build Fails:
- Check Vercel build logs
- Ensure all environment variables are set
- Run `npm run build` locally to test

### Authentication Not Working:
- Verify `NEXTAUTH_URL` matches your deployment URL
- Check Supabase redirect URLs
- Ensure `NEXTAUTH_SECRET` is set

### Database Errors:
- Verify Supabase credentials
- Check RLS policies are disabled (as we configured)
- Ensure database tables exist

### API Errors:
- Check API keys are valid
- Verify environment variables are set correctly
- Check Vercel function logs

---

## 📊 Monitoring

### Vercel Dashboard:
- **Analytics:** Track page views and performance
- **Logs:** Monitor function execution and errors
- **Deployments:** View deployment history

### Supabase Dashboard:
- **Database:** Monitor queries and performance
- **Auth:** Track user signups and sessions
- **Logs:** View authentication and database logs

---

## 🚀 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main

# Vercel will automatically deploy!
```

---

## 🎉 Your Deployment URLs

After deployment, you'll get:
- **Production:** `https://your-project-name.vercel.app`
- **Preview:** Automatic preview URLs for each commit
- **Custom Domain:** (if configured)

---

## 💡 Tips

1. **Use Environment Variables:** Never commit API keys to git
2. **Test Locally First:** Run `npm run build` before deploying
3. **Monitor Logs:** Check Vercel logs for any issues
4. **Enable Analytics:** Track your app's performance
5. **Set up Alerts:** Get notified of deployment failures

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs

---

**Ready to deploy? Let's go! 🚀**

