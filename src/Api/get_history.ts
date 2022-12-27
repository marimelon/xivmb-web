import { HistoryResponse } from '../@types/historyResponse'
import { XIVDataCenter } from '../@types/world'
import { get_token } from '../Common/firebase'

export const get_history = async (itemid: number, dc?: XIVDataCenter) => {
  var url = `${process.env.REACT_APP_API_URL}/data/history/${itemid}?limit=500`
  if (dc) {
    url += `&dc=${dc}`
  }

  const token = await get_token()

  const res = await fetch(url, {
    headers: { Authorization: 'Bearer ' + token },
  })
  if (!res.ok) {
    throw Error('UNHANDLED_ERROR')
  }
  return (await res.json()) as HistoryResponse
}
