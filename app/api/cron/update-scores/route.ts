import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { fetchCompetitionMatches, mapFDStatus } from '@/lib/football-data'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const competitionId = process.env.FOOTBALL_DATA_COMPETITION_ID
  if (!competitionId) {
    return NextResponse.json({ error: 'No competition ID configured' }, { status: 500 })
  }

  try {
    const supabase = createServiceClient()
    const fdMatches = await fetchCompetitionMatches(competitionId)

    let updatedCount = 0

    for (const fdMatch of fdMatches) {
      const { data: dbMatch } = await supabase
        .from('matches')
        .select('id, status, home_score, away_score')
        .eq('api_match_id', fdMatch.id)
        .single()

      if (!dbMatch) continue

      const newStatus = mapFDStatus(fdMatch.status)
      const newHomeScore = fdMatch.score.fullTime.home
      const newAwayScore = fdMatch.score.fullTime.away

      const hasChanged =
        newStatus !== dbMatch.status ||
        newHomeScore !== dbMatch.home_score ||
        newAwayScore !== dbMatch.away_score

      if (hasChanged) {
        await supabase
          .from('matches')
          .update({
            status: newStatus,
            home_score: newHomeScore,
            away_score: newAwayScore,
            updated_at: new Date().toISOString(),
          })
          .eq('id', dbMatch.id)

        updatedCount++
      }
    }

    return NextResponse.json({ updated: updatedCount, total: fdMatches.length })
  } catch (error) {
    console.error('Cron update-scores error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
