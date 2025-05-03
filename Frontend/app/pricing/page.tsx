"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/hooks/use-toast"

export default function PricingPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [loading, setLoading] = useState<string | null>(null)

  const handlePlanSelection = (plan: string) => {
    setLoading(plan)

    if (!isAuthenticated) {
      router.push(`/auth/register?plan=${plan.toLowerCase()}`)
      return
    }

    // If it's enterprise plan, redirect to contact
    if (plan === "Enterprise") {
      router.push("/contact")
      return
    }

    // For other plans, redirect to billing with the selected plan
    router.push(`/dashboard/billing?plan=${plan.toLowerCase()}`)
  }

  const handleContactSales = () => {
    router.push("/contact")
  }

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-charcoal to-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4 text-white">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-300">Choose the plan that's right for your business</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 mt-16 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.title}
                className={`flex-1 bg-gray-800 border rounded-lg overflow-hidden transition-all duration-300 ${
                  plan.popular
                    ? "border-electric-blue scale-105 shadow-lg shadow-electric-blue/20"
                    : "border-gray-700 hover:border-electric-blue/50"
                }`}
              >
                {plan.popular && (
                  <div className="bg-electric-blue text-white text-center py-2 font-medium">Most Popular</div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">{plan.title}</h3>
                  <p className="text-gray-300 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <Button
                    className={`w-full mb-6 ${
                      plan.popular ? "bg-electric-blue hover:bg-electric-blue/90" : "bg-gray-700 hover:bg-gray-600"
                    } text-white`}
                    onClick={() => handlePlanSelection(plan.title)}
                    disabled={loading === plan.title}
                  >
                    {loading === plan.title ? "Processing..." : plan.buttonText}
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start text-gray-300">
                        <Check className="h-5 w-5 text-electric-blue mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gray-800 border border-gray-700 rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-center text-white">Need a custom solution?</h3>
            <p className="text-gray-300 text-center mb-6">
              Contact our sales team to discuss your specific requirements and get a tailored quote.
            </p>
            <div className="flex justify-center">
              <Button
                className="bg-electric-blue hover:bg-electric-blue/90 text-white"
                onClick={handleContactSales}
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

const pricingPlans = [
  {
    title: "Starter",
    description: "Perfect for individuals and small projects",
    price: 49,
    buttonText: "Get Started",
    popular: false,
    features: [
      "Access to 5 basic models",
      "100,000 tokens per month",
      "Standard API access",
      "Community support",
      "Basic analytics",
    ],
  },
  {
    title: "Professional",
    description: "Ideal for growing businesses and teams",
    price: 199,
    buttonText: "Get Started",
    popular: true,
    features: [
      "Access to all 20+ models",
      "1,000,000 tokens per month",
      "Priority API access",
      "Email support",
      "Advanced analytics",
      "Custom model fine-tuning",
      "Team collaboration tools",
    ],
  },
  {
    title: "Enterprise",
    description: "For organizations with advanced needs",
    price: 499,
    buttonText: "Contact Sales",
    popular: false,
    features: [
      "Unlimited access to all models",
      "5,000,000 tokens per month",
      "Dedicated API endpoints",
      "24/7 priority support",
      "Enterprise-grade analytics",
      "Advanced fine-tuning options",
      "Custom model development",
      "SLA guarantees",
      "On-premises deployment options",
    ],
  },
]
