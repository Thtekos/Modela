import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "AI Solutions | Modela™",
  description: "Industry-specific AI solutions powered by Modela™",
}

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-charcoal to-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">AI Solutions for Every Industry</h1>
            <p className="text-xl text-gray-300">
              Discover how Modela™ AI models can transform your business operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {solutions.map((solution) => (
              <div
                key={solution.title}
                className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-electric-blue/50 transition-all duration-300"
              >
                <div className="p-6">
                  <solution.icon className="h-12 w-12 text-electric-blue mb-4" />
                  <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                  <p className="text-gray-300 mb-4">{solution.description}</p>
                  <a href={solution.link} className="text-electric-blue hover:underline inline-flex items-center">
                    Learn more
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

import { Building2, Stethoscope, Scale, ShoppingBag, Factory, GraduationCap } from "lucide-react"

const solutions = [
  {
    title: "Legal",
    description: "AI-powered contract analysis, legal research, and document review to streamline legal workflows.",
    icon: Scale,
    link: "/solutions/legal",
  },
  {
    title: "Healthcare",
    description: "Advanced diagnostic assistance, medical image analysis, and patient data insights.",
    icon: Stethoscope,
    link: "/solutions/healthcare",
  },
  {
    title: "Finance",
    description: "Market prediction, risk assessment, fraud detection, and automated financial analysis.",
    icon: Building2,
    link: "/solutions/finance",
  },
  {
    title: "Retail",
    description: "Customer behavior analysis, inventory optimization, and personalized shopping experiences.",
    icon: ShoppingBag,
    link: "/solutions/retail",
  },
  {
    title: "Manufacturing",
    description: "Predictive maintenance, quality control, and supply chain optimization.",
    icon: Factory,
    link: "/solutions/manufacturing",
  },
  {
    title: "Education",
    description: "Personalized learning paths, automated grading, and educational content generation.",
    icon: GraduationCap,
    link: "/solutions/education",
  },
]
