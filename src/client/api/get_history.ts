import { XIVDataCenter } from '@/types/world'
import { get_token } from '../firebase/firebase'

export type HistoryData = {
  Updated: number
  BuyCharacterName: string
  BuyDate: number
  Itemid: number
  Hq: number
  SellPrice: number
  Stack: number
  World: string
}

export type HistoryResponse = Array<HistoryData>

export const get_history = async (itemid: number, dc?: XIVDataCenter) => {
  let url = `${
    import.meta.env.VITE_PUBLIC_API_URL
  }/data/history/${itemid}?limit=500`
  if (dc) {
    url += `&dc=${dc}`
  }

  const token = await get_token()

  const res = await fetch(url, {
    headers: { Authorization: 'Bearer ' + token },
  })
  if (!res.ok) {
    throw Error('UNHANDLED_ERROR')
  }
  return (await res.json()) as HistoryResponse
}
