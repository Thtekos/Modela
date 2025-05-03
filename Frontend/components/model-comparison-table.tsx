import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Check, X, Minus } from "lucide-react"
import type { Model } from "@/lib/models"

interface ModelComparisonTableProps {
  models: Model[]
  type: "features" | "specs" | "pricing"
  title: string
  description: string
}

export function ModelComparisonTable({ models, type, title, description }: ModelComparisonTableProps) {
  // Define comparison data based on type
  const getComparisonData = () => {
    if (type === "features") {
      return [
        {
          name: "Document Analysis",
          values: models.map((model) =>
            model.category === "Legal" || model.category === "Finance"
              ? true
              : model.category === "Healthcare"
                ? false
                : null,
          ),
        },
        {
          name: "Predictive Analytics",
          values: models.map((model) =>
            model.category === "Finance" || model.category === "Retail"
              ? true
              : model.category === "Legal"
                ? false
                : null,
          ),
        },
        {
          name: "Image Recognition",
          values: models.map((model) => (model.category === "Healthcare" ? true : false)),
        },
        {
          name: "Natural Language Processing",
          values: models.map((model) => (model.category === "Legal" || model.category === "Finance" ? true : null)),
        },
        {
          name: "Multi-language Support",
          values: models.map((model) =>
            model.category === "Legal" ? true : model.category === "Healthcare" ? false : null,
          ),
        },
        {
          name: "Real-time Processing",
          values: models.map((model) =>
            model.category === "Healthcare" || model.category === "Retail"
              ? true
              : model.category === "Legal"
                ? false
                : null,
          ),
        },
        {
          name: "Custom Training",
          values: models.map((model) => (model.category === "Finance" ? true : null)),
        },
      ]
    } else if (type === "specs") {
      return [
        {
          name: "Model Architecture",
          values: models.map((model) =>
            model.category === "Legal"
              ? "Transformer-based NLP"
              : model.category === "Finance"
                ? "Hybrid LSTM/Transformer"
                : model.category === "Healthcare"
                  ? "CNN + Transformer"
                  : "Proprietary Architecture",
          ),
        },
        {
          name: "Parameters",
          values: models.map((model) =>
            model.category === "Legal"
              ? "3.5 billion"
              : model.category === "Finance"
                ? "5.2 billion"
                : model.category === "Healthcare"
                  ? "2.8 billion"
                  : "1.5 billion",
          ),
        },
        {
          name: "Training Data",
          values: models.map((model) =>
            model.category === "Legal"
              ? "12M+ legal documents"
              : model.category === "Finance"
                ? "20+ years of market data"
                : model.category === "Healthcare"
                  ? "10M+ medical images"
                  : "5M+ retail transactions",
          ),
        },
        {
          name: "Accuracy",
          values: models.map((model) =>
            model.category === "Legal"
              ? "98% on legal terminology"
              : model.category === "Finance"
                ? "85% for short-term forecasts"
                : model.category === "Healthcare"
                  ? "92% diagnostic accuracy"
                  : "88% demand prediction",
          ),
        },
        {
          name: "API Response Time",
          values: models.map((model) =>
            model.category === "Legal"
              ? "<200ms"
              : model.category === "Finance"
                ? "<150ms"
                : model.category === "Healthcare"
                  ? "<500ms"
                  : "<100ms",
          ),
        },
      ]
    } else {
      // Pricing
      return [
        {
          name: "Starter Plan",
          values: models.map((model) =>
            model.category === "Legal"
              ? "$299/mo"
              : model.category === "Finance"
                ? "$499/mo"
                : model.category === "Healthcare"
                  ? "$599/mo"
                  : "$349/mo",
          ),
        },
        {
          name: "Professional Plan",
          values: models.map((model) =>
            model.category === "Legal"
              ? "$699/mo"
              : model.category === "Finance"
                ? "$1,299/mo"
                : model.category === "Healthcare"
                  ? "$1,499/mo"
                  : "$799/mo",
          ),
        },
        {
          name: "Enterprise Plan",
          values: models.map((model) => "Custom"),
        },
        {
          name: "Free Trial",
          values: models.map((model) => (model.category === "Retail" || model.category === "Finance" ? true : false)),
        },
        {
          name: "Annual Discount",
          values: models.map((model) => true),
        },
      ]
    }
  }

  const comparisonData = getComparisonData()

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-6 font-medium w-1/4"></th>
                {models.map((model) => (
                  <th key={model.id} className="text-center py-4 px-6 font-medium">
                    {model.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr
                  key={row.name}
                  className={`border-b border-gray-700 ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"}`}
                >
                  <td className="py-4 px-6 font-medium">{row.name}</td>
                  {row.values.map((value, i) => (
                    <td key={i} className="text-center py-4 px-6">
                      {typeof value === "boolean" ? (
                        value === true ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : value === false ? (
                          <X className="h-5 w-5 text-red-500 mx-auto" />
                        ) : (
                          <Minus className="h-5 w-5 text-gray-500 mx-auto" />
                        )
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
