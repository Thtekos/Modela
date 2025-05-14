import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { getAllModels } from "@/lib/models"

interface SolutionCategoryPageProps {
  params: {
    category: string
  }
}

export function generateMetadata({ params }: SolutionCategoryPageProps): Metadata {
  const category = params.category
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

  return {
    title: `${formattedCategory} AI Solutions | Modela™`,
    description: `Discover specialized AI models for ${formattedCategory.toLowerCase()} industry applications`,
  }
}

export function generateStaticParams() {
  return [
    { category: "legal" },
    { category: "finance" },
    { category: "healthcare" },
    { category: "retail" },
    { category: "manufacturing" },
    { category: "education" },
  ]
}

export default async function SolutionCategoryPage({ params }: SolutionCategoryPageProps) {
  const { category } = params
  const validCategories = ["legal", "finance", "healthcare", "retail", "manufacturing", "education"]

  if (!validCategories.includes(category.toLowerCase())) {
    notFound()
  }

  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

  // Get models for this category
  const allModels = await getAllModels()
  const categoryModels = allModels
    .filter((model) => model.category.toLowerCase() === category.toLowerCase())
    .slice(0, 3) // Just show top 3

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-charcoal to-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-16">
            <Link href="/solutions" className="text-electric-blue hover:underline mb-4 inline-block">
              ← Back to Solutions
            </Link>
            <h1 className="text-4xl font-bold mb-6">{formattedCategory} AI Solutions</h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover how our specialized AI models can transform your {category.toLowerCase()} operations and drive
              innovation in your organization.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div>
                <h2 className="text-2xl font-bold mb-4">Key Benefits</h2>
                <ul className="space-y-3">
                  {getBenefits(category).map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-electric-blue mr-2">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
                <ul className="space-y-3">
                  {getUseCases(category).map((useCase, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-electric-blue mr-2">•</span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {categoryModels.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Featured {formattedCategory} Models</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categoryModels.map((model) => (
                  <div
                    key={model.id}
                    className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-electric-blue/50 transition-all duration-300"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{model.title}</h3>
                      <p className="text-gray-300 mb-4 line-clamp-3">{model.description}</p>
                      <Button className="bg-electric-blue hover:bg-electric-blue/90 w-full" asChild>
                        <Link href={`/models/${model.id}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button className="bg-electric-blue hover:bg-electric-blue/90" size="lg" asChild>
                  <Link href={`/marketplace?category=${category}`}>
                    Browse All {formattedCategory} Models
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

function getBenefits(category: string): string[] {
  const benefits = {
    legal: [
      "Reduce document review time by up to 80%",
      "Improve contract analysis accuracy by 95%",
      "Automate legal research and case law analysis",
      "Identify risks and compliance issues automatically",
      "Standardize legal document creation and management",
    ],
    finance: [
      "Predict market trends with 85% accuracy",
      "Automate financial analysis and reporting",
      "Detect fraud patterns in real-time",
      "Optimize investment portfolios based on risk profiles",
      "Streamline regulatory compliance processes",
    ],
    healthcare: [
      "Improve diagnostic accuracy by up to 90%",
      "Reduce medical imaging analysis time by 75%",
      "Predict patient outcomes based on historical data",
      "Optimize hospital resource allocation",
      "Enhance drug discovery and development processes",
    ],
    retail: [
      "Personalize customer experiences in real-time",
      "Optimize inventory management and reduce waste",
      "Predict consumer trends with 80% accuracy",
      "Automate visual merchandising analysis",
      "Enhance supply chain efficiency",
    ],
    manufacturing: [
      "Predict equipment failures before they occur",
      "Optimize production schedules and resource allocation",
      "Improve quality control with computer vision",
      "Reduce energy consumption by 25%",
      "Streamline supply chain operations",
    ],
    education: [
      "Personalize learning paths for individual students",
      "Automate grading and feedback processes",
      "Identify at-risk students early",
      "Generate customized educational content",
      "Optimize institutional resource allocation",
    ],
  }

  return benefits[category as keyof typeof benefits] || []
}

function getUseCases(category: string): string[] {
  const useCases = {
    legal: [
      "Automated contract review and analysis",
      "Legal document classification and extraction",
      "Compliance monitoring and risk assessment",
      "Legal research and case law analysis",
      "Predictive outcome analysis for litigation",
    ],
    finance: [
      "Algorithmic trading and market analysis",
      "Fraud detection and prevention",
      "Credit risk assessment and scoring",
      "Customer segmentation and targeting",
      "Regulatory compliance monitoring",
    ],
    healthcare: [
      "Medical image analysis and diagnosis",
      "Patient risk stratification",
      "Clinical decision support systems",
      "Drug discovery and development",
      "Healthcare operations optimization",
    ],
    retail: [
      "Customer behavior analysis and prediction",
      "Inventory optimization and demand forecasting",
      "Visual search and product recommendations",
      "Price optimization strategies",
      "Customer sentiment analysis",
    ],
    manufacturing: [
      "Predictive maintenance for equipment",
      "Quality control and defect detection",
      "Production optimization and scheduling",
      "Supply chain management and logistics",
      "Energy consumption optimization",
    ],
    education: [
      "Adaptive learning platforms",
      "Automated grading and feedback",
      "Student engagement and retention analysis",
      "Educational content generation",
      "Institutional resource optimization",
    ],
  }

  return useCases[category as keyof typeof useCases] || []
}
