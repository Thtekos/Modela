"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PricingClientPage() {
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
                  <PricingButton popular={plan.popular} title={plan.title} buttonText={plan.buttonText} />
                  <ul className="space-y-3 mt-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-electric-blue mr-2 shrink-0" />
                        <span className="text-gray-300">{feature}</span>
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
                onClick={() => (window.location.href = "/contact")}
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

// Client component for buttons with click handlers
function PricingButton({ popular, title, buttonText }: { popular: boolean; title: string; buttonText: string }) {
  const router = useRouter()

  const handleClick = () => {
    if (buttonText === "Contact Sales") {
      router.push("/contact")
    } else {
      router.push("/auth/register?plan=" + encodeURIComponent(title))
    }
  }

  return (
    <Button
      className={`w-full ${
        popular ? "bg-electric-blue hover:bg-electric-blue/90 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"
      }`}
      onClick={handleClick}
    >
      {buttonText}
    </Button>
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
