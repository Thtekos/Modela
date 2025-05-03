"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Star, Users, Check, ArrowRight, Code, FileText, Server, Shield, Key } from "lucide-react"
import type { Model } from "@/lib/models"
import { getRelatedModels } from "@/lib/models"
import { ModelDemo } from "@/components/model-demo"
import { useAuth } from "@/contexts/auth-context"

export function ModelDetail({ model }: { model: Model }) {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [selectedPricingTier, setSelectedPricingTier] = useState(model.pricingTiers?.[0]?.name || "")
  const [relatedModels, setRelatedModels] = useState<Model[]>([])

  useEffect(() => {
    if (model.relatedModels) {
      getRelatedModels(model.relatedModels).then(setRelatedModels)
    }
  }, [model.relatedModels])

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      router.push("/auth/register")
      return
    }
    router.push("/dashboard/api-keys")
  }

  const handleContactSales = () => {
    router.push("/contact")
  }

  return (
    <>
      <Navbar />

      {/* Hero section */}
      <div className="bg-gradient-to-b from-charcoal to-gray-900 pt-10 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left column - Image */}
            <div className="md:w-2/5">
              <div className="rounded-lg overflow-hidden border border-gray-700">
                <img src={model.image || "/placeholder.svg"} alt={model.title} className="w-full h-auto object-cover" />
              </div>
            </div>

            {/* Right column - Info */}
            <div className="md:w-3/5">
              <Badge className="mb-4 bg-electric-blue text-white">{model.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{model.title}</h1>

              <p className="text-gray-300 text-lg mb-6">{model.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {model.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1 fill-yellow-500" />
                  <span className="font-medium">{model.rating} rating</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-1" />
                  <span>{model.users.toLocaleString()} users</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-electric-blue hover:bg-electric-blue/90" onClick={handleGetStarted}>
                  <Key className="h-5 w-5 mr-2" />
                  Get API Key
                </Button>
                <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-800" onClick={handleContactSales}>
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs section */}
      <div className="bg-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="bg-gray-800 border-b border-gray-700 w-full justify-start rounded-none p-0">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-gray-900 data-[state=active]:border-electric-blue data-[state=active]:border-b-2 rounded-none px-6 py-3"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="demo"
                className="data-[state=active]:bg-gray-900 data-[state=active]:border-electric-blue data-[state=active]:border-b-2 rounded-none px-6 py-3"
              >
                Try It
              </TabsTrigger>
              <TabsTrigger
                value="pricing"
                className="data-[state=active]:bg-gray-900 data-[state=active]:border-electric-blue data-[state=active]:border-b-2 rounded-none px-6 py-3"
              >
                Pricing
              </TabsTrigger>
              <TabsTrigger
                value="technical"
                className="data-[state=active]:bg-gray-900 data-[state=active]:border-electric-blue data-[state=active]:border-b-2 rounded-none px-6 py-3"
              >
                Technical Specs
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:bg-gray-900 data-[state=active]:border-electric-blue data-[state=active]:border-b-2 rounded-none px-6 py-3"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold mb-6">About this Model</h2>
                  <div className="prose prose-gray prose-invert max-w-none">
                    <p className="text-gray-300">{model.longDescription}</p>
                  </div>

                  {model.features && (
                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-6">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {model.features.map((feature, index) => (
                          <Card key={index} className="bg-gray-800 border-gray-700">
                            <CardContent className="p-6">
                              <h4 className="font-bold mb-2">{feature.title}</h4>
                              <p className="text-gray-300">{feature.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {model.apiExample && (
                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4">API Example</h3>
                      <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-6">
                          <pre className="text-sm text-gray-300 whitespace-pre-wrap">{model.apiExample}</pre>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {relatedModels.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4">Related Models</h3>
                      <div className="space-y-4">
                        {relatedModels.map((relatedModel) => (
                          <Link key={relatedModel.id} href={`/models/${relatedModel.id}`} className="block">
                            <Card className="bg-gray-800 border-gray-700 hover:border-electric-blue/50 transition-all duration-300">
                              <CardContent className="p-4 flex items-center">
                                <div className="w-16 h-16 rounded overflow-hidden mr-4 flex-shrink-0">
                                  <img
                                    src={relatedModel.image || "/placeholder.svg"}
                                    alt={relatedModel.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-bold">{relatedModel.title}</h4>
                                  <p className="text-sm text-gray-400 line-clamp-1">{relatedModel.description}</p>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Card className="bg-gray-800 border-gray-700 sticky top-6">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold mb-2">{model.price}</div>
                        <p className="text-gray-300">Starting price</p>
                      </div>

                      <div className="space-y-4">
                        <Button className="w-full bg-electric-blue hover:bg-electric-blue/90">Get Started</Button>
                        <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-700">
                          Contact Sales
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="demo" className="mt-0">
              <ModelDemo
                modelId={model.id}
                modelName={model.title}
                modelCategory={model.category}
                demoType={
                  model.category === "Legal"
                    ? "text"
                    : model.category === "Finance"
                      ? "financial"
                      : model.category === "Healthcare"
                        ? "image"
                        : "text"
                }
              />
            </TabsContent>

            <TabsContent value="pricing" className="mt-0">
              <h2 className="text-2xl font-bold mb-8 text-center">Choose the Right Plan for Your Needs</h2>

              {model.pricingTiers && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {model.pricingTiers.map((tier) => (
                    <Card
                      key={tier.name}
                      className={`bg-gray-800 border-2 ${
                        selectedPricingTier === tier.name ? "border-electric-blue" : "border-gray-700"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                          <div className="text-3xl font-bold mb-2">{tier.price}</div>
                          <p className="text-gray-300">{tier.description}</p>
                        </div>

                        <div className="space-y-4 mb-8">
                          {tier.features.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-electric-blue mr-3" />
                              <span className="text-gray-300">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Button
                          className={
                            selectedPricingTier === tier.name
                              ? "w-full bg-electric-blue hover:bg-electric-blue/90"
                              : "w-full bg-gray-700 hover:bg-gray-600"
                          }
                          onClick={() => setSelectedPricingTier(tier.name)}
                        >
                          {selectedPricingTier === tier.name ? "Selected" : "Select Plan"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <Shield className="h-6 w-6 text-electric-blue mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold mb-1">Flexible Billing</h4>
                        <p className="text-gray-300">
                          Choose between monthly or annual billing. Save up to 20% with annual plans. Custom plans
                          available for enterprise needs.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Shield className="h-6 w-6 text-electric-blue mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold mb-1">Money-back Guarantee</h4>
                        <p className="text-gray-300">
                          Try any plan risk-free for 30 days. If you're not completely satisfied, we'll refund your
                          payment.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <Shield className="h-6 w-6 text-electric-blue mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold mb-1">Data Security</h4>
                        <p className="text-gray-300">
                          All data is encrypted in transit and at rest using industry-standard protocols. We do not
                          store your input data beyond the processing period.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Shield className="h-6 w-6 text-electric-blue mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold mb-1">Compliance</h4>
                        <p className="text-gray-300">
                          This model adheres to relevant industry standards and regulations. Contact us for specific
                          compliance documentation.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="technical" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold mb-6">Technical Specifications</h2>

                  <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden mb-8">
                    <table className="w-full">
                      <tbody>
                        {model.technicalSpecs?.map((spec, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-850"}>
                            <td className="py-4 px-6 font-medium border-b border-gray-700">{spec.name}</td>
                            <td className="py-4 px-6 text-gray-300 border-b border-gray-700">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-xl font-bold mb-4">System Requirements</h3>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold mb-2">Minimum Requirements</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• API Key</li>
                            <li>• HTTPS Support</li>
                            <li>• JSON Processing Capability</li>
                            <li>• 5 Mbps Internet Connection</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold mb-2">Recommended</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Load Balancer for High Volume</li>
                            <li>• 20+ Mbps Internet Connection</li>
                            <li>• Error Handling Implementation</li>
                            <li>• Request Retry Logic</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Integration Support</h3>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-bold mb-2">SDKs & Libraries</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Python</li>
                            <li>• JavaScript/Node.js</li>
                            <li>• Java</li>
                            <li>• Go</li>
                            <li>• Ruby</li>
                          </ul>
                        </div>
                        <div className="pt-4 border-t border-gray-700">
                          <h4 className="font-bold mb-2">Documentation</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• API Reference</li>
                            <li>• Integration Guide</li>
                            <li>• Code Examples</li>
                            <li>• Best Practices</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold mb-6">User Reviews</h2>

                  <div className="space-y-6">
                    {model.reviews?.map((review) => (
                      <Card key={review.id} className="bg-gray-800 border-gray-700">
                        <CardContent className="p-6">
                          <div className="flex items-start">
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                              <img
                                src={review.avatar || "/placeholder.svg"}
                                alt={review.author}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold">{review.author}</h4>
                                <span className="text-sm text-gray-400">{review.date}</span>
                              </div>
                              <div className="flex items-center mb-3">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-600"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-gray-300">{review.comment}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <Card className="bg-gray-800 border-gray-700 sticky top-6">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="text-4xl font-bold mb-2">{model.rating}</div>
                        <div className="flex items-center justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(model.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-300">{model.reviews?.length || 0} reviews</p>
                      </div>

                      <div className="space-y-4">
                        <Button className="w-full bg-electric-blue hover:bg-electric-blue/90">Write a Review</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to get started with {model.title}?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of businesses that are already using this model to transform their operations.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-electric-blue hover:bg-electric-blue/90" onClick={handleGetStarted}>
                  Get API Key
                  <Key className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-700" onClick={handleContactSales}>
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

function QuickStartItem({
  icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}) {
  return (
    <Link href={link} className="block">
      <Card className="bg-gray-800 border-gray-700 hover:border-electric-blue/50 transition-all duration-300">
        <CardContent className="p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
            {icon}
          </div>
          <div>
            <h4 className="font-bold">{title}</h4>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
          <ArrowRight className="h-4 w-4 ml-auto text-gray-400" />
        </CardContent>
      </Card>
    </Link>
  )
}
