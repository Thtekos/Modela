"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface SearchBarProps {
  initialQuery?: string
  categories?: string[]
  selectedCategory?: string
}

export function SearchBar({ initialQuery = "", categories = [], selectedCategory }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState(selectedCategory || "")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const router = useRouter()

  // Update local state when initialQuery changes (e.g., when navigating back)
  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  useEffect(() => {
    setCategory(selectedCategory || "")
  }, [selectedCategory])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (typeof window === 'undefined') return;
    // Get current URL and parse search params
    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search)

    // Update or remove the query parameter
    if (query.trim()) {
      searchParams.set("q", query.trim())
    } else {
      searchParams.delete("q")
    }

    // Update or remove the category parameter
    if (category) {
      searchParams.set("category", category)
    } else {
      searchParams.delete("category")
    }

    // Build the new URL
    let newUrl = "/marketplace"
    const params = searchParams.toString()
    if (params) {
      newUrl += `?${params}`
    }

    router.push(newUrl)
  }

  const handleCategoryChange = (cat: string) => {
    let newCategory = category === cat ? "" : cat;
    setCategory(newCategory);
    // Immediately update the URL and trigger filtering
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const searchParams = new URLSearchParams(url.search);
      // Update or remove the category parameter
      if (newCategory) {
        searchParams.set("category", newCategory);
      } else {
        searchParams.delete("category");
      }
      // Keep the query if present
      if (query.trim()) {
        searchParams.set("q", query.trim());
      } else {
        searchParams.delete("q");
      }
      let newUrl = "/marketplace";
      const params = searchParams.toString();
      if (params) {
        newUrl += `?${params}`;
      }
      router.push(newUrl);
    }
  }

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value)
  }

  const applyFilters = () => {
    if (typeof window === 'undefined') return;
    // Get current URL and parse search params
    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search)

    // Update or remove the query parameter
    if (query.trim()) {
      searchParams.set("q", query.trim())
    } else {
      searchParams.delete("q")
    }

    // Update or remove the category parameter
    if (category) {
      searchParams.set("category", category)
    } else {
      searchParams.delete("category")
    }

    // Add price range
    searchParams.set("minPrice", priceRange[0].toString())
    searchParams.set("maxPrice", priceRange[1].toString())

    // Build the new URL
    let newUrl = "/marketplace"
    const params = searchParams.toString()
    if (params) {
      newUrl += `?${params}`
    }

    router.push(newUrl)
  }

  // Default categories if none provided
  const defaultCategories = ["Legal", "Finance", "Healthcare", "Retail", "Manufacturing", "Education"]

  const categoriesToUse = categories.length > 0 ? categories : defaultCategories

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <form onSubmit={handleSearch} className="relative flex items-center w-full">
        <Input
          type="text"
          placeholder="Search for AI models..."
          className="bg-gray-800 border-gray-700 pl-10 pr-24 h-12 text-white placeholder:text-gray-400 focus-visible:ring-electric-blue w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="absolute left-3 h-5 w-5 text-gray-400" />
        <div className="absolute right-1 flex space-x-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-white">
                <Filter className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-gray-800 border-gray-700 text-white p-4">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Filters</h3>

                <div>
                  <h4 className="font-medium mb-2">Categories</h4>
                  <div className="space-y-2">
                    {categoriesToUse.map((cat) => (
                      <div key={cat} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${cat}`}
                          checked={category === cat}
                          onCheckedChange={() => handleCategoryChange(cat)}
                          className="border-gray-600 data-[state=checked]:bg-electric-blue"
                        />
                        <Label htmlFor={`category-${cat}`} className="text-gray-300 cursor-pointer">
                          {cat}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Price Range</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 1000]}
                      max={1000}
                      step={50}
                      value={priceRange}
                      onValueChange={handlePriceRangeChange}
                      className="my-6"
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  className="w-full bg-electric-blue hover:bg-electric-blue/90 text-white"
                  onClick={applyFilters}
                >
                  Apply Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button type="submit" className="bg-electric-blue hover:bg-electric-blue/90 text-white">
            Search
          </Button>
        </div>
      </form>

      {categoriesToUse.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            type="button"
            variant={!category ? "default" : "outline"}
            size="sm"
            className={
              !category
                ? "bg-electric-blue hover:bg-electric-blue/90 text-white"
                : "border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
            }
            onClick={() => {
              setCategory("");
              if (typeof window !== 'undefined') {
                const url = new URL(window.location.href);
                const searchParams = new URLSearchParams(url.search);
                searchParams.delete("category");
                // Keep the query if present
                if (query.trim()) {
                  searchParams.set("q", query.trim());
                } else {
                  searchParams.delete("q");
                }
                let newUrl = "/marketplace";
                const params = searchParams.toString();
                if (params) {
                  newUrl += `?${params}`;
                }
                router.push(newUrl);
              }
            }}
          >
            All Categories
          </Button>
          {categoriesToUse.map((cat) => (
            <Button
              key={cat}
              type="button"
              variant={category === cat ? "default" : "outline"}
              size="sm"
              className={
                category === cat
                  ? "bg-electric-blue hover:bg-electric-blue/90 text-white"
                  : "border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
              }
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
