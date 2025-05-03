"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { DashboardHeader } from "@/components/dashboard/header"
import { ModelDetailHeader } from "@/components/dashboard/model-detail-header"
import { ArrowLeft, Save } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { use } from "react"

export default function ModelSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = resolvedParams.id
  const [isLoading, setIsLoading] = useState(false)

  // In a real app, you would fetch this data from an API
  const modelData = {
    id: id,
    name: id === "1" ? "LegalDocAnalyzer Pro" : id === "2" ? "FinancialForecastAI" : "Model " + id,
    category: id === "1" ? "Legal" : id === "2" ? "Finance" : "Other",
    status: "Active",
    settings: {
      maxTokens: 1000,
      temperature: 0.7,
      topP: 0.9,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0,
      stopSequences: ["###", "END"],
      enableLogging: true,
      enableCaching: true,
      enableRateLimiting: true,
      rateLimitPerMinute: 60,
    },
  }

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast({
      title: "Settings saved",
      description: "Your model settings have been updated successfully.",
    })
  }

  return (
    <div>
      <DashboardHeader
        title="Model Settings"
        description="Configure your model's behavior and performance"
        actions={
          <Button variant="outline" className="border-gray-700 hover:bg-gray-700 text-white" asChild>
            <Link href={`/dashboard/models/${id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Model
            </Link>
          </Button>
        }
      />

      <ModelDetailHeader modelId={id} activeTab="settings" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Model Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="maxTokens">Maximum Tokens</Label>
                  <Input
                    id="maxTokens"
                    type="number"
                    defaultValue={modelData.settings.maxTokens}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <p className="text-sm text-gray-400 mt-1">Maximum number of tokens to generate</p>
                </div>
                <div>
                  <Label htmlFor="temperature">Temperature</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    defaultValue={modelData.settings.temperature}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <p className="text-sm text-gray-400 mt-1">Controls randomness in the output</p>
                </div>
                <div>
                  <Label htmlFor="topP">Top P</Label>
                  <Input
                    id="topP"
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    defaultValue={modelData.settings.topP}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <p className="text-sm text-gray-400 mt-1">Controls diversity via nucleus sampling</p>
                </div>
                <div>
                  <Label htmlFor="frequencyPenalty">Frequency Penalty</Label>
                  <Input
                    id="frequencyPenalty"
                    type="number"
                    step="0.1"
                    min="-2"
                    max="2"
                    defaultValue={modelData.settings.frequencyPenalty}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <p className="text-sm text-gray-400 mt-1">Reduces repetition in generated text</p>
                </div>
                <div>
                  <Label htmlFor="presencePenalty">Presence Penalty</Label>
                  <Input
                    id="presencePenalty"
                    type="number"
                    step="0.1"
                    min="-2"
                    max="2"
                    defaultValue={modelData.settings.presencePenalty}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <p className="text-sm text-gray-400 mt-1">Encourages the model to talk about new topics</p>
                </div>
                <div>
                  <Label htmlFor="stopSequences">Stop Sequences</Label>
                  <Input
                    id="stopSequences"
                    defaultValue={modelData.settings.stopSequences.join(", ")}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <p className="text-sm text-gray-400 mt-1">Sequences where the model should stop generating</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Performance Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Logging</Label>
                    <p className="text-sm text-gray-400">Log all API calls and model responses</p>
                  </div>
                  <Switch defaultChecked={modelData.settings.enableLogging} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Caching</Label>
                    <p className="text-sm text-gray-400">Cache responses for improved performance</p>
                  </div>
                  <Switch defaultChecked={modelData.settings.enableCaching} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Rate Limiting</Label>
                    <p className="text-sm text-gray-400">Limit the number of requests per minute</p>
                  </div>
                  <Switch defaultChecked={modelData.settings.enableRateLimiting} />
                </div>
                <div>
                  <Label htmlFor="rateLimitPerMinute">Rate Limit (requests per minute)</Label>
                  <Input
                    id="rateLimitPerMinute"
                    type="number"
                    defaultValue={modelData.settings.rateLimitPerMinute}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-gray-800 border-gray-700 sticky top-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Save Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">
                Make sure to review your changes before saving. These settings will affect how your model behaves and
                performs.
              </p>
              <Button
                className="w-full bg-electric-blue hover:bg-electric-blue/90"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Save className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 