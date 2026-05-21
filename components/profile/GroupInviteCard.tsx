'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatInviteLink } from '@/lib/invite'

interface GroupInviteCardProps {
  inviteCode: string
  groupName: string
}

export function GroupInviteCard({ inviteCode, groupName }: GroupInviteCardProps) {
  const [copied, setCopied] = useState(false)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://wm2026.vercel.app'
  const link = formatInviteLink(inviteCode, appUrl)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const el = document.createElement('input')
      el.value = link
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card>
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
        Deine Gruppe
      </p>
      <p className="font-semibold text-gray-900 mb-3">{groupName}</p>

      <div className="bg-gray-50 rounded-xl p-3 mb-3">
        <p className="text-xs text-gray-400 mb-1">Einladungscode</p>
        <p className="text-2xl font-black text-brand-blue tracking-widest">{inviteCode}</p>
      </div>

      <Button
        variant="secondary"
        className="w-full"
        onClick={handleCopy}
      >
        {copied ? 'Link kopiert!' : 'Einladungslink kopieren'}
      </Button>
    </Card>
  )
}
