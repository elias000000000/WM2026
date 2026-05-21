'use server'

import { createClient } from '@/lib/supabase/server'

export async function sendMagicLink(email: string): Promise<{ error?: string }> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return { error: 'App ist nicht konfiguriert. Bitte den Administrator kontaktieren.' }
    }

    const supabase = createClient()
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://wm-2026-zeta.vercel.app'

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${appUrl}/api/auth/callback`,
      },
    })

    if (error) return { error: error.message }
    return {}
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Unbekannter Fehler beim Senden.' }
  }
}
