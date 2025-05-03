"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"

export function AuthDebug() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const [cookieExists, setCookieExists] = useState(false)
  const [localStorageExists, setLocalStorageExists] = useState(false)

  useEffect(() => {
    // Check for auth cookie
    const hasCookie = document.cookie.split(";").some((item) => item.trim().startsWith("modela_auth_token="))
    setCookieExists(hasCookie)

    // Check for localStorage
    const hasLocalStorage = !!localStorage.getItem("modela_user")
    setLocalStorageExists(hasLocalStorage)
  }, [])

  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg shadow-lg z-50 text-xs max-w-xs">
      <h3 className="font-bold mb-2">Auth Debug Info</h3>
      <ul className="space-y-1">
        <li>isLoading: {isLoading ? "true" : "false"}</li>
        <li>isAuthenticated: {isAuthenticated ? "true" : "false"}</li>
        <li>Cookie exists: {cookieExists ? "true" : "false"}</li>
        <li>LocalStorage exists: {localStorageExists ? "true" : "false"}</li>
        <li>User: {user ? JSON.stringify(user.email) : "null"}</li>
      </ul>
    </div>
  )
}
