'use client'

import { motion } from 'framer-motion'
import { Avatar } from '@/components/ui/Avatar'
import type { LeaderboardEntry } from '@/types/database'

interface LeaderboardRowProps {
  entry: LeaderboardEntry
  rank: number
  isCurrentUser: boolean
  index: number
}

export function LeaderboardRow({ entry, rank, isCurrentUser, index }: LeaderboardRowProps) {
  const rankColors: Record<number, string> = {
    1: 'text-yellow-500',
    2: 'text-gray-400',
    3: 'text-amber-600',
  }

  const rankBg: Record<number, string> = {
    1: 'bg-yellow-50 border-yellow-200',
    2: 'bg-gray-50 border-gray-200',
    3: 'bg-amber-50 border-amber-200',
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`flex items-center gap-3 p-3 rounded-2xl border transition-colors ${
        isCurrentUser
          ? 'bg-blue-50 border-blue-200'
          : rank <= 3
          ? rankBg[rank]
          : 'bg-white border-gray-100'
      }`}
    >
      {/* Rank */}
      <span
        className={`w-7 text-center text-base font-black shrink-0 ${
          rankColors[rank] ?? 'text-gray-400'
        }`}
      >
        {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : rank}
      </span>

      {/* Avatar */}
      <Avatar
        username={entry.username}
        color={entry.color}
        avatar={entry.avatar}
        size="md"
      />

      {/* Name */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate">
          {entry.username}
          {isCurrentUser && (
            <span className="ml-1.5 text-xs text-brand-blue font-medium">(Du)</span>
          )}
        </p>
        <p className="text-xs text-gray-400 tabular-nums">
          {entry.exact_count}× exakt · {entry.correct_count}× Sieger
        </p>
      </div>

      {/* Points */}
      <div className="text-right shrink-0">
        <p className="text-xl font-black text-gray-900 tabular-nums">{entry.total_points}</p>
        <p className="text-xs text-gray-400">Pkt.</p>
      </div>
    </motion.div>
  )
}
