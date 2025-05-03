"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface CategoryFilterProps {
  categories: string[]
  selectedCategory?: string
  searchQuery?: string
}

export function CategoryFilter({ categories, selectedCategory, searchQuery }: CategoryFilterProps) {
  const router = useRouter()

  const handleCategoryClick = (category: string) => {
    // If already selected, clear the filter
    if (category === selectedCategory) {
      if (searchQuery) {
        router.push(`/marketplace?q=${encodeURIComponent(searchQuery)}`)
      } else {
        router.push("/marketplace")
      }
    } else {
      // Apply the filter
      if (searchQuery) {
        router.push(`/marketplace?q=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(category)}`)
      } else {
        router.push(`/marketplace?category=${encodeURIComponent(category)}`)
      }
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mt-6">
      <Button
        variant={!selectedCategory ? "default" : "outline"}
        size="sm"
        className={
          !selectedCategory ? "bg-electric-blue hover:bg-electric-blue/90" : "border-gray-700 hover:bg-gray-700"
        }
        onClick={() => {
          if (searchQuery) {
            router.push(`/marketplace?q=${encodeURIComponent(searchQuery)}`)
          } else {
            router.push("/marketplace")
          }
        }}
      >
        All Categories
      </Button>

      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          className={
            selectedCategory === category
              ? "bg-electric-blue hover:bg-electric-blue/90"
              : "border-gray-700 hover:bg-gray-700"
          }
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
