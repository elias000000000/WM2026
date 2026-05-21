import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/onboarding', '/api', '/gruppe']

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase env vars are missing, let every request through unblocked
  // so the app at least loads and shows a useful error on login attempt
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next()
  }

  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options })
        response = NextResponse.next({
          request: { headers: request.headers },
        })
        response.cookies.set({ name, value, ...options })
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: '', ...options })
        response = NextResponse.next({
          request: { headers: request.headers },
        })
        response.cookies.set({ name, value: '', ...options })
      },
    },
  })

  const { data: { user } } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const isPublicPath = PUBLIC_PATHS.some((p) => pathname.startsWith(p))

  // If visiting /gruppe/[code] without session, save code and redirect to onboarding
  if (pathname.startsWith('/gruppe/') && !user) {
    const code = pathname.split('/gruppe/')[1]
    const redirectUrl = new URL('/onboarding', request.url)
    response = NextResponse.redirect(redirectUrl)
    response.cookies.set('pending_invite_code', code, { path: '/', maxAge: 3600 })
    return response
  }

  // Redirect unauthenticated users to onboarding
  if (!user && !isPublicPath && pathname !== '/') {
    const redirectUrl = new URL('/onboarding', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect authenticated users away from onboarding (if they have a player profile)
  if (user && pathname === '/onboarding') {
    const { data: player } = await supabase
      .from('players')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (player) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
