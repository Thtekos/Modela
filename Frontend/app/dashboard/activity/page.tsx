"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Zap, CreditCard, Settings, AlertCircle } from "lucide-react"

const allActivities = [
  {
    id: 1,
    type: "model_added",
    title: "Added new model",
    description: "You added LegalDocAnalyzer Pro to your account",
    time: "2 hours ago",
    icon: <Package className="h-4 w-4" />,
  },
  {
    id: 2,
    type: "api_usage",
    title: "High API usage",
    description: "Your API usage is at 80% of your monthly limit",
    time: "Yesterday",
    icon: <Zap className="h-4 w-4" />,
    alert: true,
  },
  {
    id: 3,
    type: "billing",
    title: "Payment successful",
    description: "Your subscription has been renewed",
    time: "3 days ago",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    id: 4,
    type: "settings",
    title: "Settings updated",
    description: "You updated your account settings",
    time: "1 week ago",
    icon: <Settings className="h-4 w-4" />,
  },
  // Add more activities here
  {
    id: 5,
    type: "model_added",
    title: "Added new model",
    description: "You added FinancialForecastAI to your account",
    time: "2 weeks ago",
    icon: <Package className="h-4 w-4" />,
  },
  {
    id: 6,
    type: "settings",
    title: "API key created",
    description: "You created a new API key for development",
    time: "2 weeks ago",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    id: 7,
    type: "billing",
    title: "Plan upgraded",
    description: "You upgraded to the Professional plan",
    time: "3 weeks ago",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    id: 8,
    type: "api_usage",
    title: "API usage report",
    description: "Monthly API usage report is available",
    time: "1 month ago",
    icon: <Zap className="h-4 w-4" />,
  },
]

export default function ActivityPage() {
  return (
    <div>
      <DashboardHeader
        title="Activity History"
        description="View your recent account activity and system notifications"
      />

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="space-y-6">
            {allActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-6 border-b border-gray-700 last:pb-0 last:border-0">
                <div
                  className={`p-2 rounded-full ${
                    activity.alert ? "bg-yellow-500/20 text-yellow-500" : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {activity.alert ? <AlertCircle className="h-4 w-4" /> : activity.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{activity.title}</h4>
                  <p className="text-sm text-gray-400">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 