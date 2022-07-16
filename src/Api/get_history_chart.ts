import { ChartResponse } from '../@types/chartResponse'
import { XIVDataCenter, XIVWorld } from '../@types/world'
import { isXIVWorld } from '../Common/worlds'

export const get_history_chart = async (
  itemid: number,
  world?: XIVWorld | XIVDataCenter
) => {
  let url = `${process.env.REACT_APP_API_URL}/data/history/chart/${itemid}?`
  if (world) {
    if (isXIVWorld(world)) {
      url += `&world=${world}`
    } else {
      url += `&dc=${world}`
    }
  }
  const res = await fetch(url)
  if (!res.ok) {
  }
  return (await res.json()) as ChartResponse
}
