"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { NotificationBell } from "@/contexts/notification-context"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const pathname = usePathname()

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMenuOpen(false)
    }

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isMenuOpen])

  const handleMenuToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setIsMenuOpen(!isMenuOpen)
    },
    [isMenuOpen],
  )

  const handleLogout = useCallback(() => {
    setIsMenuOpen(false)
    logout()
  }, [logout])

  return (
    <nav className="sticky top-0 z-[100] bg-charcoal/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">
                Modela<span className="text-electric-blue">™</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-6">
              <NavLink href="/marketplace">Marketplace</NavLink>
              {isAuthenticated && <NavLink href="/dashboard">Dashboard</NavLink>}

              {/* Solutions dropdown */}
              <div className="relative group">
                <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-800 hover:text-white">
                  Solutions
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-1">
                    <DropdownLink href="/solutions/legal">Legal</DropdownLink>
                    <DropdownLink href="/solutions/finance">Finance</DropdownLink>
                    <DropdownLink href="/solutions/healthcare">Healthcare</DropdownLink>
                    <DropdownLink href="/solutions/retail">Retail</DropdownLink>
                    <DropdownLink href="/solutions/manufacturing">Manufacturing</DropdownLink>
                    <DropdownLink href="/solutions/education">Education</DropdownLink>
                  </div>
                </div>
              </div>

              {/* Resources dropdown */}
              <div className="relative group">
                <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-800 hover:text-white">
                  Resources
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-1">
                    <DropdownLink href="/docs">Documentation</DropdownLink>
                    <DropdownLink href="/tutorials">Tutorials</DropdownLink>
                    <DropdownLink href="/community">Community Forum</DropdownLink>
                    <DropdownLink href="/blog">Blog</DropdownLink>
                  </div>
                </div>
              </div>
              <NavLink href="/pricing">Pricing</NavLink>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated && <NotificationBell />}

            {isAuthenticated ? (
              <>
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800" asChild>
                  <Link href="/dashboard">
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-800 bg-transparent text-white hover:text-white"
                  onClick={logout}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800" asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white" asChild>
                  <Link href="/auth/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            {isAuthenticated && <NotificationBell />}
            <button
              onClick={handleMenuToggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none ml-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-gray-900 border-b border-gray-800 shadow-lg z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/marketplace">Marketplace</MobileNavLink>
            {isAuthenticated && <MobileNavLink href="/dashboard">Dashboard</MobileNavLink>}

            {/* Mobile Solutions dropdown */}
            <div>
              <button
                className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsSolutionsOpen(!isSolutionsOpen)
                  setIsResourcesOpen(false)
                }}
              >
                Solutions
                <ChevronDown className={`h-4 w-4 transition-transform ${isSolutionsOpen ? "rotate-180" : ""}`} />
              </button>

              {isSolutionsOpen && (
                <div className="pl-4 py-2 space-y-1">
                  <MobileDropdownLink href="/solutions/legal">Legal</MobileDropdownLink>
                  <MobileDropdownLink href="/solutions/finance">Finance</MobileDropdownLink>
                  <MobileDropdownLink href="/solutions/healthcare">Healthcare</MobileDropdownLink>
                  <MobileDropdownLink href="/solutions/retail">Retail</MobileDropdownLink>
                  <MobileDropdownLink href="/solutions/manufacturing">Manufacturing</MobileDropdownLink>
                  <MobileDropdownLink href="/solutions/education">Education</MobileDropdownLink>
                </div>
              )}
            </div>

            {/* Mobile Resources dropdown */}
            <div>
              <button
                className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsResourcesOpen(!isResourcesOpen)
                  setIsSolutionsOpen(false)
                }}
              >
                Resources
                <ChevronDown className={`h-4 w-4 transition-transform ${isResourcesOpen ? "rotate-180" : ""}`} />
              </button>

              {isResourcesOpen && (
                <div className="pl-4 py-2 space-y-1">
                  <MobileDropdownLink href="/docs">Documentation</MobileDropdownLink>
                  <MobileDropdownLink href="/tutorials">Tutorials</MobileDropdownLink>
                  <MobileDropdownLink href="/community">Community Forum</MobileDropdownLink>
                  <MobileDropdownLink href="/blog">Blog</MobileDropdownLink>
                </div>
              )}
            </div>

            <MobileNavLink href="/pricing">Pricing</MobileNavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-800">
            <div className="flex items-center px-5">
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  className="w-full justify-center border-gray-700 hover:bg-gray-800 bg-transparent text-white hover:text-white"
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-center text-gray-300 hover:text-white hover:bg-gray-800"
                  asChild
                >
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              )}
            </div>
            {!isAuthenticated && (
              <div className="mt-3 px-5 pb-3">
                <Button className="w-full bg-electric-blue hover:bg-electric-blue/90 text-white" asChild>
                  <Link href="/auth/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname?.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={`px-3 py-2 text-sm font-medium rounded-md ${
        isActive ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
      }`}
    >
      {children}
    </Link>
  )
}

function DropdownLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname?.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={`block px-4 py-2 text-sm ${
        isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname?.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
      }`}
    >
      {children}
    </Link>
  )
}

function MobileDropdownLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname?.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded-md text-sm ${
        isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {children}
    </Link>
  )
}
