export interface Team {
  code: string
  name: string
  flag: string
}

export const TEAMS: Record<string, Team> = {
  'us': { code: 'us', name: 'USA', flag: 'us' },
  'mx': { code: 'mx', name: 'Mexiko', flag: 'mx' },
  'ca': { code: 'ca', name: 'Kanada', flag: 'ca' },
  'ar': { code: 'ar', name: 'Argentinien', flag: 'ar' },
  'br': { code: 'br', name: 'Brasilien', flag: 'br' },
  'de': { code: 'de', name: 'Deutschland', flag: 'de' },
  'fr': { code: 'fr', name: 'Frankreich', flag: 'fr' },
  'es': { code: 'es', name: 'Spanien', flag: 'es' },
  'gb-eng': { code: 'gb-eng', name: 'England', flag: 'gb-eng' },
  'pt': { code: 'pt', name: 'Portugal', flag: 'pt' },
  'nl': { code: 'nl', name: 'Niederlande', flag: 'nl' },
  'be': { code: 'be', name: 'Belgien', flag: 'be' },
  'it': { code: 'it', name: 'Italien', flag: 'it' },
  'hr': { code: 'hr', name: 'Kroatien', flag: 'hr' },
  'rs': { code: 'rs', name: 'Serbien', flag: 'rs' },
  'pl': { code: 'pl', name: 'Polen', flag: 'pl' },
  'ch': { code: 'ch', name: 'Schweiz', flag: 'ch' },
  'dk': { code: 'dk', name: 'Dänemark', flag: 'dk' },
  'at': { code: 'at', name: 'Österreich', flag: 'at' },
  'cz': { code: 'cz', name: 'Tschechien', flag: 'cz' },
  'jp': { code: 'jp', name: 'Japan', flag: 'jp' },
  'kr': { code: 'kr', name: 'Südkorea', flag: 'kr' },
  'ir': { code: 'ir', name: 'Iran', flag: 'ir' },
  'sa': { code: 'sa', name: 'Saudi-Arabien', flag: 'sa' },
  'au': { code: 'au', name: 'Australien', flag: 'au' },
  'nz': { code: 'nz', name: 'Neuseeland', flag: 'nz' },
  'ma': { code: 'ma', name: 'Marokko', flag: 'ma' },
  'sn': { code: 'sn', name: 'Senegal', flag: 'sn' },
  'ng': { code: 'ng', name: 'Nigeria', flag: 'ng' },
  'cm': { code: 'cm', name: 'Kamerun', flag: 'cm' },
  'eg': { code: 'eg', name: 'Ägypten', flag: 'eg' },
  'ci': { code: 'ci', name: 'Elfenbeinküste', flag: 'ci' },
  'gh': { code: 'gh', name: 'Ghana', flag: 'gh' },
  'tn': { code: 'tn', name: 'Tunesien', flag: 'tn' },
  'co': { code: 'co', name: 'Kolumbien', flag: 'co' },
  'cl': { code: 'cl', name: 'Chile', flag: 'cl' },
  'uy': { code: 'uy', name: 'Uruguay', flag: 'uy' },
  'pe': { code: 'pe', name: 'Peru', flag: 'pe' },
  'ec': { code: 'ec', name: 'Ecuador', flag: 'ec' },
  'bo': { code: 'bo', name: 'Bolivien', flag: 'bo' },
  've': { code: 've', name: 'Venezuela', flag: 've' },
  'pa': { code: 'pa', name: 'Panama', flag: 'pa' },
  'al': { code: 'al', name: 'Albanien', flag: 'al' },
  'ua': { code: 'ua', name: 'Ukraine', flag: 'ua' },
  'jm': { code: 'jm', name: 'Jamaika', flag: 'jm' },
  'uz': { code: 'uz', name: 'Usbekistan', flag: 'uz' },
  'hn': { code: 'hn', name: 'Honduras', flag: 'hn' },
  'cr': { code: 'cr', name: 'Costa Rica', flag: 'cr' },
}

export function getTeamName(code: string): string {
  return TEAMS[code]?.name ?? code.toUpperCase()
}

export function getTeamFlag(code: string): string {
  return TEAMS[code]?.flag ?? code
}

export const PLAYER_COLORS = [
  '#EF4444', '#F97316', '#EAB308', '#22C55E',
  '#14B8A6', '#3B82F6', '#8B5CF6', '#EC4899',
  '#F43F5E', '#06B6D4', '#10B981', '#6366F1',
]

export const PLAYER_AVATARS = [
  '⚽', '🏆', '🦁', '🐯', '🦊', '🐺',
  '🦅', '🦋', '🌟', '🔥', '⚡', '🎯',
]
