import { get_token } from '../Common/firebase'

export type SearchItem = { id: number; name: string }

export type ItemSearchResponse = {
  items: SearchItem[]
}

export const search_items = async (query: string[]) => {
  const url =
    `${process.env.REACT_APP_API_URL}/items/search?q=` + query.join(' ')
  const token = await get_token()

  const res = await fetch(url, {
    headers: { Authorization: 'Bearer ' + token },
  })
  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return (await res.json()) as ItemSearchResponse
}
