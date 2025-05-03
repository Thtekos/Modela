"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export function DocsSidebar() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "getting-started": true,
    "api-reference": true,
    guides: true,
  })

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden sticky top-24">
      <div className="p-4 border-b border-gray-700">
        <h2 className="font-bold text-lg">Documentation</h2>
      </div>

      <nav className="p-2">
        <ul className="space-y-1">
          {/* Getting Started Section */}
          <li>
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleSection("getting-started")
              }}
              className="flex items-center justify-between w-full px-3 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <span className="font-medium">Getting Started</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${openSections["getting-started"] ? "rotate-180" : ""}`}
              />
            </button>
            {openSections["getting-started"] && (
              <ul className="mt-1 ml-4 space-y-1">
                <li>
                  <Link
                    href="/docs#introduction"
                    className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                  >
                    Introduction
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs#authentication"
                    className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                  >
                    Authentication
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs#quickstart"
                    className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                  >
                    Quickstart
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs#sdks"
                    className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                  >
                    SDKs & Libraries
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* API Reference Section */}
          <li>
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleSection("api-reference")
              }}
              className="flex items-center justify-between w-full px-3 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <span className="font-medium">API Reference</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${openSections["api-reference"] ? "rotate-180" : ""}`}
              />
            </button>
            {openSections["api-reference"] && (
              <ul className="mt-1 ml-4 space-y-1">
                <li>
                  <Link
                    href="/docs#models"
                    className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                  >
                    Models
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs#completions"
                    className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                  >
                    Completions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs#embeddings"
                    className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                  >
                    Embeddings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs#fine-tuning"
                    className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                  >
                    Fine-tuning
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs#files"
                    className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                  >
                    Files
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs#batch-processing"
                    className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                  >
                    Batch Processing
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Guides Section */}
          <li>
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleSection("guides")
              }}
              className="flex items-center justify-between w-full px-3 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <span className="font-medium">Guides</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections["guides"] ? "rotate-180" : ""}`} />
            </button>
            {openSections["guides"] && (
              <ul className="mt-1 ml-4 space-y-1">
                <li>
                  <Link
                    href="/docs#best-practices"
                    className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                  >
                    Best Practices
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs#rate-limits"
                    className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                  >
                    Rate Limits
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs#error-handling"
                    className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                  >
                    Error Handling
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  )
}
