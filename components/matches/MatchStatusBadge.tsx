import type { MatchStatus } from '@/types/match'
import { cn } from '@/lib/utils'

interface MatchStatusBadgeProps {
  status: MatchStatus
  className?: string
}

export function MatchStatusBadge({ status, className }: MatchStatusBadgeProps) {
  if (status === 'SCHEDULED') return null

  const configs = {
    LIVE: {
      label: 'LIVE',
      className: 'bg-red-100 text-red-600 border border-red-200',
      pulse: true,
    },
    FINISHED: {
      label: 'Beendet',
      className: 'bg-gray-100 text-gray-500 border border-gray-200',
      pulse: false,
    },
    POSTPONED: {
      label: 'Verschoben',
      className: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
      pulse: false,
    },
  }

  const config = configs[status]
  if (!config) return null

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full',
        config.className,
        className
      )}
    >
      {config.pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
        </span>
      )}
      {config.label}
    </span>
  )
}
