import { ChartResponse } from '../@types/chartResponse'
import { ElementalWorld } from '../@types/world'

export const get_history_chart = async (
  itemid: number,
  world?: ElementalWorld
) => {
  let url = `${process.env.REACT_APP_API_URL}/data/history/chart?q=${itemid}`
  if (world) {
    url += `&world=${world}`
  }
  const res = await fetch(url)
  if (!res.ok) {
  }
  return (await res.json()) as ChartResponse
}
