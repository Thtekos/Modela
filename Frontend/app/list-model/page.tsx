"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { Loader2, Upload, Plus, X } from "lucide-react"

export default function ListModelPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: [] as string[],
    price: "",
    pricingModel: "subscription",
    image: null as File | null,
    apiEndpoint: "",
    documentation: "",
    sampleCode: "",
    tagInput: "",
  })

  // Add useEffect to check authentication and redirect
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login?redirect=/list-model")
    }
  }, [isAuthenticated, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }))
    }
  }

  const handleAddTag = () => {
    if (formData.tagInput.trim() && !formData.tags.includes(formData.tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: "",
      }))
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Model submitted successfully",
        description: "Your model is now under review and will be listed soon.",
      })

      router.push("/dashboard/models")
    } catch (error) {
      toast({
        title: "Error submitting model",
        description: "There was an error submitting your model. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextTab = () => {
    if (activeTab === "basic") setActiveTab("technical")
    else if (activeTab === "technical") setActiveTab("pricing")
  }

  const prevTab = () => {
    if (activeTab === "pricing") setActiveTab("technical")
    else if (activeTab === "technical") setActiveTab("basic")
  }

  return (
    <>
      <Navbar />

      <div className="bg-charcoal min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">List Your Model</h1>
            <p className="text-gray-400 mb-8">Share your AI model with the Modela™ marketplace community</p>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Model Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Provide details about your AI model to help users discover and understand its capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-8 bg-gray-700">
                    <TabsTrigger
                      value="basic"
                      className="data-[state=active]:bg-electric-blue data-[state=active]:text-white text-gray-300"
                    >
                      Basic Information
                    </TabsTrigger>
                    <TabsTrigger
                      value="technical"
                      className="data-[state=active]:bg-electric-blue data-[state=active]:text-white text-gray-300"
                    >
                      Technical Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="pricing"
                      className="data-[state=active]:bg-electric-blue data-[state=active]:text-white text-gray-300"
                    >
                      Pricing & Availability
                    </TabsTrigger>
                  </TabsList>

                  <form onSubmit={handleSubmit}>
                    <TabsContent value="basic" className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title" className="text-white">
                            Model Name
                          </Label>
                          <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g., LegalDocAnalyzer Pro"
                            className="bg-gray-700 border-gray-600 text-white mt-1"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="description" className="text-white">
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Describe what your model does and its key features..."
                            className="bg-gray-700 border-gray-600 text-white mt-1 min-h-[120px]"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="category" className="text-white">
                            Category
                          </Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) => handleSelectChange("category", value)}
                          >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                              <SelectItem value="Legal">Legal</SelectItem>
                              <SelectItem value="Finance">Finance</SelectItem>
                              <SelectItem value="Healthcare">Healthcare</SelectItem>
                              <SelectItem value="Retail">Retail</SelectItem>
                              <SelectItem value="Marketing">Marketing</SelectItem>
                              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="tags" className="text-white">
                            Tags
                          </Label>
                          <div className="flex mt-1 mb-2">
                            <Input
                              id="tagInput"
                              name="tagInput"
                              value={formData.tagInput}
                              onChange={handleInputChange}
                              placeholder="e.g., NLP, Document Analysis"
                              className="bg-gray-700 border-gray-600 text-white rounded-r-none"
                            />
                            <Button
                              type="button"
                              onClick={handleAddTag}
                              className="bg-electric-blue hover:bg-electric-blue/90 text-white rounded-l-none"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {formData.tags.map((tag) => (
                              <div
                                key={tag}
                                className="flex items-center bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                              >
                                <span className="mr-1">{tag}</span>
                                <button type="button" onClick={() => handleRemoveTag(tag)}>
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="image" className="text-white">
                            Model Image
                          </Label>
                          <div className="mt-1">
                            <div className="flex items-center justify-center w-full">
                              <label
                                htmlFor="image-upload"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-650"
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                                  <p className="mb-2 text-sm text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 2MB)</p>
                                </div>
                                <input
                                  id="image-upload"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleImageChange}
                                />
                              </label>
                            </div>
                            {formData.image && (
                              <p className="mt-2 text-sm text-gray-400">
                                Selected: {formData.image.name} ({Math.round(formData.image.size / 1024)} KB)
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button
                            type="button"
                            onClick={nextTab}
                            className="bg-electric-blue hover:bg-electric-blue/90 text-white"
                          >
                            Next: Technical Details
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="technical" className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="apiEndpoint" className="text-white">
                            API Endpoint
                          </Label>
                          <Input
                            id="apiEndpoint"
                            name="apiEndpoint"
                            value={formData.apiEndpoint}
                            onChange={handleInputChange}
                            placeholder="e.g., https://api.yourcompany.com/v1/model"
                            className="bg-gray-700 border-gray-600 text-white mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="documentation" className="text-white">
                            API Documentation
                          </Label>
                          <Textarea
                            id="documentation"
                            name="documentation"
                            value={formData.documentation}
                            onChange={handleInputChange}
                            placeholder="Provide documentation for your API endpoints, parameters, and response formats..."
                            className="bg-gray-700 border-gray-600 text-white mt-1 min-h-[120px]"
                          />
                        </div>

                        <div>
                          <Label htmlFor="sampleCode" className="text-white">
                            Sample Code
                          </Label>
                          <Textarea
                            id="sampleCode"
                            name="sampleCode"
                            value={formData.sampleCode}
                            onChange={handleInputChange}
                            placeholder="Provide sample code for using your model (e.g., API calls in Python, JavaScript, etc.)..."
                            className="bg-gray-700 border-gray-600 text-white mt-1 min-h-[150px] font-mono text-sm"
                          />
                        </div>

                        <div className="flex justify-between">
                          <Button
                            type="button"
                            onClick={prevTab}
                            variant="outline"
                            className="border-gray-700 hover:bg-gray-700 text-white"
                          >
                            Back: Basic Information
                          </Button>
                          <Button
                            type="button"
                            onClick={nextTab}
                            className="bg-electric-blue hover:bg-electric-blue/90 text-white"
                          >
                            Next: Pricing & Availability
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="pricing" className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="pricingModel" className="text-white">
                            Pricing Model
                          </Label>
                          <Select
                            value={formData.pricingModel}
                            onValueChange={(value) => handleSelectChange("pricingModel", value)}
                          >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                              <SelectValue placeholder="Select a pricing model" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                              <SelectItem value="subscription">Subscription</SelectItem>
                              <SelectItem value="pay-per-use">Pay Per Use</SelectItem>
                              <SelectItem value="free">Free</SelectItem>
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="price" className="text-white">
                            Price
                          </Label>
                          <Input
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder={
                              formData.pricingModel === "subscription"
                                ? "e.g., $299/mo"
                                : formData.pricingModel === "pay-per-use"
                                  ? "e.g., $0.01 per API call"
                                  : formData.pricingModel === "free"
                                    ? "Free"
                                    : "Contact for pricing"
                            }
                            className="bg-gray-700 border-gray-600 text-white mt-1"
                            required
                          />
                        </div>

                        <div className="flex justify-between">
                          <Button
                            type="button"
                            onClick={prevTab}
                            variant="outline"
                            className="border-gray-700 hover:bg-gray-700 text-white"
                          >
                            Back: Technical Details
                          </Button>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-electric-blue hover:bg-electric-blue/90 text-white"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              "Submit Model"
                            )}
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </form>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
