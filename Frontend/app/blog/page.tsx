import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Blog | Modela™",
  description: "Latest news, updates, and insights from the Modela™ team",
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-charcoal to-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">Modela™ Blog</h1>
            <p className="text-xl text-gray-300">Insights, updates, and news from the world of AI models</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {blogPosts.map((post) => (
              <div
                key={post.title}
                className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-electric-blue/50 transition-all duration-300"
              >
                <div className="h-48 bg-gray-700 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <post.icon className="h-16 w-16 text-electric-blue" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium bg-electric-blue/20 text-electric-blue px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-300 mb-4">{post.excerpt}</p>
                  <a href={post.link} className="text-electric-blue hover:underline inline-flex items-center">
                    Read more
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

import { Lightbulb, TrendingUp, Shield, Cpu, Users, BookOpen } from "lucide-react"

const blogPosts = [
  {
    title: "Introducing Modela™ 2.0: The Next Generation of AI Models",
    excerpt:
      "We're excited to announce the launch of Modela™ 2.0, featuring improved accuracy, faster response times, and expanded capabilities.",
    icon: Lightbulb,
    category: "Announcement",
    date: "May 15, 2023",
    link: "/blog/introducing-modela-2",
  },
  {
    title: "The Future of Legal AI: Trends to Watch",
    excerpt: "Explore the emerging trends in legal AI and how they're transforming the practice of law.",
    icon: TrendingUp,
    category: "Industry Insights",
    date: "April 28, 2023",
    link: "/blog/future-of-legal-ai",
  },
  {
    title: "Responsible AI: Our Approach to Ethics",
    excerpt: "Learn about our commitment to developing and deploying AI models responsibly and ethically.",
    icon: Shield,
    category: "Ethics",
    date: "April 10, 2023",
    link: "/blog/responsible-ai-ethics",
  },
  {
    title: "Technical Deep Dive: How Our Models Work",
    excerpt: "A technical exploration of the architecture and algorithms powering our AI models.",
    icon: Cpu,
    category: "Technical",
    date: "March 22, 2023",
    link: "/blog/technical-deep-dive",
  },
  {
    title: "Customer Success Story: How Acme Corp Transformed Their Operations",
    excerpt: "Discover how Acme Corp used our AI models to streamline their operations and increase efficiency.",
    icon: Users,
    category: "Case Study",
    date: "March 5, 2023",
    link: "/blog/acme-corp-case-study",
  },
  {
    title: "AI Literacy: What Every Business Leader Should Know",
    excerpt:
      "Essential AI concepts and terminology that business leaders need to understand in today's tech landscape.",
    icon: BookOpen,
    category: "Education",
    date: "February 18, 2023",
    link: "/blog/ai-literacy-business-leaders",
  },
]
