"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, BarChart3, Key, CreditCard, Settings, HelpCircle, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "My Models",
    href: "/dashboard/models",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Usage Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "API Keys",
    href: "/dashboard/api-keys",
    icon: <Key className="h-5 w-5" />,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden sticky top-24">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-electric-blue flex items-center justify-center text-white font-bold mr-3">
            {user?.name ? getInitials(user.name) : "U"}
          </div>
          <div>
            <h3 className="font-bold text-white">{user?.name || "User"}</h3>
            <p className="text-sm text-gray-300">Enterprise Plan</p>
          </div>
        </div>
      </div>

      <nav className="p-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive ? "bg-electric-blue text-white" : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700 mt-4">
        <ul className="space-y-1">
          <li>
            <Link
              href="/dashboard/support"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
              <span>Help & Support</span>
            </Link>
          </li>
          <li>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={logout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span className="text-gray-300 group-hover:text-white">Sign Out</span>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  )
}
