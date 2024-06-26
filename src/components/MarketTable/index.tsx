import { useCallback, useMemo, useRef, useState } from 'react'

import { useSuspenseQueries } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import {
  Text,
  ChevronIcon,
  HStack,
  Heading,
  NativeTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@yamada-ui/react'
import { format } from 'date-fns'

import { marketDataQueryOptions } from '../../api/fetchMarketData'
import {
  MarketDataResponse,
  MarketEntriy,
  MarketWorldData,
} from '../../types/market'
import { XIVDataCenter, XIVWorld } from '../../types/world'
import { UpdateButton } from './UpdateButton'

const separate = (num: number) =>
  String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

type Props = {
  data: { [key: string]: MarketWorldData }
  filter?: XIVWorld
}

export const MarketTable = ({ data, filter }: Props) => {
  const records = useMemo<MarketEntriy[]>(
    () =>
      Object.entries(data)
        .filter(([world]) => filter === undefined || world === filter)
        .flatMap(([, worldData]) => worldData.entries),
    [data, filter],
  )

  const columns = useMemo<ColumnDef<MarketEntriy>[]>(
    () => [
      {
        header: 'World',
        accessorKey: 'world',
        size: 100,
      },
      {
        header: 'HQ',
        accessorKey: 'hq',
        size: 50,
        cell: ({ getValue }) => (
          <>
            {getValue() === 1 && (
              <img
                id={'table-hqicon'}
                alt={'hq'}
                src={`/img/hqicon.png`}
                width={16}
                height={16}
              />
            )}
          </>
        ),
      },
      {
        header: 'Mat',
        accessorKey: 'materia',
        size: 60,
        cell: ({ getValue, row }) => {
          const value = getValue() as number
          if (value === 0) {
            return <></>
          }

          let tooltip = ''
          if (value > 0) {
            tooltip += row.original.materia1 + '\n'
          }
          if (value > 1) {
            tooltip += row.original.materia2 + '\n'
          }
          if (value > 2) {
            tooltip += row.original.materia3 + '\n'
          }
          if (value > 3) {
            tooltip += row.original.materia4 + '\n'
          }
          if (value > 4) {
            tooltip += row.original.materia5 + '\n'
          }

          return (
            <div title={tooltip} style={{ textAlign: 'center' }}>
              {value}
            </div>
          )
        },
      },
      {
        id: 'price',
        header: () => (
          <div style={{ textAlign: 'right', width: '100%' }}>Price</div>
        ),
        accessorKey: 'sellPrice',
        size: 120,
        meta: { textAlign: 'right' },
        cell: ({ getValue }) => {
          return (
            <div
              style={{ color: '#ccff33', textAlign: 'right', width: '100%' }}>
              {separate(getValue() as number)}
            </div>
          )
        },
      },
      {
        header: () => (
          <div style={{ textAlign: 'right', width: '100%' }}>QTY</div>
        ),
        accessorKey: 'stack',
        size: 80,
        style: { textAlign: 'right' },
        cell: ({ getValue }) => {
          return (
            <div
              style={{ color: '#ffcc00', textAlign: 'right', width: '100%' }}>
              {separate(getValue() as number)}
            </div>
          )
        },
      },
      {
        header: () => (
          <div style={{ textAlign: 'right', width: '100%' }}>Total</div>
        ),
        accessorKey: 'total',
        size: 100,
        cell: ({ getValue }) => {
          return (
            <div
              style={{ color: '#ccff33', textAlign: 'right', width: '100%' }}>
              {separate(getValue() as number)}
            </div>
          )
        },
      },
      {
        header: '',
        accessorKey: 'registerTown',
        size: 24,
        cell: ({ row }) => {
          return (
            <img
              alt={`${row.original.registerTown}`}
              src={`/img/town/${row.original.registerTown}.png`}
              width={20}
              height={20}
            />
          )
        },
      },
      {
        header: 'Retainer',
        accessorKey: 'sellRetainerName',
        size: 150,
      },
    ],
    [],
  )

  const parentRef = useRef<HTMLDivElement>(null)
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'price',
      desc: false,
    },
  ])
  const table = useReactTable({
    data: records,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
  })

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => parentRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  })

  return (
    <div
      ref={parentRef}
      style={{ height: '100%', overflow: 'auto', position: 'relative' }}>
      <NativeTable style={{ height: 'initial', display: 'grid' }}>
        <Thead
          style={{
            display: 'grid',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}>
          {table.getHeaderGroups().map(headerGroup => (
            <Tr
              key={headerGroup.id}
              style={{ display: 'flex', width: '100%' }}
              backgroundColor={['white', 'black']}>
              {headerGroup.headers.map(header => {
                return (
                  <Th
                    key={header.id}
                    style={{
                      display: 'flex',
                      width: header.getSize(),
                    }}>
                    <div
                      {...{
                        onClick: header.column.getToggleSortingHandler(),
                        style: {
                          width: '100%',
                          display: 'flex',
                          userSelect: 'none',
                          cursor: 'pointer',
                        },
                      }}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {header.column.getIsSorted() && (
                        <div>
                          <ChevronIcon
                            style={{
                              position: 'absolute',
                              top: '50%',
                              transform:
                                header.column.getIsSorted() === 'desc'
                                  ? 'translateY(-50%) rotate(180deg)'
                                  : 'translateY(-50%)',
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </Th>
                )
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody
          style={{
            display: 'grid',
            height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
            position: 'relative', //needed for absolute positioning of rows
          }}>
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const row = rows[virtualRow.index] as Row<MarketEntriy>
            return (
              <Tr
                data-index={virtualRow.index} //needed for dynamic row height measurement
                ref={node => rowVirtualizer.measureElement(node)} //measure dynamic row height
                key={row.id}
                style={{
                  display: 'flex',
                  position: 'absolute',
                  transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                  width: '100%',
                }}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <Td
                      key={cell.id}
                      style={{
                        display: 'flex',
                        width: cell.column.getSize(),
                      }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </NativeTable>
    </div>
  )
}

export const MarketContianer = ({
  itemid,
  dc,
  filter,
}: {
  itemid: number
  dc: XIVDataCenter
  filter?: XIVWorld
}) => {
  const [{ data: data }] = useSuspenseQueries({
    queries: [marketDataQueryOptions(Number(itemid), dc)],
  })

  const { queryClient } = useRouteContext({ from: '__root__' })
  const handleUpdate = useCallback(
    (res: MarketDataResponse) => {
      queryClient.setQueryData(marketDataQueryOptions(itemid, dc).queryKey, res)
    },
    [dc, itemid, queryClient],
  )

  const updatedDate = new Date(data.timestamp * 1000)
  return (
    <VStack style={{ height: '100%', width: '100%' }} gap={0}>
      <HStack height={10}>
        <Heading size="md">Market</Heading>
        <Text>
          {data.timestamp === 0
            ? '(データなし)'
            : `(取得日時 ${format(updatedDate, 'MM/dd\xa0HH:mm')})`}
        </Text>
        <UpdateButton itemid={itemid} dc={dc} onUpdate={handleUpdate} />
      </HStack>
      <MarketTable data={data.data} filter={filter} />
    </VStack>
  )
}
