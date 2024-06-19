import { doc, getDoc } from 'firebase/firestore'

import { get_user, firestore } from '@/client/firebase/firebase'
import { XIVDataCenter } from '@/types/world'

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

const NoDataMarketResponse: (
  itemid: number,
) => MarketDataResponse = itemid => ({
  itemid: itemid,
  itemname: '???',
  timestamp: 0,
  data: {
    Gungnir: { entries: [] },
    Carbuncle: { entries: [] },
    Tonberry: { entries: [] },
    Kujata: { entries: [] },
    Aegis: { entries: [] },
    Typhon: { entries: [] },
    Garuda: { entries: [] },
    Unicorn: { entries: [] },
    Atomos: { entries: [] },
    Ramuh: { entries: [] },
  },
})

export const get_market = async (itemid: number, datacenter: XIVDataCenter) => {
  const user = await get_user()
  if (user === null) {
    throw Error('Not Found User')
  }
  const docRef = doc(
    firestore,
    'market_data',
    String(itemid),
    'users',
    user.uid,
  )
  const document = await getDoc(docRef)

  const data = document.data()
  if (data === undefined) {
    return NoDataMarketResponse(itemid)
  }

  if (datacenter in data) {
    return data[datacenter] as MarketDataResponse
  }

  return data as MarketDataResponse
}

export const get_current_market = async (
  itemid: number,
  dc: XIVDataCenter,
  idToken: string,
) => {
  const result = await fetch(
    `${import.meta.env.VITE_PUBLIC_API_URL}/newdata/market/${itemid}?dc=${dc}`,
    {
      headers: { Authorization: 'Bearer ' + idToken },
    },
  )

  const data = await result.json() as MarketDataResponse
  return data
}
