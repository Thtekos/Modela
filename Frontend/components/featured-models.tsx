import { Suspense } from "react"
import { getAllModels } from "@/lib/models"
import { FeaturedModelsClient } from "./featured-models-client"
import type { Model } from "@/lib/models"

export async function FeaturedModels() {
  const models = await getAllModels()

  return (
    <div className="py-16 bg-gradient-to-b from-charcoal to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured AI Models</h2>
          <p className="text-xl text-gray-300">
            Discover our most popular and powerful AI models for various industries
          </p>
        </div>

        <Suspense fallback={
          <div className="text-center py-12">
            <p className="text-xl text-gray-300">Loading featured models...</p>
          </div>
        }>
          <FeaturedModelsClient models={models.slice(0, 3)} />
        </Suspense>
      </div>
    </div>
  )
}
