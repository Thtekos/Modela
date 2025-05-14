"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const forumTopics = [
  {
    id: "1",
    title: "How to fine-tune LegalDocAnalyzer Pro for specific contract types?",
    author: "John Smith",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "Legal",
    tags: ["Fine-tuning", "Legal", "Contracts"],
    replies: 12,
    views: 345,
    solved: true,
    createdAt: "2 days ago",
    content: "How can I fine-tune LegalDocAnalyzer Pro for NDAs and employment contracts? Any tips or best practices? (Demo content)"
  },
  {
    id: "2",
    title: "Best practices for integrating FinancialForecastAI with existing dashboards",
    author: "Sarah Johnson",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "Finance",
    tags: ["Integration", "Dashboards", "API"],
    replies: 8,
    views: 210,
    solved: false,
    createdAt: "5 hours ago",
    content: "What are the best ways to integrate FinancialForecastAI with PowerBI or Tableau? (Demo content)"
  },
  {
    id: "3",
    title: "MedicalImageDiagnostic accuracy for rare conditions",
    author: "Dr. Emily Chen",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "Healthcare",
    tags: ["Accuracy", "Diagnostics", "Edge Cases"],
    replies: 15,
    views: 432,
    solved: true,
    createdAt: "1 week ago",
    content: "Has anyone tested MedicalImageDiagnostic on rare diseases? How accurate is it? (Demo content)"
  },
  {
    id: "4",
    title: "How to optimize API calls for better performance?",
    author: "Michael Brown",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "Technical",
    tags: ["API", "Performance", "Optimization"],
    replies: 6,
    views: 189,
    solved: false,
    createdAt: "3 days ago",
    content: "What are some tips to reduce latency and improve throughput for Modela API calls? (Demo content)"
  },
  {
    id: "5",
    title: "Looking for recommendations on retail inventory models",
    author: "Jessica Lee",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "Retail",
    tags: ["Recommendations", "Inventory", "Retail"],
    replies: 0,
    views: 87,
    solved: false,
    createdAt: "1 hour ago",
    content: "Which Modela models work best for retail inventory optimization? (Demo content)"
  },
]

export default function CommunityTopicPage({ params }: { params: { id: string } }) {
  const topic = forumTopics.find((t) => t.id === params.id)
  if (!topic) {
    notFound()
  }
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-charcoal to-gray-900 py-12 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <Card className="bg-gray-800 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white mb-2">{topic.title}</CardTitle>
              <div className="flex items-center gap-3 mb-2">
                <img src={topic.authorAvatar} alt={topic.author} className="w-8 h-8 rounded-full bg-gray-700" />
                <span className="text-gray-300 font-medium">{topic.author}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400 text-sm">{topic.createdAt}</span>
                <span className="text-gray-500">•</span>
                <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">{topic.category}</Badge>
                {topic.solved && <Badge className="bg-green-900/20 text-green-400 border-green-800 ml-2">Solved</Badge>}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {topic.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">{tag}</Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert text-gray-300 mb-4">
                <p>{topic.content}</p>
              </div>
              <div className="flex gap-6 text-sm text-gray-400 mt-4">
                <span>Replies: {topic.replies}</span>
                <span>Views: {topic.views}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
} 