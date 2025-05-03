import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Package, Zap, Clock, AlertCircle, ChevronRight, ArrowRight } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/header"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export const metadata: Metadata = {
  title: "Dashboard | Modela™",
  description: "Manage your AI models and account",
}

export default function DashboardPage() {
  return (
    <div>
      <DashboardHeader title="Dashboard" description="Welcome back! Here's an overview of your AI models and usage." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Active Models"
          value="5"
          change="+1 this month"
          trend="up"
          icon={<Package className="h-5 w-5" />}
        />
        <StatsCard
          title="API Calls"
          value="24,521"
          change="+12% from last month"
          trend="up"
          icon={<Zap className="h-5 w-5" />}
        />
        <StatsCard
          title="Avg. Response Time"
          value="124ms"
          change="-18ms from last month"
          trend="down"
          icon={<Clock className="h-5 w-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold text-white">Usage Analytics</CardTitle>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white" asChild>
                <Link href="/dashboard/analytics">
                  View Details
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="calls">
                <TabsList className="mb-4 bg-gray-700">
                  <TabsTrigger value="calls" className="text-white data-[state=active]:bg-electric-blue">
                    API Calls
                  </TabsTrigger>
                  <TabsTrigger value="latency" className="text-white data-[state=active]:bg-electric-blue">
                    Latency
                  </TabsTrigger>
                  <TabsTrigger value="errors" className="text-white data-[state=active]:bg-electric-blue">
                    Errors
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="calls" className="space-y-4">
                  <div className="h-[240px] flex items-center justify-center bg-gray-900 rounded-md relative overflow-hidden">
                    <div className="absolute inset-0 flex items-end justify-around px-4 pb-4">
                      <div className="w-8 bg-electric-blue rounded-t-md h-[30%]"></div>
                      <div className="w-8 bg-electric-blue rounded-t-md h-[45%]"></div>
                      <div className="w-8 bg-electric-blue rounded-t-md h-[60%]"></div>
                      <div className="w-8 bg-electric-blue rounded-t-md h-[80%]"></div>
                      <div className="w-8 bg-electric-blue rounded-t-md h-[65%]"></div>
                      <div className="w-8 bg-electric-blue rounded-t-md h-[90%]"></div>
                      <div className="w-8 bg-electric-blue rounded-t-md h-[75%]"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-700"></div>
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-700"></div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {["Today", "This Week", "This Month", "Total"].map((period, i) => (
                      <div key={i} className="bg-gray-900 p-3 rounded-md">
                        <p className="text-sm text-gray-300">{period}</p>
                        <p className="text-xl font-bold text-white">
                          {i === 0 ? "1,245" : i === 1 ? "8,492" : i === 2 ? "24,521" : "142,384"}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="latency" className="space-y-4">
                  <div className="h-[240px] flex items-center justify-center bg-gray-900 rounded-md relative overflow-hidden">
                    <div className="absolute inset-0 flex items-end justify-around px-4 pb-4">
                      <div className="w-8 bg-green-500 rounded-t-md h-[40%]"></div>
                      <div className="w-8 bg-green-500 rounded-t-md h-[35%]"></div>
                      <div className="w-8 bg-green-500 rounded-t-md h-[50%]"></div>
                      <div className="w-8 bg-yellow-500 rounded-t-md h-[70%]"></div>
                      <div className="w-8 bg-green-500 rounded-t-md h-[45%]"></div>
                      <div className="w-8 bg-yellow-500 rounded-t-md h-[65%]"></div>
                      <div className="w-8 bg-green-500 rounded-t-md h-[55%]"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-700"></div>
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-700"></div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {["p50", "p90", "p95", "p99"].map((percentile, i) => (
                      <div key={i} className="bg-gray-900 p-3 rounded-md">
                        <p className="text-sm text-gray-300">{percentile}</p>
                        <p className="text-xl font-bold text-white">
                          {i === 0 ? "89ms" : i === 1 ? "124ms" : i === 2 ? "156ms" : "210ms"}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="errors" className="space-y-4">
                  <div className="h-[240px] flex items-center justify-center bg-gray-900 rounded-md relative overflow-hidden">
                    <div className="absolute inset-0 flex items-end justify-around px-4 pb-4">
                      <div className="w-8 bg-red-500 rounded-t-md h-[10%]"></div>
                      <div className="w-8 bg-red-500 rounded-t-md h-[5%]"></div>
                      <div className="w-8 bg-red-500 rounded-t-md h-[15%]"></div>
                      <div className="w-8 bg-red-500 rounded-t-md h-[8%]"></div>
                      <div className="w-8 bg-red-500 rounded-t-md h-[12%]"></div>
                      <div className="w-8 bg-red-500 rounded-t-md h-[7%]"></div>
                      <div className="w-8 bg-red-500 rounded-t-md h-[9%]"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-700"></div>
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-700"></div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {["Rate", "Count", "4xx", "5xx"].map((metric, i) => (
                      <div key={i} className="bg-gray-900 p-3 rounded-md">
                        <p className="text-sm text-gray-300">{metric}</p>
                        <p className="text-xl font-bold text-white">
                          {i === 0 ? "0.3%" : i === 1 ? "74" : i === 2 ? "52" : "22"}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold text-white">Usage Limits</CardTitle>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white" asChild>
                <Link href="/dashboard/billing">
                  Upgrade
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <UsageLimit title="API Calls" current={24521} limit={50000} unit="calls" />
                <UsageLimit title="Models" current={5} limit={10} unit="models" />
                <UsageLimit title="Storage" current={1.7} limit={5} unit="GB" />
                <UsageLimit title="Team Members" current={3} limit={5} unit="users" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold text-white">Your Models</CardTitle>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white" asChild>
                <Link href="/dashboard/models">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "1",
                    name: "LegalDocAnalyzer Pro",
                    status: "Active",
                    usage: "8,245 calls this month",
                    category: "Legal",
                  },
                  {
                    id: "2",
                    name: "FinancialForecastAI",
                    status: "Active",
                    usage: "12,104 calls this month",
                    category: "Finance",
                  },
                  {
                    id: "3",
                    name: "MedicalImageDiagnostic",
                    status: "Active",
                    usage: "3,452 calls this month",
                    category: "Healthcare",
                  },
                ].map((model) => (
                  <div
                    key={model.id}
                    className="flex items-center justify-between p-4 bg-gray-900 rounded-lg hover:bg-gray-850 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center mr-4">
                        <Package className="h-5 w-5 text-electric-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{model.name}</h3>
                        <div className="flex items-center text-sm text-gray-300">
                          <Badge
                            variant="outline"
                            className="mr-2 bg-green-900/20 text-green-400 border-green-800 hover:bg-green-900/20"
                          >
                            {model.status}
                          </Badge>
                          <span>{model.usage}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-white" asChild>
                      <Link href={`/dashboard/models/${model.id}`}>
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Button className="w-full bg-electric-blue hover:bg-electric-blue/90 text-white" asChild>
                  <Link href="/marketplace">
                    Browse Marketplace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivity showHeader={false} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatsCard({
  title,
  value,
  change,
  trend,
  icon,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
}) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-300">{title}</p>
            <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
          </div>
          <div className="p-2 bg-gray-700 rounded-md">{icon}</div>
        </div>
        <div className={`mt-2 text-sm ${trend === "up" ? "text-green-400" : "text-red-400"}`}>{change}</div>
      </CardContent>
    </Card>
  )
}

function UsageLimit({
  title,
  current,
  limit,
  unit,
}: {
  title: string
  current: number
  limit: number
  unit: string
}) {
  const percentage = Math.round((current / limit) * 100)
  const isWarning = percentage >= 80

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-white">{title}</h3>
        <div className="flex items-center">
          {isWarning && <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />}
          <span className={isWarning ? "text-yellow-500" : "text-gray-300"}>
            {typeof current === "number" && !Number.isInteger(current) ? current.toFixed(1) : current} / {limit} {unit}
          </span>
        </div>
      </div>
      <Progress
        value={percentage}
        className={`h-2 ${isWarning ? "bg-gray-700" : "bg-gray-700"}`}
        indicatorClassName={isWarning ? "bg-yellow-500" : "bg-electric-blue"}
      />
    </div>
  )
}
