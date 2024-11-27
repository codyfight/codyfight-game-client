import type { IPosition } from './map.type.js'

export interface ISkill {
  id: number
  name: string
  type: SkillType
  is_native: boolean
  description: string
  level: number
  status: SkillStatus
  cost: number
  cooldown: number
  range: number
  damage: number
  duration: number
  targeting_type: TargetingType
  possible_targets: IPosition[]
}

enum SkillType {
  Passive = 0,
  Active = 1
}

enum SkillStatus {
  Empty = -4,
  Disabled = -3,
  NoTargets = -2,
  InsufficientEnergy = -1,
  OnCooldown = 0,
  Ready = 1
}

enum TargetingType {
  /**
   * NESW (North, East, South, West):
   *     x
   *     x
   * x x o x x
   *     x
   *     x
   */
  NESW = 0,

  /**
   * Linear:
   *  x   x   x
   *    x x x
   *  x x o x x
   *    x x x
   *  x   x   x
   */
  Linear = 1,

  /**
   * Grid:
   *  x x x x x
   *  x x x x x
   *  x x o x x
   *  x x x x x
   *  x x x x x
   */
  Grid = 2,

  /**
   * Diamond:
   *      x
   *    x x x
   *  x x o x x
   *    x x x
   *      x
   */
  Diamond = 3,

  /**
   * Self:
   *    x
   */
  Self = 4,

  None = 5
}
