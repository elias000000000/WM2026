'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { createGroup, joinGroup } from '@/app/actions/groups'

interface GroupStepProps {
  username: string
  color: string
  avatar: string
  pendingInviteCode?: string
}

export function GroupStep({ username, color, avatar, pendingInviteCode }: GroupStepProps) {
  const [mode, setMode] = useState<'choose' | 'create' | 'join'>(
    pendingInviteCode ? 'join' : 'choose'
  )
  const [groupName, setGroupName] = useState('')
  const [inviteCode, setInviteCode] = useState(pendingInviteCode ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!groupName.trim()) { setError('Gruppenname ist erforderlich'); return }
    setLoading(true)
    setError('')
    try {
      await createGroup(groupName, username, color, avatar)
      window.location.href = '/'
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Fehler beim Erstellen der Gruppe')
      setLoading(false)
    }
  }

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault()
    if (!inviteCode.trim()) { setError('Einladungscode ist erforderlich'); return }
    setLoading(true)
    setError('')
    try {
      await joinGroup(inviteCode, username, color, avatar)
      window.location.href = '/'
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ungültiger Einladungscode')
      setLoading(false)
    }
  }

  if (mode === 'choose') {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-1">Gruppe wählen</h2>
          <p className="text-gray-500 text-sm">Erstelle eine neue Gruppe oder tritt einer bestehenden bei.</p>
        </div>

        <button
          type="button"
          onClick={() => setMode('create')}
          className="w-full p-4 bg-brand-blue text-white rounded-2xl text-left transition-all active:scale-98"
        >
          <p className="font-bold text-base">Neue Gruppe erstellen</p>
          <p className="text-blue-200 text-sm">Lade Freunde per Link ein</p>
        </button>

        <button
          type="button"
          onClick={() => setMode('join')}
          className="w-full p-4 bg-white border-2 border-gray-200 rounded-2xl text-left transition-all active:scale-98"
        >
          <p className="font-bold text-base text-gray-900">Gruppe beitreten</p>
          <p className="text-gray-400 text-sm">Einladungscode eingeben</p>
        </button>
      </div>
    )
  }

  if (mode === 'create') {
    return (
      <form onSubmit={handleCreate} className="flex flex-col gap-5">
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-1">Gruppe erstellen</h2>
          <p className="text-gray-500 text-sm">Gib deiner Gruppe einen Namen.</p>
        </div>

        <Input
          label="Gruppenname"
          placeholder="z.B. Familie Müller WM 2026"
          value={groupName}
          onChange={(e) => { setGroupName(e.target.value); setError('') }}
          maxLength={40}
          error={error}
          autoFocus
        />

        <Button type="submit" size="lg" className="w-full" loading={loading}>
          Gruppe erstellen
        </Button>
        <button type="button" onClick={() => setMode('choose')} className="text-sm text-gray-400 text-center">
          Zurück
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={handleJoin} className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-black text-gray-900 mb-1">Gruppe beitreten</h2>
        <p className="text-gray-500 text-sm">Gib den Einladungscode ein.</p>
      </div>

      <Input
        label="Einladungscode"
        placeholder="z.B. TK9X2F"
        value={inviteCode}
        onChange={(e) => { setInviteCode(e.target.value.toUpperCase()); setError('') }}
        maxLength={6}
        error={error}
        autoFocus={!pendingInviteCode}
        className="uppercase tracking-widest text-xl font-bold text-center"
      />

      <Button type="submit" size="lg" className="w-full" loading={loading}>
        Beitreten
      </Button>
      {!pendingInviteCode && (
        <button type="button" onClick={() => setMode('choose')} className="text-sm text-gray-400 text-center">
          Zurück
        </button>
      )}
    </form>
  )
}
