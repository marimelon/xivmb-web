import moment from 'moment'
import { useEffect, useState } from 'react'
import { AutoSizer, Column, SortDirectionType, Table } from 'react-virtualized'
import { defaultRowRenderer } from 'react-virtualized/dist/es/Table'
import { ElementalWorld, XIVDataCenter, XIVWorld } from '@/types/world'
import { isXIVDataCenter } from '@/client/xiv/world'
import style from './MarketTable.module.scss'
import { MarketTableHeader } from './Header'
import {
  MarketDataResponse,
  MarketEntriy,
} from '../../../client/api/get_market'
import '@/components/common/react-virtualized/react-virtualized.css'
const SortableKeys = ['total', 'sellPrice'] as const
type SortKeys = (typeof SortableKeys)[number]

function isSortKeys(x: string): x is SortKeys {
  return SortableKeys.indexOf(x as any) !== -1
}

const separate = (num: number) =>
  String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

const conversionData = (
  data: MarketDataResponse | undefined,
  sortBy: SortKeys,
  sortDirection: SortDirectionType,
  world: XIVWorld | XIVDataCenter,
  isHQ: boolean,
) => {
  const datas = Object.entries(data?.data ?? [])
    .map(([, value]) => {
      return value.entries
    })
    .flat()
  const list = [...datas]
    .sort((a, b) => a[sortBy] - b[sortBy])
    .filter(value => isXIVDataCenter(world) || value.world === world)
    .filter(value => (isHQ ? value.hq === 1 : true))
  return sortDirection === 'DESC' ? list.reverse() : list
}

type SortState = {
  sortBy: SortKeys
  sortDirection: SortDirectionType
}

type MarketTableProps = {
  className?: string
  world: XIVWorld | XIVDataCenter
  itemid: number
  data?: MarketDataResponse
  error?: string
}

export const MarketTable = ({
  className,
  world,
  data,
  error,
}: MarketTableProps) => {
  const [_data, setData] = useState<MarketDataResponse>()
  const [tableData, setTableData] = useState<MarketEntriy[]>([])
  const [sortState, setSortState] = useState<SortState>({
    sortBy: 'sellPrice',
    sortDirection: 'ASC',
  })
  const [isHq, setIsHq] = useState(false)
  const [focused, setFocused] = useState<ElementalWorld>()

  useEffect(() => {
    setData(data)
  }, [data])

  useEffect(() => {
    setTableData(
      conversionData(
        _data,
        sortState.sortBy,
        sortState.sortDirection,
        world,
        isHq,
      ),
    )
  }, [_data, sortState, world, isHq])

  return (
    <div style={{ width: '100%' }} className={className}>
      <MarketTableHeader
        HQFilterState={isHq}
        HQFilterCallback={setIsHq}
        updatedDate={
          tableData.length > 0 ? moment.unix(tableData[0].Updated) : undefined
        }
      />
      <AutoSizer>
        {({ width, height }) => {
          return (
            <Table
              width={width}
              height={height}
              headerHeight={40}
              headerStyle={{ fontSize: 12 }}
              headerRowRenderer={({ className, columns, style }) => {
                return (
                  <div className={className} role="row" style={{ ...style }}>
                    {columns}
                  </div>
                )
              }}
              rowHeight={37}
              rowCount={tableData.length}
              rowGetter={({ index }) => tableData[index]}
              rowStyle={{ fontSize: 12 }}
              rowRenderer={args => {
                if (args.rowData['world'] === focused) {
                  args.style = {
                    ...args.style,
                    backgroundColor: 'rgb(25, 39, 52)',
                  }
                }
                return defaultRowRenderer(args)
              }}
              onRowClick={info => {
                if (focused === undefined) {
                  setFocused(info.rowData['world'])
                } else {
                  setFocused(undefined)
                }
              }}
              rowClassName={style.Row}
              disableHeader={false}
              sortBy={sortState.sortBy}
              sortDirection={sortState.sortDirection}
              sort={({ sortBy, sortDirection }) => {
                if (isSortKeys(sortBy)) {
                  setSortState({ sortDirection, sortBy })
                }
              }}
              noRowsRenderer={() => {
                if (error) {
                  return <div>{error}</div>
                }
                if (_data === undefined) {
                  return <div>loading</div>
                }
                return <div style={{ textAlign: 'center' }}>No Data</div>
              }}
            >
              <Column
                label="World"
                dataKey="world"
                width={100}
                className={style.World}
                disableSort={true}
              />
              <Column
                label="HQ"
                dataKey="hq"
                width={24}
                disableSort={true}
                cellRenderer={({ cellData }) => {
                  if (cellData === 1) {
                    return (
                      <img
                        id={'table-hqicon'}
                        alt={'hq'}
                        src={`/img/hqicon.png`}
                        width={16}
                        height={16}
                      />
                    )
                  }
                  return <div />
                }}
              />
              <Column
                label="Mat"
                dataKey="materia"
                disableSort={true}
                width={33}
                cellRenderer={({ cellData, rowData }) => {
                  if (cellData === 0) {
                    return <div />
                  }

                  let tooltip = ''
                  if (cellData > 0) {
                    tooltip += rowData.materia1 + '\n'
                  }
                  if (cellData > 1) {
                    tooltip += rowData.materia2 + '\n'
                  }
                  if (cellData > 2) {
                    tooltip += rowData.materia3 + '\n'
                  }
                  if (cellData > 3) {
                    tooltip += rowData.materia4 + '\n'
                  }
                  if (cellData > 4) {
                    tooltip += rowData.materia5 + '\n'
                  }

                  return (
                    <div title={tooltip} style={{ textAlign: 'center' }}>
                      {cellData}
                    </div>
                  )
                }}
              />
              <Column
                label="Price"
                dataKey="sellPrice"
                className={style.PriceCell}
                headerStyle={{ textAlign: 'right' }}
                width={115}
                cellRenderer={({ cellData }) => {
                  return (
                    <div style={{ color: '#ccff33', textAlign: 'right' }}>
                      {separate(cellData)}
                    </div>
                  )
                }}
              />
              <Column
                label="QTY"
                dataKey="stack"
                width={56}
                headerStyle={{ textAlign: 'center' }}
                cellRenderer={({ cellData }) => {
                  return (
                    <div style={{ color: '#ffcc00', textAlign: 'right' }}>
                      {separate(cellData)}
                    </div>
                  )
                }}
              />
              <Column
                label="Total"
                dataKey="total"
                width={115}
                headerStyle={{ textAlign: 'right' }}
                cellRenderer={({ cellData }) => {
                  return (
                    <div style={{ color: '#afffa1', textAlign: 'right' }}>
                      {separate(cellData)}
                    </div>
                  )
                }}
              />
              <Column
                label=""
                dataKey="registerTown"
                disableSort={true}
                width={24}
                cellRenderer={data => {
                  return (
                    <img
                      alt={data.cellData}
                      src={`/img/town/${data.cellData}.png`}
                      width={20}
                      height={20}
                    />
                  )
                }}
              />
              <Column
                label="Retainer"
                dataKey="sellRetainerName"
                width={100}
                disableSort={true}
                flexGrow={1}
              />
            </Table>
          )
        }}
      </AutoSizer>
    </div>
  )
}
