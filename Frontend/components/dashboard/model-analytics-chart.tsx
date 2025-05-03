"use client"

import { useEffect, useState } from "react"
import { BarChart3 } from "lucide-react"

interface ModelAnalyticsChartProps {
  type: "calls" | "latency" | "errors" | "tokens"
  timeRange: string
}

export function ModelAnalyticsChart({ type, timeRange }: ModelAnalyticsChartProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [type, timeRange])

  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-gray-900 rounded-md">
        <div className="animate-pulse text-gray-500">Loading chart data...</div>
      </div>
    )
  }

  // In a real app, you would render a chart library like recharts or chart.js
  // For this demo, we'll just show a placeholder
  return (
    <div className="h-[300px] flex items-center justify-center bg-gray-900 rounded-md">
      <div className="text-center">
        <BarChart3 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400">
          {type === "calls"
            ? "API Calls over time"
            : type === "latency"
              ? "Response time (ms) over time"
              : type === "errors"
                ? "Error rate (%) over time"
                : "Token usage over time"}
        </p>
        <p className="text-sm text-gray-500 mt-2">Time range: {timeRange}</p>
      </div>
    </div>
  )
}
