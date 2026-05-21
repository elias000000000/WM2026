export type MatchStatus = 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'POSTPONED'

export type RoundKey =
  | 'GROUP_A' | 'GROUP_B' | 'GROUP_C' | 'GROUP_D'
  | 'GROUP_E' | 'GROUP_F' | 'GROUP_G' | 'GROUP_H'
  | 'GROUP_I' | 'GROUP_J' | 'GROUP_K' | 'GROUP_L'
  | 'ROUND_OF_32' | 'ROUND_OF_16' | 'QUARTER_FINAL'
  | 'SEMI_FINAL' | 'THIRD_PLACE' | 'FINAL'

export const ROUND_MULTIPLIERS: Record<RoundKey, number> = {
  GROUP_A: 1, GROUP_B: 1, GROUP_C: 1, GROUP_D: 1,
  GROUP_E: 1, GROUP_F: 1, GROUP_G: 1, GROUP_H: 1,
  GROUP_I: 1, GROUP_J: 1, GROUP_K: 1, GROUP_L: 1,
  ROUND_OF_32: 1, ROUND_OF_16: 1, QUARTER_FINAL: 1,
  SEMI_FINAL: 2, THIRD_PLACE: 1, FINAL: 3,
}

export const ROUND_LABELS: Record<RoundKey, string> = {
  GROUP_A: 'Gruppe A', GROUP_B: 'Gruppe B', GROUP_C: 'Gruppe C', GROUP_D: 'Gruppe D',
  GROUP_E: 'Gruppe E', GROUP_F: 'Gruppe F', GROUP_G: 'Gruppe G', GROUP_H: 'Gruppe H',
  GROUP_I: 'Gruppe I', GROUP_J: 'Gruppe J', GROUP_K: 'Gruppe K', GROUP_L: 'Gruppe L',
  ROUND_OF_32: 'Runde der letzten 32', ROUND_OF_16: 'Achtelfinale',
  QUARTER_FINAL: 'Viertelfinale', SEMI_FINAL: 'Halbfinale',
  THIRD_PLACE: 'Spiel um Platz 3', FINAL: 'Finale',
}

export const ROUND_ORDER: RoundKey[] = [
  'GROUP_A', 'GROUP_B', 'GROUP_C', 'GROUP_D',
  'GROUP_E', 'GROUP_F', 'GROUP_G', 'GROUP_H',
  'GROUP_I', 'GROUP_J', 'GROUP_K', 'GROUP_L',
  'ROUND_OF_32', 'ROUND_OF_16', 'QUARTER_FINAL',
  'SEMI_FINAL', 'THIRD_PLACE', 'FINAL',
]

export interface StaticMatch {
  matchRef: string
  round: RoundKey
  matchday: number | null
  homeTeam: string
  awayTeam: string
  kickoffUtc: string
  venue: string
}

export interface DbMatch {
  id: string
  match_ref: string
  home_team: string
  away_team: string
  kickoff_utc: string
  home_score: number | null
  away_score: number | null
  status: MatchStatus
  round: RoundKey
  matchday: number | null
  api_match_id: number | null
  updated_at: string
}

export interface MatchWithTip extends DbMatch {
  myTip?: {
    id: string
    home_tip: number
    away_tip: number
    points_awarded: number | null
  } | null
}
