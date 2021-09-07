import { DataCenter } from '../@types/datacenter'
import { MarketDataResponse } from '../@types/marketResponse'
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

export const get_market = async (itemid: number) => {
  const user = await get_user()
  if (user === null) {
    throw Error('')
  }
  //const document = await firebase
  //  .firestore()
  //  .collection('market_data')
  //  .doc(user.uid)
  //  .collection('items')
  //  .doc(String(itemid))
  //  .get()
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
  return data as MarketDataResponse
}

export const get_current_market = async (
  itemid: number,
  dc: DataCenter,
  idToken: string
) => {
  return await fetch(
    `${process.env.REACT_APP_API_URL}/newdata/market/${itemid}?dc=${dc}`,
    {
      headers: { Authorization: 'Bearer ' + idToken },
    }
  )
}
