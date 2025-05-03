"use client"

export function ModelAnalyticsMetrics() {
  const metrics = [
    { name: "p50 Latency", value: "89ms" },
    { name: "p90 Latency", value: "124ms" },
    { name: "p95 Latency", value: "156ms" },
    { name: "p99 Latency", value: "210ms" },
    { name: "Success Rate", value: "99.7%" },
    { name: "Error Rate", value: "0.3%" },
    { name: "Avg. Tokens per Request", value: "512" },
    { name: "Max Tokens per Request", value: "4,096" },
    { name: "Total Tokens Generated", value: "1,245,632" },
    { name: "Total Tokens Processed", value: "2,489,521" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {metrics.map((metric) => (
        <div key={metric.name} className="bg-gray-900 p-4 rounded-lg">
          <h4 className="text-sm text-gray-400 mb-1">{metric.name}</h4>
          <p className="text-xl font-bold">{metric.value}</p>
        </div>
      ))}
    </div>
  )
}
