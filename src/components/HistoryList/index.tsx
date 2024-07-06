import { Card, List, ListItem } from '@yamada-ui/react'

import { Item } from '../../types/item'
import { SidebarItem } from '../SidebarItem'
import { useState } from 'react'

type Props = {
  items: Item[]
}

export const HistoryList = ({ items }: Props) => {
  const [_items] = useState(items) // 再表示されるまで更新しない

  return (
    <List>
      {_items.map((item) => (
        <ListItem key={item.id}>
          <Card height={10} variant="outline">
            <SidebarItem item={item} />
          </Card>
        </ListItem>
      ))}
    </List>
  )
}
