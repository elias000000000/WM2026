import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { MatchCard } from '@/components/matches/MatchCard'
import { ROUND_LABELS, ROUND_ORDER, type RoundKey } from '@/types/match'
import type { DbTip, DbPlayer } from '@/types/database'

export const revalidate = 30

interface TipWithPlayer extends DbTip {
  player: DbPlayer
}

export default async function SpielePage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/onboarding')

  const { data: player } = await supabase
    .from('players')
    .select('id, group_id')
    .eq('user_id', user.id)
    .single()

  if (!player) redirect('/onboarding')

  // All matches
  const { data: matches } = await supabase
    .from('matches')
    .select('*')
    .order('kickoff_utc', { ascending: true })

  if (!matches) return <div className="p-4 text-gray-500">Spiele konnten nicht geladen werden.</div>

  // My tips
  const { data: myTipsRaw } = await supabase
    .from('tips')
    .select('*')
    .eq('player_id', player.id)

  const myTips: Record<string, DbTip> = Object.fromEntries(
    (myTipsRaw ?? []).map((t) => [t.match_id, t])
  )

  // Other tips (only for matches that have started)
  const startedMatchIds = matches
    .filter((m) => new Date(m.kickoff_utc) < new Date())
    .map((m) => m.id)

  let otherTipsByMatch: Record<string, TipWithPlayer[]> = {}
  if (startedMatchIds.length > 0) {
    const { data: otherTips } = await supabase
      .from('tips')
      .select('*, player:players(id, username, color, avatar, group_id, total_points, user_id, created_at)')
      .in('match_id', startedMatchIds)
      .neq('player_id', player.id)
      .eq('player.group_id', player.group_id)

    for (const tip of otherTips ?? []) {
      if (!tip.player) continue
      if (!otherTipsByMatch[tip.match_id]) otherTipsByMatch[tip.match_id] = []
      otherTipsByMatch[tip.match_id].push(tip as TipWithPlayer)
    }
  }

  // Group matches by round in order
  const matchesByRound: Record<string, typeof matches> = {}
  for (const m of matches) {
    if (!matchesByRound[m.round]) matchesByRound[m.round] = []
    matchesByRound[m.round].push(m)
  }

  const orderedRounds = ROUND_ORDER.filter((r) => matchesByRound[r]?.length > 0)

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-black text-gray-900 mb-6">Alle Spiele</h1>

      <div className="flex flex-col gap-8">
        {orderedRounds.map((round) => (
          <section key={round}>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              {ROUND_LABELS[round as RoundKey]}
            </h2>
            <div className="flex flex-col gap-3">
              {matchesByRound[round].map((match) => {
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
                    otherTips={otherTipsByMatch[match.id] ?? []}
                  />
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
