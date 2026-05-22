'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { isLocked } from '@/lib/lockout'

export async function saveTip(matchId: string, homeTip: number, awayTip: number) {
  if (!Number.isInteger(homeTip) || !Number.isInteger(awayTip)) throw new Error('Ungültiger Tipp')
  if (homeTip < 0 || homeTip > 20 || awayTip < 0 || awayTip > 20) throw new Error('Ungültiger Tipp')

  let supabase
  try { supabase = createClient() } catch (e) { throw new Error(e instanceof Error ? e.message : 'Server-Fehler') }

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) throw new Error('Nicht angemeldet')

  const { data: match, error: matchError } = await supabase
    .from('matches')
    .select('kickoff_utc, id')
    .eq('id', matchId)
    .single()

  if (matchError || !match) throw new Error('Spiel nicht gefunden')
  if (isLocked(match.kickoff_utc)) throw new Error('Tipp-Abgabe ist gesperrt (weniger als 30 Minuten bis Anpfiff)')

  const { data: player, error: playerError } = await supabase
    .from('players')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (playerError || !player) throw new Error('Spielerprofil nicht gefunden')

  const { error } = await supabase
    .from('tips')
    .upsert(
      {
        player_id: player.id,
        match_id: matchId,
        home_tip: homeTip,
        away_tip: awayTip,
        locked_at: new Date().toISOString(),
      },
      { onConflict: 'player_id,match_id' }
    )

  if (error) throw new Error(error.message)

  revalidatePath('/')
  revalidatePath('/spiele')
}

export async function addComment(tipId: string, text: string) {
  if (!text.trim()) throw new Error('Kommentar darf nicht leer sein')
  if (text.length > 280) throw new Error('Kommentar zu lang (max. 280 Zeichen)')

  let supabase
  try { supabase = createClient() } catch (e) { throw new Error(e instanceof Error ? e.message : 'Server-Fehler') }

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) throw new Error('Nicht angemeldet')

  const { data: player, error: playerError } = await supabase
    .from('players')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (playerError || !player) throw new Error('Spielerprofil nicht gefunden')

  const { error } = await supabase.from('comments').insert({
    tip_id: tipId,
    player_id: player.id,
    text: text.trim(),
  })

  if (error) throw new Error(error.message)
  revalidatePath('/spiele')
}
