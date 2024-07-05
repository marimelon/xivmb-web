import { Card, List, ListItem } from '@yamada-ui/react'

import { Item } from '../../types/item'
import { SidebarItem } from '../SidebarItem'

type Props = {
  items: Item[]
}

export const HistoryList = ({ items }: Props) => {
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id}>
          <Card height={10} variant="outline">
            <SidebarItem item={item} />
          </Card>
        </ListItem>
      ))}
    </List>
  )
}
