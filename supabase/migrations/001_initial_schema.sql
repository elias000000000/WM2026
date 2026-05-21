-- FIFA WM 2026 Tippspiel — Initiales Schema

create extension if not exists "pgcrypto";

-- ============================================================
-- TABELLEN
-- ============================================================

create table public.groups (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  invite_code  text not null unique,
  created_at   timestamptz not null default now()
);

create table public.players (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  group_id     uuid not null references public.groups(id) on delete cascade,
  username     text not null,
  color        text not null default '#3B82F6',
  avatar       text not null default '⚽',
  total_points integer not null default 0,
  created_at   timestamptz not null default now(),
  unique(user_id, group_id)
);

create table public.matches (
  id           uuid primary key default gen_random_uuid(),
  match_ref    text unique,
  home_team    text not null,
  away_team    text not null,
  kickoff_utc  timestamptz not null,
  home_score   integer,
  away_score   integer,
  status       text not null default 'SCHEDULED',
  round        text not null,
  matchday     integer,
  api_match_id integer,
  updated_at   timestamptz not null default now()
);

create table public.tips (
  id              uuid primary key default gen_random_uuid(),
  player_id       uuid not null references public.players(id) on delete cascade,
  match_id        uuid not null references public.matches(id) on delete cascade,
  home_tip        integer not null,
  away_tip        integer not null,
  points_awarded  integer,
  locked_at       timestamptz not null default now(),
  created_at      timestamptz not null default now(),
  unique(player_id, match_id)
);

create table public.comments (
  id          uuid primary key default gen_random_uuid(),
  tip_id      uuid not null references public.tips(id) on delete cascade,
  player_id   uuid not null references public.players(id) on delete cascade,
  text        text not null,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================

create index on public.players(group_id);
create index on public.players(user_id);
create index on public.tips(match_id);
create index on public.tips(player_id);
create index on public.comments(tip_id);
create index on public.matches(kickoff_utc);
create index on public.matches(status);
create index on public.matches(match_ref);

-- ============================================================
-- PUNKTE-FUNKTION
-- ============================================================

create or replace function public.calculate_tip_points(
  p_home_tip    integer,
  p_away_tip    integer,
  p_home_score  integer,
  p_away_score  integer,
  p_round       text
) returns integer language plpgsql as $$
declare
  base_points integer := 0;
  multiplier  integer := 1;
begin
  if p_home_tip = p_home_score and p_away_tip = p_away_score then
    base_points := 3;
  elsif (p_home_tip > p_away_tip and p_home_score > p_away_score)
     or (p_home_tip < p_away_tip and p_home_score < p_away_score)
     or (p_home_tip = p_away_tip and p_home_score = p_away_score) then
    base_points := 2;
  else
    base_points := 0;
  end if;

  if p_round = 'SEMI_FINAL' then
    multiplier := 2;
  elsif p_round = 'FINAL' then
    multiplier := 3;
  end if;

  return base_points * multiplier;
end;
$$;

-- ============================================================
-- TRIGGER: Punkte automatisch vergeben wenn Spiel endet
-- ============================================================

create or replace function public.score_tips_on_match_update()
returns trigger language plpgsql security definer as $$
begin
  if new.status = 'FINISHED'
     and new.home_score is not null
     and new.away_score is not null
     and (
       old.status <> 'FINISHED'
       or old.home_score is distinct from new.home_score
       or old.away_score is distinct from new.away_score
     )
  then
    update public.tips
    set points_awarded = public.calculate_tip_points(
      home_tip, away_tip,
      new.home_score, new.away_score,
      new.round
    )
    where match_id = new.id;

    update public.players p
    set total_points = (
      select coalesce(sum(t.points_awarded), 0)
      from public.tips t
      where t.player_id = p.id
        and t.points_awarded is not null
    )
    where p.id in (
      select player_id from public.tips where match_id = new.id
    );
  end if;
  return new;
end;
$$;

create trigger trigger_score_tips
  after update on public.matches
  for each row execute function public.score_tips_on_match_update();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.groups    enable row level security;
alter table public.players   enable row level security;
alter table public.matches   enable row level security;
alter table public.tips      enable row level security;
alter table public.comments  enable row level security;

-- GROUPS
create policy "group_members_can_read" on public.groups
  for select using (
    id in (select group_id from public.players where user_id = auth.uid())
  );

create policy "authenticated_can_create_group" on public.groups
  for insert with check (auth.uid() is not null);

-- PLAYERS
create policy "read_own_group_players" on public.players
  for select using (
    group_id in (select group_id from public.players where user_id = auth.uid())
  );

create policy "user_can_insert_own_player" on public.players
  for insert with check (user_id = auth.uid());

create policy "user_can_update_own_player" on public.players
  for update using (user_id = auth.uid());

-- MATCHES: öffentlich lesbar
create policy "matches_publicly_readable" on public.matches
  for select using (true);

-- TIPS: eigene immer sichtbar; fremde erst nach Anpfiff
create policy "tip_owner_can_read" on public.tips
  for select using (
    player_id in (select id from public.players where user_id = auth.uid())
  );

create policy "tips_visible_after_kickoff" on public.tips
  for select using (
    (select kickoff_utc from public.matches where id = match_id) < now()
  );

create policy "user_can_insert_tip_before_lockout" on public.tips
  for insert with check (
    player_id in (select id from public.players where user_id = auth.uid())
    and (select kickoff_utc from public.matches where id = match_id)
        > now() + interval '30 minutes'
  );

create policy "user_can_update_tip_before_lockout" on public.tips
  for update using (
    player_id in (select id from public.players where user_id = auth.uid())
    and (select kickoff_utc from public.matches where id = match_id)
        > now() + interval '30 minutes'
  );

-- COMMENTS: lesbar und schreibbar nach Anpfiff
create policy "comments_visible_after_kickoff" on public.comments
  for select using (
    (select m.kickoff_utc from public.tips t
     join public.matches m on m.id = t.match_id
     where t.id = tip_id) < now()
  );

create policy "user_can_comment_after_kickoff" on public.comments
  for insert with check (
    player_id in (select id from public.players where user_id = auth.uid())
    and (select m.kickoff_utc from public.tips t
         join public.matches m on m.id = t.match_id
         where t.id = tip_id) < now()
  );

-- ============================================================
-- REALTIME
-- ============================================================

alter publication supabase_realtime add table public.matches;
alter publication supabase_realtime add table public.players;
alter publication supabase_realtime add table public.tips;
