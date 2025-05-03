"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Copy, Check } from "lucide-react"

interface ModelDemoProps {
  modelId: string
  modelName: string
  modelCategory: string
  demoType: "text" | "image" | "document" | "financial"
}

export function ModelDemo({ modelId, modelName, modelCategory, demoType }: ModelDemoProps) {
  const [input, setInput] = useState(getDefaultPrompt(modelCategory))
  const [output, setOutput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [responseId, setResponseId] = useState<string>("")

  useEffect(() => {
    setResponseId(`resp_${Math.random().toString(36).substring(2, 10)}`)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setOutput("")

    // Simulate API call with streaming response
    const words = getSimulatedResponse(modelCategory).split(" ")
    let currentOutput = ""

    for (let i = 0; i < words.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50)) // Delay between words
      currentOutput += (i > 0 ? " " : "") + words[i]
      setOutput(currentOutput)
    }

    setIsLoading(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setInput(getDefaultPrompt(modelCategory))
    setOutput("")
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Try {modelName}</CardTitle>
        <CardDescription>Test the model with sample prompts or create your own to see how it performs</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="demo">
          <TabsList className="mb-4">
            <TabsTrigger value="demo">Interactive Demo</TabsTrigger>
            <TabsTrigger value="api">API Example</TabsTrigger>
          </TabsList>

          <TabsContent value="demo">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="input" className="block text-sm font-medium mb-2">
                  Input
                </label>
                <Textarea
                  id="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Enter your prompt for ${modelName}...`}
                  className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
                  disabled={isLoading}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="submit"
                  className="bg-electric-blue hover:bg-electric-blue/90"
                  disabled={isLoading || !input.trim()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Run Model"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-700"
                  onClick={handleReset}
                  disabled={isLoading}
                >
                  Reset
                </Button>
              </div>

              {(output || isLoading) && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="output" className="block text-sm font-medium">
                      Output
                    </label>
                    {output && (
                      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleCopy}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    )}
                  </div>
                  <div className="bg-gray-900 rounded-md p-4 min-h-[200px] whitespace-pre-wrap">
                    {output || (isLoading && <span className="text-gray-400">Generating response...</span>)}
                  </div>
                </div>
              )}
            </form>
          </TabsContent>

          <TabsContent value="api">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">API Request</h3>
                <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm">
                  {`fetch('https://api.modela.ai/v1/${modelId.toLowerCase().replace(/\s+/g, "-")}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    prompt: "${input.replace(/"/g, '\\"')}",
    max_tokens: 500,
    temperature: 0.7
  })
})`}
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">API Response</h3>
                <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm">
                  {`{
  "id": "${responseId}",
  "model": "${modelId.toLowerCase().replace(/\s+/g, "-")}",
  "created": ${Date.now()},
  "output": "${output.replace(/"/g, '\\"') || "Generated output will appear here..."}",
  "usage": {
    "prompt_tokens": ${Math.floor(input.length / 4)},
    "completion_tokens": ${Math.floor((output.length || 100) / 4)},
    "total_tokens": ${Math.floor((input.length + (output.length || 100)) / 4)}
  }
}`}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function getDefaultPrompt(category: string): string {
  switch (category) {
    case "Legal":
      return "Please analyze the following contract clause for potential risks:\n\nThe Contractor shall indemnify and hold harmless the Company from any claims, damages, losses, and expenses arising out of or resulting from performance of the Work, provided that such claim, damage, loss, or expense is attributable to bodily injury, sickness, disease, or death, or to injury to or destruction of tangible property, but only to the extent caused by the negligent acts or omissions of the Contractor."
    case "Finance":
      return "Based on the following market indicators, predict the trend for tech stocks over the next quarter:\n\n- Inflation rate: 2.4%\n- Federal Reserve interest rate: 1.75%\n- Tech sector P/E ratio: 28.5\n- Recent tech layoffs: 5% increase\n- Consumer spending on tech: 3% growth"
    case "Healthcare":
      return "Analyze this chest X-ray description and provide potential diagnoses:\n\nPA and lateral chest radiographs demonstrate patchy airspace opacities in the right upper lobe and left lower lobe. No pleural effusion or pneumothorax is seen. Heart size is normal. No bony abnormalities."
    case "Retail":
      return "Based on the following sales data, predict inventory needs for the next month:\n\nProduct A: 120 units sold (15% increase from previous month)\nProduct B: 85 units sold (5% decrease from previous month)\nProduct C: 200 units sold (stable from previous month)\nSeasonal factor: Summer sales beginning\nMarketing campaign: 20% discount on Product A starting next week"
    default:
      return "Enter your prompt here..."
  }
}

function getSimulatedResponse(category: string): string {
  switch (category) {
    case "Legal":
      return "Analysis of the indemnification clause reveals several potential risks:\n\n1. Scope Limitation: The indemnification is limited to claims 'only to the extent caused by negligent acts or omissions of the Contractor.' This creates a potential gap where partial liability might be disputed.\n\n2. Ambiguity in 'Negligent Acts': The clause doesn't define what constitutes a 'negligent act,' which could lead to interpretation disputes.\n\n3. No Monetary Cap: There is no upper limit on the indemnification amount, creating potentially unlimited liability for the Contractor.\n\n4. No Time Limitation: The clause doesn't specify how long the indemnification obligation lasts after the work is completed.\n\n5. No Exclusion for Third-Party Actions: The Contractor could be held liable for damages caused by third parties outside their control.\n\nRecommendation: Consider adding a monetary cap, time limitation, clearer definition of negligence, and exclusions for third-party actions beyond the Contractor's control."
    case "Finance":
      return "Based on the provided market indicators, here's my analysis for tech stocks in the next quarter:\n\nPrediction: Moderately Bullish (5-8% growth potential)\n\nRationale:\n1. The relatively low inflation rate (2.4%) is positive for tech stocks, as it suggests stable consumer purchasing power.\n\n2. The low Federal Reserve interest rate (1.75%) is favorable for growth stocks like tech, as it reduces borrowing costs and makes future earnings more valuable in present terms.\n\n3. The tech sector P/E ratio of 28.5 is slightly elevated but not in bubble territory compared to historical averages, suggesting reasonable valuations.\n\n4. The 5% increase in tech layoffs is a concern but may indicate companies are optimizing operations to improve profitability.\n\n5. The 3% growth in consumer spending on tech indicates sustained demand despite economic uncertainties.\n\nRisks to watch:\n- Potential interest rate hikes\n- Regulatory developments\n- Supply chain disruptions\n\nSectors within tech likely to outperform: Cloud computing, cybersecurity, and AI-related stocks."
    case "Healthcare":
      return "Based on the chest X-ray description, here are potential diagnoses to consider:\n\n1. Community-acquired pneumonia (most likely)\n   - The patchy airspace opacities in multiple lobes are classic for infectious pneumonia\n   - The bilateral but asymmetric distribution is typical\n\n2. COVID-19 pneumonia\n   - Similar radiographic appearance with multifocal airspace opacities\n   - Would need to correlate with patient symptoms and exposure history\n\n3. Pulmonary edema (less likely)\n   - Usually more central/perihilar and bilateral\n   - Normal heart size makes cardiogenic edema less likely\n\n4. Organizing pneumonia\n   - Can present with patchy airspace opacities\n   - Usually in patients with persistent symptoms after treated pneumonia\n\n5. Pulmonary hemorrhage\n   - Can appear as airspace opacities\n   - Would need clinical correlation for hemoptysis\n\nRecommended next steps:\n- Correlate with clinical symptoms and vital signs\n- Consider blood cultures and sputum analysis\n- Follow-up imaging after treatment to ensure resolution"
    case "Retail":
      return "Inventory Prediction Analysis for Next Month:\n\nProduct A:\n- Current sales: 120 units (15% increase)\n- Projected sales: 144 units (20% increase due to upcoming discount promotion)\n- Recommended inventory: 180 units (25% buffer for promotion uncertainty)\n- Reorder trigger point: 45 units (when inventory reaches this level)\n\nProduct B:\n- Current sales: 85 units (5% decrease)\n- Projected sales: 80 units (continued slight decline expected)\n- Recommended inventory: 96 units (20% buffer)\n- Reorder trigger point: 24 units\n\nProduct C:\n- Current sales: 200 units (stable)\n- Projected sales: 220 units (10% increase due to summer season)\n- Recommended inventory: 264 units (20% buffer)\n- Reorder trigger point: 66 units\n\nAdditional recommendations:\n1. Consider bundle promotions of Product B with the discounted Product A to boost B's sales\n2. Monitor Product A sales velocity during the first week of promotion to adjust inventory if needed\n3. Ensure sufficient storage capacity for the increased Product A inventory\n4. Review historical summer sales patterns for more precise seasonal adjustments"
    default:
      return "This is a simulated response from the model. In a real implementation, this would be generated by the actual AI model based on your input."
  }
}
