import { MarketDataResponse } from '../@types/marketResponse'
import { XIVDataCenter } from '../@types/world'
import firebase, { get_user } from '../Common/firebase'

const NoDataMarketResponse: (
  itemid: number
) => MarketDataResponse = itemid => ({
  itemid: itemid,
  itemname: window.ItemList.get(itemid) ?? '???',
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

export const get_market2 = async (itemid: number) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/dev/data/market/${itemid}`
  )
  if (res.ok) {
    return (await res.json()) as MarketDataResponse
  }
  throw Error('UNHANDLED_ERROR')
}

export const get_market = async (
  itemid: number,
  datacenter: XIVDataCenter = 'Elemental'
) => {
  const user = await get_user()
  if (user === null) {
    throw Error('Not Found User')
  }
  const document = await firebase
    .firestore()
    .collection('market_data')
    .doc(String(itemid))
    .collection('users')
    .doc(user.uid)
    .get()
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
