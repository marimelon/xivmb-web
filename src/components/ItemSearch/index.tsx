import { useSuspenseQuery } from '@tanstack/react-query'
import { Card, Input, List, ListItem } from '@yamada-ui/react'

import { searchItems } from '../../api/searchItem'
import { SidebarItem } from '../SidebarItem'

export const ItemSearchResult = ({ query }: { query: string }) => {
  const searchResult = useSuspenseQuery({
    queryKey: ['items', 'search', query],
    queryFn: async () => {
      if (query === '') return null
      return await searchItems([query])
    },
  })

  return (
    <List>
      {searchResult.data?.items.map((item) => (
        <ListItem key={item.id}>
          <Card height={10} variant="outline">
            <SidebarItem key={item.id} item={item} />
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
