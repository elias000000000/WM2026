'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TeamFlag } from './TeamFlag'
import { TipInput } from './TipInput'
import { TipDisplay } from './TipDisplay'
import { MatchStatusBadge } from './MatchStatusBadge'
import { Card } from '@/components/ui/Card'
import { ROUND_LABELS } from '@/types/match'
import { isLocked, isKickoffPassed } from '@/lib/lockout'
import { formatKickoff } from '@/lib/utils'
import type { DbMatch } from '@/types/match'
import type { DbPlayer, DbTip } from '@/types/database'

interface TipWithPlayer extends DbTip {
  player: DbPlayer
}

interface MatchCardProps {
  match: DbMatch
  myTip?: { id: string; home_tip: number; away_tip: number; points_awarded: number | null } | null
  otherTips?: TipWithPlayer[]
  showRoundLabel?: boolean
  compact?: boolean
}

export function MatchCard({
  match,
  myTip,
  otherTips = [],
  showRoundLabel = false,
  compact = false,
}: MatchCardProps) {
  const locked = isLocked(match.kickoff_utc)
  const started = isKickoffPassed(match.kickoff_utc)
  const isFinished = match.status === 'FINISHED'
  const isLive = match.status === 'LIVE'
  const [showComments, setShowComments] = useState(false)

  const hasResult = match.home_score !== null && match.away_score !== null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card padding={compact ? 'sm' : 'md'}>
        {showRoundLabel && (
          <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">
            {ROUND_LABELS[match.round]}
          </p>
        )}

        {/* Match row */}
        <div className="flex items-center gap-2">
          {/* Home team */}
          <div className="flex-1 min-w-0">
            <TeamFlag code={match.home_team} size="md" align="left" />
          </div>

          {/* Score / Time */}
          <div className="flex flex-col items-center shrink-0">
            {hasResult ? (
              <div className="flex items-center gap-1">
                <MatchStatusBadge status={match.status} className="mb-1" />
                <span className="text-xl font-bold text-gray-900 tabular-nums">
                  {match.home_score}
                </span>
                <span className="text-gray-400 font-bold">:</span>
                <span className="text-xl font-bold text-gray-900 tabular-nums">
                  {match.away_score}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-xs text-gray-400 font-medium">
                  {formatKickoff(match.kickoff_utc)}
                </span>
                {isLive && <MatchStatusBadge status="LIVE" />}
              </div>
            )}
          </div>

          {/* Away team */}
          <div className="flex-1 min-w-0 flex justify-end">
            <TeamFlag code={match.away_team} size="md" align="right" />
          </div>
        </div>

        {/* My tip or tip input */}
        {!compact && (
          <div className="mt-3">
            {locked ? (
              myTip ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Dein Tipp:</span>
                    <span className="text-sm font-bold text-gray-900 tabular-nums">
                      {myTip.home_tip}:{myTip.away_tip}
                    </span>
                  </div>
                  {isFinished && myTip.points_awarded !== null && (
                    <PointsBadge points={myTip.points_awarded} />
                  )}
                </div>
              ) : !started ? (
                <p className="text-xs text-gray-400 text-center py-1">
                  Tipp-Abgabe gesperrt (Anpfiff in &lt;30 Min.)
                </p>
              ) : (
                <p className="text-xs text-gray-400 text-center py-1">
                  Kein Tipp abgegeben
                </p>
              )
            ) : (
              <TipInput
                matchId={match.id}
                initialHome={myTip?.home_tip ?? 0}
                initialAway={myTip?.away_tip ?? 0}
              />
            )}
          </div>
        )}

        {/* Other players' tips after kickoff */}
        {!compact && started && otherTips.length > 0 && (
          <TipDisplay tips={otherTips} matchStatus={match.status} />
        )}
      </Card>
    </motion.div>
  )
}

function PointsBadge({ points }: { points: number }) {
  const config =
    points === 0
      ? { bg: 'bg-red-50 text-red-600 border-red-200', label: '0 Pkt.' }
      : points <= 2
      ? { bg: 'bg-yellow-50 text-yellow-700 border-yellow-200', label: `+${points} Pkt.` }
      : { bg: 'bg-green-50 text-green-700 border-green-200', label: `+${points} Pkt.` }

  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${config.bg}`}>
      {config.label}
    </span>
  )
}
