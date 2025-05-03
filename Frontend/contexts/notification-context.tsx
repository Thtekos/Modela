"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  timestamp: Date
  link?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "read" | "timestamp">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [initialized, setInitialized] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load notifications from localStorage on mount
      const storedNotifications = localStorage.getItem("modela_notifications")
      if (storedNotifications) {
        try {
          const parsed = JSON.parse(storedNotifications)
          // Convert string timestamps back to Date objects
          const withDates = parsed.map((n: any) => ({
            ...n,
            timestamp: new Date(n.timestamp),
          }))
          setNotifications(withDates)
        } catch (error) {
          console.error("Error parsing stored notifications:", error)
          // Clear potentially corrupted data
          localStorage.removeItem("modela_notifications")
        }
      }
      // Show welcome notification only once
      const hasWelcomeNotification = localStorage.getItem("modela_welcome_shown")
      if (!hasWelcomeNotification) {
        setNotifications((prev) => [
          ...prev,
          {
            id: "welcome",
            title: "Welcome to Modela™!",
            message: "Discover, deploy, and integrate specialized AI models for your business needs.",
            type: "info",
            read: false,
            timestamp: new Date(),
          },
        ])
        localStorage.setItem("modela_welcome_shown", "true")
      }
    }
    setInitialized(true)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Save notifications to localStorage whenever they change
      localStorage.setItem("modela_notifications", JSON.stringify(notifications))
    }
  }, [notifications])

  const addNotification = (notification: Omit<Notification, "id" | "read" | "timestamp">) => {
    let id = "static_id"
    if (typeof window !== 'undefined') {
      id = Math.random().toString(36).substring(2, 9)
    }
    setNotifications((prev) => [
      ...prev,
      {
        ...notification,
        id,
        timestamp: new Date(),
        read: false,
      },
    ])

    // Show browser notification if supported
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(notification.title, {
        body: notification.message,
      })
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

export function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const router = useRouter()

  const handleNotificationClick = (notification: Notification, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // First mark as read
    markAsRead(notification.id)

    // Close dropdown before navigation
    const closeDropdown = () => {
      const dropdownTrigger = document.querySelector('[data-state="open"]') as HTMLElement
      if (dropdownTrigger) {
        dropdownTrigger.click()
      }
    }

    // Then navigate if there's a link
    if (notification.link) {
      // Use setTimeout to ensure the dropdown closes before navigation
      setTimeout(() => {
        closeDropdown()
        router.push(notification.link || "/")
      }, 100)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative p-2 text-gray-300 hover:text-white">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-electric-blue text-white"
              variant="default"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-gray-800 border-gray-700 text-white">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-gray-300 hover:text-white"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                markAllAsRead()
              }}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />
        {notifications.length === 0 ? (
          <div className="py-4 px-2 text-center text-gray-400">
            <p>No notifications</p>
          </div>
        ) : (
          <div className="max-h-[300px] overflow-y-auto">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start p-3 cursor-pointer ${!notification.read ? "bg-gray-750" : ""}`}
                onClick={(e) => handleNotificationClick(notification, e)}
              >
                <div className="flex items-center w-full">
                  <span className="font-medium text-white">{notification.title}</span>
                  {!notification.read && <div className="ml-auto h-2 w-2 rounded-full bg-electric-blue"></div>}
                </div>
                <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                <span className="text-xs text-gray-500 mt-2">{new Date(notification.timestamp).toLocaleString()}</span>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
