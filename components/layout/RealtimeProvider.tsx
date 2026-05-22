'use client'

import { createContext, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { RealtimeChannel } from '@supabase/supabase-js'

const RealtimeContext = createContext<null>(null)

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const channelRef = useRef<RealtimeChannel | null>(null)

  useEffect(() => {
    let supabase
    try { supabase = createClient() } catch { return }

    channelRef.current = supabase.channel('app-global')
    channelRef.current.subscribe()

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
      }
    }
  }, [])

  return (
    <RealtimeContext.Provider value={null}>
      {children}
    </RealtimeContext.Provider>
  )
}
