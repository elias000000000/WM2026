import { MatchCard } from '@/components/matches/MatchCard'
import type { DbMatch } from '@/types/match'
import type { DbTip } from '@/types/database'

interface RecentResultsProps {
  matches: DbMatch[]
  myTips: Record<string, DbTip>
}

export function RecentResults({ matches, myTips }: RecentResultsProps) {
  if (matches.length === 0) return null

  return (
    <section>
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Zuletzt gespielt
      </h2>
      <div className="flex flex-col gap-3">
        {matches.map((match) => {
          const tip = myTips[match.id]
          return (
            <MatchCard
              key={match.id}
              match={match}
              myTip={tip ? {
                id: tip.id,
                home_tip: tip.home_tip,
                away_tip: tip.away_tip,
                points_awarded: tip.points_awarded,
              } : null}
              compact
            />
          )
        })}
      </div>
    </section>
  )
}
