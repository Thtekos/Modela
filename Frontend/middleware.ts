import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define paths that are considered public (accessible without authentication)
  const isPublicPath =
    path === "/auth/login" ||
    path === "/auth/register" ||
    path === "/" ||
    path.startsWith("/marketplace") ||
    path.startsWith("/models") ||
    path.startsWith("/solutions") ||
    path.startsWith("/blog") ||
    path.startsWith("/tutorials") ||
    path.startsWith("/pricing") ||
    path.startsWith("/community")

  // Check if user is authenticated (has a valid session token)
  const token = request.cookies.get("modela_auth_token")
  let isAuthenticated = false

  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.value))
      isAuthenticated = !!decodedToken?.id && !!decodedToken?.email
    } catch (error) {
      // Invalid token format - clear the cookie
      const response = NextResponse.next()
      response.cookies.delete("modela_auth_token")
      return response
    }
  }

  // Redirect authenticated users away from login/register pages
  if (isAuthenticated && (path === "/auth/login" || path === "/auth/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Redirect unauthenticated users to login page if they try to access protected routes
  if (!isAuthenticated && !isPublicPath) {
    const redirectUrl = new URL("/auth/login", request.url)
    redirectUrl.searchParams.set("redirect", path)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

// Configure the middleware to run on all routes except static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
