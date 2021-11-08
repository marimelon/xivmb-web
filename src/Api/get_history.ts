import { DataCenter } from '../@types/datacenter'
import { HistoryResponse } from '../@types/historyResponse'
import { get_token } from '../Common/firebase'

export const get_history = async (itemid: number, dc?: DataCenter) => {
  var url = `${process.env.REACT_APP_API_URL}/data/history/${itemid}?limit=500`
  if (dc) {
    url += `&dc=${dc}`
  }

  var idToken = await get_token()

  const res = await fetch(url, {
    headers: { Authorization: 'Bearer ' + idToken },
  })
  if (!res.ok) {
    throw Error('UNHANDLED_ERROR')
  }
  return (await res.json()) as HistoryResponse
}
