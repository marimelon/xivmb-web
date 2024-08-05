import { useCallback, useMemo, useRef, useState } from 'react'

import { useSuspenseQueries } from '@tanstack/react-query'
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
  Text,
} from '@yamada-ui/react'
import { format } from 'date-fns'

import { itemHistoryQueryOptions } from '../../api/fetchHistorybyId'
import { HistoryData, HistoryResponse } from '../../types/history'
import { XIVDataCenter, XIVWorld } from '../../types/world'
import { UpdateButton } from './UpdateButton'
import { Route } from '../../routes/$itemid'
import { useRouteContext } from '@tanstack/react-router'

const separate = (num: number) =>
  String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

type Props = {
  data: HistoryData[]
  filter?: XIVWorld
}

export const HistoryTable = ({ data, filter }: Props) => {
  const records = useMemo<HistoryData[]>(
    () => data.filter((e) => filter === undefined || e.World === filter),
    [data, filter],
  )

  const columns = useMemo<ColumnDef<HistoryData>[]>(
    () => [
      {
        header: 'World',
        accessorKey: 'world',
        size: 80,
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
        header: () => (
          <div style={{ textAlign: 'right', width: '100%' }}>Price</div>
        ),
        accessorKey: 'sellPrice',
        size: 120,
        cell: ({ getValue }) => {
          return (
            <div
              style={{ color: '#ccff33', textAlign: 'right', width: '100%' }}
            >
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
        size: 60,
        cell: ({ getValue }) => {
          return (
            <div
              style={{ color: '#ffcc00', textAlign: 'right', width: '100%' }}
            >
              {separate(getValue() as number)}
            </div>
          )
        },
      },
      {
        id: 'date',
        header: 'Date',
        accessorKey: 'buyDate',
        size: 150,
        cell: ({ getValue }) => {
          const date = new Date(getValue() as number)
          return (
            <div style={{ color: '#ccff33', textAlign: 'right' }}>
              {`${format(date, 'MM/dd\xa0HH:mm')}`}
            </div>
          )
        },
      },
    ],
    [],
  )

  const parentRef = useRef<HTMLDivElement>(null)
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'date',
      desc: true,
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
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  })

  return (
    <div
      ref={parentRef}
      style={{ height: '100%', overflow: 'auto', position: 'relative' }}
    >
      <NativeTable style={{ height: 'initial', display: 'grid' }}>
        <Thead
          style={{
            display: 'grid',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr
              key={headerGroup.id}
              style={{ display: 'flex', width: '100%' }}
              backgroundColor={['white', 'black']}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    key={header.id}
                    style={{
                      display: 'flex',
                      width: header.getSize(),
                    }}
                  >
                    <div
                      {...{
                        onClick: header.column.getToggleSortingHandler(),
                        style: {
                          width: '100%',
                          userSelect: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                        },
                      }}
                    >
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
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index] as Row<HistoryData>
            return (
              <Tr
                data-index={virtualRow.index} //needed for dynamic row height measurement
                ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
                key={row.id}
                style={{
                  display: 'flex',
                  position: 'absolute',
                  transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                  width: '100%',
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td
                      key={cell.id}
                      style={{
                        display: 'flex',
                        width: cell.column.getSize(),
                      }}
                    >
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

export const HistoryTableContainer = ({
  itemid,
  dc,
  filter,
}: {
  itemid: number
  dc: XIVDataCenter
  filter?: XIVWorld
}) => {
  const [{ data: data }] = useSuspenseQueries({
    queries: [itemHistoryQueryOptions(itemid, dc)],
  })

  const { queryClient } = useRouteContext({ from: Route.fullPath })
  const handleUpdate = useCallback(
    (res: HistoryResponse) => {
      queryClient.setQueryData(
        itemHistoryQueryOptions(itemid, dc).queryKey,
        res,
      )
    },
    [dc, itemid, queryClient],
  )

  const updatedDate =
    data.length > 0 ? new Date(data[0].Updated * 1000) : undefined
  return (
    <VStack style={{ height: '100%', width: '100%' }} gap={0}>
      <HStack height={10}>
        <Heading size="md">History</Heading>
        {updatedDate ? (
          <Text>{`(取得日時 ${format(updatedDate, 'MM/dd\xa0HH:mm')})`}</Text>
        ) : (
          <Text>( データなし )</Text>
        )}
        <UpdateButton itemid={itemid} dc={dc} onUpdate={handleUpdate} />
      </HStack>
      <HistoryTable data={data} filter={filter} />
    </VStack>
  )
}
