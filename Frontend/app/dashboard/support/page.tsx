import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, MessageSquare, FileText, Phone, Clock, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Help & Support | Modela™",
  description: "Get help and support for your Modela account",
}

export default function SupportPage() {
  return (
    <div>
      <DashboardHeader title="Help & Support" description="Get help with your account, billing, and technical issues" />

      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="mb-8 bg-gray-700 text-white">
          <TabsTrigger value="contact" className="data-[state=active]:bg-electric-blue">
            Contact Support
          </TabsTrigger>
          <TabsTrigger value="faq" className="data-[state=active]:bg-electric-blue">
            FAQ
          </TabsTrigger>
          <TabsTrigger value="documentation" className="data-[state=active]:bg-electric-blue">
            Documentation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-electric-blue" />
                  Email Support
                </CardTitle>
                <CardDescription className="text-gray-400">Get a response within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Send us an email and our support team will get back to you as soon as possible.
                </p>
                <Button className="w-full bg-electric-blue hover:bg-electric-blue/90 text-white">Email Support</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-electric-blue" />
                  Live Chat
                </CardTitle>
                <CardDescription className="text-gray-400">Available Monday-Friday, 9am-5pm EST</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Chat with our support team in real-time for immediate assistance.</p>
                <Button className="w-full bg-electric-blue hover:bg-electric-blue/90 text-white">Start Chat</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-electric-blue" />
                  Phone Support
                </CardTitle>
                <CardDescription className="text-gray-400">For Enterprise customers only</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Enterprise customers can call our dedicated support line for priority assistance.
                </p>
                <Button className="w-full bg-electric-blue hover:bg-electric-blue/90 text-white">
                  View Phone Number
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Contact Form</CardTitle>
              <CardDescription className="text-gray-400">
                Send us a message and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="What is your inquiry about?"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your issue in detail"
                    className="min-h-[150px] bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <Button type="submit" className="bg-electric-blue hover:bg-electric-blue/90 text-white">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
              <CardDescription className="text-gray-400">Find answers to common questions about Modela</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
                  <h3 className="text-lg font-medium mb-2 text-white">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Documentation</CardTitle>
              <CardDescription className="text-gray-400">
                Explore our comprehensive documentation to learn more about Modela
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {docCategories.map((category, index) => (
                <div key={index} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
                  <h3 className="text-lg font-medium mb-3 text-white">{category.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category.docs.map((doc, docIndex) => (
                      <Card key={docIndex} className="bg-gray-700 border-gray-600">
                        <CardContent className="p-4 flex items-start">
                          <FileText className="h-5 w-5 text-electric-blue mr-3 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-white">{doc.title}</h4>
                            <p className="text-sm text-gray-400">{doc.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Clock className="h-6 w-6 text-electric-blue mr-3" />
            <div>
              <h3 className="text-lg font-medium text-white">Support Hours</h3>
              <p className="text-gray-300">Monday-Friday, 9am-5pm EST</p>
            </div>
          </div>
          <div className="flex items-center">
            <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-white">Support Status</h3>
              <p className="text-green-400">All systems operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const faqs = [
  {
    question: "How do I get started with Modela?",
    answer:
      "To get started, create an account, choose a subscription plan, and browse our marketplace for AI models that fit your needs. Once you've selected a model, you can integrate it into your application using our API.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), as well as PayPal and wire transfers for Enterprise customers.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.",
  },
  {
    question: "How do I integrate a model with my application?",
    answer:
      "We provide comprehensive API documentation and SDKs for various programming languages. After subscribing to a model, you'll receive an API key that you can use to make requests to our API endpoints.",
  },
  {
    question: "Do you offer custom model development?",
    answer:
      "Yes, we offer custom model development for Enterprise customers. Contact our sales team to discuss your specific requirements.",
  },
]

const docCategories = [
  {
    title: "Getting Started",
    docs: [
      {
        title: "Introduction to Modela",
        description: "Learn about Modela and how it can help your business",
      },
      {
        title: "Creating an Account",
        description: "Step-by-step guide to creating your Modela account",
      },
      {
        title: "Choosing the Right Model",
        description: "How to select the best AI model for your needs",
      },
      {
        title: "API Overview",
        description: "Introduction to the Modela API and how to use it",
      },
    ],
  },
  {
    title: "API Reference",
    docs: [
      {
        title: "Authentication",
        description: "How to authenticate with the Modela API",
      },
      {
        title: "Making Requests",
        description: "Guide to making API requests and handling responses",
      },
      {
        title: "Error Handling",
        description: "How to handle errors and troubleshoot issues",
      },
      {
        title: "Rate Limits",
        description: "Understanding API rate limits and quotas",
      },
    ],
  },
  {
    title: "Tutorials",
    docs: [
      {
        title: "Integrating with JavaScript",
        description: "How to integrate Modela with JavaScript applications",
      },
      {
        title: "Integrating with Python",
        description: "How to integrate Modela with Python applications",
      },
      {
        title: "Integrating with Java",
        description: "How to integrate Modela with Java applications",
      },
      {
        title: "Integrating with Ruby",
        description: "How to integrate Modela with Ruby applications",
      },
    ],
  },
]
