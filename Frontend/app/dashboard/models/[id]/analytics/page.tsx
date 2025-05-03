"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/header"
import { ModelDetailHeader } from "@/components/dashboard/model-detail-header"
import { ModelAnalyticsChart } from "@/components/dashboard/model-analytics-chart"
import { ModelAnalyticsMetrics } from "@/components/dashboard/model-analytics-metrics"
import { ModelUsageByEndpoint } from "@/components/dashboard/model-usage-by-endpoint"
import { ModelUsageByCountry } from "@/components/dashboard/model-usage-by-country"
import { ArrowLeft, Download, Calendar } from "lucide-react"
import { use } from "react"

export default function ModelAnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = resolvedParams.id
  const [timeRange, setTimeRange] = useState("7d")

  // In a real app, you would fetch this data from an API
  const modelData = {
    id: id,
    name: id === "1" ? "LegalDocAnalyzer Pro" : id === "2" ? "FinancialForecastAI" : "Model " + id,
    category: id === "1" ? "Legal" : id === "2" ? "Finance" : "Other",
    status: "Active",
  }

  return (
    <div>
      <DashboardHeader
        title="Model Analytics"
        description="Detailed performance metrics and usage statistics"
        actions={
          <Button variant="outline" className="border-gray-700 hover:bg-gray-700 text-white" asChild>
            <Link href={`/dashboard/models/${id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Model
            </Link>
          </Button>
        }
      />

      <ModelDetailHeader modelId={id} activeTab="analytics" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
          <span className="text-sm text-gray-400 mr-3">Time Range:</span>
          <div className="flex bg-gray-800 rounded-md p-1">
            {["24h", "7d", "30d", "90d"].map((range) => (
              <button
                key={range}
                className={`px-3 py-1 text-sm rounded-md ${
                  timeRange === range
                    ? "bg-electric-blue text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <Button variant="outline" className="border-gray-700 hover:bg-gray-700 text-white">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Total API Calls" value="24,521" change="+12%" trend="up" />
        <MetricCard title="Avg. Response Time" value="124ms" change="-18ms" trend="down" />
        <MetricCard title="Error Rate" value="0.3%" change="-0.1%" trend="down" />
        <MetricCard title="Billable Tokens" value="1.2M" change="+8%" trend="up" />
      </div>

      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold text-white">Usage Over Time</CardTitle>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm text-gray-400">
              {timeRange === "24h"
                ? "Last 24 hours"
                : timeRange === "7d"
                  ? "Last 7 days"
                  : timeRange === "30d"
                    ? "Last 30 days"
                    : "Last 90 days"}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calls">
            <TabsList className="mb-4 bg-gray-700">
              <TabsTrigger
                value="calls"
                className="data-[state=active]:bg-electric-blue data-[state=active]:text-white text-gray-300"
              >
                API Calls
              </TabsTrigger>
              <TabsTrigger
                value="latency"
                className="data-[state=active]:bg-electric-blue data-[state=active]:text-white text-gray-300"
              >
                Response Time
              </TabsTrigger>
              <TabsTrigger
                value="errors"
                className="data-[state=active]:bg-electric-blue data-[state=active]:text-white text-gray-300"
              >
                Errors
              </TabsTrigger>
              <TabsTrigger
                value="tokens"
                className="data-[state=active]:bg-electric-blue data-[state=active]:text-white text-gray-300"
              >
                Token Usage
              </TabsTrigger>
            </TabsList>
            <TabsContent value="calls">
              <ModelAnalyticsChart type="calls" timeRange={timeRange} />
            </TabsContent>
            <TabsContent value="latency">
              <ModelAnalyticsChart type="latency" timeRange={timeRange} />
            </TabsContent>
            <TabsContent value="errors">
              <ModelAnalyticsChart type="errors" timeRange={timeRange} />
            </TabsContent>
            <TabsContent value="tokens">
              <ModelAnalyticsChart type="tokens" timeRange={timeRange} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Usage by Endpoint</CardTitle>
          </CardHeader>
          <CardContent>
            <ModelUsageByEndpoint />
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Usage by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <ModelUsageByCountry />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <ModelAnalyticsMetrics />
        </CardContent>
      </Card>
    </div>
  )
}

function MetricCard({
  title,
  value,
  change,
  trend,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down"
}) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <h3 className="text-sm text-gray-400 mb-2">{title}</h3>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold text-white">{value}</span>
          <span className={`text-sm ${trend === "up" ? "text-green-400" : "text-red-400"}`}>{change}</span>
        </div>
      </CardContent>
    </Card>
  )
}
