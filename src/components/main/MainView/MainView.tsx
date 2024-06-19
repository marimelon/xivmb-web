import { useEffect, useState } from 'react'

import { Item } from '@/types/item'
import { XIVDataCenter, XIVWorld } from '@/types/world'

import { HistoryResponse, get_history } from '../../../client/api/get_history'
import {
  MarketDataResponse,
  get_current_market,
  get_market,
} from '../../../client/api/get_market'
import { get_rate_limit } from '../../../client/api/rate_limit'
import { get_token } from '../../../client/firebase/firebase'
import { HistoryTable } from '../HistoryTable'
import { ItemHeader } from '../ItemHeader/ItemHeader'
import { MarketTable } from '../MarketTable'
import { UpdateButton, UpdateButtonState } from '../UpdateButton'
import { WorldTab } from '../WorldTab'
import style from './MainView.module.scss'

type MainViewProps = {
  item: Item
  dc: XIVDataCenter
}

export const MainView = ({ item, dc }: MainViewProps) => {
  const [world, setWorld] = useState<XIVDataCenter | XIVWorld>(dc)
  const [data, setData] = useState<MarketDataResponse>()
  const [historyData, setHistoryData] = useState<HistoryResponse>()
  const [updateStatus, setUpdateStatus] = useState<UpdateButtonState>(0)
  useEffect(() => {
    get_market(item.id, dc).then(data => {
      setData(data)
    })
    get_history(item.id, dc).then(data => {
      setHistoryData(data)
    })
  }, [item.id, dc])

  const handleUpdate = async () => {
    setUpdateStatus(1)
    try {
      const token = await get_token()
      const rate_limit = await get_rate_limit(token)
      const data = await get_current_market(item.id, dc, token)
      setUpdateStatus(2)
      setTimeout(
        () => {
          setUpdateStatus(0)
        },
        (rate_limit ?? 20) * 1000,
      )
      setData(data)
    } catch (err) {
      console.error(err)
      alert(`更新に失敗しました`)
    }
  }

  return (
    <div className={style.MainView}>
      <div style={{ display: 'flex' }}>
        <ItemHeader key={item.id} item={item} />
        <UpdateButton status={updateStatus} onClick={handleUpdate} />
      </div>
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
