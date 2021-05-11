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

export type MarketEntriy = {
  signatureName: string
  Updated: number
  world: string
  sellRetainerName: string
  stack: number
  total: number
  materia5: string
  stain: number
  isCrafted: number
  registerTown: number
  materia2: string
  sellPrice: number
  materia3: string
  materia: number
  materia1: string
  materia4: string
  hq: 0 | 1
}

export type MarketWorldData = {
  entries: MarketEntriy[]
}

export type MarketDataResponse = {
  itemid: number
  itemname: string
  timestamp: number
  data: {
    Gungnir: MarketWorldData
    Carbuncle: MarketWorldData
    Tonberry: MarketWorldData
    Kujata: MarketWorldData
    Aegis: MarketWorldData
    Typhon: MarketWorldData
    Garuda: MarketWorldData
    Unicorn: MarketWorldData
    Atomos: MarketWorldData
    Ramuh: MarketWorldData
  }
}
