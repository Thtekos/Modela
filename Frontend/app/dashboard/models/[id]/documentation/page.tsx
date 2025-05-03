"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard/header"
import { ModelDetailHeader } from "@/components/dashboard/model-detail-header"
import { ArrowLeft, Code, FileText } from "lucide-react"
import { use } from "react"

export default function ModelDocumentationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = resolvedParams.id

  // In a real app, you would fetch this data from an API
  const modelData = {
    id: id,
    name: id === "1" ? "LegalDocAnalyzer Pro" : id === "2" ? "FinancialForecastAI" : "Model " + id,
    category: id === "1" ? "Legal" : id === "2" ? "Finance" : "Other",
    status: "Active",
    apiEndpoint: "https://api.modela.ai/v1/models/legal-doc-analyzer",
    version: "2.1.0",
    documentation: {
      description: "A powerful AI model designed to analyze legal documents, extract key information, and identify potential risks with high accuracy.",
      authentication: "Bearer token authentication is required for all API endpoints. Include your API key in the Authorization header.",
      endpoints: [
        {
          name: "Analyze Document",
          method: "POST",
          path: "/analyze",
          description: "Analyze a legal document and extract key information",
          requestExample: {
            document_text: "This Agreement is made on [DATE] between [PARTY A] and [PARTY B]...",
            options: {
              extract_entities: true,
              identify_risks: true,
              summarize: true
            }
          },
          responseExample: {
            entities: {
              parties: ["PARTY A", "PARTY B"],
              dates: ["[DATE]"],
              clauses: []
            },
            risks: [],
            summary: "Basic agreement template between two parties"
          }
        },
        {
          name: "Batch Analysis",
          method: "POST",
          path: "/analyze/batch",
          description: "Analyze multiple legal documents in a single request",
          requestExample: {
            documents: [
              {
                id: "doc1",
                text: "Document 1 content..."
              },
              {
                id: "doc2",
                text: "Document 2 content..."
              }
            ]
          }
        }
      ]
    }
  }

  return (
    <div>
      <DashboardHeader
        title="API Documentation"
        description="Integration guides and API reference"
        actions={
          <Button variant="outline" className="border-gray-700 hover:bg-gray-700 text-white" asChild>
            <Link href={`/dashboard/models/${id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Model
            </Link>
          </Button>
        }
      />

      <ModelDetailHeader modelId={id} activeTab="documentation" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">{modelData.documentation.description}</p>
              <div className="bg-gray-900 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2">Base URL</h3>
                <code className="text-electric-blue break-all">{modelData.apiEndpoint}</code>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Authentication</h3>
                <p className="text-gray-300">{modelData.documentation.authentication}</p>
              </div>
            </CardContent>
          </Card>

          {modelData.documentation.endpoints.map((endpoint, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 mb-8 last:mb-0">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant={endpoint.method === "GET" ? "default" : "secondary"} className="h-6">
                    {endpoint.method}
                  </Badge>
                  <CardTitle className="text-xl font-bold">{endpoint.name}</CardTitle>
                </div>
                <code className="text-sm text-electric-blue mt-2 break-all">
                  {modelData.apiEndpoint}{endpoint.path}
                </code>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">{endpoint.description}</p>
                {endpoint.requestExample && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">Request Example</h4>
                    <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm text-gray-300">
                        {JSON.stringify(endpoint.requestExample, null, 2)}
                      </code>
                    </pre>
                  </div>
                )}
                {endpoint.responseExample && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Response Example</h4>
                    <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm text-gray-300">
                        {JSON.stringify(endpoint.responseExample, null, 2)}
                      </code>
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card className="bg-gray-800 border-gray-700 sticky top-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-4">
                <Link
                  href="#overview"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Overview
                </Link>
                <Link
                  href="#authentication"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Authentication
                </Link>
                {modelData.documentation.endpoints.map((endpoint, index) => (
                  <Link
                    key={index}
                    href={`#${endpoint.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    {endpoint.name}
                  </Link>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 