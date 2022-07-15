import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import moment from 'moment'
import { HistoryResponse } from '../@types/historyResponse'
import { MarketDataResponse } from '../@types/marketResponse'
import { XIVDataCenter, XIVWorld } from '../@types/world'
import { HistoryTable } from './HistoryTable'
import { HistoryTableHeader } from './HistoryTableHeader'
import { MarketTable } from './MarketTable'
import style from './TablesView.module.scss'

type TablesViewProps = {
  itemid: number
  world: XIVWorld | XIVDataCenter
  isShownChart: boolean
  isShownChartCB: (isShowCHart: boolean) => void
  marketData?: MarketDataResponse
  historyData?: HistoryResponse
  marketDataError?: string
  historyDataError?: string
}

export const TablesView = ({
  itemid,
  world,
  isShownChart,
  isShownChartCB,
  marketData,
  historyData,
}: TablesViewProps) => {
  const history_header_children = (
    <div
      className={style.ShowTrandButton}
      onClick={() => {
        isShownChartCB(!isShownChart)
      }}
    >
      <TrendingUpIcon color={isShownChart ? 'primary' : 'secondary'} />
    </div>
  )
  return (
    <div className={style.TablesView}>
      <MarketTable
        className={style.MarketTable}
        world={world}
        itemid={itemid}
        data={marketData}
      />

      <HistoryTable
        world={world}
        className={style.HistoryTable}
        data={historyData}
        headerRender={() => (
          <HistoryTableHeader
            updatedDate={
              (historyData ?? []).length > 0
                ? moment.unix(
                    Math.max(...(historyData ?? []).map(p => p.Updated))
                  )
                : undefined
            }
          >
            {history_header_children}
          </HistoryTableHeader>
        )}
      />
    </div>
  )
}

export default TablesView
