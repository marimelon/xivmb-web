import { HistoryResponse } from '../@types/historyResponse'

export const get_history = async (itemid: number) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/data/history?q=${itemid}&limit=500`
  )
  if (!res.ok) {
    throw Error('UNHANDLED_ERROR')
  }
  return (await res.json()) as HistoryResponse
}
