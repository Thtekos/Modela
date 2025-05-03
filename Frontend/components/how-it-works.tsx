import type React from "react"
import { Card } from "@/components/ui/card"
import { Search, Code, BarChart, Zap } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-electric-blue" />,
      title: "Discover",
      description: "Browse our marketplace to find specialized AI models that match your industry needs and use cases.",
    },
    {
      icon: <Code className="h-10 w-10 text-electric-blue" />,
      title: "Integrate",
      description:
        "Easily integrate the model into your existing systems with our simple API and comprehensive documentation.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-electric-blue" />,
      title: "Analyze",
      description: "Monitor performance metrics and get insights from your AI model through our intuitive dashboard.",
    },
    {
      icon: <Zap className="h-10 w-10 text-electric-blue" />,
      title: "Scale",
      description:
        "Seamlessly scale your AI capabilities as your business grows with our flexible pricing and infrastructure.",
    },
  ]

  return (
    <div className="bg-gray-900 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">How Modela™ Works</h2>
          <p className="text-xl text-gray-300">
            Our platform makes it simple to find, deploy, and scale AI models for your specific business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              number={index + 1}
            />
          ))}
        </div>

        {/* Process visualization */}
        <div className="mt-16 relative hidden lg:block">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 transform -translate-y-1/2 z-0"></div>
          <div className="flex justify-between relative z-10">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className="w-10 h-10 rounded-full bg-electric-blue flex items-center justify-center text-white font-bold"
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StepCard({
  icon,
  title,
  description,
  number,
}: {
  icon: React.ReactNode
  title: string
  description: string
  number: number
}) {
  return (
    <Card className="bg-gray-800 border-gray-700 p-6 relative overflow-hidden hover:border-electric-blue/50 transition-all duration-300">
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center opacity-10">
        <span className="text-4xl font-bold">{number}</span>
      </div>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </Card>
  )
}
