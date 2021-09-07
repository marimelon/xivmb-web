import { DataCenter } from '../@types/datacenter'
import { HistoryResponse } from '../@types/historyResponse'

export const get_history = async (itemid: number, dc?: DataCenter) => {
  var url = `${process.env.REACT_APP_API_URL}/data/history/${itemid}?limit=500`
  if (dc) {
    url += `&dc=${dc}`
  }

  const res = await fetch(url)
  if (!res.ok) {
    throw Error('UNHANDLED_ERROR')
  }
  return (await res.json()) as HistoryResponse
}
