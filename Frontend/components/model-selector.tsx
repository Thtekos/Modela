"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import type { Model } from "@/lib/models"

export function ModelSelector({
  models,
  onSelect,
  onCancel,
}: {
  models: Model[]
  onSelect: (model: Model) => void
  onCancel: () => void
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(models.map((model) => model.category)))

  const filteredModels = models.filter((model) => {
    const matchesSearch =
      model.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory ? model.category === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search models..."
            className="pl-10 bg-gray-900 border-gray-700 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className={`cursor-pointer ${
              selectedCategory === null
                ? "bg-electric-blue text-white hover:bg-electric-blue/90"
                : "bg-gray-900 text-gray-300 border-gray-700 hover:bg-gray-800"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedCategory === category
                  ? "bg-electric-blue text-white hover:bg-electric-blue/90"
                  : "bg-gray-900 text-gray-300 border-gray-700 hover:bg-gray-800"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2">
        {filteredModels.length > 0 ? (
          filteredModels.map((model) => (
            <div
              key={model.id}
              className="flex items-center p-4 bg-gray-900 rounded-lg border border-gray-700 hover:border-gray-600 cursor-pointer"
              onClick={() => onSelect(model)}
            >
              <div className="w-12 h-12 rounded bg-gray-800 flex items-center justify-center mr-4">
                <img
                  src={model.image || "/placeholder.svg?height=48&width=48"}
                  alt={model.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">{model.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-1">{model.description}</p>
              </div>
              <Badge variant="outline" className="ml-2 bg-gray-800 text-gray-300 border-gray-700">
                {model.category}
              </Badge>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">No models found matching your search criteria.</div>
        )}
      </div>

      <div className="flex justify-end mt-6 gap-2">
        <Button variant="outline" className="border-gray-700 hover:bg-gray-800 text-white" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
