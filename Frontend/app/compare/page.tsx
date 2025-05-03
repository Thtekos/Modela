"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModelComparisonTable } from "@/components/model-comparison-table"
import { ModelSelector } from "@/components/model-selector"
import { ArrowLeft, Plus, X } from "lucide-react"
import { getAllModels } from "@/lib/models"
import type { Model } from "@/lib/models"

export default function ComparePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedModels, setSelectedModels] = useState<Model[]>([])
  const [isSelectingModel, setIsSelectingModel] = useState(false)
  const allModels = getAllModels()

  // Load models from URL on initial render and when URL changes
  useEffect(() => {
    const modelIds = searchParams?.get("models")?.split(",").filter(Boolean) || []
    if (modelIds.length > 0) {
      const models = allModels.filter((model) => modelIds.includes(model.id))
      setSelectedModels(models)
    } else {
      setSelectedModels([])
    }
  }, [searchParams, allModels])

  const handleAddModel = () => {
    setIsSelectingModel(true)
  }

  const handleSelectModel = (model: Model) => {
    if (!selectedModels.find((m) => m.id === model.id)) {
      const newSelectedModels = [...selectedModels, model]
      setSelectedModels(newSelectedModels)

      // Update URL with new model IDs
      const modelIds = newSelectedModels.map((m) => m.id).join(",")
      router.push(`/compare?models=${modelIds}`)
    }
    setIsSelectingModel(false)
  }

  const handleRemoveModel = (modelId: string) => {
    const newSelectedModels = selectedModels.filter((model) => model.id !== modelId)
    setSelectedModels(newSelectedModels)

    // Update URL with new model IDs or remove query param if empty
    const modelIds = newSelectedModels.map((m) => m.id).join(",")
    if (modelIds) {
      router.push(`/compare?models=${modelIds}`)
    } else {
      router.push("/compare")
    }
  }

  return (
    <>
      <Navbar />

      <div className="bg-charcoal min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Model Comparison</h1>
              <p className="text-gray-400 mt-1">Compare features and specifications of different AI models</p>
            </div>
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800 text-white" asChild>
              <Link href="/marketplace">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Link>
            </Button>
          </div>

          {isSelectingModel ? (
            <Card className="bg-gray-800 border-gray-700 mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Select a Model to Compare</CardTitle>
              </CardHeader>
              <CardContent>
                <ModelSelector
                  models={allModels.filter((model) => !selectedModels.find((m) => m.id === model.id))}
                  onSelect={handleSelectModel}
                  onCancel={() => setIsSelectingModel(false)}
                />
              </CardContent>
            </Card>
          ) : (
            <div className="mb-8">
              {selectedModels.length === 0 ? (
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-8 text-center">
                    <h2 className="text-xl font-bold mb-4 text-white">No Models Selected</h2>
                    <p className="text-gray-400 mb-6">
                      Select models from the marketplace to compare their features and specifications.
                    </p>
                    <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white" onClick={handleAddModel}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Model to Compare
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="flex flex-wrap gap-4 mb-6">
                    {selectedModels.map((model) => (
                      <div
                        key={model.id}
                        className="flex items-center bg-gray-800 rounded-lg border border-gray-700 p-3"
                      >
                        <div className="mr-3">
                          <div className="w-10 h-10 rounded bg-gray-700 flex items-center justify-center">
                            <img
                              src={model.image || "/placeholder.svg?height=40&width=40"}
                              alt={model.title}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{model.title}</h3>
                          <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
                            {model.category}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-4 text-gray-400 hover:text-white"
                          onClick={() => handleRemoveModel(model.id)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove {model.title}</span>
                        </Button>
                      </div>
                    ))}
                    {selectedModels.length < 3 && (
                      <Button
                        variant="outline"
                        className="border-gray-700 hover:bg-gray-800 h-[74px] text-white"
                        onClick={handleAddModel}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Model
                      </Button>
                    )}
                  </div>

                  <Tabs defaultValue="features">
                    <TabsList className="mb-6 bg-gray-800">
                      <TabsTrigger
                        value="features"
                        className="text-white data-[state=active]:bg-electric-blue data-[state=active]:text-white"
                      >
                        Features
                      </TabsTrigger>
                      <TabsTrigger
                        value="specs"
                        className="text-white data-[state=active]:bg-electric-blue data-[state=active]:text-white"
                      >
                        Technical Specs
                      </TabsTrigger>
                      <TabsTrigger
                        value="pricing"
                        className="text-white data-[state=active]:bg-electric-blue data-[state=active]:text-white"
                      >
                        Pricing
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="features">
                      <ModelComparisonTable
                        models={selectedModels}
                        type="features"
                        title="Feature Comparison"
                        description="Compare the features and capabilities of selected models"
                      />
                    </TabsContent>
                    <TabsContent value="specs">
                      <ModelComparisonTable
                        models={selectedModels}
                        type="specs"
                        title="Technical Specifications"
                        description="Compare the technical specifications of selected models"
                      />
                    </TabsContent>
                    <TabsContent value="pricing">
                      <ModelComparisonTable
                        models={selectedModels}
                        type="pricing"
                        title="Pricing Comparison"
                        description="Compare the pricing plans of selected models"
                      />
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
