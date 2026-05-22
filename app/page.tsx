import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { NextMatchHero } from '@/components/home/NextMatchHero'
import { RecentResults } from '@/components/home/RecentResults'
import type { DbTip } from '@/types/database'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/onboarding')

  const { data: player } = await supabase
    .from('players')
    .select('id, group_id, username, color, avatar, total_points')
    .eq('user_id', user.id)
    .single()

  if (!player) redirect('/onboarding')

  // Next upcoming match
  const { data: nextMatch } = await supabase
    .from('matches')
    .select('*')
    .in('status', ['SCHEDULED', 'LIVE'])
    .order('kickoff_utc', { ascending: true })
    .limit(1)
    .single()

  // Recent finished matches (last 3)
  const { data: recentMatches } = await supabase
    .from('matches')
    .select('*')
    .eq('status', 'FINISHED')
    .order('kickoff_utc', { ascending: false })
    .limit(3)

  // My tips for relevant matches
  const matchIds = [
    ...(nextMatch ? [nextMatch.id] : []),
    ...(recentMatches?.map((m) => m.id) ?? []),
  ]

  let tipsByMatchId: Record<string, DbTip> = {}
  if (matchIds.length > 0) {
    const { data: tips } = await supabase
      .from('tips')
      .select('*')
      .eq('player_id', player.id)
      .in('match_id', matchIds)

    tipsByMatchId = Object.fromEntries((tips ?? []).map((t) => [t.match_id, t]))
  }

  // My tip for next match
  const nextMatchTip = nextMatch ? (tipsByMatchId[nextMatch.id] ?? null) : null

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto flex flex-col gap-6">
      {/* Greeting */}
      <div>
        <p className="text-gray-500 text-sm">Willkommen zurück,</p>
        <h1 className="text-2xl font-black text-gray-900">{player.username}</h1>
      </div>

      {/* Next match hero */}
      {nextMatch ? (
        <NextMatchHero
          match={nextMatch}
          myTip={
            nextMatchTip
              ? {
                  id: nextMatchTip.id,
                  home_tip: nextMatchTip.home_tip,
                  away_tip: nextMatchTip.away_tip,
                  points_awarded: nextMatchTip.points_awarded,
                }
              : null
          }
        />
      ) : (
        <div className="bg-gray-50 rounded-3xl p-6 text-center">
          <p className="text-gray-500">Keine weiteren Spiele geplant.</p>
        </div>
      )}

      {/* Recent results */}
      {recentMatches && recentMatches.length > 0 && (
        <RecentResults
          matches={recentMatches}
          myTips={tipsByMatchId}
        />
      )}
    </div>
  )
}
