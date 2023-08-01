import { MarketDataResponse } from '../@types/marketResponse'
import { XIVDataCenter } from '../@types/world'
import { get_user, firestore } from '../Common/firebase'
import { doc, getDoc } from 'firebase/firestore'

const NoDataMarketResponse: (
  itemid: number
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
    user.uid
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
  idToken: string
) => {
  return await fetch(
    `${process.env.REACT_APP_API_URL}/newdata/market/${itemid}?dc=${dc}`,
    {
      headers: { Authorization: 'Bearer ' + idToken },
    }
  )
}
