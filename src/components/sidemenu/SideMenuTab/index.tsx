import { Tab, TabItem } from '../../common/Tab/Tab'

export type ItemListKind = 'favorite' | 'history'

type SideMenuTabProps = {
  selected: ItemListKind
  onChange: (value: ItemListKind) => void
}

export const SideMenuTab = ({ selected, onChange }: SideMenuTabProps) => {
  const items: TabItem<ItemListKind>[] = [
    { value: 'favorite', display: 'お気に入り' },
    { value: 'history', display: 'History' },
  ]
  return <Tab items={items} value={selected} onChange={onChange} />
}
