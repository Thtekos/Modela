"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard/header"
import { ModelDetailHeader } from "@/components/dashboard/model-detail-header"
import { ArrowLeft, Server, Shield, FileText } from "lucide-react"
import { use } from "react"

export default function ModelOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = resolvedParams.id

  // In a real app, you would fetch this data from an API
  const modelData = {
    id: id,
    name: id === "1" ? "LegalDocAnalyzer Pro" : id === "2" ? "FinancialForecastAI" : "Model " + id,
    category: id === "1" ? "Legal" : id === "2" ? "Finance" : "Other",
    status: "Active",
    description:
      "A powerful AI model designed to analyze legal documents, extract key information, and identify potential risks with high accuracy.",
    apiEndpoint: "https://api.modela.ai/v1/models/legal-doc-analyzer",
    version: "2.1.0",
    lastUpdated: "2024-03-15",
    metrics: {
      apiCalls: "24.5k",
      avgResponseTime: "124ms",
      errorRate: "0.3%",
      uptime: "99.99%",
    },
  }

  return (
    <div>
      <DashboardHeader
        title="Model Overview"
        description="View and manage your model's configuration"
        actions={
          <Button variant="outline" className="border-gray-700 hover:bg-gray-700 text-white" asChild>
            <Link href="/dashboard/models">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Models
            </Link>
          </Button>
        }
      />

      <ModelDetailHeader modelId={id} activeTab="overview" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Model Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Description</h3>
                  <p className="text-gray-300">{modelData.description}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">API Endpoint</h3>
                  <code className="text-electric-blue break-all">{modelData.apiEndpoint}</code>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Version</h3>
                    <p className="text-gray-300">{modelData.version}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Category</h3>
                    <Badge className="bg-electric-blue text-white">{modelData.category}</Badge>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Status</h3>
                    <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-900">
                      {modelData.status}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Last Updated</h3>
                    <p className="text-gray-300">{modelData.lastUpdated}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">API Calls</h3>
                  <p className="text-2xl font-bold text-white">{modelData.metrics.apiCalls}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Avg. Response Time</h3>
                  <p className="text-2xl font-bold text-white">{modelData.metrics.avgResponseTime}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Error Rate</h3>
                  <p className="text-2xl font-bold text-white">{modelData.metrics.errorRate}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Uptime</h3>
                  <p className="text-2xl font-bold text-white">{modelData.metrics.uptime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-gray-800 border-gray-700 sticky top-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <QuickLinkItem
                  icon={<FileText className="h-5 w-5" />}
                  title="API Documentation"
                  description="View the API reference and integration guides"
                  link={`/dashboard/models/${id}/documentation`}
                />
                <QuickLinkItem
                  icon={<Server className="h-5 w-5" />}
                  title="Usage Analytics"
                  description="Monitor your model's performance and usage"
                  link={`/dashboard/models/${id}/analytics`}
                />
                <QuickLinkItem
                  icon={<Shield className="h-5 w-5" />}
                  title="Security Settings"
                  description="Configure access controls and permissions"
                  link={`/dashboard/models/${id}/settings`}
                />
                <QuickLinkItem
                  icon={<FileText className="h-5 w-5" />}
                  title="Activity Logs"
                  description="View detailed logs and audit trails"
                  link={`/dashboard/models/${id}/logs`}
                />
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function QuickLinkItem({
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
    <li>
      <Link
        href={link}
        className="block p-4 rounded-lg border border-gray-700 hover:border-electric-blue/50 transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="text-electric-blue">{icon}</div>
          <div>
            <h3 className="font-medium mb-1">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
      </Link>
    </li>
  )
} 