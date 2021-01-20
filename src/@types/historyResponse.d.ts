export type HistoryData = {
    Updated: number,
    buyCharacterName: string,
    buyDate: number,
    itemid: number,
    hq: number,
    sellPrice: number,
    stack: number,
    world: string
}

export type HistoryResponse = Array<HistoryData>