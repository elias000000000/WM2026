const BASE_URL = 'https://api.football-data.org/v4'

interface FDMatch {
  id: number
  status: string
  score: {
    fullTime: { home: number | null; away: number | null }
  }
  homeTeam: { name: string }
  awayTeam: { name: string }
}

interface FDResponse {
  matches: FDMatch[]
}

export async function fetchCompetitionMatches(competitionId: string): Promise<FDMatch[]> {
  const res = await fetch(
    `${BASE_URL}/competitions/${competitionId}/matches`,
    {
      headers: { 'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY! },
      next: { revalidate: 0 },
    }
  )

  if (!res.ok) {
    throw new Error(`football-data.org API error: ${res.status}`)
  }

  const data: FDResponse = await res.json()
  return data.matches
}

export function mapFDStatus(fdStatus: string): string {
  switch (fdStatus) {
    case 'SCHEDULED': return 'SCHEDULED'
    case 'TIMED': return 'SCHEDULED'
    case 'IN_PLAY': return 'LIVE'
    case 'PAUSED': return 'LIVE'
    case 'FINISHED': return 'FINISHED'
    case 'POSTPONED': return 'POSTPONED'
    default: return 'SCHEDULED'
  }
}
