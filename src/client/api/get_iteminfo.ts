import { get_token } from '../firebase/firebase'

export type itemInfo = {
  id: number
  name: string
  lodestone: string
  hq: 0 | 1
}

const cache: { [id: number]: itemInfo } = {}

export const get_iteminfo = async (itemid: number) => {
  if (cache[itemid]) {
    return cache[itemid]
  }

  const url = `${import.meta.env.VITE_PUBLIC_API_URL}/items/${itemid}`
  const token = await get_token()

  const res = await fetch(url, {
    headers: { Authorization: 'Bearer ' + token },
  })

  const info = (await res.json()) as itemInfo
  cache[info.id] = info
  return info
}
