import type { IPosition } from './map.type.js'

export interface ISpecialAgent {
  id: number
  name: string
  team: Team
  type: SpecialAgentType
  stats: ISpecialAgentStats
  position: IPosition
}

export interface IAgentStats {
  is_alive: boolean
  armor: number
  armor_cap: number
  hitpoints: number
  hitpoints_cap: number
  energy: number
  energy_cap: number
  movement_range: number
  movement_range_cap: number
  is_stunned: boolean
  status_effects: IStatusEffect[]
}

interface IStatusEffect {
  effect: StatusEffect
  value: number
  duration: number
  acquired_at: number
}

interface ISpecialAgentStats extends IAgentStats {}

enum SpecialAgentType {
  MrRyo = 1,
  Kix = 2,
  Llama = 3,
  Ripper = 4,
  Buzz = 5,
  Mole = 6,
  Bomber = 7,
  Ghost = 8
}

enum Team {
  Neutral = 0,
  Friendly = 1,
  Evil = 2
}

enum StatusEffect {
  Stun = 0,
  Root = 1,
  Silence = 2,
  DamageReduction = 3
}
