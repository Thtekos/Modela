import type React from "react"
import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard/header"
import { Check, CreditCard, Download } from "lucide-react"

export const metadata: Metadata = {
  title: "Billing | Modela™",
  description: "Manage your billing and subscription",
}

export default function BillingPage() {
  return (
    <div>
      <DashboardHeader title="Billing" description="Manage your subscription and billing information" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Current Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-white">Enterprise Plan</h3>
                    <Badge className="bg-electric-blue text-white">Current</Badge>
                  </div>
                  <p className="text-gray-300 mt-1">Billed annually</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    $999<span className="text-lg text-gray-300">/month</span>
                  </div>
                  <p className="text-gray-300 text-sm">Next billing date: June 15, 2024</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold mb-3 text-white">Plan Includes:</h4>
                  <ul className="space-y-2 text-white">
                    <PlanFeature>Unlimited API calls</PlanFeature>
                    <PlanFeature>Access to all AI models</PlanFeature>
                    <PlanFeature>Custom model training</PlanFeature>
                    <PlanFeature>Priority support</PlanFeature>
                    <PlanFeature>Team collaboration (up to 10 users)</PlanFeature>
                    <PlanFeature>Advanced analytics</PlanFeature>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-3 text-white">Usage This Month:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex justify-between">
                      <span>API Calls:</span>
                      <span>24,521 / Unlimited</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Models:</span>
                      <span>5 / Unlimited</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Storage:</span>
                      <span>1.7 GB / 50 GB</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Team Members:</span>
                      <span>3 / 10</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white">Upgrade Plan</Button>
                <Button
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-700 bg-transparent text-white hover:text-white"
                >
                  Manage Subscription
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg mb-4">
                <div className="p-2 bg-gray-600 rounded">
                  <CreditCard className="h-6 w-6 text-electric-blue" />
                </div>
                <div>
                  <div className="font-medium text-white">Visa ending in 4242</div>
                  <div className="text-sm text-gray-300">Expires 12/2025</div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-gray-700 hover:bg-gray-700 bg-transparent text-white hover:text-white"
              >
                Update Payment Method
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-white">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Starter",
              price: "$99",
              description: "Perfect for small teams and startups",
              features: ["Up to 10,000 API calls/month", "Access to basic models", "Email support", "1 team member"],
              current: false,
            },
            {
              name: "Professional",
              price: "$499",
              description: "Ideal for growing businesses",
              features: [
                "Up to 100,000 API calls/month",
                "Access to all models",
                "Priority email support",
                "5 team members",
                "Basic analytics",
              ],
              current: false,
            },
            {
              name: "Enterprise",
              price: "$999",
              description: "For organizations with advanced needs",
              features: [
                "Unlimited API calls",
                "Access to all models",
                "Custom model training",
                "Priority support",
                "10 team members",
                "Advanced analytics",
              ],
              current: true,
            },
          ].map((plan) => (
            <Card
              key={plan.name}
              className={`bg-gray-800 border-gray-700 ${plan.current ? "ring-2 ring-electric-blue" : ""}`}
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-300">/month</span>
                  </div>
                  <p className="text-gray-300 mt-1">{plan.description}</p>
                </div>

                <ul className="space-y-2 mb-6 text-white">
                  {plan.features.map((feature, index) => (
                    <PlanFeature key={index}>{feature}</PlanFeature>
                  ))}
                </ul>

                <Button
                  className={
                    plan.current
                      ? "w-full bg-gray-700 hover:bg-gray-600 cursor-default text-white"
                      : "w-full bg-electric-blue hover:bg-electric-blue/90 text-white hover:text-white"
                  }
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : "Switch Plan"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4 text-white">Billing History</h3>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-6 font-medium text-white">Date</th>
                    <th className="text-left py-4 px-6 font-medium text-white">Description</th>
                    <th className="text-left py-4 px-6 font-medium text-white">Amount</th>
                    <th className="text-left py-4 px-6 font-medium text-white">Status</th>
                    <th className="text-left py-4 px-6 font-medium text-white">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      date: "May 15, 2024",
                      description: "Enterprise Plan (Annual)",
                      amount: "$11,988.00",
                      status: "Paid",
                    },
                    {
                      date: "Apr 15, 2024",
                      description: "Enterprise Plan (Monthly)",
                      amount: "$999.00",
                      status: "Paid",
                    },
                    {
                      date: "Mar 15, 2024",
                      description: "Enterprise Plan (Monthly)",
                      amount: "$999.00",
                      status: "Paid",
                    },
                    {
                      date: "Feb 15, 2024",
                      description: "Professional Plan (Monthly)",
                      amount: "$499.00",
                      status: "Paid",
                    },
                    {
                      date: "Jan 15, 2024",
                      description: "Professional Plan (Monthly)",
                      amount: "$499.00",
                      status: "Paid",
                    },
                  ].map((invoice, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-700 ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"}`}
                    >
                      <td className="py-4 px-6 text-white">{invoice.date}</td>
                      <td className="py-4 px-6 text-white">{invoice.description}</td>
                      <td className="py-4 px-6 text-white">{invoice.amount}</td>
                      <td className="py-4 px-6">
                        <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-electric-blue hover:text-electric-blue/90 hover:bg-gray-700"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PlanFeature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start">
      <Check className="h-5 w-5 text-electric-blue mr-2 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </li>
  )
}
