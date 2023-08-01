import React, { useEffect, useState } from 'react'
import { FavoriteButton } from '../ItemButtons/AddFavoriteButton'
import { SidebarItem } from '../SidebarItem'
import cssStyle from './ItemSearch.module.scss'
import { FixedSizeList } from 'react-window'
import { SearchItem, search_items } from '../../Api/search_items'

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
  const [results, setResults] = useState<SearchItem[]>([])
  useEffect(() => {
    if (value === '') {
      setResults([])
      return
    }

    const values = value.split(/[\u{20}\u{3000}]/u) // 半角/全角スペースで区切る
    const delayDebounceFn = setTimeout(() => {
      search_items(values).then(res=>{
        setResults(res.items)
      })
    }, 500)

    return () => clearTimeout(delayDebounceFn)

  }, [value])

  const Row = ({
    index,
    style,
  }: {
    index: number
    style: React.CSSProperties
  }) => {
    const item = results[index]
    return (
      <SidebarItem
        key={item.id}
        className={cssStyle.SidebarItem}
        itemid={item.id}
        name={item.name}
        onClick={(id, name) => {
          onClick(identifier, id, name)
        }}
        isActive={activeItem === identifier + item.id}
        style={style}
      >
        <FavoriteButton
          isActive={favoriteList.findIndex(({ id }) => id === item.id) !== -1}
          addFavoriteCB={() => {  
            addFavoriteCB(item.id, item.name)
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
