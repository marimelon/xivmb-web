import Collapse from '@material-ui/core/Collapse'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { HistoryResponse } from '../@types/historyResponse'
import { MarketDataResponse } from '../@types/marketResponse'
import { ElementalWorld } from '../@types/world'
import { get_history } from '../Api/get_history'
import { get_current_market, get_market } from '../Api/get_market'
import firebase from '../Common/firebase'
import HistoryChart from './HistoryChart'
import ItemHeader from './ItemHeader'
import LoginHeader from './LoginHeader'
import style from './MainView.module.scss'
import TablesView from './TablesView'
import { UpdateButton, UpdateButtonState } from './UpdateButton'
import WorldTab from './WorldTab'

type DataState<T> = {
  data?: T
  error?: string
}

type MainViewProps = {
  itemid: number
  itemname: string
}

const MainView: React.FC<MainViewProps> = ({ itemid, itemname }) => {
  const [world, setWorld] = useState<ElementalWorld | 'Elemental'>('Elemental')
  const [updateButtonState, setUpdateButtonState] = useState<UpdateButtonState>(
    0
  )
  const [isShownHistoryChart, setIsShownHistoryChart] = useState(false)
  const [rateLimit, setRateLimit] = useState<number>()
  const history = useHistory()

  const [marketData, setMarketData] = useState<DataState<MarketDataResponse>>({
    data: undefined,
    error: undefined,
  })
  const [historyData, setHistoryData] = useState<DataState<HistoryResponse>>({
    data: undefined,
    error: undefined,
  })

  useEffect(() => {
    let unmounted = false
    setMarketData({ data: undefined, error: undefined })
    get_market(itemid)
      .then((data: MarketDataResponse) => {
        if (!unmounted) {
          setMarketData({ data: data, error: undefined })
        }
      })
      .catch(reason => {
        if (!unmounted) {
          setMarketData({ data: undefined, error: 'Load Error' })
        }
        console.log(reason)
      })

    setHistoryData({ data: undefined, error: undefined })
    get_history(itemid, 'Elemental')
      .then((data: HistoryResponse) => {
        console.log('history loaded', itemid)
        if (!unmounted) {
          setHistoryData({ data: data, error: undefined })
        }
      })
      .catch(reason => {
        if (!unmounted) {
          setMarketData({ data: undefined, error: 'Load Error' })
        }
        console.log(reason)
      })
    const cleanup = () => {
      unmounted = true
    }
    return cleanup
  }, [itemid])

  const onTabChange = (tabtype: any) => {
    setWorld(tabtype)
  }

  const onClickHistoryChartButton = (value: boolean) => {
    setIsShownHistoryChart(value)
  }

  const onClickMarketUpdateButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.currentTarget.blur()
    setUpdateButtonState(1)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(false).then(idToken => {
          if (rateLimit === undefined) {
            fetch(`${process.env.REACT_APP_API_URL}/rate_limit`, {
              headers: { Authorization: 'Bearer ' + idToken },
            })
              .then(res => res.text())
              .then(res => setRateLimit(Number(res)))
          }
          const _itemid = itemid
          get_current_market(itemid, 'Elemental', idToken)
            .then<MarketDataResponse>(res => {
              if (!res.ok) {
                throw Error(res.statusText)
              }
              return res.json()
            })
            .then(res => {
              setUpdateButtonState(2)
              setTimeout(() => {
                setUpdateButtonState(0)
              }, (rateLimit ?? 20) * 1000)
              if (_itemid === itemid) {
                setMarketData({ data: res, error: undefined })
              }
            })
            .catch(err => {
              setUpdateButtonState(0)
              alert(`更新に失敗しました (${err.message})`)
            })
        })
      } else {
        history.push('/signin')
      }
    })
  }

  return (
    <div className={style.MainView}>
      <LoginHeader />
      <ItemHeader itemid={itemid} itemname={itemname} />
      <UpdateButton
        status={updateButtonState}
        callback={onClickMarketUpdateButton}
      />
      <WorldTab currentTabType={world} onClick={onTabChange} />
      <Collapse in={isShownHistoryChart}>
        <HistoryChart
          itemid={itemid}
          world={world !== 'Elemental' ? world : undefined}
          isshown={isShownHistoryChart}
        />
      </Collapse>
      <TablesView
        itemid={itemid}
        world={world}
        isShownChart={isShownHistoryChart}
        isShownChartCB={onClickHistoryChartButton}
        marketData={marketData.data}
        marketDataError={marketData.error}
        historyData={historyData.data}
        historyDataError={historyData.error}
      />
    </div>
  )
}

export default MainView
