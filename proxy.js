import { NextResponse } from "next/server"

export function proxy(request) {
  const accept = request.headers.get("accept") || ""
  if (!accept.includes("text/markdown")) {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl

  // Map page routes to their markdown API equivalents
  if (pathname === "/" || pathname === "/news") {
    const url = request.nextUrl.clone()
    url.pathname = "/api/markdown/news"
    return NextResponse.rewrite(url)
  }

  const postMatch = pathname.match(/^\/news\/([^/]+)$/)
  if (postMatch) {
    const url = request.nextUrl.clone()
    url.pathname = `/api/markdown/news/${postMatch[1]}`
    return NextResponse.rewrite(url)
  }

  if (pathname === "/contact") {
    const url = request.nextUrl.clone()
    url.pathname = "/api/markdown/contact"
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/news", "/news/:slug*", "/contact"],
}
