type itemInfo = {
  id: number
  name: string
  lodestone: string
  hq: 0 | 1
}

export const get_iteminfo = async (itemid: number) => {
  return await fetch(
    `${process.env.REACT_APP_API_URL}/items/${itemid}`
  ).then<itemInfo>(res => res.json())
}
