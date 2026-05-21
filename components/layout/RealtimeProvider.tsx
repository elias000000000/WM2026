'use client'

import { createContext, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { SupabaseClient } from '@supabase/supabase-js'

const RealtimeContext = createContext<null>(null)

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const clientRef = useRef<SupabaseClient | null>(null)

  useEffect(() => {
    try {
      const supabase = createClient()
      clientRef.current = supabase
      supabase.channel('app-global').subscribe()
    } catch {
      // Supabase not configured client-side — realtime disabled
    }

    return () => {
      if (clientRef.current) {
        clientRef.current.removeAllChannels()
      }
    }
  }, [])

  return (
    <RealtimeContext.Provider value={null}>
      {children}
    </RealtimeContext.Provider>
  )
}
