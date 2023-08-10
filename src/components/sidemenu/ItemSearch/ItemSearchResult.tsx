import { useCallback } from 'react'

import { FixedSizeList } from 'react-window'

import { Item } from '@/types/item'

import { useFavorite } from '../../../client/firebase/favorite'
import { SideMenuItem } from '../SideMenuItem'
import { FavoriteButton } from '../SideMenuItem/FavoriteButton'

type ItemSearchResultProps = {
  items: Item[]
}

export const ItemSearchResult = ({ items }: ItemSearchResultProps) => {
  const { add: addFav } = useFavorite()
  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      return (
        <div style={style}>
          <SideMenuItem style={{ height: '95%' }} item={items[index]}>
            <FavoriteButton
              onClick={() => {
                addFav(items[index])
              }}
            />
          </SideMenuItem>
        </div>
      )
    },
    [addFav, items],
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
