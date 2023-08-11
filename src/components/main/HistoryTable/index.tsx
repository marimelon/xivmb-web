import { useEffect, useState } from 'react'

import moment from 'moment'
import { AutoSizer, Column, Table } from 'react-virtualized'

import { HistoryResponse } from '@/client/api/get_history'
import { isXIVDataCenter } from '@/client/xiv/world'
import '@/components/common/react-virtualized/react-virtualized.css'
import { XIVDataCenter, XIVWorld } from '@/types/world'

import { HistoryTableHeader } from './Header'
import style from './HistoryTable.module.scss'

const separate = (num: number) =>
  String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

const conversionData = (
  data: HistoryResponse | undefined,
  world: XIVWorld | XIVDataCenter,
) => {
  if (data === undefined) {
    return []
  }
  return [...data]
    .sort((a, b) => b.BuyDate - a.BuyDate)
    .filter(value => isXIVDataCenter(world) || value.World === world)
}

type HistoryTableProps = {
  className?: string
  world: XIVWorld | XIVDataCenter
  data?: HistoryResponse
  error?: string
}

export const HistoryTable = ({
  className,
  world,
  data,
  error,
}: HistoryTableProps) => {
  const [_data, setData] = useState<HistoryResponse>()
  const [tableData, setTableData] = useState<HistoryResponse>([])

  useEffect(() => {
    setData(data)
  }, [data])

  useEffect(() => {
    setTableData(conversionData(_data, world))
  }, [_data, world])

  return (
    <div style={{ width: '70%', paddingLeft: 10 }} className={className}>
      <HistoryTableHeader
        updatedDate={
          (data ?? []).length > 0
            ? moment.unix(Math.max(...(data ?? []).map(p => p.Updated)))
            : undefined
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
              rowClassName={style.Row}
              disableHeader={false}
              noRowsRenderer={() => {
                if (error) {
                  return <div>{error}</div>
                }
                if (_data === undefined) {
                  return <div>loading...</div>
                }
                return <div style={{ textAlign: 'center' }}>No Data</div>
              }}
            >
              <Column
                label="World"
                dataKey="World"
                width={100}
                disableSort={true}
              />
              <Column
                label="HQ"
                dataKey="Hq"
                width={24}
                disableSort={true}
                cellRenderer={({ cellData }) => {
                  if (cellData === 1) {
                    return (
                      <img
                        id={'table-hqicon'}
                        alt={'hq'}
                        src={`${import.meta.env.PUBLIC_URL}/images/hqicon.png`}
                        width={16}
                        height={16}
                      />
                    )
                  }
                  return <div />
                }}
              />
              <Column
                label="Price"
                dataKey="SellPrice"
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
                dataKey="Stack"
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
                label="Date"
                dataKey="BuyDate"
                width={100}
                cellRenderer={({ cellData }) => {
                  return (
                    <div style={{ textAlign: 'right' }}>
                      {moment(cellData).format('MM/DD\xa0HH:mm')}
                    </div>
                  )
                }}
              />
            </Table>
          )
        }}
      </AutoSizer>
    </div>
  )
}
