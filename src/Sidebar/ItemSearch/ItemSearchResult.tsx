import React, { useEffect, useState } from 'react'
import { FavoriteButton } from '../ItemButtons/AddFavoriteButton'
import { SidebarItem } from '../SidebarItem'
import cssStyle from './ItemSearch.module.scss'
import { FixedSizeList } from 'react-window'

interface Props {
  value: string
  onClick: (parent: string, itemid: number, name: string) => void
  activeItem?: string
  favoriteList: FavoriteItem[]
  addFavoriteCB: (itemid: number, name: string) => void
}

export const ItemSearchResult = ({
  value,
  onClick,
  activeItem,
  favoriteList,
  addFavoriteCB,
}: Props) => {
  const identifier = 'itemsearch'
  const [results, setResults] = useState<number[]>([])
  useEffect(() => {
    window.SearchingValue = value
    if (value === '') {
      setResults([])
      return
    }
    const r: number[] = []
    const values = value.split(/[\u{20}\u{3000}]/u) // 半角/全角スペースで区切る
    for (const [itenid, itemname] of window.ItemList.entries()) {
      if (window.SearchingValue !== value) {
        return //検索ワードが変更された時検索を中止
      }
      if (values.every(elm => itemname.indexOf(elm) !== -1)) {
        r.push(itenid)
      }
    }
    if (window.SearchingValue === value) {
      setResults(r)
    }
  }, [value])

  const Row = ({
    index,
    style,
  }: {
    index: number
    style: React.CSSProperties
  }) => {
    const itemid = results[index]
    return (
      <SidebarItem
        key={itemid}
        className={cssStyle.SidebarItem}
        itemid={itemid}
        name={window.ItemList.get(itemid) ?? '???'}
        onClick={(id, name) => {
          onClick(identifier, id, name)
        }}
        isActive={activeItem === identifier + itemid}
        style={style}
      >
        <FavoriteButton
          isActive={favoriteList.findIndex(({ id }) => id === itemid) !== -1}
          addFavoriteCB={() => {
            addFavoriteCB(itemid, window.ItemList.get(itemid) ?? '???')
          }}
        />
      </SidebarItem>
    )
  }
  return (
    <div className={''}>
      <FixedSizeList
        height={Math.min(45 * results.length, 400)}
        itemCount={results.length}
        itemSize={40}
        width={'100%'}
      >
        {Row}
      </FixedSizeList>
    </div>
  )
}
