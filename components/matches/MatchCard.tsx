'use client'

import { useState } from 'react'
import { TeamFlag } from './TeamFlag'
import { TipInput } from './TipInput'
import { TipDisplay } from './TipDisplay'
import { MatchStatusBadge } from './MatchStatusBadge'
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

export function MatchCard({ match, myTip, otherTips = [], showRoundLabel = false, compact = false }: MatchCardProps) {
  const locked = isLocked(match.kickoff_utc)
  const started = isKickoffPassed(match.kickoff_utc)
  const isFinished = match.status === 'FINISHED'
  const isLive = match.status === 'LIVE'
  const hasResult = match.home_score !== null && match.away_score !== null

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
      {showRoundLabel && (
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {ROUND_LABELS[match.round as keyof typeof ROUND_LABELS] ?? match.round}
          </span>
        </div>
      )}

      <div className="px-4 py-3">
        {/* Teams + score row */}
        <div className="flex items-center gap-2">
          {/* Home */}
          <div className="flex-1 min-w-0">
            <TeamFlag code={match.home_team} size="md" align="left" />
          </div>

          {/* Center: score or time */}
          <div className="flex flex-col items-center gap-0.5 shrink-0 min-w-[72px]">
            {hasResult ? (
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black text-gray-900 tabular-nums leading-none">{match.home_score}</span>
                <span className="text-lg font-bold text-gray-300">:</span>
                <span className="text-2xl font-black text-gray-900 tabular-nums leading-none">{match.away_score}</span>
              </div>
            ) : (
              <span className="text-sm font-bold text-gray-500 tabular-nums">{formatKickoff(match.kickoff_utc)}</span>
            )}
            {(isLive || isFinished) && <MatchStatusBadge status={match.status} />}
          </div>

          {/* Away */}
          <div className="flex-1 min-w-0 flex justify-end">
            <TeamFlag code={match.away_team} size="md" align="right" />
          </div>
        </div>

        {/* Tip row */}
        {!compact && (
          <div className="mt-3 pt-3 border-t border-gray-50">
            {locked ? (
              <div className="flex items-center justify-between">
                {myTip ? (
                  <>
                    <span className="text-xs text-gray-400">
                      Dein Tipp: <span className="font-bold text-gray-700">{myTip.home_tip}:{myTip.away_tip}</span>
                    </span>
                    {isFinished && myTip.points_awarded !== null && (
                      <PointsBadge points={myTip.points_awarded} />
                    )}
                  </>
                ) : (
                  <span className="text-xs text-gray-400">
                    {started ? 'Kein Tipp abgegeben' : 'Tipp-Abgabe gesperrt'}
                  </span>
                )}
              </div>
            ) : (
              <TipInput
                matchId={match.id}
                initialHome={myTip?.home_tip ?? 0}
                initialAway={myTip?.away_tip ?? 0}
              />
            )}
          </div>
        )}

        {/* Other players' tips */}
        {!compact && started && otherTips.length > 0 && (
          <TipDisplay tips={otherTips} matchStatus={match.status} />
        )}
      </div>
    </div>
  )
}

function PointsBadge({ points }: { points: number }) {
  if (points === 0) return <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-md">0 Pkt.</span>
  if (points <= 2) return <span className="text-xs font-semibold text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded-md">+{points} Pkt.</span>
  return <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">+{points} Pkt.</span>
}
