import { useSuspenseQuery } from '@tanstack/react-query'
import { Card, Input, List, ListItem } from '@yamada-ui/react'

import { searchItems } from '../../api/searchItem'
import { SidebarItem } from '../SidebarItem'
import { useVirtualizer } from '@tanstack/react-virtual'

type ItemSearchResult = {
  query: string
  parentElment: HTMLDivElement
}

export const ItemSearchResult = ({ query, parentElment }: ItemSearchResult) => {
  const searchResult = useSuspenseQuery({
    queryKey: ['items', 'search', query],
    queryFn: async () => {
      if (query === '') return null
      return await searchItems([query])
    },
  })

  const rowVirtualizer = useVirtualizer({
    count: searchResult.data?.items.length ?? 0,
    getScrollElement: () => parentElment,
    estimateSize: () => 40,
    gap: 4,
  })

  return (
    <List
      height={`${rowVirtualizer.getTotalSize()}px`}
      position={'relative'}
      gap={1}
    >
      {searchResult.data &&
        rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <ListItem
            key={searchResult.data!.items[virtualItem.index].id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <Card height={10} variant="outline">
              <SidebarItem item={searchResult.data!.items[virtualItem.index]} />
            </Card>
          </ListItem>
        ))}
    </List>
  )
}

type ItemSearchInputProps = {
  query: string
  onChange: (value: string) => unknown
}

export const ItemSearchInput = ({ query, onChange }: ItemSearchInputProps) => {
  return (
    <Input
      variant="filled"
      placeholder="Search"
      value={query}
      onChange={(ev) => onChange(ev.target.value)}
      onFocus={(e) => e.target.select()}
    />
  )
}
