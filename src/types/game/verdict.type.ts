export interface IVerdict {
  context: GameContext
  statement: VerdictStatement | null
  winner: string | null
}

enum GameContext {
  GameNotInitialized = 'game-not-initialized',
  PlayersRegistering = 'players-registering',
  GameInProgress = 'game-in-progress',
  GameEnded = 'game-ended'
}

enum VerdictStatement {
  Undefined = 'undefined',
  Draw = 'draw',
  BasedOnPoints = 'based-on-points',
  BasedOnRyoCount = 'based-on-ryo-count',
  TurnTimeout = 'turn-timeout',
  MatchmakingTimeout = 'matchmaking-timeout',
  PlayerSurrendered = 'player-surrendered',
  PlayerDemolished = 'player-demolished',
  GameTimeout = 'game-timeout',
  GameCancelled = 'game-cancelled'
}
