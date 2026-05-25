'use server'

import { createClient } from '@/lib/supabase/server'

function translateAuthError(msg: string): string {
  const m = msg.toLowerCase()
  if (
    m.includes('rate limit') ||
    m.includes('too many') ||
    m.includes('email sending') ||
    m.includes('email rate') ||
    m.includes('for security purposes') ||
    m.includes('once every')
  ) {
    return 'E-Mail-Limit erreicht (Supabase erlaubt max. 4/Stunde). Bitte 60 Sek. warten oder in 1 Std. erneut versuchen.'
  }
  if (m.includes('invalid email') || m.includes('invalid format')) {
    return 'Ungültige E-Mail-Adresse.'
  }
  if (m.includes('signup') && m.includes('disabled')) {
    return 'Neue Registrierungen sind aktuell deaktiviert.'
  }
  if (m.includes('otp') || m.includes('token') || m.includes('expired') || m.includes('invalid')) {
    return 'Ungültiger oder abgelaufener Code. Fordere einen neuen an.'
  }
  if (m.includes('network') || m.includes('fetch')) {
    return 'Netzwerkfehler. Bitte Internetverbindung prüfen.'
  }
  return msg
}

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
      options: { emailRedirectTo: `${appUrl}/api/auth/callback` },
    })
    if (error) return { error: translateAuthError(error.message) }
    return {}
  } catch (e) {
    return { error: e instanceof Error ? translateAuthError(e.message) : 'Unbekannter Fehler beim Senden.' }
  }
}

export async function verifyEmailOtp(email: string, token: string): Promise<{ error?: string }> {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: token.trim(),
      type: 'email',
    })
    if (error) return { error: translateAuthError(error.message) }
    return {}
  } catch (e) {
    return { error: e instanceof Error ? translateAuthError(e.message) : 'Code-Prüfung fehlgeschlagen.' }
  }
}
