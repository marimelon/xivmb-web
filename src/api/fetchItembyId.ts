import { queryOptions } from '@tanstack/react-query'

import { Item } from '../types/item'
import { ErrorResponse } from './apiError'
import { get_token } from './firebase'

export const fetchItembyId = async (itemid: number): Promise<Item> => {
  const token = await get_token()
  const url = `${import.meta.env.VITE_PUBLIC_API_URL}/items/${itemid}`
  const res = await fetch(url, {
    headers: { Authorization: 'Bearer ' + token },
  })

  if (!res.ok) {
    const peyload = (await res.json()) as ErrorResponse
    throw new Error(peyload.detail)
  }

  const info = (await res.json()) as Item
  return info
}

export const itemInfoQueryOptions = (itemid: number) =>
  queryOptions({
    queryKey: ['items', { itemid }],
    queryFn: () => fetchItembyId(itemid),
  })

export const fetchItemsbyId = async (itemids: number[]): Promise<Item[]> => {
  const token = await get_token()
  const url = `${import.meta.env.VITE_PUBLIC_API_URL}/items/${itemids.join(
    ',',
  )}`
  const res = await fetch(url, {
    headers: { Authorization: 'Bearer ' + token },
  })

  const data = (await res.json()) as Item[]
  return data
}
export const itemsInfoQueryOptions = (itemids: number[]) =>
  queryOptions({
    queryKey: ['items', { itemids }],
    queryFn: () => fetchItemsbyId(itemids),
  })
