'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TeamFlag } from '@/components/matches/TeamFlag'
import { TipInput } from '@/components/matches/TipInput'
import { MatchStatusBadge } from '@/components/matches/MatchStatusBadge'
import { CountdownTimer } from './CountdownTimer'
import { ROUND_LABELS } from '@/types/match'
import { isLocked } from '@/lib/lockout'
import { formatKickoff } from '@/lib/utils'
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
      className="bg-[#0F1B4C] rounded-2xl overflow-hidden shadow-lg"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <span className="text-[11px] font-bold text-blue-300 uppercase tracking-widest">
          {ROUND_LABELS[match.round as keyof typeof ROUND_LABELS] ?? match.round}
        </span>
        {isLive ? (
          <MatchStatusBadge status="LIVE" />
        ) : (
          <span className="text-[11px] text-blue-300">{formatKickoff(match.kickoff_utc)}</span>
        )}
      </div>

      {/* Teams */}
      <div className="flex items-center px-4 py-3 gap-3">
        <div className="flex-1">
          <TeamFlag code={match.home_team} size="lg" namePosition="below" align="center" />
        </div>

        <div className="shrink-0 flex flex-col items-center gap-1">
          {hasResult ? (
            <span className="text-4xl font-black text-white tabular-nums tracking-tight">
              {match.home_score} : {match.away_score}
            </span>
          ) : (
            <>
              <span className="text-3xl font-black text-white/40">—</span>
              {!locked && !isLive && (
                <CountdownTimer
                  kickoffUtc={match.kickoff_utc}
                  onLocked={() => setLocked(true)}
                  className="text-[11px] text-blue-300"
                />
              )}
            </>
          )}
        </div>

        <div className="flex-1">
          <TeamFlag code={match.away_team} size="lg" namePosition="below" align="center" />
        </div>
      </div>

      {/* Tip strip */}
      {!hasResult && !isLive && (
        <div className="mx-4 mb-4 bg-white/10 rounded-xl p-3">
          {locked ? (
            myTip ? (
              <div className="text-center">
                <p className="text-blue-300 text-xs mb-0.5">Dein Tipp</p>
                <p className="text-white text-2xl font-black tabular-nums">{myTip.home_tip} : {myTip.away_tip}</p>
              </div>
            ) : (
              <p className="text-center text-blue-300 text-sm">Kein Tipp abgegeben</p>
            )
          ) : (
            <div>
              <p className="text-blue-300 text-xs mb-2 text-center">Dein Tipp</p>
              <div className="[&_button]:bg-white/20 [&_button]:text-white [&_span]:text-white">
                <TipInput matchId={match.id} initialHome={myTip?.home_tip ?? 0} initialAway={myTip?.away_tip ?? 0} />
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}
