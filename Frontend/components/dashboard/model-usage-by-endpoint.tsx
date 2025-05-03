"use client"

import { Progress } from "@/components/ui/progress"

export function ModelUsageByEndpoint() {
  const endpoints = [
    { name: "/v1/completions", calls: 12450, percentage: 50.8 },
    { name: "/v1/embeddings", calls: 6823, percentage: 27.8 },
    { name: "/v1/analyze", calls: 3248, percentage: 13.2 },
    { name: "/v1/classify", calls: 1500, percentage: 6.1 },
    { name: "/v1/summarize", calls: 500, percentage: 2.1 },
  ]

  return (
    <div className="space-y-6">
      {endpoints.map((endpoint) => (
        <div key={endpoint.name}>
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="font-medium">{endpoint.name}</span>
            </div>
            <div className="text-sm text-gray-400">
              {endpoint.calls.toLocaleString()} calls ({endpoint.percentage.toFixed(1)}%)
            </div>
          </div>
          <Progress value={endpoint.percentage} className="h-2 bg-gray-700" indicatorClassName="bg-electric-blue" />
        </div>
      ))}
    </div>
  )
}
