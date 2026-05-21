const LOCKOUT_MINUTES = 30

export function isLocked(kickoffUtc: string): boolean {
  const kickoff = new Date(kickoffUtc)
  const lockoutTime = new Date(kickoff.getTime() - LOCKOUT_MINUTES * 60 * 1000)
  return new Date() >= lockoutTime
}

export function getLockoutTime(kickoffUtc: string): Date {
  const kickoff = new Date(kickoffUtc)
  return new Date(kickoff.getTime() - LOCKOUT_MINUTES * 60 * 1000)
}

export function isKickoffPassed(kickoffUtc: string): boolean {
  return new Date() >= new Date(kickoffUtc)
}

export function getSecondsUntilLockout(kickoffUtc: string): number {
  const lockoutTime = getLockoutTime(kickoffUtc)
  return Math.max(0, Math.floor((lockoutTime.getTime() - Date.now()) / 1000))
}
