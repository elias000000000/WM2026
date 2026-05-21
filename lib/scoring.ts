import { RoundKey, ROUND_MULTIPLIERS } from '@/types/match'

export function calculatePoints(
  tip: { home: number; away: number },
  result: { home: number; away: number },
  round: RoundKey
): number {
  const multiplier = ROUND_MULTIPLIERS[round] ?? 1

  if (tip.home === result.home && tip.away === result.away) {
    return 3 * multiplier
  }

  const tipWinner = Math.sign(tip.home - tip.away)
  const realWinner = Math.sign(result.home - result.away)

  if (tipWinner === realWinner) {
    return 2 * multiplier
  }

  return 0
}

export function getPointsLabel(points: number): string {
  if (points === 0) return '0 Punkte'
  if (points === 1) return '1 Punkt'
  return `${points} Punkte`
}
