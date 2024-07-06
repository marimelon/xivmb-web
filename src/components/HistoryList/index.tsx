import { Card, List, ListItem } from '@yamada-ui/react'

import { Item } from '../../types/item'
import { SidebarItem } from '../SidebarItem'
import { useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

type Props = {
  items: Item[]
  parentElment: HTMLDivElement
}

export const HistoryList = ({ items, parentElment }: Props) => {
  const [_items] = useState(items) // 再表示されるまで更新しない
  const rowVirtualizer = useVirtualizer({
    count: _items.length,
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
      {rowVirtualizer.getVirtualItems().map((virtualItem) => (
        <ListItem
          key={_items[virtualItem.index].id}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${virtualItem.start}px)`,
          }}
        >
          <Card height={10} variant="outline">
            <SidebarItem item={_items[virtualItem.index]} />
          </Card>
        </ListItem>
      ))}
    </List>
  )
}
