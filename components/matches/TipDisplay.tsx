import { Avatar } from '@/components/ui/Avatar'
import type { DbPlayer, DbTip } from '@/types/database'

interface TipWithPlayer extends DbTip {
  player: DbPlayer
}

interface TipDisplayProps {
  tips: TipWithPlayer[]
  matchStatus: string
}

export function TipDisplay({ tips, matchStatus }: TipDisplayProps) {
  if (tips.length === 0) return null

  return (
    <div className="border-t border-gray-100 pt-3 mt-3">
      <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Tipps</p>
      <div className="flex flex-wrap gap-2">
        {tips.map((tip) => (
          <TipChip key={tip.id} tip={tip} matchStatus={matchStatus} />
        ))}
      </div>
    </div>
  )
}

function TipChip({ tip, matchStatus }: { tip: TipWithPlayer; matchStatus: string }) {
  const isFinished = matchStatus === 'FINISHED'
  const points = tip.points_awarded

  let pointsClass = ''
  if (isFinished && points !== null) {
    if (points === 0) pointsClass = 'text-red-500'
    else if (points <= 2) pointsClass = 'text-yellow-600'
    else pointsClass = 'text-green-600'
  }

  return (
    <div className="flex items-center gap-1.5 bg-gray-50 rounded-xl px-2.5 py-1.5">
      <Avatar
        username={tip.player.username}
        color={tip.player.color}
        avatar={tip.player.avatar}
        size="sm"
      />
      <span className="text-xs text-gray-600 font-medium">{tip.player.username}</span>
      <span className="text-xs font-bold text-gray-900 tabular-nums">
        {tip.home_tip}:{tip.away_tip}
      </span>
      {isFinished && points !== null && (
        <span className={`text-xs font-semibold ${pointsClass}`}>
          +{points}
        </span>
      )}
    </div>
  )
}
