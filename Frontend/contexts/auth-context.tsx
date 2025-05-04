"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { isValidEmail, isValidPassword, isValidName, ValidationError } from "@/lib/validation"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "admin" | "user"
  company?: string
  jobTitle?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = () => {
      try {
        if (typeof window !== 'undefined') {
          // Check for auth in localStorage
          const storedUser = localStorage.getItem("modela_user")
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            // Validate stored user data
            if (!parsedUser.id || !parsedUser.email || !parsedUser.role) {
              throw new AuthError('Invalid stored user data')
            }
            setUser(parsedUser)
          }

          // Also set a cookie for server-side auth checks
          if (storedUser) {
            const userData = JSON.parse(storedUser)
            const token = btoa(JSON.stringify({ id: userData.id, email: userData.email }))
            const isDevelopment = process.env.NODE_ENV === 'development'
            const cookieOptions = [
              `path=/`,
              `max-age=${60 * 60 * 24 * 7}`,
              `SameSite=Lax`,
              ...(isDevelopment ? [] : ['Secure'])
            ].join('; ')
            document.cookie = `modela_auth_token=${token}; ${cookieOptions}`
          }
        }
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem("modela_user")
        document.cookie = "modela_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Validate inputs
      if (!isValidEmail(email)) {
        throw new AuthError('Invalid email format')
      }
      if (!isValidPassword(password)) {
        throw new AuthError('Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character')
      }

      // For demo purposes, accept any credentials
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

      let mockUser: User
      if (typeof window !== 'undefined') {
        mockUser = {
          id: "user_" + Math.random().toString(36).substring(2, 9),
          name: email.split("@")[0] || "User",
          email: email,
          role: "admin",
          company: "Acme Inc.",
          jobTitle: "CTO",
        }
      } else {
        mockUser = {
          id: "user_static_id",
          name: email.split("@")[0] || "User",
          email: email,
          role: "admin",
          company: "Acme Inc.",
          jobTitle: "CTO",
        }
      }

      // Set user in state and localStorage
      setUser(mockUser)
      if (typeof window !== 'undefined') {
        localStorage.setItem("modela_user", JSON.stringify(mockUser))
      }

      // Set auth cookie for server-side checks
      const token = btoa(JSON.stringify({ id: mockUser.id, email: mockUser.email }))
      const isDevelopment = process.env.NODE_ENV === 'development'
      const cookieOptions = [
        `path=/`,
        `max-age=${60 * 60 * 24 * 7}`,
        `SameSite=Lax`,
        ...(isDevelopment ? [] : ['Secure'])
      ].join('; ')
      document.cookie = `modela_auth_token=${token}; ${cookieOptions}`

      // Get redirect URL from query params
      let redirectPath = null
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search)
        redirectPath = params.get("redirect")
      }

      // Navigate to dashboard or redirect path
      if (redirectPath && !redirectPath.includes("login") && !redirectPath.includes("register")) {
        router.push(redirectPath)
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      if (error instanceof ValidationError || error instanceof AuthError) {
        throw error
      }
      throw new AuthError('An unexpected error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Validate inputs
      if (!isValidName(name)) {
        throw new AuthError('Name is required')
      }
      if (!isValidEmail(email)) {
        throw new AuthError('Invalid email format')
      }
      if (!isValidPassword(password)) {
        throw new AuthError('Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character')
      }

      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

      let mockUser: User
      if (typeof window !== 'undefined') {
        mockUser = {
          id: "user_" + Math.random().toString(36).substring(2, 9),
          name,
          email,
          role: "user",
        }
      } else {
        mockUser = {
          id: "user_static_id",
          name,
          email,
          role: "user",
        }
      }

      // Set user in state and localStorage
      setUser(mockUser)
      if (typeof window !== 'undefined') {
        localStorage.setItem("modela_user", JSON.stringify(mockUser))
      }

      // Set auth cookie for server-side checks
      const token = btoa(JSON.stringify({ id: mockUser.id, email: mockUser.email }))
      const isDevelopment = process.env.NODE_ENV === 'development'
      const cookieOptions = [
        `path=/`,
        `max-age=${60 * 60 * 24 * 7}`,
        `SameSite=Lax`,
        ...(isDevelopment ? [] : ['Secure'])
      ].join('; ')
      document.cookie = `modela_auth_token=${token}; ${cookieOptions}`

      // Navigate to dashboard
      router.push("/dashboard")
    } catch (error) {
      if (error instanceof ValidationError || error instanceof AuthError) {
        throw error
      }
      throw new AuthError('An unexpected error occurred during registration')
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    try {
      setUser(null)
      if (typeof window !== 'undefined') {
        localStorage.removeItem("modela_user")
        // Remove auth cookie
        document.cookie = "modela_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      }
      router.push("/")
    } catch (error) {
      // Even if there's an error, ensure the user is logged out
      setUser(null)
      router.push("/")
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
