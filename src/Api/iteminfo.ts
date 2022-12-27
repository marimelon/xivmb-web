import { get_token } from '../Common/firebase'

type itemInfo = {
  id: number
  name: string
  lodestone: string
  hq: 0 | 1
}

export const get_iteminfo = async (itemid: number) => {
  const url = `${process.env.REACT_APP_API_URL}/items/${itemid}`
  const token = await get_token()

  const res = await fetch(url, {
    headers: { Authorization: 'Bearer ' + token },
  })
  return (await res.json()) as itemInfo
}
