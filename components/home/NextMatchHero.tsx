'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TeamFlag } from '@/components/matches/TeamFlag'
import { TipInput } from '@/components/matches/TipInput'
import { MatchStatusBadge } from '@/components/matches/MatchStatusBadge'
import { CountdownTimer } from './CountdownTimer'
import { ROUND_LABELS } from '@/types/match'
import { isLocked } from '@/lib/lockout'
import type { DbMatch } from '@/types/match'

interface NextMatchHeroProps {
  match: DbMatch
  myTip?: { id: string; home_tip: number; away_tip: number; points_awarded: number | null } | null
}

export function NextMatchHero({ match, myTip }: NextMatchHeroProps) {
  const [locked, setLocked] = useState(isLocked(match.kickoff_utc))
  const hasResult = match.home_score !== null && match.away_score !== null
  const isLive = match.status === 'LIVE'

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-brand-blue to-blue-800 rounded-3xl p-5 text-white shadow-lg"
    >
      {/* Round label */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide">
          {ROUND_LABELS[match.round]}
        </span>
        {isLive && <MatchStatusBadge status="LIVE" />}
      </div>

      {/* Teams and score */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex-1">
          <TeamFlag code={match.home_team} size="lg" namePosition="below" align="center" />
        </div>

        <div className="text-center shrink-0">
          {hasResult ? (
            <div className="text-4xl font-black tabular-nums">
              {match.home_score}:{match.away_score}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-black opacity-60">vs</span>
              {!locked && !isLive && (
                <CountdownTimer
                  kickoffUtc={match.kickoff_utc}
                  onLocked={() => setLocked(true)}
                  className="text-xs text-blue-200"
                />
              )}
            </div>
          )}
        </div>

        <div className="flex-1">
          <TeamFlag code={match.away_team} size="lg" namePosition="below" align="center" />
        </div>
      </div>

      {/* Tip section */}
      {!hasResult && !isLive && (
        <div className="bg-white/10 rounded-2xl p-3">
          {locked ? (
            myTip ? (
              <div className="text-center">
                <p className="text-blue-200 text-xs mb-1">Dein Tipp</p>
                <p className="text-white text-2xl font-bold tabular-nums">
                  {myTip.home_tip}:{myTip.away_tip}
                </p>
              </div>
            ) : (
              <p className="text-center text-blue-200 text-sm">Kein Tipp abgegeben</p>
            )
          ) : (
            <div>
              <p className="text-blue-200 text-xs mb-2 text-center">Dein Tipp</p>
              <div className="[&_button]:bg-white/20 [&_button]:text-white [&_span]:text-white">
                <TipInput
                  matchId={match.id}
                  initialHome={myTip?.home_tip ?? 0}
                  initialAway={myTip?.away_tip ?? 0}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}
