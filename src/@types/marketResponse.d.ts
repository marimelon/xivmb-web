type MarketData = {
  Updated: number
  hq: number
  materia: number
  materia1: string
  materia2: string
  materia3: string
  materia4: string
  materia5: string
  registerTown: number
  sellPrice: number
  sellRetainerName: string
  stack: number
  stain: number
  total: number
  world: string
}

export type MarketResponse = Array<MarketData>
