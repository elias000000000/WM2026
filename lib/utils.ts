import { clsx, type ClassValue } from 'clsx'
import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday } from 'date-fns'
import { de } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatKickoff(utcString: string): string {
  const date = new Date(utcString)
  if (isToday(date)) return `Heute, ${format(date, 'HH:mm')} Uhr`
  if (isTomorrow(date)) return `Morgen, ${format(date, 'HH:mm')} Uhr`
  if (isYesterday(date)) return `Gestern, ${format(date, 'HH:mm')} Uhr`
  return format(date, "dd. MMM, HH:mm 'Uhr'", { locale: de })
}

export function formatDate(utcString: string): string {
  return format(new Date(utcString), "EEEE, d. MMMM yyyy", { locale: de })
}

export function formatTimeAgo(utcString: string): string {
  return formatDistanceToNow(new Date(utcString), { addSuffix: true, locale: de })
}

export function formatCountdown(seconds: number): string {
  if (seconds <= 0) return '00:00:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) {
    return `${h}h ${m.toString().padStart(2, '0')}m`
  }
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export function getResultLabel(homeScore: number, awayScore: number): 'home' | 'away' | 'draw' {
  if (homeScore > awayScore) return 'home'
  if (awayScore > homeScore) return 'away'
  return 'draw'
}
