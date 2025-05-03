"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  // Set isClient to true once component mounts (client-side only)
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Only check auth on client-side
  useEffect(() => {
    if (isClient && !isLoading && !isAuthenticated) {
      // Only redirect if we're sure the user is not authenticated
      router.push("/auth/login")
    }
  }, [isClient, isLoading, isAuthenticated, router])

  // Show loading state while checking auth
  if (isLoading || !isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-charcoal">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-blue"></div>
      </div>
    )
  }

  // If authenticated, render children
  if (isAuthenticated) {
    return <>{children}</>
  }

  // If not authenticated and not loading, show nothing (redirect will happen)
  return (
    <div className="flex items-center justify-center min-h-screen bg-charcoal">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-blue"></div>
    </div>
  )
}
