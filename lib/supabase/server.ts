import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { CookieOptions } from '@supabase/ssr'

function getConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL oder NEXT_PUBLIC_SUPABASE_ANON_KEY fehlt')
  }
  if (!url.startsWith('https://') && !url.startsWith('http://')) {
    throw new Error(`NEXT_PUBLIC_SUPABASE_URL ist ungültig: "${url}" — muss mit https:// beginnen`)
  }
  return { url, anon }
}

function cookieHandlers() {
  const cookieStore = cookies()
  return {
    get(name: string) {
      return cookieStore.get(name)?.value
    },
    set(name: string, value: string, options: CookieOptions) {
      try { cookieStore.set({ name, value, ...options }) } catch { /* Server Component */ }
    },
    remove(name: string, options: CookieOptions) {
      try { cookieStore.set({ name, value: '', ...options }) } catch { /* Server Component */ }
    },
  }
}

export function createClient() {
  const { url, anon } = getConfig()
  return createSupabaseServerClient(url, anon, { cookies: cookieHandlers() })
}

export function createServiceClient() {
  const { url } = getConfig()
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY fehlt')
  return createSupabaseServerClient(url, serviceKey, {
    cookies: { get: () => undefined, set: () => {}, remove: () => {} },
    auth: { persistSession: false },
  })
}
