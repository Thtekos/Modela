import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SearchBar } from "@/components/search-bar"
import { MarketplaceGrid } from "@/components/marketplace-grid"
import { getAllModels } from "@/lib/models"
import Link from "next/link"

export const metadata: Metadata = {
  title: "AI Model Marketplace | Modela™",
  description: "Browse our collection of specialized AI models for various industries and use cases",
}

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Resolve searchParams asynchronously
  const resolvedSearchParams = await Promise.resolve(searchParams)
  const allModels = await getAllModels()
  const categories = [...new Set(allModels.map((model) => model.category))].sort()

  // Get search parameters with proper type handling
  const query = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : ''
  const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : ''
  const minPriceStr = typeof resolvedSearchParams.minPrice === 'string' ? resolvedSearchParams.minPrice : '0'
  const maxPriceStr = typeof resolvedSearchParams.maxPrice === 'string' ? resolvedSearchParams.maxPrice : '1000'

  // Filter models based on search query, category, and price range
  const filteredModels = allModels.filter((model) => {
    const matchesQuery =
      !query ||
      model.title.toLowerCase().includes(query.toLowerCase()) ||
      model.description.toLowerCase().includes(query.toLowerCase()) ||
      model.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))

    const matchesCategory = !category || model.category === category

    // Extract price as number from string like "$299/mo"
    const modelPrice = Number.parseInt(model.price.replace(/\D/g, ""))
    const minPrice = Number.parseInt(minPriceStr)
    const maxPrice = Number.parseInt(maxPriceStr)

    const matchesPrice = (!minPrice && !maxPrice) || (modelPrice >= minPrice && modelPrice <= maxPrice)

    return matchesQuery && matchesCategory && matchesPrice
  })

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-b from-charcoal to-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center max-w-3xl mx-auto mb-8">
            <h1 className="text-4xl font-bold mb-4 text-white">AI Model Marketplace</h1>
            <p className="text-xl text-gray-300">
              Browse our collection of specialized AI models for various industries and use cases
            </p>
            <div className="mt-6">
              <Link href="/list-model" passHref>
                <button className="bg-electric-blue hover:bg-electric-blue/90 text-white font-semibold py-2 px-6 rounded-md shadow">
                  List Your Model
                </button>
              </Link>
            </div>
          </div>

          <SearchBar initialQuery={query} categories={categories} selectedCategory={category} />

          {filteredModels.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-2 text-white">No models found</h2>
              <p className="text-gray-400 mb-8">
                We couldn't find any models matching your search criteria. Try adjusting your filters or search query.
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mt-8 mb-4">
                <p className="text-gray-300">
                  Showing <span className="font-medium text-white">{filteredModels.length}</span> models
                  {query && (
                    <>
                      {" "}
                      matching <span className="font-medium text-white">"{query}"</span>
                    </>
                  )}
                  {category && (
                    <>
                      {" "}
                      in <span className="font-medium text-white">{category}</span>
                    </>
                  )}
                </p>
              </div>
              <MarketplaceGrid models={filteredModels} />
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
