import moment from 'moment'
import { useEffect, useState } from 'react'
import { AutoSizer, Column, Table } from 'react-virtualized'
import { HistoryResponse } from '../@types/historyResponse'
import { ElementalWorld } from '../@types/world'
import { LoadingPage } from '../Common/LoadingPage'
import { separate } from '../Common/separate'
import '../css/react-virtualized.css'
import style from './HistoryTable.module.scss'

const conversionData = (
  data: HistoryResponse | undefined,
  world: ElementalWorld | 'Elemental'
) => {
  if (data === undefined) {
    return []
  }
  return [...data]
    .sort((a, b) => b.buyDate - a.buyDate)
    .filter(value => world === 'Elemental' || value.world === world)
}

type HistoryTableProps = {
  className?: string
  world: ElementalWorld | 'Elemental'
  data?: HistoryResponse
  headerRender?: () => JSX.Element
  error?: string
}

export const HistoryTable = ({
  className,
  world,
  data,
  headerRender,
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
      {headerRender && headerRender()}
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
                  return <LoadingPage />
                }
                return <div style={{ textAlign: 'center' }}>No Data</div>
              }}
            >
              <Column
                label="World"
                dataKey="world"
                width={100}
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
                        src={`${process.env.PUBLIC_URL}/images/hqicon.png`}
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
                dataKey="sellPrice"
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
                label="Date"
                dataKey="buyDate"
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
