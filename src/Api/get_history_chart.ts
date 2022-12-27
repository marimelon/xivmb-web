import { ChartResponse } from '../@types/chartResponse'
import { XIVDataCenter, XIVWorld } from '../@types/world'
import { get_token } from '../Common/firebase'
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

  const token = await get_token()
  const res = await fetch(url, {
    headers: { Authorization: 'Bearer ' + token },
  })
  if (!res.ok) {
  }
  return (await res.json()) as ChartResponse
}
