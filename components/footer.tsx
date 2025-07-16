"use client"

import { motion } from "framer-motion"
import { Leaf, Github, Twitter, Mail, Heart } from "lucide-react"
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
      { name: "AI Assistant", href: "/chat" },
      { name: "Checklist", href: "/checklist" },
      { name: "Progress Tracker", href: "/progress" },
      { name: "Calculator", href: "/calculator" },
    ],
    Community: [
      { name: "Blog", href: "/blog" },
      { name: "Success Stories", href: "/stories" },
      { name: "Tips & Tricks", href: "/tips" },
      { name: "Newsletter", href: "/newsletter" },
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
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
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
