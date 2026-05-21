'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { generateInviteCode } from '@/lib/invite'

export async function createGroup(name: string, username: string, color: string, avatar: string) {
  const supabase = createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) throw new Error('Nicht angemeldet')

  const inviteCode = generateInviteCode()

  const { data: group, error: groupError } = await supabase
    .from('groups')
    .insert({ name: name.trim(), invite_code: inviteCode })
    .select()
    .single()

  if (groupError) throw new Error(groupError.message)

  const { error: playerError } = await supabase.from('players').insert({
    user_id: user.id,
    group_id: group.id,
    username: username.trim(),
    color,
    avatar,
  })

  if (playerError) throw new Error(playerError.message)

  revalidatePath('/')
}

export async function joinGroup(inviteCode: string, username: string, color: string, avatar: string) {
  const supabase = createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) throw new Error('Nicht angemeldet')

  const { data: group } = await supabase
    .from('groups')
    .select('id')
    .eq('invite_code', inviteCode.toUpperCase())
    .single()

  if (!group) throw new Error('Ungültiger Einladungscode')

  const { error: playerError } = await supabase.from('players').insert({
    user_id: user.id,
    group_id: group.id,
    username: username.trim(),
    color,
    avatar,
  })

  if (playerError) {
    if (playerError.code === '23505') throw new Error('Du bist dieser Gruppe bereits beigetreten')
    throw new Error(playerError.message)
  }

  revalidatePath('/')
}

export async function updateProfile(username: string, color: string, avatar: string) {
  const supabase = createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) throw new Error('Nicht angemeldet')

  const { error } = await supabase
    .from('players')
    .update({ username: username.trim(), color, avatar })
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)
  revalidatePath('/profil')
}
