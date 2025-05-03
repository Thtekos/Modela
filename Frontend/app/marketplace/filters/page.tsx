import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function FiltersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" className="mr-2" asChild>
          <Link href="/marketplace">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-white">Filter Models</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white">Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              "Legal",
              "Finance",
              "Healthcare",
              "Retail",
              "Manufacturing",
              "Education",
              "Customer Service",
              "Marketing",
            ].map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox id={`category-${category.toLowerCase()}`} />
                <Label htmlFor={`category-${category.toLowerCase()}`} className="text-white">
                  {category}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white">Price Range</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Slider defaultValue={[0, 1000]} max={1000} step={10} />
            <div className="flex justify-between">
              <span className="text-white">$0</span>
              <span className="text-white">$1000+</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="min-price" className="text-white">
                  Min Price
                </Label>
                <div className="flex items-center mt-1">
                  <span className="text-white mr-1">$</span>
                  <input
                    id="min-price"
                    type="number"
                    className="w-full bg-gray-700 border-gray-600 rounded-md px-2 py-1 text-white"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="max-price" className="text-white">
                  Max Price
                </Label>
                <div className="flex items-center mt-1">
                  <span className="text-white mr-1">$</span>
                  <input
                    id="max-price"
                    type="number"
                    className="w-full bg-gray-700 border-gray-600 rounded-md px-2 py-1 text-white"
                    placeholder="1000+"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white">Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              "API Access",
              "Custom Training",
              "Batch Processing",
              "Real-time Processing",
              "Multi-language Support",
              "Enterprise Support",
              "On-premise Deployment",
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox id={`feature-${feature.toLowerCase().replace(/\s+/g, "-")}`} />
                <Label htmlFor={`feature-${feature.toLowerCase().replace(/\s+/g, "-")}`} className="text-white">
                  {feature}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <Button variant="outline" className="border-gray-700 hover:bg-gray-700 text-white">
          Reset Filters
        </Button>
        <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white" asChild>
          <Link href="/marketplace">Apply Filters</Link>
        </Button>
      </div>
    </div>
  )
}
