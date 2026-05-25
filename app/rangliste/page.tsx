import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable'
import type { LeaderboardEntry } from '@/types/database'

export const dynamic = 'force-dynamic'

export default async function RanglistePage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/onboarding')

  const { data: player } = await supabase
    .from('players')
    .select('id, group_id')
    .eq('user_id', user.id)
    .single()

  if (!player) redirect('/onboarding')

  const { data: players } = await supabase
    .from('players')
    .select('*')
    .eq('group_id', player.group_id)
    .order('total_points', { ascending: false })

  const playerIds = (players ?? []).map((p) => p.id)

  const { data: allTips } = await supabase
    .from('tips')
    .select('player_id, points_awarded')
    .in('player_id', playerIds)
    .not('points_awarded', 'is', null)

  const stats: Record<string, { exact: number; correct: number }> = {}
  for (const tip of allTips ?? []) {
    if (!stats[tip.player_id]) stats[tip.player_id] = { exact: 0, correct: 0 }
    if (tip.points_awarded === 3) stats[tip.player_id].exact++
    else if (tip.points_awarded === 2) stats[tip.player_id].correct++
    else if ((tip.points_awarded ?? 0) > 3) stats[tip.player_id].exact++
  }

  const entries: LeaderboardEntry[] = (players ?? []).map((p) => ({
    ...p,
    exact_count: stats[p.id]?.exact ?? 0,
    correct_count: stats[p.id]?.correct ?? 0,
  }))

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <LeaderboardTable
        initialEntries={entries}
        groupId={player.group_id}
        currentUserId={user.id}
        currentPlayerIds={[player.id]}
      />
    </div>
  )
}
