'use client'

import { useEffect, useState } from 'react'
import { getSecondsUntilLockout } from '@/lib/lockout'
import { formatCountdown } from '@/lib/utils'

interface CountdownTimerProps {
  kickoffUtc: string
  onLocked?: () => void
  className?: string
}

export function CountdownTimer({ kickoffUtc, onLocked, className }: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(getSecondsUntilLockout(kickoffUtc))

  useEffect(() => {
    const interval = setInterval(() => {
      const secs = getSecondsUntilLockout(kickoffUtc)
      setSeconds(secs)
      if (secs <= 0) {
        clearInterval(interval)
        onLocked?.()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [kickoffUtc, onLocked])

  if (seconds <= 0) {
    return <span className={className}>Gesperrt</span>
  }

  const isUrgent = seconds < 600

  return (
    <span className={`${className} ${isUrgent ? 'text-red-500' : ''} tabular-nums`}>
      {formatCountdown(seconds)} bis Tipp-Sperre
    </span>
  )
}
