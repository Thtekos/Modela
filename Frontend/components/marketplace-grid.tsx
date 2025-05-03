"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Users, Scale } from "lucide-react"
import type { Model } from "@/lib/models"

export function MarketplaceGrid({ models }: { models: Model[] }) {
  const [selectedModels, setSelectedModels] = useState<string[]>([])

  const toggleModelSelection = (modelId: string) => {
    if (selectedModels.includes(modelId)) {
      setSelectedModels(selectedModels.filter((id) => id !== modelId))
    } else {
      if (selectedModels.length < 3) {
        setSelectedModels([...selectedModels, modelId])
      }
    }
  }

  return (
    <div className="mt-8">
      {selectedModels.length > 0 && (
        <div className="sticky top-16 z-10 bg-gray-900/95 backdrop-blur-sm p-4 mb-6 rounded-lg border border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="font-medium text-white">{selectedModels.length} models selected</span>
            <span className="text-gray-300 ml-2 block sm:inline">
              {selectedModels.length < 3 ? `(You can select up to ${3 - selectedModels.length} more)` : ""}
            </span>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button
              variant="outline"
              className="border-gray-700 hover:bg-gray-700 text-white flex-1 sm:flex-none"
              onClick={() => setSelectedModels([])}
            >
              Clear Selection
            </Button>
            <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white flex-1 sm:flex-none" asChild>
              <Link href={`/compare?models=${selectedModels.join(",")}`}>
                <Scale className="h-4 w-4 mr-2" />
                Compare Models
              </Link>
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {models.map((model) => (
          <Card
            key={model.id}
            className={`bg-gray-800 border-gray-700 overflow-hidden hover:border-electric-blue/50 transition-all duration-300 flex flex-col ${
              selectedModels.includes(model.id) ? "ring-2 ring-electric-blue" : ""
            }`}
          >
            <div className="relative">
              <img
                src={model.image || "/placeholder.svg?height=192&width=384"}
                alt={model.title}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-3 right-3 bg-electric-blue text-white">{model.category}</Badge>
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold truncate text-white">{model.title}</h3>
              </div>

              <div className="flex items-center mb-3 text-sm text-gray-300">
                <div className="flex items-center mr-4">
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                  <span>{model.rating}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{model.users} users</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{model.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {model.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-electric-blue">{model.price}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant={selectedModels.includes(model.id) ? "default" : "outline"}
                    className={
                      selectedModels.includes(model.id)
                        ? "bg-electric-blue hover:bg-electric-blue/90 text-white w-full"
                        : "border-gray-700 hover:bg-gray-700 text-white w-full"
                    }
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleModelSelection(model.id)
                    }}
                  >
                    <Scale className="h-4 w-4 mr-1" />
                    {selectedModels.includes(model.id) ? "Selected" : "Compare"}
                  </Button>
                  <Button size="sm" className="bg-electric-blue hover:bg-electric-blue/90 text-white w-full" asChild>
                    <Link href={`/models/${model.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
