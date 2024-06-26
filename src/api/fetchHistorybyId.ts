import { queryOptions } from '@tanstack/react-query'

import { HistoryResponse } from '../types/history'
import { XIVDataCenter } from '../types/world'
import { ErrorResponse } from './apiError'
import { get_token } from './firebase'

export const fetchItemHistorybyId = async (
  itemid: number,
  dc?: XIVDataCenter,
) => {
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
    const peyload = (await res.json()) as ErrorResponse
    throw new Error(peyload.detail)
  }

  return (await res.json()) as HistoryResponse
}

export const itemHistoryQueryOptions = (itemid: number, dc: XIVDataCenter) =>
  queryOptions({
    queryKey: ['history', { itemid }],
    queryFn: () => fetchItemHistorybyId(itemid, dc),
  })
