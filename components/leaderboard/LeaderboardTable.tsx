'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LeaderboardRow } from './LeaderboardRow'
import { LiveIndicator } from './LiveIndicator'
import { createClient } from '@/lib/supabase/client'
import type { LeaderboardEntry } from '@/types/database'

interface LeaderboardTableProps {
  initialEntries: LeaderboardEntry[]
  groupId: string
  currentUserId: string
  currentPlayerIds: string[]
}

export function LeaderboardTable({
  initialEntries,
  groupId,
  currentUserId,
  currentPlayerIds,
}: LeaderboardTableProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(initialEntries)

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel(`leaderboard-${groupId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'players',
          filter: `group_id=eq.${groupId}`,
        },
        (payload) => {
          setEntries((prev) =>
            prev
              .map((e) =>
                e.id === payload.new.id
                  ? { ...e, total_points: payload.new.total_points }
                  : e
              )
              .sort((a, b) => b.total_points - a.total_points)
          )
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [groupId])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Rangliste</h2>
        <LiveIndicator />
      </div>

      <div className="flex flex-col gap-2">
        <AnimatePresence mode="popLayout">
          {entries.map((entry, index) => (
            <LeaderboardRow
              key={entry.id}
              entry={entry}
              rank={index + 1}
              isCurrentUser={currentPlayerIds.includes(entry.id)}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>

      {entries.length === 0 && (
        <p className="text-center text-gray-400 py-8">Noch keine Punkte vergeben.</p>
      )}
    </div>
  )
}
