import Link from "next/link"
import { Package, Zap, CreditCard, Settings, AlertCircle, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const activities = [
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
]

export function RecentActivity({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <div>
      {showHeader && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" asChild>
            <Link href="/dashboard/activity">
              View All
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      )}
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
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
    </div>
  )
}
