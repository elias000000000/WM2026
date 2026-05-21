import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/onboarding', '/api', '/gruppe']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const isPublicPath = PUBLIC_PATHS.some((p) => pathname.startsWith(p))

  // Detect Supabase session via cookie — no network calls, no crash risk
  const hasSession = request.cookies.getAll().some(
    (c) => c.name.startsWith('sb-') && c.name.includes('auth-token')
  )

  // Save invite code before redirecting to onboarding
  if (pathname.startsWith('/gruppe/') && !hasSession) {
    const code = pathname.split('/gruppe/')[1]
    const response = NextResponse.redirect(new URL('/onboarding', request.url))
    response.cookies.set('pending_invite_code', code, { path: '/', maxAge: 3600 })
    return response
  }

  // Redirect unauthenticated users to onboarding
  if (!hasSession && !isPublicPath && pathname !== '/') {
    return NextResponse.redirect(new URL('/onboarding', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
