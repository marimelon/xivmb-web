export type HistoryData = {
  Updated: number
  BuyCharacterName: string
  BuyDate: number
  Itemid: number
  Hq: number
  SellPrice: number
  Stack: number
  World: string
}

export type HistoryResponse = Array<HistoryData>
