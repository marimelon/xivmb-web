import { HistoryResponse } from '../types/history'
import { XIVDataCenter } from '../types/world'
import { ErrorResponse } from './apiError'
import { get_token } from './firebase'

export const fetchNewHistoryData = async (
  itemid: number,
  dc: XIVDataCenter,
) => {
  const token = await get_token()

  const url = `${import.meta.env.VITE_PUBLIC_API_URL}/newdata/history/${itemid}?dc=${dc}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token },
  })

  if (!res.ok) {
    const peyload = (await res.json()) as ErrorResponse
    throw new Error(peyload.detail)
  }

  const data = (await res.json()) as HistoryResponse
  return data
}
