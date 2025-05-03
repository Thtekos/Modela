import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/header"
import { BarChart3, ArrowUp, ArrowDown } from "lucide-react"

export const metadata: Metadata = {
  title: "Usage Analytics | Modela™",
  description: "Monitor your AI model usage and performance",
}

export default function AnalyticsPage() {
  return (
    <div>
      <DashboardHeader title="Usage Analytics" description="Monitor your AI model usage, performance, and costs" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard title="Total API Calls" value="24,521" change="+12%" trend="up" period="from last month" />
        <MetricCard title="Avg. Response Time" value="124ms" change="-18ms" trend="down" period="from last month" />
        <MetricCard title="Error Rate" value="0.3%" change="-0.1%" trend="down" period="from last month" />
      </div>

      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Usage Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="api-calls">
            <TabsList className="bg-gray-700 mb-6">
              <TabsTrigger
                value="api-calls"
                className="text-white data-[state=active]:bg-electric-blue data-[state=active]:text-white"
              >
                API Calls
              </TabsTrigger>
              <TabsTrigger
                value="response-time"
                className="text-white data-[state=active]:bg-electric-blue data-[state=active]:text-white"
              >
                Response Time
              </TabsTrigger>
              <TabsTrigger
                value="errors"
                className="text-white data-[state=active]:bg-electric-blue data-[state=active]:text-white"
              >
                Errors
              </TabsTrigger>
              <TabsTrigger
                value="token-usage"
                className="text-white data-[state=active]:bg-electric-blue data-[state=active]:text-white"
              >
                Token Usage
              </TabsTrigger>
            </TabsList>

            <TabsContent value="api-calls">
              <div className="h-[400px] bg-gray-900 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                  <p className="text-white text-lg font-medium">API Calls over time</p>
                  <p className="text-gray-400">Time range: 7d</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="response-time">
              <div className="h-[400px] bg-gray-900 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                  <p className="text-white text-lg font-medium">Response Time over time</p>
                  <p className="text-gray-400">Time range: 7d</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="errors">
              <div className="h-[400px] bg-gray-900 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                  <p className="text-white text-lg font-medium">Errors over time</p>
                  <p className="text-gray-400">Time range: 7d</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="token-usage">
              <div className="h-[400px] bg-gray-900 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                  <p className="text-white text-lg font-medium">Token Usage over time</p>
                  <p className="text-gray-400">Time range: 7d</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Usage by Endpoint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <EndpointUsage endpoint="/v1/completions" calls={12450} percentage={50.8} />
              <EndpointUsage endpoint="/v1/chat/completions" calls={8320} percentage={33.9} />
              <EndpointUsage endpoint="/v1/embeddings" calls={2980} percentage={12.2} />
              <EndpointUsage endpoint="/v1/images/generations" calls={771} percentage={3.1} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Usage by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <CountryUsage country="United States" calls={14712} percentage={60} />
              <CountryUsage country="United Kingdom" calls={3678} percentage={15} />
              <CountryUsage country="Germany" calls={2452} percentage={10} />
              <CountryUsage country="Canada" calls={1226} percentage={5} />
              <CountryUsage country="Others" calls={2453} percentage={10} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  change,
  trend,
  period,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  period: string
}) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="flex flex-col">
          <p className="text-sm text-gray-300">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
          <div className={`mt-2 text-sm flex items-center ${trend === "up" ? "text-green-400" : "text-red-400"}`}>
            {trend === "up" ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            <span>
              {change} {period}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EndpointUsage({ endpoint, calls, percentage }: { endpoint: string; calls: number; percentage: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm font-medium text-white">{endpoint}</p>
        <p className="text-sm text-gray-400">
          {calls.toLocaleString()} calls ({percentage}%)
        </p>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-electric-blue" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}

function CountryUsage({ country, calls, percentage }: { country: string; calls: number; percentage: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm font-medium text-white">{country}</p>
        <p className="text-sm text-gray-400">
          {calls.toLocaleString()} calls ({percentage}%)
        </p>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-electric-blue" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
