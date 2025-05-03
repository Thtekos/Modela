import type { ReactNode } from "react"
import { Navbar } from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Footer } from "@/components/footer"
import { AuthCheck } from "@/components/auth-check"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <AuthCheck>
        <div className="bg-charcoal min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-64 flex-shrink-0">
                <DashboardSidebar />
              </div>
              <div className="flex-1">{children}</div>
            </div>
          </div>
        </div>
      </AuthCheck>
      <Footer />
    </>
  )
}
