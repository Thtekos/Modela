"use client"

import { Progress } from "@/components/ui/progress"

export function ModelUsageByCountry() {
  const countries = [
    { name: "United States", calls: 14250, percentage: 58.1 },
    { name: "United Kingdom", calls: 3823, percentage: 15.6 },
    { name: "Germany", calls: 2148, percentage: 8.8 },
    { name: "Canada", calls: 1500, percentage: 6.1 },
    { name: "Australia", calls: 1100, percentage: 4.5 },
    { name: "Other", calls: 1700, percentage: 6.9 },
  ]

  return (
    <div className="space-y-6">
      {countries.map((country) => (
        <div key={country.name}>
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="font-medium">{country.name}</span>
            </div>
            <div className="text-sm text-gray-400">
              {country.calls.toLocaleString()} calls ({country.percentage.toFixed(1)}%)
            </div>
          </div>
          <Progress value={country.percentage} className="h-2 bg-gray-700" indicatorClassName="bg-electric-blue" />
        </div>
      ))}
    </div>
  )
}
