import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/header"
import { Package, BarChart3, Settings, ArrowRight, Plus, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "My Models | Modela™",
  description: "Manage your AI models",
}

export default function ModelsPage() {
  return (
    <div>
      <DashboardHeader
        title="My Models"
        description="Manage and monitor your AI models"
        actions={
          <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white" asChild>
            <Link href="/marketplace">
              <Plus className="h-4 w-4 mr-2" />
              Add New Model
            </Link>
          </Button>
        }
      />

      <Tabs defaultValue="active" className="mb-8">
        <TabsList className="bg-gray-800">
          <TabsTrigger
            value="active"
            className="text-white data-[state=active]:bg-electric-blue data-[state=active]:text-white"
          >
            Active Models (5)
          </TabsTrigger>
          <TabsTrigger
            value="inactive"
            className="text-white data-[state=active]:bg-electric-blue data-[state=active]:text-white"
          >
            Inactive Models (2)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                id: "1",
                name: "LegalDocAnalyzer Pro",
                description:
                  "Specialized model for legal document analysis, contract review, and clause extraction with 98% accuracy on legal terminology.",
                status: "Active",
                usage: "8,245 calls this month",
                category: "Legal",
                lastUsed: "2 hours ago",
              },
              {
                id: "2",
                name: "FinancialForecastAI",
                description:
                  "Predict market trends and financial outcomes with this model trained on 20+ years of financial data across multiple markets.",
                status: "Active",
                usage: "12,104 calls this month",
                category: "Finance",
                lastUsed: "5 minutes ago",
              },
              {
                id: "3",
                name: "MedicalImageDiagnostic",
                description:
                  "Healthcare imaging model that assists in diagnosing conditions from X-rays, MRIs, and CT scans with clinical-grade accuracy.",
                status: "Active",
                usage: "3,452 calls this month",
                category: "Healthcare",
                lastUsed: "1 day ago",
              },
              {
                id: "4",
                name: "RetailDemandPredictor",
                description:
                  "Optimize inventory and predict customer demand patterns based on historical sales, seasonality, and market trends.",
                status: "Active",
                usage: "720 calls this month",
                category: "Retail",
                lastUsed: "3 days ago",
              },
              {
                id: "5",
                name: "CustomerSupportAI",
                description:
                  "AI-powered customer support assistant trained on your company's knowledge base and support history.",
                status: "Active",
                usage: "0 calls this month",
                category: "Customer Service",
                lastUsed: "2 weeks ago",
              },
            ].map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="inactive" className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                id: "6",
                name: "SupplyChainOptimizer",
                description:
                  "Optimize your supply chain operations with predictive analytics and real-time inventory management.",
                status: "Inactive",
                usage: "0 calls this month",
                category: "Logistics",
                lastUsed: "2 months ago",
              },
              {
                id: "7",
                name: "HRRecruitmentAssistant",
                description:
                  "Streamline your recruitment process with AI-powered resume screening and candidate matching.",
                status: "Inactive",
                usage: "0 calls this month",
                category: "Human Resources",
                lastUsed: "3 months ago",
              },
            ].map((model) => (
              <ModelCard key={model.id} model={model} inactive />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ModelCard({ model, inactive = false }: { model: any; inactive?: boolean }) {
  return (
    <Card className={`bg-gray-800 border-gray-700 ${inactive ? "opacity-70" : ""}`}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="w-12 h-12 rounded bg-gray-700 flex items-center justify-center flex-shrink-0">
            <Package className="h-6 w-6 text-electric-blue" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{model.name}</h3>
                <Badge
                  variant="outline"
                  className={`${
                    inactive
                      ? "bg-gray-700/50 text-gray-400 border-gray-600"
                      : "bg-green-900/20 text-green-400 border-green-800"
                  }`}
                >
                  {model.status}
                </Badge>
              </div>
              <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
                {model.category}
              </Badge>
            </div>
            <p className="text-gray-300 text-sm mb-4">{model.description}</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex items-center text-sm text-gray-400">
                  <Zap className="h-4 w-4 mr-1 text-electric-blue" />
                  <span>{model.usage}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <BarChart3 className="h-4 w-4 mr-1 text-electric-blue" />
                  <span>Last used {model.lastUsed}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-700 text-white" asChild>
                  <Link href={`/dashboard/models/${model.id}/analytics`}>
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Analytics
                  </Link>
                </Button>
                <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-700 text-white" asChild>
                  <Link href={`/dashboard/models/${model.id}/settings`}>
                    <Settings className="h-4 w-4 mr-1" />
                    Settings
                  </Link>
                </Button>
                <Button size="sm" className="bg-electric-blue hover:bg-electric-blue/90 text-white" asChild>
                  <Link href={`/dashboard/models/${model.id}`}>
                    Manage
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
