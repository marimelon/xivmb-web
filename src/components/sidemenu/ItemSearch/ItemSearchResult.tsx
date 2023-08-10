import { Item } from '@/types/item'
import { useCallback } from 'react'
import { FixedSizeList } from 'react-window'
import { SideMenuItem } from '../SideMenuItem'

type ItemSearchResultProps = {
  items: Item[]
}

export const ItemSearchResult = ({ items }: ItemSearchResultProps) => {
  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      return (
        <div style={style}>
          <SideMenuItem style={{ height: '95%' }} item={items[index]} />
        </div>
      )
    },
    [items],
  )

  return (
    <div className={''}>
      <FixedSizeList
        height={Math.min(50 * items.length, 400)}
        itemCount={items.length}
        itemSize={50}
        width={'100%'}
      >
        {Row}
      </FixedSizeList>
    </div>
  )
}
