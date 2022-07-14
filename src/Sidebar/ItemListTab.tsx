import React from 'react'
import { Tab, TabItem } from '../Components/Tab/Tab'

type ItemListKind = 'favorite' | 'history'

type Props = {
  value: ItemListKind
  onChange: (value: ItemListKind) => void
}

export const ItemListTab = ({ value, onChange }: Props) => {
  const items: TabItem<ItemListKind>[] = [
    { value: 'favorite', display: 'お気に入り' },
    { value: 'history', display: 'History' },
  ]
  return <Tab items={items} value={value} onChange={onChange} />
}
