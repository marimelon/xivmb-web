import { get_token } from './firebase'

export type SearchItem = { id: number; name: string }

export type ItemSearchResponse = {
  items: SearchItem[]
}

export const searchItems = async (query: string[]) => {
  const url =
    `${import.meta.env.VITE_PUBLIC_API_URL}/items/search?q=` + query.join(' ')
  const token = await get_token()

  const res = await fetch(url, {
    headers: { Authorization: 'Bearer ' + token },
  })
  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return (await res.json()) as ItemSearchResponse
}
