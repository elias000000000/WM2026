'use client'

import { createContext, useContext, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { RealtimeChannel } from '@supabase/supabase-js'

const RealtimeContext = createContext<null>(null)

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const channelRef = useRef<RealtimeChannel | null>(null)

  useEffect(() => {
    const supabase = createClient()
    // Keep a single realtime connection alive; specific subscriptions
    // are created in individual components.
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
