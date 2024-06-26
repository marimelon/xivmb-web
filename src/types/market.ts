import { XIVDataCenter, XIVWorld } from "./world"

type MarketData = {
  Updated: number
  hq: number
  materia: number
  materia1: number
  materia2: number
  materia3: number
  materia4: number
  materia5: number
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
  hq: 0 | 1
  isCrafted: number
  materia: number
  materia1: number | string
  materia2: number | string
  materia3: number | string
  materia4: number | string
  materia5: number | string
  registerTown: number
  sellPrice: number
  sellRetainerName: string
  signatureName: string
  stack: number
  stain: number
  total: number
  Updated: number
  world: string
}

export type MarketWorldData = {
  date: number
  entries: MarketEntriy[]
}

export type MarketDataResponse = {
  itemid: number
  itemname: string
  timestamp: number
  datacenter: XIVDataCenter
  data: {
    [key in XIVWorld]?: MarketWorldData
  }
}
