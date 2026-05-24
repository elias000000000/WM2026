-- Fix: infinite recursion in RLS policies
-- Policies that query public.players to check group membership cause recursion
-- because checking the players policy requires querying players again.
-- Solution: SECURITY DEFINER helper functions that bypass RLS for internal lookups.

-- ============================================================
-- HELPER FUNCTIONS (bypass RLS via SECURITY DEFINER)
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_my_group_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT group_id FROM public.players WHERE user_id = auth.uid() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.get_my_player_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT id FROM public.players WHERE user_id = auth.uid() LIMIT 1;
$$;

-- ============================================================
-- DROP OLD RECURSIVE POLICIES
-- ============================================================

DROP POLICY IF EXISTS "group_members_can_read"             ON public.groups;
DROP POLICY IF EXISTS "read_own_group_players"             ON public.players;
DROP POLICY IF EXISTS "tip_owner_can_read"                 ON public.tips;
DROP POLICY IF EXISTS "tips_visible_after_kickoff"         ON public.tips;
DROP POLICY IF EXISTS "user_can_insert_tip_before_lockout" ON public.tips;
DROP POLICY IF EXISTS "user_can_update_tip_before_lockout" ON public.tips;
DROP POLICY IF EXISTS "comments_visible_after_kickoff"     ON public.comments;
DROP POLICY IF EXISTS "user_can_comment_after_kickoff"     ON public.comments;

-- ============================================================
-- RE-CREATE POLICIES WITHOUT RECURSION
-- ============================================================

-- GROUPS: user can read their own group
CREATE POLICY "group_members_can_read" ON public.groups
  FOR SELECT USING (id = public.get_my_group_id());

-- PLAYERS: user can read all players in their group
CREATE POLICY "read_own_group_players" ON public.players
  FOR SELECT USING (group_id = public.get_my_group_id());

-- TIPS: own tips always readable
CREATE POLICY "tip_owner_can_read" ON public.tips
  FOR SELECT USING (player_id = public.get_my_player_id());

-- TIPS: other players' tips visible after kickoff
CREATE POLICY "tips_visible_after_kickoff" ON public.tips
  FOR SELECT USING (
    (SELECT kickoff_utc FROM public.matches WHERE id = match_id) < now()
  );

-- TIPS INSERT: only before 30-min lockout
CREATE POLICY "user_can_insert_tip_before_lockout" ON public.tips
  FOR INSERT WITH CHECK (
    player_id = public.get_my_player_id()
    AND (SELECT kickoff_utc FROM public.matches WHERE id = match_id)
        > now() + interval '30 minutes'
  );

-- TIPS UPDATE: only before 30-min lockout
CREATE POLICY "user_can_update_tip_before_lockout" ON public.tips
  FOR UPDATE USING (
    player_id = public.get_my_player_id()
    AND (SELECT kickoff_utc FROM public.matches WHERE id = match_id)
        > now() + interval '30 minutes'
  );

-- COMMENTS: readable after kickoff
CREATE POLICY "comments_visible_after_kickoff" ON public.comments
  FOR SELECT USING (
    (SELECT m.kickoff_utc
       FROM public.tips t
       JOIN public.matches m ON m.id = t.match_id
      WHERE t.id = tip_id) < now()
  );

-- COMMENTS INSERT: only after kickoff, own player only
CREATE POLICY "user_can_comment_after_kickoff" ON public.comments
  FOR INSERT WITH CHECK (
    player_id = public.get_my_player_id()
    AND (SELECT m.kickoff_utc
           FROM public.tips t
           JOIN public.matches m ON m.id = t.match_id
          WHERE t.id = tip_id) < now()
  );
