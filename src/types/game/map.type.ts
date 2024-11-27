export type Map = IMapTile[][]

export interface IMapTile {
  id: number
  name: string
  type: MapTileType
  position: IPosition
  config: IMapTileConfig | []
  owner: number | null
}

export interface IPosition {
  x: number
  y: number
}

export interface IMapTileConfig {
  is_armed?: boolean
  is_charged?: boolean
  despawns_after?: number
}

export enum MapTileType {
  Blank = 0,
  Obstacle = 1,
  ExitGate = 2,
  Wall = 3,
  EnergyRegenerator = 4,
  ArmorRegenerator = 5,
  HitpointsRegenerator = 6,
  DirectionalSliderUp = 7,
  DirectionalSliderDown = 8,
  DirectionalSliderLeft = 9,
  DirectionalSliderRight = 10,
  BidirectionalTeleport = 11,
  DeathPit = 12,
  ZapTrap = 13,
  ProximityMine = 14,
  BoobyTrap = 15,
  Craze = 16,
  LesserObstacle = 17,
  IceTrap = 18,
  SentryTurret = 19,
  WallMarkOne = 20,
  BombTile = 21
}
