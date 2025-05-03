import Link from "next/link"
import { Package } from "lucide-react"

interface ModelDetailHeaderProps {
  modelId: string
  activeTab: string
}

export function ModelDetailHeader({ modelId, activeTab }: ModelDetailHeaderProps) {
  const tabs = [
    { id: "overview", label: "Overview", href: `/dashboard/models/${modelId}` },
    { id: "analytics", label: "Analytics", href: `/dashboard/models/${modelId}/analytics` },
    { id: "settings", label: "Settings", href: `/dashboard/models/${modelId}/settings` },
    { id: "documentation", label: "Documentation", href: `/dashboard/models/${modelId}/documentation` },
  ]

  // In a real app, you would fetch this data from an API
  const modelData = {
    id: modelId,
    name: modelId === "1" ? "LegalDocAnalyzer Pro" : modelId === "2" ? "FinancialForecastAI" : "Model " + modelId,
    category: modelId === "1" ? "Legal" : modelId === "2" ? "Finance" : "Other",
    status: "Active",
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded bg-gray-700 flex items-center justify-center flex-shrink-0">
          <Package className="h-6 w-6 text-electric-blue" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{modelData.name}</h2>
          <p className="text-gray-400">
            {modelData.category} • {modelData.status}
          </p>
        </div>
      </div>

      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-electric-blue text-electric-blue"
                  : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
