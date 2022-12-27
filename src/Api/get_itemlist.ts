import { ItemListResponse } from '../@types/itemListResponse'
import { get_token } from '../Common/firebase'

export const get_itemlist_version = async () => {
  const url = `${process.env.REACT_APP_API_URL}/itemlistversion`
  const token = await get_token()

  const res = await fetch(url, {
    headers: { Authorization: 'Bearer ' + token },
  })
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  return (await res.json()) as { version: number; count: number }
}

export const get_itemlist = async () => {
  const url = `${process.env.REACT_APP_API_URL}/itemlist`
  const token = await get_token()

  const res = await fetch(url, {
    headers: { Authorization: 'Bearer ' + token },
  })
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  return (await res.json()) as ItemListResponse
}
