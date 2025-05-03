"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Users, ArrowUpRight, Scale } from "lucide-react"
import Link from "next/link"
import type { Model } from "@/lib/models"

function ModelCard({ model, isSelected, onToggleSelect }: { 
  model: Model
  isSelected: boolean
  onToggleSelect: (id: string) => void 
}) {
  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-electric-blue/50 transition-all">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge className="bg-electric-blue text-white">{model.category}</Badge>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="font-medium">{model.rating}</span>
          </div>
        </div>

        <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-900">
          <img
            src={model.image || "/placeholder.svg"}
            alt={model.title}
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="text-xl font-bold mb-2">{model.title}</h3>
        <p className="text-gray-300 mb-4 line-clamp-2">{model.description}</p>

        <div className="flex items-center text-sm text-gray-400 mb-6">
          <Users className="h-4 w-4 mr-1" />
          <span>{model.users.toLocaleString()} users</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
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
              variant={isSelected ? "default" : "outline"}
              className={
                isSelected
                  ? "bg-electric-blue hover:bg-electric-blue/90 text-white w-full"
                  : "border-gray-700 hover:bg-gray-700 text-white w-full"
              }
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onToggleSelect(model.id)
              }}
            >
              <Scale className="h-4 w-4 mr-1" />
              {isSelected ? "Selected" : "Compare"}
            </Button>
            <Button size="sm" className="bg-electric-blue hover:bg-electric-blue/90 text-white w-full" asChild>
              <Link href={`/models/${model.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

function CompareButton({ selectedModels }: { selectedModels: string[] }) {
  if (selectedModels.length === 0) return null

  return (
    <div className="mt-8 text-center">
      <Button
        size="lg"
        className="bg-electric-blue hover:bg-electric-blue/90"
        asChild
      >
        <Link href={`/compare?models=${selectedModels.join(",")}`}>
          <ArrowUpRight className="h-5 w-5 mr-2" />
          Compare Selected Models
        </Link>
      </Button>
    </div>
  )
}

export function FeaturedModelsClient({ models }: { models: Model[] }) {
  const [selectedModels, setSelectedModels] = useState<string[]>([])

  const toggleModelSelection = (modelId: string) => {
    setSelectedModels((prev: string[]) =>
      prev.includes(modelId) ? prev.filter((id: string) => id !== modelId) : [...prev, modelId]
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {models.map((model) => (
          <ModelCard
            key={model.id}
            model={model}
            isSelected={selectedModels.includes(model.id)}
            onToggleSelect={toggleModelSelection}
          />
        ))}
      </div>
      <CompareButton selectedModels={selectedModels} />
    </>
  )
} 