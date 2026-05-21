import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''

  return NextResponse.json({
    NEXT_PUBLIC_SUPABASE_URL: supabaseUrl
      ? `${supabaseUrl.slice(0, 30)}...` // partial, not sensitive
      : 'FEHLT ❌',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: anonKey
      ? `${anonKey.slice(0, 12)}... (${anonKey.length} Zeichen)`
      : 'FEHLT ❌',
    NEXT_PUBLIC_APP_URL: appUrl || 'FEHLT (Fallback aktiv)',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
      ? 'gesetzt ✅'
      : 'FEHLT ❌',
    CRON_SECRET: process.env.CRON_SECRET ? 'gesetzt ✅' : 'FEHLT ❌',
    FOOTBALL_DATA_API_KEY: process.env.FOOTBALL_DATA_API_KEY
      ? 'gesetzt ✅'
      : 'FEHLT ❌',
    emailRedirectTo: `${appUrl || 'https://wm-2026-zeta.vercel.app'}/api/auth/callback`,
  })
}
