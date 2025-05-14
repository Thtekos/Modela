import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"

const blogPosts = [
  {
    slug: "introducing-modela-2",
    title: "Introducing Modela™ 2.0: The Next Generation of AI Models",
    date: "May 15, 2023",
    category: "Announcement",
    content: `We're excited to announce the launch of Modela™ 2.0, featuring improved accuracy, faster response times, and expanded capabilities. (Demo content)`
  },
  {
    slug: "future-of-legal-ai",
    title: "The Future of Legal AI: Trends to Watch",
    date: "April 28, 2023",
    category: "Industry Insights",
    content: `Explore the emerging trends in legal AI and how they're transforming the practice of law. (Demo content)`
  },
  {
    slug: "responsible-ai-ethics",
    title: "Responsible AI: Our Approach to Ethics",
    date: "April 10, 2023",
    category: "Ethics",
    content: `Learn about our commitment to developing and deploying AI models responsibly and ethically. (Demo content)`
  },
  {
    slug: "technical-deep-dive",
    title: "Technical Deep Dive: How Our Models Work",
    date: "March 22, 2023",
    category: "Technical",
    content: `A technical exploration of the architecture and algorithms powering our AI models. (Demo content)`
  },
  {
    slug: "acme-corp-case-study",
    title: "Customer Success Story: How Acme Corp Transformed Their Operations",
    date: "March 5, 2023",
    category: "Case Study",
    content: `Discover how Acme Corp used our AI models to streamline their operations and increase efficiency. (Demo content)`
  },
  {
    slug: "ai-literacy-business-leaders",
    title: "AI Literacy: What Every Business Leader Should Know",
    date: "February 18, 2023",
    category: "Education",
    content: `Essential AI concepts and terminology that business leaders need to understand in today's tech landscape. (Demo content)`
  },
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) {
    notFound()
  }
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-charcoal to-gray-900 py-12 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="mb-8">
            <span className="text-xs font-medium bg-electric-blue/20 text-electric-blue px-2 py-1 rounded mr-2">{post.category}</span>
            <span className="text-xs text-gray-400">{post.date}</span>
          </div>
          <h1 className="text-4xl font-bold mb-6 text-white">{post.title}</h1>
          <div className="prose prose-invert text-gray-300 mb-12">
            <p>{post.content}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 