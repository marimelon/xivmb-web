import { XIVDataCenter, XIVWorld } from '@/types/world'
import style from './MainView.module.scss'
import { Item } from '@/types/item'
import { ItemHeader } from '../ItemHeader/ItemHeader'
import { WorldTab } from '../WorldTab'
import { useEffect, useState } from 'react'
import { MarketTable } from '../MarketTable'
import { MarketDataResponse, get_market } from '../../../client/api/get_market'
import { HistoryTable } from '../HistoryTable'
import { HistoryResponse, get_history } from '../../../client/api/get_history'

type MainViewProps = {
  item: Item
  dc: XIVDataCenter
}

export const MainView = ({ item, dc }: MainViewProps) => {
  const [world, setWorld] = useState<XIVDataCenter | XIVWorld>(dc)
  const [data, setData] = useState<MarketDataResponse>()
  const [historyData, setHistoryData] = useState<HistoryResponse>()
  useEffect(() => {
    get_market(item.id, dc).then(data => {
      setData(data)
    })
    get_history(item.id, dc).then(data => {
      setHistoryData(data)
    })
  }, [item.id, dc])

  return (
    <div className={style.MainView}>
      <ItemHeader item={item} />
      <WorldTab dataCenter={dc} currentTabType={world} onClick={setWorld} />
      <div className={style.TablesView}>
        <MarketTable itemid={item.id} world={world} data={data} />
        <HistoryTable
          world={world}
          className={style.HistoryTable}
          data={historyData}
        />
      </div>
    </div>
  )
}
