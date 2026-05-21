import type { StaticMatch } from '@/types/match'

// FIFA WM 2026 — 12 Gruppen à 4 Teams, 104 Spiele gesamt
// Zeiten in UTC. Gruppenphase: 11. Juni – 30. Juni 2026
// KO-Runden: 3. Juli – 19. Juli 2026
// Gruppenbesetzungen: Bitte vor Turnierstart mit offiziellem FIFA-Spielplan abgleichen.

export const WM2026_MATCHES: StaticMatch[] = [

  // ─── GRUPPE A: USA, Panama, Albanien, Ukraine ──────────────────────────────
  { matchRef: 'GS-A1', round: 'GROUP_A', matchday: 1, homeTeam: 'us', awayTeam: 'pa',   kickoffUtc: '2026-06-11T22:00:00Z', venue: 'MetLife Stadium, East Rutherford NJ' },
  { matchRef: 'GS-A2', round: 'GROUP_A', matchday: 1, homeTeam: 'al', awayTeam: 'ua',   kickoffUtc: '2026-06-11T19:00:00Z', venue: 'SoFi Stadium, Los Angeles CA' },
  { matchRef: 'GS-A3', round: 'GROUP_A', matchday: 2, homeTeam: 'us', awayTeam: 'al',   kickoffUtc: '2026-06-17T22:00:00Z', venue: 'MetLife Stadium, East Rutherford NJ' },
  { matchRef: 'GS-A4', round: 'GROUP_A', matchday: 2, homeTeam: 'ua', awayTeam: 'pa',   kickoffUtc: '2026-06-17T19:00:00Z', venue: 'AT&T Stadium, Dallas TX' },
  { matchRef: 'GS-A5', round: 'GROUP_A', matchday: 3, homeTeam: 'us', awayTeam: 'ua',   kickoffUtc: '2026-06-25T22:00:00Z', venue: 'Levi\'s Stadium, San Francisco CA' },
  { matchRef: 'GS-A6', round: 'GROUP_A', matchday: 3, homeTeam: 'pa', awayTeam: 'al',   kickoffUtc: '2026-06-25T22:00:00Z', venue: 'Rose Bowl, Los Angeles CA' },

  // ─── GRUPPE B: Mexiko, Jamaika, Senegal, Usbekistan ────────────────────────
  { matchRef: 'GS-B1', round: 'GROUP_B', matchday: 1, homeTeam: 'mx', awayTeam: 'jm',   kickoffUtc: '2026-06-12T22:00:00Z', venue: 'Estadio Azteca, Mexiko-Stadt' },
  { matchRef: 'GS-B2', round: 'GROUP_B', matchday: 1, homeTeam: 'sn', awayTeam: 'uz',   kickoffUtc: '2026-06-12T19:00:00Z', venue: 'AT&T Stadium, Dallas TX' },
  { matchRef: 'GS-B3', round: 'GROUP_B', matchday: 2, homeTeam: 'mx', awayTeam: 'sn',   kickoffUtc: '2026-06-18T22:00:00Z', venue: 'Estadio Azteca, Mexiko-Stadt' },
  { matchRef: 'GS-B4', round: 'GROUP_B', matchday: 2, homeTeam: 'uz', awayTeam: 'jm',   kickoffUtc: '2026-06-18T19:00:00Z', venue: 'NRG Stadium, Houston TX' },
  { matchRef: 'GS-B5', round: 'GROUP_B', matchday: 3, homeTeam: 'mx', awayTeam: 'uz',   kickoffUtc: '2026-06-25T19:00:00Z', venue: 'Estadio Azteca, Mexiko-Stadt' },
  { matchRef: 'GS-B6', round: 'GROUP_B', matchday: 3, homeTeam: 'jm', awayTeam: 'sn',   kickoffUtc: '2026-06-25T19:00:00Z', venue: 'Camping World Stadium, Orlando FL' },

  // ─── GRUPPE C: Kanada, Chile, Uruguay, Peru ────────────────────────────────
  { matchRef: 'GS-C1', round: 'GROUP_C', matchday: 1, homeTeam: 'ca', awayTeam: 'cl',   kickoffUtc: '2026-06-13T00:00:00Z', venue: 'BC Place, Vancouver BC' },
  { matchRef: 'GS-C2', round: 'GROUP_C', matchday: 1, homeTeam: 'uy', awayTeam: 'pe',   kickoffUtc: '2026-06-12T23:00:00Z', venue: 'MetLife Stadium, East Rutherford NJ' },
  { matchRef: 'GS-C3', round: 'GROUP_C', matchday: 2, homeTeam: 'ca', awayTeam: 'uy',   kickoffUtc: '2026-06-19T00:00:00Z', venue: 'BC Place, Vancouver BC' },
  { matchRef: 'GS-C4', round: 'GROUP_C', matchday: 2, homeTeam: 'pe', awayTeam: 'cl',   kickoffUtc: '2026-06-18T23:00:00Z', venue: 'Hard Rock Stadium, Miami FL' },
  { matchRef: 'GS-C5', round: 'GROUP_C', matchday: 3, homeTeam: 'ca', awayTeam: 'pe',   kickoffUtc: '2026-06-26T22:00:00Z', venue: 'BMO Field, Toronto ON' },
  { matchRef: 'GS-C6', round: 'GROUP_C', matchday: 3, homeTeam: 'cl', awayTeam: 'uy',   kickoffUtc: '2026-06-26T22:00:00Z', venue: 'NRG Stadium, Houston TX' },

  // ─── GRUPPE D: Argentinien, Ecuador, Bolivien, Venezuela ──────────────────
  { matchRef: 'GS-D1', round: 'GROUP_D', matchday: 1, homeTeam: 'ar', awayTeam: 'ec',   kickoffUtc: '2026-06-13T22:00:00Z', venue: 'MetLife Stadium, East Rutherford NJ' },
  { matchRef: 'GS-D2', round: 'GROUP_D', matchday: 1, homeTeam: 'bo', awayTeam: 've',   kickoffUtc: '2026-06-13T19:00:00Z', venue: 'SoFi Stadium, Los Angeles CA' },
  { matchRef: 'GS-D3', round: 'GROUP_D', matchday: 2, homeTeam: 'ar', awayTeam: 'bo',   kickoffUtc: '2026-06-19T22:00:00Z', venue: 'Hard Rock Stadium, Miami FL' },
  { matchRef: 'GS-D4', round: 'GROUP_D', matchday: 2, homeTeam: 've', awayTeam: 'ec',   kickoffUtc: '2026-06-19T19:00:00Z', venue: 'Camping World Stadium, Orlando FL' },
  { matchRef: 'GS-D5', round: 'GROUP_D', matchday: 3, homeTeam: 'ar', awayTeam: 've',   kickoffUtc: '2026-06-26T19:00:00Z', venue: 'MetLife Stadium, East Rutherford NJ' },
  { matchRef: 'GS-D6', round: 'GROUP_D', matchday: 3, homeTeam: 'ec', awayTeam: 'bo',   kickoffUtc: '2026-06-26T19:00:00Z', venue: 'AT&T Stadium, Dallas TX' },

  // ─── GRUPPE E: Brasilien, Kolumbien, Honduras, Costa Rica ─────────────────
  { matchRef: 'GS-E1', round: 'GROUP_E', matchday: 1, homeTeam: 'br', awayTeam: 'co',   kickoffUtc: '2026-06-14T22:00:00Z', venue: 'SoFi Stadium, Los Angeles CA' },
  { matchRef: 'GS-E2', round: 'GROUP_E', matchday: 1, homeTeam: 'hn', awayTeam: 'cr',   kickoffUtc: '2026-06-14T19:00:00Z', venue: 'AT&T Stadium, Dallas TX' },
  { matchRef: 'GS-E3', round: 'GROUP_E', matchday: 2, homeTeam: 'br', awayTeam: 'hn',   kickoffUtc: '2026-06-20T22:00:00Z', venue: 'NRG Stadium, Houston TX' },
  { matchRef: 'GS-E4', round: 'GROUP_E', matchday: 2, homeTeam: 'cr', awayTeam: 'co',   kickoffUtc: '2026-06-20T19:00:00Z', venue: 'Levi\'s Stadium, San Francisco CA' },
  { matchRef: 'GS-E5', round: 'GROUP_E', matchday: 3, homeTeam: 'br', awayTeam: 'cr',   kickoffUtc: '2026-06-27T22:00:00Z', venue: 'MetLife Stadium, East Rutherford NJ' },
  { matchRef: 'GS-E6', round: 'GROUP_E', matchday: 3, homeTeam: 'co', awayTeam: 'hn',   kickoffUtc: '2026-06-27T22:00:00Z', venue: 'Hard Rock Stadium, Miami FL' },

  // ─── GRUPPE F: Frankreich, Kroatien, Österreich, Ägypten ─────────────────
  { matchRef: 'GS-F1', round: 'GROUP_F', matchday: 1, homeTeam: 'fr', awayTeam: 'hr',   kickoffUtc: '2026-06-14T23:00:00Z', venue: 'MetLife Stadium, East Rutherford NJ' },
  { matchRef: 'GS-F2', round: 'GROUP_F', matchday: 1, homeTeam: 'at', awayTeam: 'eg',   kickoffUtc: '2026-06-15T02:00:00Z', venue: 'Camping World Stadium, Orlando FL' },
  { matchRef: 'GS-F3', round: 'GROUP_F', matchday: 2, homeTeam: 'fr', awayTeam: 'at',   kickoffUtc: '2026-06-20T23:00:00Z', venue: 'AT&T Stadium, Dallas TX' },
  { matchRef: 'GS-F4', round: 'GROUP_F', matchday: 2, homeTeam: 'eg', awayTeam: 'hr',   kickoffUtc: '2026-06-21T02:00:00Z', venue: 'Hard Rock Stadium, Miami FL' },
  { matchRef: 'GS-F5', round: 'GROUP_F', matchday: 3, homeTeam: 'fr', awayTeam: 'eg',   kickoffUtc: '2026-06-27T19:00:00Z', venue: 'SoFi Stadium, Los Angeles CA' },
  { matchRef: 'GS-F6', round: 'GROUP_F', matchday: 3, homeTeam: 'hr', awayTeam: 'at',   kickoffUtc: '2026-06-27T19:00:00Z', venue: 'BC Place, Vancouver BC' },

  // ─── GRUPPE G: Spanien, Portugal, Marokko, Elfenbeinküste ────────────────
  { matchRef: 'GS-G1', round: 'GROUP_G', matchday: 1, homeTeam: 'es', awayTeam: 'pt',   kickoffUtc: '2026-06-15T22:00:00Z', venue: 'MetLife Stadium, East Rutherford NJ' },
  { matchRef: 'GS-G2', round: 'GROUP_G', matchday: 1, homeTeam: 'ma', awayTeam: 'ci',   kickoffUtc: '2026-06-15T19:00:00Z', venue: 'NRG Stadium, Houston TX' },
  { matchRef: 'GS-G3', round: 'GROUP_G', matchday: 2, homeTeam: 'es', awayTeam: 'ma',   kickoffUtc: '2026-06-21T22:00:00Z', venue: 'SoFi Stadium, Los Angeles CA' },
  { matchRef: 'GS-G4', round: 'GROUP_G', matchday: 2, homeTeam: 'ci', awayTeam: 'pt',   kickoffUtc: '2026-06-21T19:00:00Z', venue: 'Levi\'s Stadium, San Francisco CA' },
  { matchRef: 'GS-G5', round: 'GROUP_G', matchday: 3, homeTeam: 'es', awayTeam: 'ci',   kickoffUtc: '2026-06-28T22:00:00Z', venue: 'Hard Rock Stadium, Miami FL' },
  { matchRef: 'GS-G6', round: 'GROUP_G', matchday: 3, homeTeam: 'pt', awayTeam: 'ma',   kickoffUtc: '2026-06-28T22:00:00Z', venue: 'MetLife Stadium, East Rutherford NJ' },

  // ─── GRUPPE H: England, Niederlande, Schweiz, Dänemark ───────────────────
  { matchRef: 'GS-H1', round: 'GROUP_H', matchday: 1, homeTeam: 'gb-eng', awayTeam: 'nl',   kickoffUtc: '2026-06-15T23:00:00Z', venue: 'AT&T Stadium, Dallas TX' },
  { matchRef: 'GS-H2', round: 'GROUP_H', matchday: 1, homeTeam: 'ch',     awayTeam: 'dk',   kickoffUtc: '2026-06-16T02:00:00Z', venue: 'Camping World Stadium, Orlando FL' },
  { matchRef: 'GS-H3', round: 'GROUP_H', matchday: 2, homeTeam: 'gb-eng', awayTeam: 'ch',   kickoffUtc: '2026-06-21T23:00:00Z', venue: 'MetLife Stadium, East Rutherford NJ' },
  { matchRef: 'GS-H4', round: 'GROUP_H', matchday: 2, homeTeam: 'dk',     awayTeam: 'nl',   kickoffUtc: '2026-06-22T02:00:00Z', venue: 'SoFi Stadium, Los Angeles CA' },
  { matchRef: 'GS-H5', round: 'GROUP_H', matchday: 3, homeTeam: 'gb-eng', awayTeam: 'dk',   kickoffUtc: '2026-06-28T19:00:00Z', venue: 'NRG Stadium, Houston TX' },
  { matchRef: 'GS-H6', round: 'GROUP_H', matchday: 3, homeTeam: 'nl',     awayTeam: 'ch',   kickoffUtc: '2026-06-28T19:00:00Z', venue: 'Levi\'s Stadium, San Francisco CA' },

  // ─── GRUPPE I: Deutschland, Belgien, Serbien, Tschechien ─────────────────
  { matchRef: 'GS-I1', round: 'GROUP_I', matchday: 1, homeTeam: 'de', awayTeam: 'be',   kickoffUtc: '2026-06-16T22:00:00Z', venue: 'MetLife Stadium, East Rutherford NJ' },
  { matchRef: 'GS-I2', round: 'GROUP_I', matchday: 1, homeTeam: 'rs', awayTeam: 'cz',   kickoffUtc: '2026-06-16T19:00:00Z', venue: 'AT&T Stadium, Dallas TX' },
  { matchRef: 'GS-I3', round: 'GROUP_I', matchday: 2, homeTeam: 'de', awayTeam: 'rs',   kickoffUtc: '2026-06-22T22:00:00Z', venue: 'SoFi Stadium, Los Angeles CA' },
  { matchRef: 'GS-I4', round: 'GROUP_I', matchday: 2, homeTeam: 'cz', awayTeam: 'be',   kickoffUtc: '2026-06-22T19:00:00Z', venue: 'Hard Rock Stadium, Miami FL' },
  { matchRef: 'GS-I5', round: 'GROUP_I', matchday: 3, homeTeam: 'de', awayTeam: 'cz',   kickoffUtc: '2026-06-29T22:00:00Z', venue: 'MetLife Stadium, East Rutherford NJ' },
  { matchRef: 'GS-I6', round: 'GROUP_I', matchday: 3, homeTeam: 'be', awayTeam: 'rs',   kickoffUtc: '2026-06-29T22:00:00Z', venue: 'NRG Stadium, Houston TX' },

  // ─── GRUPPE J: Italien, Polen, Tunesien, Kamerun ──────────────────────────
  { matchRef: 'GS-J1', round: 'GROUP_J', matchday: 1, homeTeam: 'it', awayTeam: 'pl',   kickoffUtc: '2026-06-16T23:00:00Z', venue: 'Camping World Stadium, Orlando FL' },
  { matchRef: 'GS-J2', round: 'GROUP_J', matchday: 1, homeTeam: 'tn', awayTeam: 'cm',   kickoffUtc: '2026-06-17T02:00:00Z', venue: 'BC Place, Vancouver BC' },
  { matchRef: 'GS-J3', round: 'GROUP_J', matchday: 2, homeTeam: 'it', awayTeam: 'tn',   kickoffUtc: '2026-06-22T23:00:00Z', venue: 'AT&T Stadium, Dallas TX' },
  { matchRef: 'GS-J4', round: 'GROUP_J', matchday: 2, homeTeam: 'cm', awayTeam: 'pl',   kickoffUtc: '2026-06-23T02:00:00Z', venue: 'Levi\'s Stadium, San Francisco CA' },
  { matchRef: 'GS-J5', round: 'GROUP_J', matchday: 3, homeTeam: 'it', awayTeam: 'cm',   kickoffUtc: '2026-06-29T19:00:00Z', venue: 'SoFi Stadium, Los Angeles CA' },
  { matchRef: 'GS-J6', round: 'GROUP_J', matchday: 3, homeTeam: 'pl', awayTeam: 'tn',   kickoffUtc: '2026-06-29T19:00:00Z', venue: 'Hard Rock Stadium, Miami FL' },

  // ─── GRUPPE K: Japan, Südkorea, Iran, Saudi-Arabien ──────────────────────
  { matchRef: 'GS-K1', round: 'GROUP_K', matchday: 1, homeTeam: 'jp', awayTeam: 'kr',   kickoffUtc: '2026-06-17T22:00:00Z', venue: 'SoFi Stadium, Los Angeles CA' },
  { matchRef: 'GS-K2', round: 'GROUP_K', matchday: 1, homeTeam: 'ir', awayTeam: 'sa',   kickoffUtc: '2026-06-17T19:00:00Z', venue: 'Estadio Azteca, Mexiko-Stadt' },
  { matchRef: 'GS-K3', round: 'GROUP_K', matchday: 2, homeTeam: 'jp', awayTeam: 'ir',   kickoffUtc: '2026-06-23T22:00:00Z', venue: 'AT&T Stadium, Dallas TX' },
  { matchRef: 'GS-K4', round: 'GROUP_K', matchday: 2, homeTeam: 'sa', awayTeam: 'kr',   kickoffUtc: '2026-06-23T19:00:00Z', venue: 'Camping World Stadium, Orlando FL' },
  { matchRef: 'GS-K5', round: 'GROUP_K', matchday: 3, homeTeam: 'jp', awayTeam: 'sa',   kickoffUtc: '2026-06-30T22:00:00Z', venue: 'BC Place, Vancouver BC' },
  { matchRef: 'GS-K6', round: 'GROUP_K', matchday: 3, homeTeam: 'kr', awayTeam: 'ir',   kickoffUtc: '2026-06-30T22:00:00Z', venue: 'NRG Stadium, Houston TX' },

  // ─── GRUPPE L: Australien, Neuseeland, Nigeria, Ghana ────────────────────
  { matchRef: 'GS-L1', round: 'GROUP_L', matchday: 1, homeTeam: 'au', awayTeam: 'nz',   kickoffUtc: '2026-06-17T23:00:00Z', venue: 'AT&T Stadium, Dallas TX' },
  { matchRef: 'GS-L2', round: 'GROUP_L', matchday: 1, homeTeam: 'ng', awayTeam: 'gh',   kickoffUtc: '2026-06-18T02:00:00Z', venue: 'Hard Rock Stadium, Miami FL' },
  { matchRef: 'GS-L3', round: 'GROUP_L', matchday: 2, homeTeam: 'au', awayTeam: 'ng',   kickoffUtc: '2026-06-23T23:00:00Z', venue: 'MetLife Stadium, East Rutherford NJ' },
  { matchRef: 'GS-L4', round: 'GROUP_L', matchday: 2, homeTeam: 'gh', awayTeam: 'nz',   kickoffUtc: '2026-06-24T02:00:00Z', venue: 'Levi\'s Stadium, San Francisco CA' },
  { matchRef: 'GS-L5', round: 'GROUP_L', matchday: 3, homeTeam: 'au', awayTeam: 'gh',   kickoffUtc: '2026-06-30T19:00:00Z', venue: 'SoFi Stadium, Los Angeles CA' },
  { matchRef: 'GS-L6', round: 'GROUP_L', matchday: 3, homeTeam: 'nz', awayTeam: 'ng',   kickoffUtc: '2026-06-30T19:00:00Z', venue: 'Camping World Stadium, Orlando FL' },

  // ─── RUNDE DER LETZTEN 32 (16 Spiele) ────────────────────────────────────
  { matchRef: 'R32-1',  round: 'ROUND_OF_32', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-03T22:00:00Z', venue: 'MetLife Stadium, East Rutherford NJ' },
  { matchRef: 'R32-2',  round: 'ROUND_OF_32', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-03T19:00:00Z', venue: 'SoFi Stadium, Los Angeles CA' },
  { matchRef: 'R32-3',  round: 'ROUND_OF_32', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-04T22:00:00Z', venue: 'AT&T Stadium, Dallas TX' },
  { matchRef: 'R32-4',  round: 'ROUND_OF_32', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-04T19:00:00Z', venue: 'NRG Stadium, Houston TX' },
  { matchRef: 'R32-5',  round: 'ROUND_OF_32', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-04T23:00:00Z', venue: 'Hard Rock Stadium, Miami FL' },
  { matchRef: 'R32-6',  round: 'ROUND_OF_32', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-05T02:00:00Z', venue: 'Camping World Stadium, Orlando FL' },
  { matchRef: 'R32-7',  round: 'ROUND_OF_32', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-05T22:00:00Z', venue: 'Levi\'s Stadium, San Francisco CA' },
  { matchRef: 'R32-8',  round: 'ROUND_OF_32', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-05T19:00:00Z', venue: 'BC Place, Vancouver BC' },
  { matchRef: 'R32-9',  round: 'ROUND_OF_32', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-05T23:00:00Z', venue: 'MetLife Stadium, East Rutherford NJ' },
  { matchRef: 'R32-10', round: 'ROUND_OF_32', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-06T02:00:00Z', venue: 'SoFi Stadium, Los Angeles CA' },
  { matchRef: 'R32-11', round: 'ROUND_OF_32', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-06T22:00:00Z', venue: 'AT&T Stadium, Dallas TX' },
  { matchRef: 'R32-12', round: 'ROUND_OF_32', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-06T19:00:00Z', venue: 'NRG Stadium, Houston TX' },
  { matchRef: 'R32-13', round: 'ROUND_OF_32', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-06T23:00:00Z', venue: 'Hard Rock Stadium, Miami FL' },
  { matchRef: 'R32-14', round: 'ROUND_OF_32', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-07T02:00:00Z', venue: 'Camping World Stadium, Orlando FL' },
  { matchRef: 'R32-15', round: 'ROUND_OF_32', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-07T22:00:00Z', venue: 'Estadio Azteca, Mexiko-Stadt' },
  { matchRef: 'R32-16', round: 'ROUND_OF_32', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-07T19:00:00Z', venue: 'BMO Field, Toronto ON' },

  // ─── ACHTELFINALE (8 Spiele) ──────────────────────────────────────────────
  { matchRef: 'R16-1', round: 'ROUND_OF_16', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-09T22:00:00Z', venue: 'MetLife Stadium, East Rutherford NJ' },
  { matchRef: 'R16-2', round: 'ROUND_OF_16', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-09T19:00:00Z', venue: 'SoFi Stadium, Los Angeles CA' },
  { matchRef: 'R16-3', round: 'ROUND_OF_16', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-10T22:00:00Z', venue: 'AT&T Stadium, Dallas TX' },
  { matchRef: 'R16-4', round: 'ROUND_OF_16', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-10T19:00:00Z', venue: 'NRG Stadium, Houston TX' },
  { matchRef: 'R16-5', round: 'ROUND_OF_16', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-11T22:00:00Z', venue: 'Hard Rock Stadium, Miami FL' },
  { matchRef: 'R16-6', round: 'ROUND_OF_16', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-11T19:00:00Z', venue: 'Levi\'s Stadium, San Francisco CA' },
  { matchRef: 'R16-7', round: 'ROUND_OF_16', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-12T22:00:00Z', venue: 'BC Place, Vancouver BC' },
  { matchRef: 'R16-8', round: 'ROUND_OF_16', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-12T19:00:00Z', venue: 'Camping World Stadium, Orlando FL' },

  // ─── VIERTELFINALE (4 Spiele) ─────────────────────────────────────────────
  { matchRef: 'QF-1', round: 'QUARTER_FINAL', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-14T22:00:00Z', venue: 'MetLife Stadium, East Rutherford NJ' },
  { matchRef: 'QF-2', round: 'QUARTER_FINAL', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-14T19:00:00Z', venue: 'SoFi Stadium, Los Angeles CA' },
  { matchRef: 'QF-3', round: 'QUARTER_FINAL', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-15T22:00:00Z', venue: 'AT&T Stadium, Dallas TX' },
  { matchRef: 'QF-4', round: 'QUARTER_FINAL', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-15T19:00:00Z', venue: 'NRG Stadium, Houston TX' },

  // ─── HALBFINALE (2x Punkte) ───────────────────────────────────────────────
  { matchRef: 'SF-1', round: 'SEMI_FINAL', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-17T22:00:00Z', venue: 'MetLife Stadium, East Rutherford NJ' },
  { matchRef: 'SF-2', round: 'SEMI_FINAL', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-18T22:00:00Z', venue: 'SoFi Stadium, Los Angeles CA' },

  // ─── SPIEL UM PLATZ 3 ─────────────────────────────────────────────────────
  { matchRef: 'TP-1', round: 'THIRD_PLACE', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-18T19:00:00Z', venue: 'Hard Rock Stadium, Miami FL' },

  // ─── FINALE (3x Punkte) ───────────────────────────────────────────────────
  { matchRef: 'FINAL', round: 'FINAL', matchday: null, homeTeam: 'TBD', awayTeam: 'TBD', kickoffUtc: '2026-07-19T22:00:00Z', venue: 'MetLife Stadium, East Rutherford NJ' },
]
