# 🌍 Zero Waste Lifestyle - Educational Platform

Welcome to the **Zero Waste Lifestyle** project! This is a comprehensive educational platform designed to empower individuals to adopt sustainable habits, master waste segregation, and embrace conscious living. Our goal is to provide accessible resources and tools to help users reduce their environmental footprint and contribute to a greener future.

## ✨ Features

This platform comes packed with interactive and informative features:

-   **📖 Articles & Tutorials:** A dedicated section with markdown-compatible articles and guides on various sustainable living topics.
-   **🎥 Embedded Videos Panel:** A curated library of educational videos to visually learn about zero-waste practices.
-   **🧪 Quiz Page:** Test your knowledge with gamified quizzes and earn sustainability badges.
-   **✅ Personal Sustainability Checklist:** A stateful component to track your personal zero-waste goals and progress.
-   **♻️ Waste Categories Explained:** Interactive cards and tabs to understand how to properly dispose of different waste types (Recyclable, Compostable, Hazardous, Landfill).
-   **🤖 AI Chatbot Integration:** An intelligent assistant powered by **Meta LLaMA 3** (via Groq Cloud) that provides context-aware answers to your waste disposal and sustainability queries.
-   **📊 Sustainability Impact Calculator:** Calculate your potential environmental and financial savings by reducing single-use items.
-   **📈 Progress Tracker:** Visualize your achievements and points earned from the sustainability checklist.
-   **📰 Blog:** Stay updated with the latest news, innovations, and insights in the world of sustainable living.
-   **💖 Success Stories:** Be inspired by real-life journeys of individuals embracing zero-waste.
-   **💡 Tips & Tricks:** Discover practical hacks and clever advice for daily sustainable living.
-   **📧 Newsletter Signup:** Subscribe to get exclusive tips and updates directly in your inbox.
-   **🌗 Dark Mode Support:** A toggleable dark mode for comfortable viewing.
-   **✨ Modern UI/UX:** Built with a modern, minimal design, featuring glassmorphism effects and smooth transitions using Framer Motion.
-   **♿ Accessibility-Friendly:** Designed with accessibility best practices in mind.
-   **SEO Optimized:** Proper metadata for discoverability related to green living and zero-waste education.

## 🚀 Tech Stack

This project is built with cutting-edge web technologies:

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **UI Library:** [React.js](https://react.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/)
-   **LLM Provider:** [Groq Cloud](https://groq.com/) (using Meta LLaMA 3)
-   **Icons:** [Lucide React](https://lucide.dev/icons/)
-   **Markdown Rendering:** [React Markdown](https://github.com/remarkjs/react-markdown)

## ⚙️ Getting Started

Follow these steps to get your Zero Waste Lifestyle platform up and running on your local machine.

### Prerequisites

-   Node.js (v18.x or higher recommended)
-   npm, yarn, or pnpm (npm is used in examples)
-   A [Groq API Key](https://console.groq.com/keys) for the AI Chatbot.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/zero-waste-lifestyle.git
    cd zero-waste-lifestyle
    ```

2.  **Install dependencies:**

   ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
   ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of your project (where `package.json` is located) and add your Groq API key:

```env
    LLAMA_API_KEY=gsk_YOUR_GROQ_API_KEY_HERE
```
    **Important:** Replace `gsk_YOUR_GROQ_API_KEY_HERE` with your actual API key obtained from the [Groq Console](https://console.groq.com/keys). Ensure there are no extra spaces.

### Running the Development Server

1.  **Start the development server:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

You should now see the Zero Waste Lifestyle website running locally!

## 📂 Project Structure

Here's a brief overview of the main directories and files:

## 📂 Project Structure

```text
zero-waste-lifestyle/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   ├── blog/
│   │   └── page.tsx
│   ├── calculator/
│   │   └── page.tsx
│   ├── categories/
│   │   └── page.tsx
│   ├── checklist/
│   │   └── page.tsx
│   ├── chat/
│   │   └── page.tsx
│   ├── learn/
│   │   └── page.tsx
│   ├── newsletter/
│   │   └── page.tsx
│   ├── progress/
│   │   └── page.tsx
│   ├── quiz/
│   │   └── page.tsx
│   ├── stories/
│   │   └── page.tsx
│   ├── tips/
│   │   └── page.tsx
│   ├── videos/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── waste-bot.tsx
├── data/
│   └── waste-categories.json
├── lib/
│   └── utils.ts
├── public/
│   ├── placeholder.svg
│   └── icons/
├── .env.local
├── next.config.mjs
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```


## 🛠️ Customization and Extension

-   **Adding Content:**
    -   **Articles:** Add more articles by extending the `articles` array in `app/learn/page.tsx`. You can use Markdown directly within the `content` field.
    -   **Videos:** Add more videos by extending the `videos` array in `app/videos/page.tsx`.
    -   **Quiz Questions:** Extend the `quizQuestions` array in `app/quiz/page.tsx`.
    -   **Checklist Items:** Modify the `defaultItems` array in `app/checklist/page.tsx`.
    -   **Waste Categories:** Update `data/waste-categories.json` for detailed waste information.
    -   **Blog Posts, Stories, Tips:** Extend the respective arrays in `app/blog/page.tsx`, `app/stories/page.tsx`, and `app/tips/page.tsx`.

-   **AI Chatbot:**
    -   **Model:** To change the AI model, modify `modelName` in `app/api/chat/route.ts`. Ensure the model is supported by Groq Cloud.
    -   **System Prompt:** Adjust the `system` prompt in `app/api/chat/route.ts` to refine the chatbot's personality and knowledge base.
    -   **Visual Input:** The `waste-bot.tsx` component has a placeholder for image upload. You can integrate a service like Vercel Blob or a custom image analysis API to process uploaded images and provide disposal information.

-   **Styling:** Modify `tailwind.config.ts` for global theme changes or `app/globals.css` for custom CSS.

## 🚀 Deployment

The easiest way to deploy your Next.js application is to use the [Vercel Platform](https://vercel.com), from the creators of Next.js.

1.  **Connect your Git repository** (GitHub, GitLab, or Bitbucket) to Vercel.
2.  **Add your `LLAMA_API_KEY`** as an environment variable in your Vercel project settings.
3.  Vercel will automatically detect that it's a Next.js project and deploy it.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please feel free to open an issue or submit a pull request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

Thank you for exploring the Zero Waste Lifestyle platform! Let's build a more sustainable future together.
