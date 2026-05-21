'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ColorPicker } from '@/components/profile/ColorPicker'
import { AvatarPicker } from '@/components/profile/AvatarPicker'
import { Avatar } from '@/components/ui/Avatar'
import { PLAYER_COLORS, PLAYER_AVATARS } from '@/data/teams'

interface ProfileStepProps {
  onNext: (username: string, color: string, avatar: string) => void
}

export function ProfileStep({ onNext }: ProfileStepProps) {
  const [username, setUsername] = useState('')
  const [color, setColor] = useState(PLAYER_COLORS[5])
  const [avatar, setAvatar] = useState(PLAYER_AVATARS[0])
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (username.trim().length < 2) {
      setError('Benutzername muss mindestens 2 Zeichen lang sein')
      return
    }
    if (username.trim().length > 20) {
      setError('Benutzername darf maximal 20 Zeichen lang sein')
      return
    }
    onNext(username.trim(), color, avatar)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-black text-gray-900 mb-1">Dein Profil</h2>
        <p className="text-gray-500 text-sm">Wie sollen andere dich sehen?</p>
      </div>

      {/* Preview */}
      <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
        <Avatar username={username || '?'} color={color} avatar={avatar} size="lg" />
        <div>
          <p className="font-semibold text-gray-900">{username || 'Dein Name'}</p>
          <p className="text-xs text-gray-400">Vorschau</p>
        </div>
      </div>

      <Input
        label="Benutzername"
        placeholder="z.B. Mia, MaxMustermann"
        value={username}
        onChange={(e) => { setUsername(e.target.value); setError('') }}
        maxLength={20}
        error={error}
        autoFocus
      />

      <ColorPicker value={color} onChange={setColor} />
      <AvatarPicker value={avatar} color={color} onChange={setAvatar} />

      <Button type="submit" size="lg" className="w-full">
        Weiter
      </Button>
    </form>
  )
}
