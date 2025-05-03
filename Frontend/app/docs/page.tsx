import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DocsSidebar } from "@/components/docs/sidebar"
import { DocsContent } from "@/components/docs/content"

export const metadata: Metadata = {
  title: "API Documentation | Modela™",
  description: "Comprehensive documentation for the Modela™ API",
}

export default function DocsPage() {
  return (
    <>
      <Navbar />

      <div className="bg-charcoal min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-64 flex-shrink-0">
              <DocsSidebar />
            </div>
            <div className="flex-1">
              <DocsContent />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
