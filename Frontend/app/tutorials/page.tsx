import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Tutorials | Modela™",
  description: "Learn how to use Modela™ AI models effectively with our comprehensive tutorials",
}

export default function TutorialsPage() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-charcoal to-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">Modela™ Tutorials</h1>
            <p className="text-xl text-gray-300">
              Learn how to get the most out of our AI models with step-by-step guides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {tutorials.map((tutorial) => (
              <div
                key={tutorial.title}
                className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-electric-blue/50 transition-all duration-300"
              >
                <div className="h-48 bg-gray-700 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <tutorial.icon className="h-16 w-16 text-electric-blue" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium bg-electric-blue/20 text-electric-blue px-2 py-1 rounded">
                      {tutorial.level}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">{tutorial.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{tutorial.title}</h3>
                  <p className="text-gray-300 mb-4">{tutorial.description}</p>
                  <a href={tutorial.link} className="text-electric-blue hover:underline inline-flex items-center">
                    Start tutorial
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

import { Code, FileText, BarChart, Zap, Database, Globe } from "lucide-react"

const tutorials = [
  {
    title: "Getting Started with Modela™ API",
    description: "Learn the basics of integrating Modela™ AI models into your applications using our API.",
    icon: Code,
    level: "Beginner",
    duration: "15 min",
    link: "/tutorials/getting-started",
  },
  {
    title: "Document Analysis with LegalDocAnalyzer",
    description: "Extract insights from legal documents using our specialized model.",
    icon: FileText,
    level: "Intermediate",
    duration: "25 min",
    link: "/tutorials/legal-doc-analyzer",
  },
  {
    title: "Financial Forecasting Fundamentals",
    description: "Predict market trends and financial outcomes with our FinancialForecastAI model.",
    icon: BarChart,
    level: "Advanced",
    duration: "40 min",
    link: "/tutorials/financial-forecasting",
  },
  {
    title: "Optimizing Model Performance",
    description: "Learn techniques to improve response times and reduce token usage.",
    icon: Zap,
    level: "Intermediate",
    duration: "30 min",
    link: "/tutorials/optimizing-performance",
  },
  {
    title: "Working with Model Fine-tuning",
    description: "Customize our models to your specific use case with fine-tuning techniques.",
    icon: Database,
    level: "Advanced",
    duration: "45 min",
    link: "/tutorials/fine-tuning",
  },
  {
    title: "Multi-language Support",
    description: "Implement our models for global applications with multi-language capabilities.",
    icon: Globe,
    level: "Intermediate",
    duration: "20 min",
    link: "/tutorials/multi-language",
  },
]
