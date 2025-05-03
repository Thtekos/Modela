import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ModelNotFound() {
  return (
    <>
      <Navbar />
      <div className="bg-charcoal min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Model Not Found</h1>
          <p className="text-xl text-gray-300 mb-8">
            The AI model you're looking for doesn't exist or may have been removed.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild className="bg-electric-blue hover:bg-electric-blue/90">
              <Link href="/marketplace">Browse Marketplace</Link>
            </Button>
            <Button asChild variant="outline" className="border-gray-600 hover:bg-gray-800">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
