'use client'

import { useEffect, useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { Avatar } from '@/components/ui/Avatar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ColorPicker } from '@/components/profile/ColorPicker'
import { AvatarPicker } from '@/components/profile/AvatarPicker'
import { GroupInviteCard } from '@/components/profile/GroupInviteCard'
import { updateProfile } from '@/app/actions/groups'
import { createClient } from '@/lib/supabase/client'

export default function ProfilPage() {
  const [player, setPlayer] = useState<any>(null)
  const [group, setGroup] = useState<any>(null)
  const [username, setUsername] = useState('')
  const [color, setColor] = useState('#3B82F6')
  const [avatar, setAvatar] = useState('⚽')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      const { data: p } = await supabase
        .from('players')
        .select('*, groups(*)')
        .eq('user_id', user.id)
        .single()
      if (p) {
        setPlayer(p)
        setGroup(p.groups)
        setUsername(p.username)
        setColor(p.color)
        setAvatar(p.avatar)
      }
    })
  }, [])

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (username.trim().length < 2) { setError('Mindestens 2 Zeichen'); return }
    setError('')
    startTransition(async () => {
      try {
        await updateProfile(username, color, avatar)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Fehler beim Speichern')
      }
    })
  }

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/onboarding'
  }

  if (!player) {
    return (
      <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-gray-200 rounded-2xl" />
          <div className="h-40 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 pt-6 pb-4 max-w-lg mx-auto flex flex-col gap-5"
    >
      <div className="flex items-center gap-4">
        <Avatar username={username} color={color} avatar={avatar} size="lg" />
        <div>
          <h1 className="text-xl font-black text-gray-900">{player.username}</h1>
          <p className="text-sm text-gray-500">{player.total_points} Punkte</p>
        </div>
      </div>

      {/* Edit profile */}
      <Card>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <h2 className="font-semibold text-gray-900">Profil bearbeiten</h2>

          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
            <Avatar username={username} color={color} avatar={avatar} size="md" />
            <p className="text-sm font-medium text-gray-600">Vorschau</p>
          </div>

          <Input
            label="Benutzername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={20}
            error={error}
          />

          <ColorPicker value={color} onChange={setColor} />
          <AvatarPicker value={avatar} color={color} onChange={setAvatar} />

          <Button
            type="submit"
            loading={isPending}
            className="w-full"
            style={{ backgroundColor: saved ? '#16A34A' : undefined }}
          >
            {saved ? 'Gespeichert!' : 'Speichern'}
          </Button>
        </form>
      </Card>

      {/* Group invite */}
      {group && (
        <GroupInviteCard inviteCode={group.invite_code} groupName={group.name} />
      )}

      {/* Logout */}
      <Button variant="ghost" className="w-full text-red-500" onClick={handleLogout}>
        Abmelden
      </Button>
    </motion.div>
  )
}
