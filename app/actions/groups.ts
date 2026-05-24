'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { generateInviteCode } from '@/lib/invite'

export async function createGroup(
  name: string, username: string, color: string, avatar: string
): Promise<{ error?: string }> {
  try {
    let supabase
    try { supabase = createClient() } catch (e) {
      return { error: e instanceof Error ? e.message : 'Server-Konfigurationsfehler' }
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return { error: 'Nicht angemeldet. Bitte neu einloggen.' }

    const inviteCode = generateInviteCode()

    const { data: group, error: groupError } = await supabase
      .from('groups')
      .insert({ name: name.trim(), invite_code: inviteCode })
      .select()
      .single()

    if (groupError || !group) {
      return { error: groupError?.message ?? 'Gruppe konnte nicht erstellt werden.' }
    }

    const { error: playerError } = await supabase.from('players').insert({
      user_id: user.id,
      group_id: group.id,
      username: username.trim(),
      color,
      avatar,
    })

    if (playerError) return { error: playerError.message }

    revalidatePath('/')
    return {}
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Unbekannter Fehler beim Erstellen der Gruppe.' }
  }
}

export async function joinGroup(
  inviteCode: string, username: string, color: string, avatar: string
): Promise<{ error?: string }> {
  try {
    let supabase
    try { supabase = createClient() } catch (e) {
      return { error: e instanceof Error ? e.message : 'Server-Konfigurationsfehler' }
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return { error: 'Nicht angemeldet. Bitte neu einloggen.' }

    const { data: group, error: groupError } = await supabase
      .from('groups')
      .select('id')
      .eq('invite_code', inviteCode.toUpperCase())
      .single()

    if (groupError || !group) return { error: 'Ungültiger Einladungscode.' }

    const { error: playerError } = await supabase.from('players').insert({
      user_id: user.id,
      group_id: group.id,
      username: username.trim(),
      color,
      avatar,
    })

    if (playerError) {
      if (playerError.code === '23505') return { error: 'Du bist dieser Gruppe bereits beigetreten.' }
      return { error: playerError.message }
    }

    revalidatePath('/')
    return {}
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Unbekannter Fehler beim Beitreten der Gruppe.' }
  }
}

export async function updateProfile(
  username: string, color: string, avatar: string
): Promise<{ error?: string }> {
  try {
    let supabase
    try { supabase = createClient() } catch (e) {
      return { error: e instanceof Error ? e.message : 'Server-Konfigurationsfehler' }
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return { error: 'Nicht angemeldet. Bitte neu einloggen.' }

    const { error } = await supabase
      .from('players')
      .update({ username: username.trim(), color, avatar })
      .eq('user_id', user.id)

    if (error) return { error: error.message }

    revalidatePath('/profil')
    return {}
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Unbekannter Fehler beim Speichern.' }
  }
}
