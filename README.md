# 🌍 Zero Waste Lifestyle - Complete Sustainability Platform

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

A **comprehensive, production-ready** educational platform that empowers individuals to adopt sustainable habits, master waste segregation, and embrace conscious living. Built with modern web technologies and powered by AI to provide personalized waste management guidance.

---

## ✨ Complete Feature List

### 🤖 **AI-Powered Features**

#### **1. AI Waste Classifier** 📸
- **Real image recognition** using Google Gemini 2.0 Flash
- Upload or drag-and-drop waste photos
- Identifies 9 categories: Plastic, Paper, Glass, Metal, Organic, E-Waste, Hazardous, Textile, Mixed
- Provides:
  - Confidence score
  - Item description
  - Material composition
  - Disposal instructions
  - Pro tips for proper management
- **Free tier:** 15 requests/minute

#### **2. Intelligent Chatbot** 💬
- Powered by Meta LLaMA 3 (70B) via Groq Cloud
- Personalized recommendations based on user activity
- Context-aware waste disposal advice
- Real-time responses
- Floating widget accessible from any page

---

### 📊 **User Dashboard & Tracking**

#### **3. Interactive Dashboard** 📈
- **Visual analytics** with Recharts
- Line charts showing waste trends over time
- Pie charts for waste composition
- Impact metrics (CO2 saved, items recycled)
- Monthly/yearly comparison
- Data fetched from Supabase

#### **4. Smart Waste Logging** 📝
- Log daily waste items
- Track by category (Plastic, Paper, Glass, etc.)
- Record weight/quantity
- View waste history
- Export data for analysis

#### **5. Progress Tracker** 🎯
- Visualize sustainability achievements
- Track points and milestones
- Set and monitor personal goals
- Gamified progress system

---

### 🏆 **Gamification & Community**

#### **6. Badge System** 🎖️
- Earn badges for achievements:
  - First Steps (log first waste)
  - Eco Warrior (100 items logged)
  - Zero Waste Champion (30-day streak)
  - And many more!
- Beautiful badge showcase
- Rarity levels: Common, Rare, Epic, Legendary

#### **7. Global Leaderboard** 🏅
- Compete with users worldwide
- Rankings based on eco-score
- View top performers
- Track your position
- Regional leaderboards

#### **8. Community Map** 🗺️
- **Interactive OpenStreetMap** with Leaflet
- Find recycling centers near you
- Drop-off locations for e-waste, hazardous waste
- Vellore, Tamil Nadu locations (expandable)
- Filter by waste type
- Get directions to facilities
- Real-time location data

---

### 📚 **Educational Content**

#### **9. Knowledge Quiz** 🧩
- **100+ questions** from quiz database
- 10 categories:
  - Basics of Waste
  - Segregation & Types
  - Recycling & Reuse
  - Environmental Impact
  - Waste Management in India
  - Composting & Zero Waste
  - E-Waste & Hazardous
  - Circular Economy
  - Public Awareness
  - General Knowledge
- **Random questions** each attempt
- Category selection
- Timer-based challenges
- Detailed explanations
- Score tracking
- Badge rewards

#### **10. Learn Section** 📖
- Comprehensive articles on sustainability
- Markdown-compatible tutorials
- Topics:
  - Waste segregation
  - Composting guide
  - Plastic alternatives
  - Zero waste living
- Loading animations
- Responsive design

#### **11. Video Library** 🎥
- Curated educational videos
- YouTube integration
- Categories:
  - Getting Started
  - Advanced Techniques
  - Success Stories
- Responsive video player
- Loading states

#### **12. Waste Categories Guide** ♻️
- Detailed breakdown of waste types:
  - Recyclable (Plastic, Paper, Glass, Metal)
  - Compostable (Food, Yard waste)
  - Hazardous (Chemicals, E-waste)
  - Landfill (Non-recyclable items)
- Color-coded bins
- Disposal instructions
- Do's and Don'ts
- Interactive cards

---

### 📰 **News & Updates**

#### **13. Dynamic News Feed** 📡
- **Live news** from News API
- Focused on:
  - Waste management
  - Energy efficiency
  - Recycling innovations
  - Circular economy
  - Zero waste initiatives
- Category badges
- Article previews
- External links
- Fallback mock data

---

### 🔧 **Utility Tools**

#### **14. Impact Calculator** 📐
- Calculate environmental savings
- Input: Single-use items reduced
- Output:
  - CO2 emissions saved
  - Trees saved
  - Water conserved
  - Money saved
- Shareable results

#### **15. Personal Checklist** ✅
- Track daily sustainable actions
- Customizable items
- Progress percentage
- Streak tracking
- Local storage persistence

---

### 👤 **User Management**

#### **16. Authentication System** 🔐
- User registration (Supabase Auth)
- Secure login
- Password reset
- Session management
- Protected routes

#### **17. User Profiles** 👥
- Personal dashboard
- Activity history
- Statistics overview
- Badge collection
- Settings management

---

### 📱 **PWA Features**

#### **18. Progressive Web App** 📲
- Install on mobile/desktop
- Offline capability
- Service worker caching
- App manifest
- "Add to Home Screen"
- Push notifications (ready)

---

### 🎨 **UI/UX Features**

#### **19. Modern Design System** ✨
- **Dark mode** support
- Glassmorphism effects
- Smooth animations (Framer Motion)
- Responsive layout
- Mobile-first design
- Accessibility (ARIA labels)
- Loading states
- Error boundaries

#### **20. Navigation** 🧭
- Sticky header
- Mobile hamburger menu
- Footer with quick links
- Breadcrumbs
- Smooth scrolling
- Route transitions

---

### 🔮 **Advanced Features**

#### **21. Predictive Analytics** 📊
- TensorFlow.js integration (placeholder)
- Waste pattern prediction
- Trend analysis
- Personalized insights
- ML-powered recommendations

#### **22. Blog Platform** 📝
- Success stories
- Tips & tricks
- Latest sustainability news
- User submissions
- Social sharing

#### **23. Newsletter** 📧
- Email subscription
- Exclusive content
- Weekly tips
- Feature updates
- Community highlights

---

## 🚀 Tech Stack

### **Frontend**
- **Framework:** Next.js 14.2 (App Router)
- **UI Library:** React 18
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4
- **Components:** shadcn/ui
- **Animations:** Framer Motion 11
- **Icons:** Lucide React
- **Charts:** Recharts, Chart.js
- **Forms:** React Hook Form + Zod
- **State:** React Hooks, Local Storage

### **Backend & Database**
- **BaaS:** Supabase
- **Database:** PostgreSQL (via Supabase)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage (ready)
- **Real-time:** Supabase Realtime

### **AI & APIs**
- **AI Chatbot:** Groq Cloud (LLaMA 3 70B)
- **Image Recognition:** Google Gemini 2.0 Flash
- **News:** News API
- **Maps:** Leaflet + OpenStreetMap
- **AI SDK:** Vercel AI SDK

### **DevOps**
- **Deployment:** Vercel (recommended)
- **Version Control:** Git
- **Package Manager:** npm/pnpm
- **Linting:** ESLint
- **Type Checking:** TypeScript

---

## ⚙️ Installation & Setup

### **Prerequisites**
- Node.js 18.x or higher
- npm, yarn, or pnpm
- Git

### **1. Clone Repository**

    ```bash
git clone https://github.com/Prateeeek7/zero-waste-lifestyle.git
    cd zero-waste-lifestyle
    ```

### **2. Install Dependencies**

   ```bash
    npm install
# or
pnpm install
    # or
    yarn install
   ```

### **3. Environment Variables**

Create `.env.local` in the project root:

```env
# AI Services
    LLAMA_API_KEY=gsk_YOUR_GROQ_API_KEY_HERE
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE

# Supabase (Database & Auth)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# News API
NEWS_API_KEY=your_news_api_key

# NextAuth (Optional, if using NextAuth)
NEXTAUTH_SECRET=your_nextauth_secret
```

#### **Get Your API Keys:**

1. **Groq (AI Chatbot)** - Free
   - Visit: https://console.groq.com/keys
   - Sign up and create an API key
   - Free tier: Generous limits

2. **Google Gemini (Waste Classifier)** - Free
   - Visit: https://makersuite.google.com/app/apikey
   - Create API key in new project
   - Free tier: 15 requests/minute
   - See `GET_GEMINI_API.md` for detailed guide

3. **Supabase (Database)** - Free
   - Visit: https://supabase.com/dashboard
   - Create new project
   - Copy URL and anon key
   - Free tier: 500MB database, 50,000 monthly users

4. **News API** - Free
   - Visit: https://newsapi.org/
   - Sign up for free account
   - Copy API key
   - Free tier: 100 requests/day

### **4. Database Setup**

See `SUPABASE_SETUP_GUIDE.md` for complete database schema and setup instructions.

### **5. Run Development Server**

    ```bash
npm run dev
```

The app will start on **http://localhost:4000** (default port configured in package.json)

---

## 📂 Project Structure

```text
zero-waste-lifestyle/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── chat/route.ts        # AI Chatbot endpoint
│   │   ├── classify/route.ts    # Image classification
│   │   ├── news/route.ts        # News feed
│   │   └── quiz/route.ts        # Quiz data
│   ├── auth/                     # Authentication pages
│   │   ├── signin/page.tsx
│   │   └── signup/page.tsx
│   ├── analytics/page.tsx        # Predictive analytics
│   ├── badges/page.tsx           # Badge showcase
│   ├── blog/page.tsx             # Blog platform
│   ├── calculator/page.tsx       # Impact calculator
│   ├── categories/page.tsx       # Waste categories guide
│   ├── chat/page.tsx             # AI chatbot page
│   ├── checklist/page.tsx        # Personal checklist
│   ├── classifier/page.tsx       # AI waste classifier
│   ├── dashboard/page.tsx        # User dashboard
│   ├── leaderboard/page.tsx      # Global rankings
│   ├── learn/page.tsx            # Educational articles
│   ├── map/page.tsx              # Community map
│   ├── news/page.tsx             # News feed
│   ├── newsletter/page.tsx       # Newsletter signup
│   ├── progress/page.tsx         # Progress tracker
│   ├── quiz/page.tsx             # Knowledge quiz
│   ├── stories/page.tsx          # Success stories
│   ├── tips/page.tsx             # Tips & tricks
│   ├── videos/page.tsx           # Video library
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── interactive-map.tsx       # Map wrapper
│   ├── leaflet-map.tsx           # Leaflet implementation
│   ├── navbar.tsx                # Navigation bar
│   ├── footer.tsx                # Footer
│   ├── theme-provider.tsx        # Dark mode provider
│   └── waste-bot.tsx             # Floating chatbot
├── data/                         # Static data
│   ├── quiz-database.json        # 100+ quiz questions
│   └── waste-categories.json     # Waste type data
├── lib/                          # Utilities
│   ├── supabase.ts               # Supabase client
│   └── utils.ts                  # Helper functions
├── public/                       # Static assets
│   ├── manifest.json             # PWA manifest
│   ├── sw.js                     # Service worker
│   ├── icon-192.png              # PWA icon (192x192)
│   ├── icon-512.png              # PWA icon (512x512)
│   └── placeholder images
├── .env.local                    # Environment variables
├── .gitignore                    # Git ignore rules
├── next.config.mjs               # Next.js config
│   package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
├── GET_GEMINI_API.md            # API key guide
├── AI_CLASSIFIER_SETUP.md       # Classifier guide
└── README.md                     # This file
```

---

## 🎯 Key Features Breakdown

### **User Journey**

1. **Discover** → Land on homepage with animated hero
2. **Learn** → Read articles, watch videos, take quizzes
3. **Sign Up** → Create account with Supabase Auth
4. **Log Waste** → Track daily waste items
5. **Dashboard** → View analytics and progress
6. **Classify** → Upload images for AI identification
7. **Get Help** → Chat with AI assistant
8. **Find Locations** → Use map to find facilities
9. **Compete** → Check leaderboard and earn badges
10. **Stay Updated** → Read news and tips

### **Admin Capabilities** (Ready for implementation)

- User management
- Content moderation
- Analytics dashboard
- Badge creation
- News curation
- Map location management

---

## 🛠️ Customization

### **Adding Quiz Questions**

Edit `data/quiz-database.json`:

```json
{
  "quizCategories": [
    {
      "id": "your-category",
      "name": "Your Category",
      "questions": [
        {
          "id": 101,
          "question": "Your question?",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": 0,
          "explanation": "Explanation here"
        }
      ]
    }
  ]
}
```

### **Changing AI Model**

Edit `app/api/chat/route.ts`:

```typescript
const modelName = "llama3-70b-8192" // Change model here
```

### **Customizing Theme**

Edit `tailwind.config.ts` for colors, fonts, and spacing.

---

## 🚀 Deployment

### **Deploy to Vercel** (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy!

```bash
# Or use Vercel CLI
vercel --prod
```

### **Environment Variables in Vercel**

Add all keys from `.env.local` to Vercel project settings:
- Settings → Environment Variables
- Add each variable
- Redeploy

### **Deploy to Other Platforms**

- **Netlify:** Supports Next.js with Edge Functions
- **Railway:** Full-stack deployment
- **AWS Amplify:** Enterprise deployment
- **Self-hosted:** Use Docker + PM2

---

## 📊 Database Schema

### **Main Tables**

- `users` - User profiles
- `waste_logs` - Waste tracking entries
- `badges` - Achievement badges
- `user_badges` - Earned badges
- `quiz_scores` - Quiz results
- `locations` - Map locations

See `SUPABASE_SETUP_GUIDE.md` for complete schema.

---

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type checking
npx tsc --noEmit

# Build for production
npm run build
```

---

## 📈 Performance

- **Lighthouse Score:** 90+ (Desktop & Mobile)
- **First Load:** < 3s
- **Image Optimization:** Next.js Image component
- **Code Splitting:** Automatic with Next.js
- **Caching:** Service Worker + CDN
- **Bundle Size:** Optimized with tree-shaking

---

## 🔒 Security

- ✅ Environment variables for secrets
- ✅ Supabase RLS (Row Level Security)
- ✅ Input sanitization
- ✅ CSRF protection
- ✅ XSS prevention
- ✅ Rate limiting (API routes)
- ✅ Secure headers
- ✅ HTTPS enforced

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### **Contribution Areas**

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation
- 🎨 UI/UX improvements
- 🌍 Translations
- ♿ Accessibility
- 🧪 Testing

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Pratik Kumar**

- GitHub: [@Prateeeek7](https://github.com/Prateeeek7)
- Repository: [zero-waste-lifestyle](https://github.com/Prateeeek7/zero-waste-lifestyle)

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- shadcn for the beautiful UI components
- Groq for fast LLaMA inference
- Google for Gemini AI
- Supabase for backend infrastructure
- OpenStreetMap contributors
- All open-source contributors

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/Prateeeek7/zero-waste-lifestyle/issues)
- **Discussions:** [GitHub Discussions](https://github.com/Prateeeek7/zero-waste-lifestyle/discussions)
- **Email:** Create an issue for support

---

## 🗺️ Roadmap

### **Phase 1** ✅ (Complete)
- [x] Core features
- [x] AI integration
- [x] User authentication
- [x] Dashboard & analytics
- [x] Gamification
- [x] Community map
- [x] Quiz system

### **Phase 2** 🚧 (In Progress)
- [ ] Mobile app (React Native)
- [ ] Admin dashboard
- [ ] Social features
- [ ] Content management system
- [ ] Advanced analytics

### **Phase 3** 📋 (Planned)
- [ ] Multi-language support
- [ ] Blockchain rewards
- [ ] Marketplace for sustainable products
- [ ] Community forums
- [ ] Corporate partnerships

---

## 📸 Screenshots

> Add screenshots of your app here

---

## 🌟 Star History

If you find this project useful, please consider giving it a star ⭐

---

**Built with ❤️ for a sustainable future**

Let's create a zero-waste world together! 🌍♻️
