import { FeaturedModels } from "@/components/featured-models"
import { AnimatedBackground } from "@/components/animated-background"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

/**
 * Home page component that serves as the landing page for Modela
 * Features an animated background, hero section, and featured models
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <AnimatedBackground />

        {/* Hero section */}
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 pt-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              <span className="text-white">The </span>
              <span className="text-electric-blue bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">App Store</span>
              <span className="text-white"> for</span>
              <br />
              <span className="text-white">B2B AI Models</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Find, train, and sell niche AI models tailored for specific industries.
              Get instant access to specialized models that solve your unique
              business challenges.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/marketplace"
                className="bg-gradient-to-r from-electric-blue to-blue-600 hover:from-electric-blue/90 hover:to-blue-600/90 text-white font-semibold py-4 px-8 rounded-md text-lg transition-all duration-300 shadow-lg hover:shadow-electric-blue/20"
              >
                Explore Marketplace
              </Link>
              <Link
                href="/list-model"
                className="bg-gray-800/50 hover:bg-gray-800/80 text-white font-semibold py-4 px-8 rounded-md text-lg border border-gray-700 transition-all duration-300 hover:border-electric-blue/50"
              >
                List Your Model
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-electric-blue"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </section>

        {/* Featured models section */}
        <FeaturedModels />

        {/* Benefits section */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Why Choose Modela?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Benefit cards with existing content but enhanced styling */}
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700 hover:border-electric-blue/50 transition-all duration-300 group">
                <div className="text-electric-blue mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Instant Integration</h3>
                <p className="text-gray-400">
                  Get up and running quickly with our standardized API interfaces and
                  comprehensive documentation.
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700 hover:border-electric-blue/50 transition-all duration-300 group">
                <div className="text-electric-blue mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Enterprise-Grade Security</h3>
                <p className="text-gray-400">
                  Bank-level encryption, SOC 2 compliance, and comprehensive audit
                  logs keep your data safe.
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700 hover:border-electric-blue/50 transition-all duration-300 group">
                <div className="text-electric-blue mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Expert Support</h3>
                <p className="text-gray-400">
                  Get dedicated support from AI experts who understand your industry
                  and use case.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
