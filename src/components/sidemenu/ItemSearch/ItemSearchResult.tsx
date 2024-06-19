import { FC, useCallback } from 'react'

import { FixedSizeList as _FixedSizeList,FixedSizeListProps  } from 'react-window'

import { Item } from '@/types/item'

import { useFavorite } from '../../../client/firebase/favorite'
import { SideMenuItem } from '../SideMenuItem'
import { FavoriteButton } from '../SideMenuItem/FavoriteButton'

export const FixedSizeList = _FixedSizeList as unknown as FC<FixedSizeListProps> & _FixedSizeList;

type ItemSearchResultProps = {
  items: Item[]
}

export const ItemSearchResult = ({ items }: ItemSearchResultProps) => {
  const { items: favItems, add: addFav } = useFavorite()
  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      return (
        <div style={style}>
          <SideMenuItem
            style={{ height: '95%', fontSize: '70%' }}
            item={items[index]}
          >
            <FavoriteButton
              active={
                favItems.findIndex(item => item.id === items[index].id) !== -1
              }
              onClick={() => {
                addFav(items[index])
              }}
            />
          </SideMenuItem>
        </div>
      )
    },
    [addFav, favItems, items],
  )

  return (
    <div className={''}>
      <FixedSizeList
        height={Math.min(50 * items.length, 400)}
        itemCount={items.length}
        itemSize={38}
        width={'100%'}
      >
        {Row}
      </FixedSizeList>
    </div>
  )
}
