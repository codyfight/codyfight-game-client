export interface IState {
  id: number | null
  status: GameState
  mode: GameMode
  stake: any[]
  rewards: any
  round: number | null
  total_turns: number | null
  total_rounds: number | null
  max_turn_time: number | null
  turn_time_left: number
}

export enum GameMode {
  Sandbox = 0,
  FriendlyDuel = 1,
  Casual = 2,
  LlamasMaze = 3,
  FactionWars = 4,
  Blitz = 5,
  Tournament = 6,
  Bbl = 7,
  Onboarding = 8,
  Testing = 127
}

export enum GameState {
  Empty = -1,
  Registering = 0,
  Playing = 1,
  Ended = 2
}
