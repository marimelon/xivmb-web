import { queryOptions } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'

import { MarketDataResponse } from '../types/market'
import { XIVDataCenter } from '../types/world'
import { firestore, get_user } from './firebase'

const NoDataMarketResponse: (
  itemid: number,
  datacenter: XIVDataCenter,
) => MarketDataResponse = (itemid, datacenter) => ({
  itemid: itemid,
  itemname: '???',
  timestamp: 0,
  datacenter: datacenter,
  data: {},
})

export const fetchMarketData = async (
  itemid: number,
  datacenter: XIVDataCenter,
) => {
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
    return NoDataMarketResponse(itemid, datacenter)
  }

  if (datacenter in data) {
    return data[datacenter] as MarketDataResponse
  }

  return NoDataMarketResponse(itemid, datacenter)
}

export const marketDataQueryOptions = (
  itemid: number,
  datacenter: XIVDataCenter,
) =>
  queryOptions({
    queryKey: ['items', { itemid, datacenter }],
    queryFn: () => fetchMarketData(itemid, datacenter),
  })
