import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { MessageSquare, Users, Clock, ArrowUp, Search, Filter, Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Community Forum | Modela™",
  description: "Join the Modela™ community to discuss AI models, share experiences, and get help",
}

export default function CommunityPage() {
  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-b from-charcoal to-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Community Forum</h1>
              <p className="text-gray-400 mt-1">Join the conversation with other Modela™ users and AI enthusiasts</p>
            </div>
            <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white" asChild>
              <Link href="/community/new-topic">
                <Plus className="h-4 w-4 mr-2" />
                New Topic
              </Link>
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-3/4">
              <div className="mb-6">
                <div className="relative flex gap-4 mb-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Search topics..."
                      className="pl-10 py-6 bg-gray-800 border-gray-700 text-white w-full"
                    />
                  </div>
                  <Button variant="outline" className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-white">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>

                <Tabs defaultValue="latest">
                  <TabsList className="mb-6 bg-gray-800 text-gray-400">
                    <TabsTrigger
                      value="latest"
                      className="data-[state=active]:bg-electric-blue data-[state=active]:text-white"
                    >
                      Latest
                    </TabsTrigger>
                    <TabsTrigger
                      value="popular"
                      className="data-[state=active]:bg-electric-blue data-[state=active]:text-white"
                    >
                      Popular
                    </TabsTrigger>
                    <TabsTrigger
                      value="unanswered"
                      className="data-[state=active]:bg-electric-blue data-[state=active]:text-white"
                    >
                      Unanswered
                    </TabsTrigger>
                    <TabsTrigger
                      value="solved"
                      className="data-[state=active]:bg-electric-blue data-[state=active]:text-white"
                    >
                      Solved
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="latest" className="space-y-4">
                    {forumTopics.map((topic) => (
                      <ForumTopicCard key={topic.id} topic={topic} />
                    ))}
                  </TabsContent>

                  <TabsContent value="popular" className="space-y-4">
                    {forumTopics
                      .sort((a, b) => b.views - a.views)
                      .map((topic) => (
                        <ForumTopicCard key={topic.id} topic={topic} />
                      ))}
                  </TabsContent>

                  <TabsContent value="unanswered" className="space-y-4">
                    {forumTopics
                      .filter((topic) => topic.replies === 0)
                      .map((topic) => (
                        <ForumTopicCard key={topic.id} topic={topic} />
                      ))}
                  </TabsContent>

                  <TabsContent value="solved" className="space-y-4">
                    {forumTopics
                      .filter((topic) => topic.solved)
                      .map((topic) => (
                        <ForumTopicCard key={topic.id} topic={topic} />
                      ))}
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="lg:w-1/4">
              <Card className="bg-gray-800 border-gray-700 mb-6">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">Community Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-electric-blue mr-3" />
                      <div>
                        <p className="font-medium text-white">1,245</p>
                        <p className="text-sm text-gray-400">Community Members</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 text-electric-blue mr-3" />
                      <div>
                        <p className="font-medium text-white">3,782</p>
                        <p className="text-sm text-gray-400">Total Topics</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-electric-blue mr-3" />
                      <div>
                        <p className="font-medium text-white">15 minutes</p>
                        <p className="text-sm text-gray-400">Avg. Response Time</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">Popular Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={`/community/category/${category.slug}`}
                        className="flex items-center justify-between p-3 rounded-md hover:bg-gray-700 transition-colors"
                      >
                        <span className="text-gray-300">{category.name}</span>
                        <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
                          {category.count}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

interface ForumTopic {
  id: string
  title: string
  author: string
  authorAvatar: string
  category: string
  tags: string[]
  replies: number
  views: number
  solved: boolean
  createdAt: string
}

function ForumTopicCard({ topic }: { topic: ForumTopic }) {
  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-electric-blue/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="hidden sm:block">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
              <img src={topic.authorAvatar || "/placeholder.svg?height=40&width=40"} alt={topic.author} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <Link href={`/community/topic/${topic.id}`} className="hover:underline">
              <h3 className="text-lg font-bold mb-1 text-white">{topic.title}</h3>
            </Link>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-3">
              <span>Posted by {topic.author}</span>
              <span>•</span>
              <span>{topic.createdAt}</span>
              <span>•</span>
              <Link
                href={`/community/category/${topic.category.toLowerCase()}`}
                className="hover:underline text-gray-300"
              >
                {topic.category}
              </Link>
              {topic.solved && (
                <>
                  <span>•</span>
                  <Badge className="bg-green-900/20 text-green-400 border-green-800">Solved</Badge>
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {topic.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center text-sm text-gray-400">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{topic.replies}</span>
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>{topic.views}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Sample data
const forumTopics: ForumTopic[] = [
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
  },
]

const categories = [
  { name: "Technical", count: 523, slug: "technical" },
  { name: "Legal", count: 342, slug: "legal" },
  { name: "Finance", count: 289, slug: "finance" },
  { name: "Healthcare", count: 256, slug: "healthcare" },
  { name: "Retail", count: 198, slug: "retail" },
]
