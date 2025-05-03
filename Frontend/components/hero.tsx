"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <div className="bg-charcoal py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The <span className="text-electric-blue">App Store</span> for
            <br />
            B2B AI Models
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Find, train, and sell niche AI models tailored for specific industries. Get instant access to specialized
            models that solve your unique business challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-electric-blue hover:bg-electric-blue/90 text-white text-lg px-8 py-6"
              asChild
            >
              <Link href="/marketplace">
                Explore Marketplace <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800 text-lg px-8 py-6"
              asChild
            >
              <Link href="/list-model">List Your Model</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
