-- Fix: sicherstellen dass alle INSERT/UPDATE-Policies existieren
-- Kann sicher mehrfach ausgeführt werden (DROP IF EXISTS + CREATE)

-- GROUPS: jeder eingeloggte User darf eine Gruppe erstellen
DROP POLICY IF EXISTS "authenticated_can_create_group" ON public.groups;
CREATE POLICY "authenticated_can_create_group" ON public.groups
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- PLAYERS: User darf nur seinen eigenen Player-Eintrag anlegen
DROP POLICY IF EXISTS "user_can_insert_own_player" ON public.players;
CREATE POLICY "user_can_insert_own_player" ON public.players
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- PLAYERS: User darf nur seinen eigenen Player-Eintrag updaten
DROP POLICY IF EXISTS "user_can_update_own_player" ON public.players;
CREATE POLICY "user_can_update_own_player" ON public.players
  FOR UPDATE USING (user_id = auth.uid());

-- MATCHES: öffentlich lesbar (kein Auth nötig)
DROP POLICY IF EXISTS "matches_publicly_readable" ON public.matches;
CREATE POLICY "matches_publicly_readable" ON public.matches
  FOR SELECT USING (true);
