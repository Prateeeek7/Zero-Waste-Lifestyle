"use client"

import { motion } from "framer-motion"
import { Leaf, Github, Linkedin, Mail, Heart } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Learn: [
      { name: "Articles", href: "/learn" },
      { name: "Waste Categories", href: "/categories" },
      { name: "Videos", href: "/videos" },
      { name: "Quiz", href: "/quiz" },
    ],
    Tools: [
      { name: "Dashboard", href: "/dashboard" },
      { name: "AI Classifier", href: "/classifier" },
      { name: "Recycling Map", href: "/map" },
      { name: "Calculator", href: "/calculator" },
    ],
    Community: [
      { name: "Leaderboard", href: "/leaderboard" },
      { name: "Badges", href: "/badges" },
      { name: "News", href: "/news" },
      { name: "Analytics", href: "/analytics" },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">Zero Waste Lifestyle</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering individuals to live sustainably through education, AI-powered guidance, and community support.
              Together, we can create a zero-waste future.
            </p>
            
            {/* Social Links */}
            <div className="mt-6">
              <h3 className="font-semibold text-white text-sm mb-3">Connect With Us</h3>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="https://www.linkedin.com/in/pratik-kumar-198172186?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200 shadow-lg"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://github.com/Prateeeek7"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200 shadow-lg"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="mailto:pratik2002singh@gmail.com"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors duration-200 shadow-lg"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {currentYear} Zero Waste Lifestyle. All rights reserved.</p>
          <div className="flex items-center space-x-1 text-gray-400 text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for a sustainable future</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
