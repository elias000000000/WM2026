'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { isLocked } from '@/lib/lockout'

export async function saveTip(
  matchId: string, homeTip: number, awayTip: number
): Promise<{ error?: string }> {
  try {
    if (!Number.isInteger(homeTip) || !Number.isInteger(awayTip)) return { error: 'Ungültiger Tipp.' }
    if (homeTip < 0 || homeTip > 20 || awayTip < 0 || awayTip > 20) return { error: 'Ungültiger Tipp.' }

    let supabase
    try { supabase = createClient() } catch (e) {
      return { error: e instanceof Error ? e.message : 'Server-Konfigurationsfehler' }
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return { error: 'Nicht angemeldet.' }

    const { data: match, error: matchError } = await supabase
      .from('matches')
      .select('kickoff_utc, id')
      .eq('id', matchId)
      .single()

    if (matchError || !match) return { error: 'Spiel nicht gefunden.' }
    if (isLocked(match.kickoff_utc)) return { error: 'Tipp-Abgabe gesperrt (weniger als 30 Min. bis Anpfiff).' }

    const { data: player, error: playerError } = await supabase
      .from('players')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (playerError || !player) return { error: 'Spielerprofil nicht gefunden.' }

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

    if (error) return { error: error.message }

    revalidatePath('/')
    revalidatePath('/spiele')
    return {}
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Fehler beim Speichern des Tipps.' }
  }
}

export async function addComment(tipId: string, text: string): Promise<{ error?: string }> {
  try {
    if (!text.trim()) return { error: 'Kommentar darf nicht leer sein.' }
    if (text.length > 280) return { error: 'Kommentar zu lang (max. 280 Zeichen).' }

    let supabase
    try { supabase = createClient() } catch (e) {
      return { error: e instanceof Error ? e.message : 'Server-Konfigurationsfehler' }
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return { error: 'Nicht angemeldet.' }

    const { data: player, error: playerError } = await supabase
      .from('players')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (playerError || !player) return { error: 'Spielerprofil nicht gefunden.' }

    const { error } = await supabase.from('comments').insert({
      tip_id: tipId,
      player_id: player.id,
      text: text.trim(),
    })

    if (error) return { error: error.message }

    revalidatePath('/spiele')
    return {}
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Fehler beim Senden des Kommentars.' }
  }
}
