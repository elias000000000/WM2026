export interface DbGroup {
  id: string
  name: string
  invite_code: string
  created_at: string
}

export interface DbPlayer {
  id: string
  user_id: string
  group_id: string
  username: string
  color: string
  avatar: string
  total_points: number
  created_at: string
}

export interface DbTip {
  id: string
  player_id: string
  match_id: string
  home_tip: number
  away_tip: number
  points_awarded: number | null
  locked_at: string
  created_at: string
}

export interface DbComment {
  id: string
  tip_id: string
  player_id: string
  text: string
  created_at: string
}

export interface PlayerWithTips extends DbPlayer {
  tips?: DbTip[]
}

export interface LeaderboardEntry extends DbPlayer {
  exact_count: number
  correct_count: number
}
